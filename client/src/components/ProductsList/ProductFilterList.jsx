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
    <aside>
      <form className={styles["filtersSidebar"]}>
        <div className={styles["filterGroup"]}>
          <div className={styles["header"]}>
            <h3>Filters</h3>
          </div>
          <h3>Ціна</h3>
          <label className={styles["label"]}>
            <input
              type="number"
              value={filters.minPrice}
              onChange={handlePriceChange("minPrice")}
            />
          </label>
          <label className={styles["label"]}>
            <input
              type="number"
              value={filters.maxPrice}
              onChange={handlePriceChange("maxPrice")}
            />
          </label>
        </div>

        <div className={styles["filterGroup"]}>
          <h3>Категорія</h3>
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

        <div className={styles["filterGroup"]}>
          <h3>Інше</h3>
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
      </form>
    </aside>
  );
};

export default  ProductFilterList;
