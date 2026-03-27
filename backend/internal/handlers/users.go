package handlers

import (
	"errors"
	"net/http"
	"notes/internal/api"
	"notes/internal/data"
	"notes/internal/validator"
)

func (h *Handlers) createUser(w http.ResponseWriter, r *http.Request) {
	var input struct {
		Name     string `json:"name"`
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	err := api.ReadJSON(w, r, &input)
	if err != nil {
		h.BadRequest(w, r, err)
		return
	}

	user := &data.User{
		Name:      input.Name,
		Email:     input.Email,
		Activated: false,
	}

	err = user.Password.Set(input.Password)
	if err != nil {
		h.ServerError(w, r, err)
		return
	}

	v := validator.New()

	if data.ValidateUser(v, user); !v.Valid() {
		h.FailedValidation(w, r, v.Errors)
		return
	}

	err = h.Models.Users.Insert(user)
	if err != nil {
		switch {
		case errors.Is(err, data.ErrDuplicateEmail):
			v.AddError("email", "a user with this email address already exists")
			h.FailedValidation(w, r, v.Errors)
		default:
			h.ServerError(w, r, err)
		}
	}

	err = api.WriteJSON(w, http.StatusCreated, api.Envelope{"user": user}, nil)
	if err != nil {
		h.ServerError(w, r, err)
		return
	}
}
