package handlers

import (
	"errors"
	"fmt"
	"net/http"
	"notes/internal/api"
	"notes/internal/data"
	"notes/internal/validator"

	"github.com/google/uuid"
)

func (h *Handlers) showNotesHandler(w http.ResponseWriter, r *http.Request) {
	var input struct {
		Title   string       `json:"title"`
		Filters data.Filters `json:"filters"`
	}

	err := api.ReadJSON(w, r, &input)

	if err != nil {
		h.BadRequest(w, r, err)
		return
	}

	v := validator.New()

	input.Filters.SortSafelist = []string{"title", "-title"}

	if data.ValidateFilters(v, input.Filters); !v.Valid() {
		h.FailedValidation(w, r, v.Errors)
		return
	}

	notes, pagination, err := h.Models.Notes.GetAll(input.Title, input.Filters)
	if err != nil {
		h.ServerError(w, r, err)
		return
	}

	api.WriteJSON(w, http.StatusOK, api.Envelope{"notes": notes, "pagination": pagination}, nil)
}

func (h *Handlers) createNoteHandler(w http.ResponseWriter, r *http.Request) {

	var input struct {
		Title   string `json:"title"`
		Content string `json:"content"`
	}

	err := api.ReadJSON(w, r, &input)

	if err != nil {
		h.BadRequest(w, r, err)
		return
	}

	note := &data.Note{
		Title:   input.Title,
		Content: input.Content,
	}

	v := validator.New()

	if data.ValidateNote(v, note); !v.Valid() {
		h.FailedValidation(w, r, v.Errors)
		return
	}

	err = h.Models.Notes.Insert(note)
	if err != nil {
		h.ServerError(w, r, err)
		return
	}

	headers := make(http.Header)
	headers.Set("Location", fmt.Sprintf("/notes/%d", note.ID))

	err = api.WriteJSON(w, http.StatusCreated, api.Envelope{"note": note}, nil)
	if err != nil {
		h.ServerError(w, r, err)
		return
	}
}

func (h *Handlers) deleteNoteHandler(w http.ResponseWriter, r *http.Request) {
	var input struct {
		ID uuid.UUID `json:"id"`
	}

	err := api.ReadJSON(w, r, &input)

	if err != nil {
		h.BadRequest(w, r, err)
		return
	}

	err = h.Models.Notes.Delete(input.ID)
	if err != nil {
		switch {
		case errors.Is(err, data.ErrRecordNotFound):
			h.NotFound(w, r)
		default:
			h.ServerError(w, r, err)
		}
		return
	}

	err = api.WriteJSON(w, http.StatusOK, api.Envelope{"message": "Note deleted successfully"}, nil)
	if err != nil {
		h.ServerError(w, r, err)
		return
	}
}
