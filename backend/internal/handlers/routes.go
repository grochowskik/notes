package handlers

import (
	"net/http"

	"github.com/julienschmidt/httprouter"
)

func (h *Handlers) Routes() http.Handler {
	router := httprouter.New()

	router.NotFound = http.HandlerFunc(h.NotFound)
	router.MethodNotAllowed = http.HandlerFunc(h.MethodNotAllowed)

	router.HandlerFunc(http.MethodPost, "/notes_list", h.showNotesHandler)
	router.HandlerFunc(http.MethodPost, "/notes_create", h.createNoteHandler)
	router.HandlerFunc(http.MethodDelete, "/notes_delete", h.deleteNoteHandler)

	router.HandlerFunc(http.MethodPost, "/users_create", h.createUser)

	return router
}
