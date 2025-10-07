import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../components/Pagination/Pagination";
import ProductsFilterList from '../components/ProductsList/ProductFilterList'
import ProductsList from "../components/ProductsList/ProductsList";
import { getAllProductsThunk } from "../store/productsSlice";
import styles from "./Pages.module.scss";

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, totalProducts } = useSelector((state) => state.products);

  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    category: [],
    availability: "",
    sale: "",
  });

  const [page, setPage] = useState(1);
  const [amount, setAmount] = useState(10);

  useEffect(() => {
    dispatch(getAllProductsThunk({ filters, pagination: { amount, page } }));
  }, [amount, dispatch, filters, page]);

  return (
    <div className={styles.wrapper}>
      <div className={styles["products-container"]}>
        <aside className={styles["products-filters"]}>
          <ProductsFilterList filters={filters} setFilters={setFilters} />
        </aside>
        <div className={styles["products-content"]}>
          {totalProducts === 0 ? (
            <p> Products not found</p>
          ) : (
            <>
              <ProductsList products={products} />
              <Pagination
                page={page}
                setPage={setPage}
                amount={amount}
                setAmount={setAmount}
                totalItems={totalProducts}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;