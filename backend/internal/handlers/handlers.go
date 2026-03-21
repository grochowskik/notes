package handlers

import (
	"log/slog"

	"notes/internal/api"
	"notes/internal/data"
)

type Handlers struct {
	*api.Responder
	Models  data.Models
	Env     string
	Version string
}

func New(logger *slog.Logger, models data.Models, env, version string) *Handlers {
	return &Handlers{
		Responder: api.NewResponder(logger),
		Models:    models,
		Env:       env,
		Version:   version,
	}
}
