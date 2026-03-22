package data

import (
	"slices"
	"strings"

	"notes/internal/validator"
)

type Filters struct {
	Page         int      `json:"page"`
	PageSize     int      `json:"page_size"`
	Sort         string   `json:"sort"`
	SortSafelist []string `json:"-"`
}

type Pagination struct {
	Page         int `json:"page"`
	PageSize     int `json:"page_size"`
	TotalRecords int `json:"total_records"`
	TotalPages   int `json:"total_pages"`
}

func (f Filters) sortColumn() string {
	if slices.Contains(f.SortSafelist, f.Sort) {
		return strings.TrimPrefix(f.Sort, "-")
	}

	panic("unsafe sort parameter: " + f.Sort)
}

func (f Filters) sortDirection() string {
	if strings.HasPrefix(f.Sort, "-") {
		return "DESC"
	}

	return "ASC"
}

func (f Filters) limit() int {
	return f.PageSize
}

func (f Filters) offset() int {
	return (f.Page - 1) * f.PageSize
}

func ValidateFilters(v *validator.Validator, f Filters) {
	v.Check(f.Page > 0, "page", "must be greater than zero")
	v.Check(f.Page <= 10_000_000, "page", "must be a maximum of 10 million")
	v.Check(f.PageSize > 0, "page_size", "must be greater than zero")
	v.Check(f.PageSize <= 100, "page_size", "must be a maximum of 100")

	v.Check(validator.PermittedValue(f.Sort, f.SortSafelist...), "sort", "invalid sort value")
}

func CalculatePagination(totalRecords, page, pageSize int) Pagination {
	if totalRecords == 0 {
		return Pagination{}
	}

	return Pagination{
		Page:         page,
		PageSize:     pageSize,
		TotalRecords: totalRecords,
		TotalPages:   (totalRecords + pageSize - 1) / pageSize,
	}
}
