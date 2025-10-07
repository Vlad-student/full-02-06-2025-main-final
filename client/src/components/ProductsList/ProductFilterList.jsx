import { useSelector } from "react-redux";
import styles from "./ProductFilters.module.scss";
import {  useNavigate } from "react-router-dom";

const ProductsFilterList = ({ filters, setFilters }) => {
    const navigate = useNavigate();
  const { categories } = useSelector((state) => state.categories);

  const handlePriceChange = (field) => (e) =>
    setFilters((prev) => ({ ...prev, [field]: e.target.value }));

  const handleCategoryChange = (id) => (e) =>
    setFilters((prev) => {
      const newCategories = e.target.checked
        ? [...prev.category, id]
        : prev.category.filter((catId) => catId !== id);
      return { ...prev, category: newCategories };
    });

  const handleCheckboxChange = (field) => (e) =>
    setFilters((prev) => ({
      ...prev,
      [field]: e.target.checked ? true : "",
    }));

  const otherFilters = [
    { field: "availability", label: "availably" },
    { field: "sale", label: "non available" },
  ];

  const handleApplyFilters = () => {
    navigate("/products/filtered");
  };

  return (
    <aside>
      <form className={styles["filtersSidebar"]}>
        <div>
             <button
          className={styles.applyBtn}
          onClick={handleApplyFilters}
        >
          Apply
        </button>
        <button className={styles.resetBtn}>
          Reset
        </button>
          <h3>Price</h3>
          <label>
            <input
              type="number"
              value={filters.minPrice}
              onChange={handlePriceChange("minPrice")}
            />
          </label>
          <label>
            <input
              type="number"
              value={filters.maxPrice}
              onChange={handlePriceChange("maxPrice")}
            />
          </label>
        </div>

        <div>
          <h3>Category</h3>
          {categories.map((category) => (
            <label key={category._id} className={styles["filters-label"]}>
              <input
                type="checkbox"
                value={category._id}
                checked={filters.category.includes(category._id)}
                onChange={handleCategoryChange(category._id)}
              />
              <span>{category.name}</span>
            </label>
          ))}
        </div>

        <div>
          <h3>In stock and Sale</h3>
          {otherFilters.map(({ field, label }) => (
            <label key={field}>
              <input
                type="checkbox"
                checked={filters[field] === true}
                onChange={handleCheckboxChange(field)}
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </form>
    </aside>
  );
};

export default ProductsFilterList;
