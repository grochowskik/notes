package handlers

import (
	"net/http"
	"notes/internal/api"
	"notes/internal/data"
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
