package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"sync/atomic"
	"time"
)

type key int

const (
	requestIDKey key = 0
)

var (
	listenAddr      string
	healthy         int32
	assetsDirectory string
)

func main() {
	flag.StringVar(&listenAddr, "listen-addr", ":4200", "server listen address")
	flag.StringVar(&assetsDirectory, "assets-dir", "./dist/client", "The main bundle output directory of the app")
	flag.Parse()

	logger := log.New(os.Stdout, "http: ", log.LstdFlags)
	logger.Println("Server starting..")

	router := http.NewServeMux()
	router.Handle("/", serveApp())
	router.Handle("/assets/", serveAssets(assetsDirectory))
	router.Handle("/healthz", healthz())

	nextRequestID := func() string {
		return fmt.Sprintf("%d", time.Now().UnixNano())
	}

	server := &http.Server{
		Addr:         listenAddr,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
		IdleTimeout:  15 * time.Second,
		ErrorLog:     logger,
		Handler:      tracingMiddleware(nextRequestID)(loggingMiddleware(logger)(router)),
	}

	done := make(chan bool)
	quit := make(chan os.Signal, 1)

	signal.Notify(quit, os.Interrupt)

	go func() {
		<-quit
		logger.Println("Server is shutting down...")
		atomic.StoreInt32(&healthy, 0)

		ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
		defer cancel()

		server.SetKeepAlivesEnabled(false)
		if err := server.Shutdown(ctx); err != nil {
			logger.Fatalf("Could not gracefully shutdown the server:\n%v\n", err)
		}
		close(done)
	}()

	logger.Println("Server is ready to handle requests at", listenAddr)

	atomic.StoreInt32(&healthy, 1)
	if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		logger.Fatalf("Could not listen on %s:\n%v\n", listenAddr, err)
	}

	<-done
	logger.Println("Server stopped")
}

func serveApp() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/html; charset=utf-8")
		w.Header().Set("X-Content-Type-Options", "nosniff")
		w.WriteHeader(http.StatusOK)
		fmt.Fprintln(w, "HelloWorld")
	})
}

func serveAssets(assetsDir string) http.Handler {
	return http.StripPrefix("/assets/", http.FileServer(http.Dir(assetsDir)))
}

func serveSourceMaps() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Encoding", "gzip")
	})
}

func healthz() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if atomic.LoadInt32(&healthy) == 1 {
			w.WriteHeader(http.StatusNoContent)
			return
		}
		w.WriteHeader(http.StatusServiceUnavailable)
	})
}

func assetsMiddleware() func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			// check gzip
		})
	}
}

func loggingMiddleware(logger *log.Logger) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			defer func() {
				requestID, ok := r.Context().Value(requestIDKey).(string)
				if !ok {
					requestID = "unknown"
				}
				logger.Println(requestID, r.Method, r.URL.Path, r.RemoteAddr, r.UserAgent())
			}()
			next.ServeHTTP(w, r)
		})
	}
}

func tracingMiddleware(nextRequestID func() string) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			requestID := r.Header.Get("X-Request-Id")
			if requestID == "" {
				requestID = nextRequestID()
			}
			ctx := context.WithValue(r.Context(), requestIDKey, requestID)
			w.Header().Set("X-Request-Id", requestID)
			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}
