import { useSelector } from "react-redux";
import styles from "./ProductFilters.module.scss";

const ProductFilterList = ({ filters, setFilters }) => {
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
    { field: "availability", label: "Є у наявності" },
    { field: "sale", label: "Товари зі знижкою" },
  ];

  return (
    <div className={styles["filtersTopPanel"]}>
      <div className={styles["filtersHeader"]}>
        <h3>Фільтри</h3>
      </div>

      <form className={styles["filtersForm"]}>
        
        <div className={styles["filterGroup"]}>
          <h4>Ціна</h4>
          <div className={styles["priceInputs"]}>
            <input
              type="number"
              placeholder="Мін"
              value={filters.minPrice}
              onChange={handlePriceChange("minPrice")}
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Макс"
              value={filters.maxPrice}
              onChange={handlePriceChange("maxPrice")}
            />
          </div>
        </div>

        
        <div className={styles["filterGroup"]}>
          <details className={styles["dropdown"]}>
            <summary>Категорія</summary>
            <div className={styles["dropdownContent"]}>
              {categories.map((category) => (
                <label key={category._id} className={styles["label"]}>
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
          </details>
        </div>
    
        <div className={styles["filterGroup"]}>
          <details className={styles["dropdown"]}>
            <summary>Інше</summary>
            <div className={styles["dropdownContent"]}>
              {otherFilters.map(({ field, label }) => (
                <label key={field} className={styles["label"]}>
                  <input
                    type="checkbox"
                    checked={filters[field] === true}
                    onChange={handleCheckboxChange(field)}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </details>
        </div>
      </form>
    </div>
  );
};

export default ProductFilterList;
