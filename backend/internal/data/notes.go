package data

import (
	"database/sql"
	"time"

	"github.com/google/uuid"
)

type Note struct {
	ID        uuid.UUID `json:"id"`
	CreatedAt time.Time `json:"-"`
	Title     string    `json:"title"`
	Content   string    `json:"content,omitzero"`
	Version   int       `json:"version"`
}

type NoteModel struct {
	DB *sql.DB
}

func (m NoteModel) GetAll() ([]*Note, error) {
	rows, err := m.DB.Query("SELECT id, created_at, title, content, version FROM notes")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	notes := []*Note{}

	for rows.Next() {
		note := &Note{}
		err = rows.Scan(&note.ID, &note.CreatedAt, &note.Title, &note.Content, &note.Version)
		if err != nil {
			return nil, err
		}
		notes = append(notes, note)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return notes, nil
}
