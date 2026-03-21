package data

import (
	"database/sql"
	"time"
)

type Note struct {
	ID        int       `json:"id"`
	CreatedAt time.Time `json:"-"`
	Title     string    `json:"title"`
	Body      string    `json:"body,omitzero"`
	Version   int       `json:"version"`
}

type NoteModel struct {
	DB *sql.DB
}
