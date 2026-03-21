package handlers

import (
	"net/http"

	"notes/internal/api"
)

func (h *Handlers) Healthcheck(w http.ResponseWriter, r *http.Request) {
	env := api.Envelope{
		"status": "available",
		"system_info": map[string]string{
			"environment": h.Env,
			"version":     h.Version,
		},
	}

	err := api.WriteJSON(w, http.StatusOK, env, nil)
	if err != nil {
		h.ServerError(w, r, err)
	}
}
