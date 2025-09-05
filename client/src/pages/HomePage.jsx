import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsThunk } from "../store/productsSlice";
import ProductsList from "../components/ProductsList/ProductsList";
import styles from "./Pages.module.scss";
import PropTypes from "prop-types";
import { useState } from "react";

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, error, isLoading } = useSelector((state) => state.products);

  const [limitProducts, setLimitProducts] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);

  const limits = [4, 5, 8];
  const showOption = (limit) => <option key={limit}>{limit}</option>;

  const changeLimitProducts = (event) => {
    setLimitProducts(Number(event.target.value));
    setCurrentPage(1);
  };

  useEffect(() => {
    const skipProducts = (currentPage - 1) * limitProducts;
    dispatch(getAllProductsThunk({ limit: limitProducts, skip: skipProducts }));
  }, [dispatch, limitProducts, currentPage]);

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <section className={styles.wrapper}>
      {error && <p>{error}</p>}
      {isLoading && <p>Loadin...</p>}
      <div>
        <select
          name="limitProducts"
          value={limitProducts}
          onChange={changeLimitProducts}
        >
          {limits.map(showOption)};
        </select>
      </div>
      <ProductsList products={products} />

      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          next
        </button>
        <span> page {currentPage} </span>
        {/* <button onClick={handleNextPage}>next</button> */}
      </div>
    </section>
  );
};

export default HomePage;
