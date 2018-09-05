package clientweb

import (
	"flag"
	"net"
	"net/http"
	"time"

	log "go.uber.org/zap"

	multiplexer "github.com/gorilla/mux"
)

var (
	serverAddr   string
	rendererAddr string
	assetsDir    string
)

// Server x
func Server() {
	flag.StringVar(&serverAddr, "server-addr", ":4200", "server address in '<host>:<port>' format")
	flag.StringVar(&rendererAddr, "renderer-addr", "/tmp/renderer.sock", "renderer socket file")
	flag.StringVar(&assetsDir, "assets", "./assets", "static assets directory")
	flag.Parse()

	logger, _ := log.NewDevelopment()

	router := multiplexer.NewRouter()
	router.HandleFunc("/", ClientSPAHandler)
	router.HandleFunc("/healthz", HealthCheckHandler)

	server := &http.Server{
		Addr:         serverAddr,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 12 * time.Second,
		IdleTimeout:  40 * time.Second,
		Handler:      router,
	}

	if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		logger.Fatal("Failed to listen on server address",
			log.String("address", serverAddr),
			log.Error(err),
		)
	}
}

func ClientSPAHandler(w http.ResponseWriter, r *http.Request) {
	conn, err := net.Dial("unix", rendererAddr)
	if err != nil {
		http.Error(w, "", http.StatusInternalServerError)
	}
	defer conn.Close()

	resp := make([]byte, 1024)

	go func() {
		for {
			_, err := conn.Read(resp[:])
			if err != nil {
				return
			}
		}
	}()

	_, err = conn.Write([]byte("msg"))
	if err != nil {
		http.Error(w, "", http.StatusInternalServerError)
	}

	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.Header().Set("X-Content-Type-Options", "nosniff")
	w.Header().Set("Cache-Control", "no-cache")
	w.WriteHeader(http.StatusOK)
	w.Write(resp)
}

func HealthCheckHandler(w http.ResponseWriter, r *http.Request) {

}
