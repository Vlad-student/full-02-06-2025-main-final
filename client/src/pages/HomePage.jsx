import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../components/Pagination/Pagination";
import ProductFilterList from "../components/ProductsList/ProductFilterList";
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
      <ProductsList products={products} />
      <Pagination
        page={page}
        setPage={setPage}
        amount={amount}
        setAmount={setAmount}
        totalItems={totalProducts}
      />
    </div>
  );
};

export default HomePage;
