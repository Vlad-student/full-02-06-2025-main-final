import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoriesForFilterThunk,
  updateFilter,
} from "../../store/productsSlice";
import styles from "./FiltersSideBar.module.scss";
import { useNavigate } from "react-router-dom";

const FiltersSideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { filters, categoriesForFilter, isLoading } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getCategoriesForFilterThunk());
  }, [dispatch]);

  const handleFilterChange = (key, value) => {
    dispatch(updateFilter({ key, value }));
  };

  const handlePriceChange = (type, value) => {
    const key = type === "min" ? "minPrice" : "maxPrice";
    handleFilterChange(key, value);
  };

  const handleApplyFilters = () => {
    navigate("/products/filtered");
  };

  const handleResetFilters = () => {
    dispatch(updateFilter({ key: "minPrice", value: "" }));
    dispatch(updateFilter({ key: "maxPrice", value: "" }));
    dispatch(updateFilter({ key: "category", value: "" }));
    dispatch(updateFilter({ key: "availability", value: false }));
    dispatch(updateFilter({ key: "sale", value: false }));
  };

  const hasActiveFilters =
    filters.minPrice ||
    filters.maxPrice ||
    filters.category ||
    filters.availability ||
    filters.sale;

  return (
    <div className={styles.filtersSideBar}>
      {isLoading && <p>Loading...</p>}
      <div className={styles.header}>
        <h3>Filters</h3>
        <button
          className={styles.applyBtn}
          onClick={handleApplyFilters}
          disabled={!hasActiveFilters}
        >
          Apply
        </button>
        <button className={styles.resetBtn} onClick={handleResetFilters}>
          Reset
        </button>
      </div>
      {/* // Filter Price */}
      <div className={styles.filterGroup}>
        <label className={styles.label}>Price Range</label>
        <div className={styles.priceInputs}>
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => handlePriceChange("min", e.target.value)}
            className={styles.input}
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => handlePriceChange("max", e.target.value)}
            className={styles.input}
          />
        </div>
      </div>
      {/* // Filter Category */}
      <div className={styles.filterGroup}>
        <label className={styles.label}>Category</label>
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange("category", e.target.value)}
          className={styles.select}
        >
          <option value="">All Categories</option>
          {categoriesForFilter.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name} ({category.count})
            </option>
          ))}
        </select>
      </div>
      {/* // stockQty and sale */}
      <div className={styles.filterGroup}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={filters.availability}
            onChange={(e) =>
              handleFilterChange("availability", e.target.checked)
            }
            className={styles.checkbox}
          />
          In Stock Only
        </label>

        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={filters.sale}
            onChange={(e) => handleFilterChange("sale", e.target.checked)}
            className={styles.checkbox}
          />
          Sale
        </label>
      </div>
    </div>
  );
};

export default FiltersSideBar;
