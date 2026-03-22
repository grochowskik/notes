package data

import (
	"context"
	"database/sql"
	"fmt"
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

func (n NoteModel) GetAll(title string, filters Filters) ([]*Note, Pagination, error) {
	query := fmt.Sprintf(`
		SELECT COUNT(*) OVER(), id, title, content, version
		FROM notes
		WHERE (to_tsvector('simple', title) @@ plainto_tsquery('simple', $1) OR $1 = '')
		ORDER BY %s %s, id ASC
		LIMIT $2 OFFSET $3`, filters.sortColumn(), filters.sortDirection())

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	args := []any{title, filters.limit(), filters.offset()}

	rows, err := n.DB.QueryContext(ctx, query, args...)
	if err != nil {
		return nil, Pagination{}, err
	}

	defer rows.Close()

	totalRecords := 0
	notes := []*Note{}

	for rows.Next() {
		note := &Note{}

		err = rows.Scan(&totalRecords, &note.ID, &note.Title, &note.Content, &note.Version)
		if err != nil {
			return nil, Pagination{}, err
		}
		notes = append(notes, note)
	}

	if err = rows.Err(); err != nil {
		return nil, Pagination{}, err
	}
	pagination := CalculatePagination(totalRecords, filters.Page, filters.PageSize)

	return notes, pagination, nil
}

func (n NoteModel) Insert(note *Note) error {
	query := "INSERT INTO notes  (title, content) VALUES ($1, $2) RETURNING id, created_at, version"

	return n.DB.QueryRow(query, note.Title, note.Content).Scan(&note.ID, &note.CreatedAt, &note.Version)
}

func (n NoteModel) Delete(id uuid.UUID) error {
	query := "DELETE FROM notes WHERE id = $1"

	result, err := n.DB.Exec(query, id)
	if err != nil {
		return err
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return err
	}

	if rowsAffected == 0 {
		return ErrRecordNotFound
	}

	return nil
}
