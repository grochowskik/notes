package main

import (
	"net/http"

	"github.com/julienschmidt/httprouter"
)

func (app *application) routes() http.Handler {
	router := httprouter.New()

	router.NotFound = http.HandlerFunc(app.handlers.NotFound)
	router.MethodNotAllowed = http.HandlerFunc(app.handlers.MethodNotAllowed)

	router.HandlerFunc(http.MethodGet, "/notes_list", app.handlers.ShowNotesHandler)
	router.HandlerFunc(http.MethodPost, "/notes_create", app.handlers.CreateNoteHandler)

	return app.recoverPanic(router)
}
