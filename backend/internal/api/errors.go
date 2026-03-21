package api

import (
	"fmt"
	"log/slog"
	"net/http"
)

type Responder struct {
	logger *slog.Logger
}

func NewResponder(logger *slog.Logger) *Responder {
	return &Responder{logger: logger}
}

func (res *Responder) logError(r *http.Request, err error) {
	res.logger.Error(err.Error(), "method", r.Method, "uri", r.URL.RequestURI())
}

func (res *Responder) errorResponse(w http.ResponseWriter, r *http.Request, status int, message any) {
	env := Envelope{"error": message}
	err := WriteJSON(w, status, env, nil)
	if err != nil {
		res.logError(r, err)
		w.WriteHeader(500)
	}
}

func (res *Responder) ServerError(w http.ResponseWriter, r *http.Request, err error) {
	res.logError(r, err)
	message := "the server encountered a problem and could not process your request"
	res.errorResponse(w, r, http.StatusInternalServerError, message)
}

func (res *Responder) NotFound(w http.ResponseWriter, r *http.Request) {
	message := "the requested resource could not be found"
	res.errorResponse(w, r, http.StatusNotFound, message)
}

func (res *Responder) MethodNotAllowed(w http.ResponseWriter, r *http.Request) {
	message := fmt.Sprintf("the %s method is not supported for this resource", r.Method)
	res.errorResponse(w, r, http.StatusMethodNotAllowed, message)
}

func (res *Responder) BadRequest(w http.ResponseWriter, r *http.Request, err error) {
	res.errorResponse(w, r, http.StatusBadRequest, err.Error())
}

func (res *Responder) FailedValidation(w http.ResponseWriter, r *http.Request, errors map[string]string) {
	res.errorResponse(w, r, http.StatusUnprocessableEntity, errors)
}

func (res *Responder) EditConflict(w http.ResponseWriter, r *http.Request) {
	message := "unable to update the record due to an edit conflict, please try again"
	res.errorResponse(w, r, http.StatusConflict, message)
}

func (res *Responder) RateLimitExceeded(w http.ResponseWriter, r *http.Request) {
	message := "rate limit exceeded"
	res.errorResponse(w, r, http.StatusTooManyRequests, message)
}
