package webapp

import (
	multiplexer "github.com/gorilla/mux"
)

// Server x
func Server() {
	router := multiplexer.NewRouter()
	router.Handle("/")
}
