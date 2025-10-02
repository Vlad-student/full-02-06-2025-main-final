import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsThunk } from "../store/productsSlice";
import ProductsList from "../components/ProductsList/ProductsList";
import styles from "./Pages.module.scss";
import FiltersSideBar from "../components/Filters/FiltersSideBar";

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, error, isLoading } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getAllProductsThunk());
  }, [dispatch]);
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <FiltersSideBar />
        </aside>

        <main>
          {error && <p>{error}</p>}
          {isLoading && <p>Loadin...</p>}
          <ProductsList products={products} />
        </main>
      </div>
    </section>
  );
};

export default HomePage;
