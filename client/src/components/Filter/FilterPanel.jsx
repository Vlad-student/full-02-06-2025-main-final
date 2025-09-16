import React from "react";
import PropTypes from "prop-types";

const FiltersPanel = ({
  filters,
  onFilterChange,
  limits,
  limitProducts,
  changeLimitProducts,
}) => {
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    onFilterChange({
      ...filters,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const categories = ["Laptops", "Phones", "Healthy food"];

  return (
    <div>
      <h3>Фільтри</h3>

      {/* Фільтр за ціною */}
      <div>
        <h4>Ціна</h4>
        <input
          type="number"
          name="priceFrom"
          placeholder="Від"
          value={filters.priceFrom}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="priceTo"
          placeholder="До"
          value={filters.priceTo}
          onChange={handleInputChange}
        />
      </div>

      {/* Фільтр за категорією */}
      <div>
        <h4>Категорія</h4>
        <select
          name="category"
          value={filters.category}
          onChange={handleInputChange}
        >
          <option value="">Усі категорії</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Перемикач "В наявності" */}
      <div>
        <label>
          <input
            type="checkbox"
            name="inStock"
            checked={filters.inStock}
            onChange={handleInputChange}
          />
          Лише в наявності
        </label>
      </div>

      {/* Перемикач "Зі знижкою" */}
      <div>
        <label>
          <input
            type="checkbox"
            name="inSale"
            checked={filters.inSale}
            onChange={handleInputChange}
          />
          Лише зі знижкою
        </label>
      </div>

      <div>
        <label htmlFor="limit-select">Кількість на сторінці:</label>
        <select
          id="limit-select"
          name="limitProducts"
          value={limitProducts}
          onChange={changeLimitProducts}
        >
          {limits.map((limit) => (
            <option key={limit}>{limit}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

FiltersPanel.propTypes = {
  filters: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  limits: PropTypes.array.isRequired,
  limitProducts: PropTypes.number.isRequired,
  changeLimitProducts: PropTypes.func.isRequired,
};

export default FiltersPanel;
