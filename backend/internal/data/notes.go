package data

import (
	"database/sql"
	"notes/internal/validator"
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

func ValidateNote(v *validator.Validator, note *Note) {
	v.Check(note.Title != "", "title", "must be provided")
	v.Check(len(note.Title) <= 500, "title", "must not be more than 500 bytes long")

	v.Check(note.Content != "", "content", "must be provided")
	v.Check(len(note.Content) <= 5000, "content", "must not be more than 5000 bytes long")
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

func (m NoteModel) Insert(note *Note) error {
	query := "INSERT INTO notes  (title, content) VALUES ($1, $2) RETURNING id, created_at, version"

	return m.DB.QueryRow(query, note.Title, note.Content).Scan(&note.ID, &note.CreatedAt, &note.Version)
}
