package server

import (
	"net/http"

	log "go.uber.org/zap"
)

type Server struct {
	logger   *log.Logger
	renderer string
}

func (s *Server) ClientAppHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/html; charset=utf-8")
		w.Header().Set("X-Content-Type-Options", "nosniff")
		w.Header().Set("Cache-Control", "no-cache")
		w.WriteHeader(http.StatusOK)
	}
}

func (s *Server) HealthCheckHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

	}
}
