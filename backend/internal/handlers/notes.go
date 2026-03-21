package handlers

import (
	"net/http"
	"notes/internal/api"
)

func (h *Handlers) ShowNotesHandler(w http.ResponseWriter, r *http.Request) {
	notes, err := h.Models.Notes.GetAll()
	if err != nil {
		h.ServerError(w, r, err)
		return
	}

	pagination := api.Pagination{
		Page:         1,
		PageSize:     10,
		TotalRecords: len(notes),
		TotalPages:   1,
	}

	api.WriteJSON(w, http.StatusOK, api.Envelope{"notes": notes, "pagination": pagination}, nil)
}
