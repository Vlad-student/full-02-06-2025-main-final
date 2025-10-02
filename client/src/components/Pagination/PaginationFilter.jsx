import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredProductsThunk, setPage } from "../../store/productsSlice";
import styles from "./PaginationFilterBar.module.scss";

const PaginationFilter = () => {
  const dispatch = useDispatch();
  const { pagination, filters, isLoading } = useSelector(
    (state) => state.products
  );

  const safePagination = pagination || {
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
    handleNext: false,
    handlePrev: false,
    limit: 12,
  };

  if (safePagination.totalPages <= 1) {
    return null;
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= safePagination.totalPages && !isLoading) {
      dispatch(setPage(newPage));
      dispatch(getFilteredProductsThunk({ ...filters, page: newPage }));
    }
  };
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 4;

    let startPage = Math.max(
      1,
      safePagination.currentPage - Math.floor(maxVisiblePages / 2)
    );
    let endPage = Math.min(
      safePagination.totalPages,
      startPage + maxVisiblePages - 1
    );

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`${styles.pageBtn} ${
            safePagination.currentPage === i ? styles.active : ""
          }`}
          onClick={() => handlePageChange(i)}
          disabled={isLoading}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.pageBtn}
        disabled={!safePagination.handlePrev || isLoading}
        onClick={() => handlePageChange(safePagination.currentPage - 1)}
      >
        Previous
      </button>

      {safePagination.currentPage > 3 && (
        <>
          <button
            className={styles.pageBtn}
            onClick={() => handlePageChange(1)}
            disabled={isLoading}
          >
            1
          </button>
          {safePagination.currentPage > 4 && (
            <span className={styles.ellipsis}>...</span>
          )}
        </>
      )}

      {renderPageNumbers()}

      {safePagination.currentPage < safePagination.totalPages - 2 && (
        <>
          {safePagination.currentPage < safePagination.totalPages - 3 && (
            <span className={styles.ellipsis}>...</span>
          )}
          <button
            className={styles.pageBtn}
            onClick={() => handlePageChange(safePagination.totalPages)}
            disabled={isLoading}
          >
            {pagination.totalPages}
          </button>
        </>
      )}

      <button
        className={styles.pageBtn}
        disabled={!safePagination.handleNext || isLoading}
        onClick={() => handlePageChange(safePagination.currentPage + 1)}
      >
        Next
      </button>

      <div className={styles.paginationInfo}>
        Page {safePagination.currentPage} of {safePagination.totalPages}
        <span> ({safePagination.totalProducts} products total)</span>
      </div>
    </div>
  );
};

export default PaginationFilter;
