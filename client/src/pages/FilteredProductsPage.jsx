import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredProductsThunk } from "../store/productsSlice";
import styles from "./FilterPage.module.scss";
import FiltersSideBar from "../components/Filters/FiltersSideBar";
import ProductsList from "../components/ProductsList/ProductsList";

const FilteredProductsPage = () => {
  const dispatch = useDispatch();
  const { filteredProducts, filters, error, isLoading } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getFilteredProductsThunk(filters));
  }, [dispatch, filters]);

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <FiltersSideBar />
        </aside>

        <main className={styles.main}>
          <div className={styles.header}>
            <h1>Products</h1>
            {error && <p>{error}</p>}
            {isLoading && <p>Loadin...</p>}

            <ProductsList products={filteredProducts} />
          </div>
        </main>
      </div>
    </section>
  );
};

export default FilteredProductsPage;
