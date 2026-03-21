package handlers

import (
	"fmt"
	"net/http"
	"notes/internal/api"
	"notes/internal/data"
	"notes/internal/validator"
)

func (h *Handlers) ShowNotesHandler(w http.ResponseWriter, r *http.Request) {
	notes, err := h.Models.Notes.GetAll()
	if err != nil {
		h.ServerError(w, r, err)
		return
	}

	pagination := data.CalculatePagination(len(notes), 1, 10)

	api.WriteJSON(w, http.StatusOK, api.Envelope{"notes": notes, "pagination": pagination}, nil)
}

func (h *Handlers) CreateNoteHandler(w http.ResponseWriter, r *http.Request) {

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
