import React from "react";

type PaginationProps = {
  pagination: {
    current_page: number;
    per_page: number;
    total: number;
    total_pages?: number;
    last_page?: number;
  };
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ pagination, onPageChange }) => {
  if (!pagination) return null;

  const totalPages = pagination.total_pages ?? pagination.last_page ?? 1;
  const currentPage = pagination.current_page ?? 1;
  const perPage = pagination.per_page ?? 10;
  const total = pagination.total ?? 0;

  const start = (currentPage - 1) * perPage + 1;
  const end = Math.min(currentPage * perPage, total);

  // 🔹 Generate pages with ellipsis
  const generatePages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pages;
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-full gap-3">
      
      {/* 🔹 Showing "x to y of total" */}
      <p className="text-gray-600 text-sm">
        Showing <span className="font-semibold">{start}</span> to{" "}
        <span className="font-semibold">{end}</span> of{" "}
        <span className="font-semibold">{total}</span>
      </p>

      <div className="flex items-center gap-1">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3 py-1 cursor-pointer bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        {generatePages().map((page, i) =>
          page === "..." ? (
            <span key={i} className="px-3 py-1">...</span>
          ) : (
            <button
            key={`page-${page}-${i}`}
              onClick={() => onPageChange(page as number)}
              className={`px-3 py-1 rounded cursor-pointer ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-1 cursor-pointer bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
