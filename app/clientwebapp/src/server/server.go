package server

import (
	"bytes"
	"fmt"
	"io"
	"net/http"
	"os"

	log "go.uber.org/zap"
)

type Server struct {
	assetsDir string
	logger    *log.Logger
	renderer  Renderer
}

func (s *Server) ClientAppHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var rendered *bytes.Buffer

		if err := s.renderer.RenderRoute(rendered); err != nil {
			s.logger.Error(err.Error())
			http.Error(w, "", http.StatusInternalServerError)
		}

		go func() {
			htmlFile, err := os.Open(fmt.Sprintf("%s/index.gohtml", s.assetsDir))
			if err != nil {
				s.logger.Error("failed to open index HTML file",
					log.Error(err),
				)
			}
			defer htmlFile.Close()

			htmlTemplate := make([]byte, 1024)
			for {
				_, err := htmlFile.Read(htmlTemplate)
				if err != nil {
					if err == io.EOF {
						break
					}
					s.logger.Error("failed to read HTML file",
						log.Error(err),
					)
				}
			}
		}()

		w.Header().Set("Content-Type", "text/html; charset=utf-8")
		w.Header().Set("X-Content-Type-Options", "nosniff")
		w.Header().Set("Cache-Control", "no-cache")
		w.WriteHeader(http.StatusOK)
		// w.Write(rendered.String())
	}
}

func (s *Server) HealthCheckHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

	}
}
