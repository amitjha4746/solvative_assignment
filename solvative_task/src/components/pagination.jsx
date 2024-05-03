// Pagination.jsx
import React from "react";

function Pagination({ results, currentPage, totalPages, handlePageChange }) {
  if (!results.length || totalPages === 1) {
    return null; // If no results found or only one page, hide pagination box
  }

  return (
    <div className="pagination">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
