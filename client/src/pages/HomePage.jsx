import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsThunk } from "../store/productsSlice";
import ProductsList from "../components/ProductsList/ProductsList";
import styles from "./Pages.module.scss";
import { useState } from "react";
import FiltersPanel from "../components/Filter/FilterPanel";

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, error, isLoading } = useSelector((state) => state.products);

  const [limitProducts, setLimitProducts] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);

  const [filters, setFilters] = useState({
    priceFrom: "",
    priceTo: "",
    category: "",
    inStock: true,
    inSale: false,
  });

  const limits = [4, 5, 8];
  const changeLimitProducts = (event) => {
    setLimitProducts(Number(event.target.value));
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    const queryParams = {};

    if (limitProducts) {
      queryParams.limit = limitProducts;
    }
    const skipProducts = (currentPage - 1) * limitProducts;
    if (skipProducts > 0) {
      queryParams.skip = skipProducts;
    }
    if (filters.priceFrom) {
      queryParams.minPrice = filters.priceFrom;
    }
    if (filters.priceTo) {
      queryParams.maxPrice = filters.priceTo;
    }
    if (filters.category) {
      queryParams.category = filters.category;
    }
    if (filters.inStock) {
      queryParams.availability = filters.inStock;
    }
    if (filters.inSale) {
      queryParams.sale = filters.inSale;
    }

    dispatch(getAllProductsThunk(queryParams));
  }, [dispatch, limitProducts, currentPage, filters]);

  return (
    <section className={styles.wrapper}>
      {error && <p>{error}</p>}
      {isLoading && <p>Loadin...</p>}

      <FiltersPanel
        filters={filters}
        onFilterChange={handleFilterChange}
        limits={limits}
        limitProducts={limitProducts}
        changeLimitProducts={changeLimitProducts}
      />

      <ProductsList products={products} />

      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          next
        </button>
        <span> page {currentPage} </span>
        <button onClick={handleNextPage}>next</button>
      </div>
    </section>
  );
};

export default HomePage;
