import { cn } from '@/utils';
import { tableStyles } from '../Table.styles';
import { TablePaginationProps } from '../Table.type';

const TablePagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  showInfo = true,
}: TablePaginationProps) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push('...');
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push('...');
    }

    pages.push(totalPages);

    return pages;
  };

  const pages = getPageNumbers();

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageInfo = () => {
    if (!showInfo || !totalItems || !itemsPerPage) return null;

    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(currentPage * itemsPerPage, totalItems);

    return (
      <div className={tableStyles.pagination.info}>
        Showing {start} to {end} of {totalItems} results
      </div>
    );
  };

  return (
    <div className={tableStyles.pagination.wrapper}>
      {renderPageInfo()}

      <div className={tableStyles.pagination.controls}>
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={tableStyles.pagination.button}
        >
          Previous
        </button>

        {pages.map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className={tableStyles.pagination.ellipsis}
              >
                ...
              </span>
            );
          }

          return (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              className={cn([
                currentPage === page
                  ? tableStyles.pagination.buttonActive
                  : tableStyles.pagination.button,
              ])}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={tableStyles.pagination.button}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TablePagination;
