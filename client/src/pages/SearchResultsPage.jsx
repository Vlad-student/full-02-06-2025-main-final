import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination/Pagination";
import ProductsList from "../components/ProductsList/ProductsList";
import { searchProductsThunk } from "../store/productsSlice";
import styles from "./Pages.module.scss";

const SearchResultPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [amount, setAmount] = useState(10);
  const text = searchParams.get("text") || "";
  const { products, totalProducts } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(
      searchProductsThunk({ title: text, pagination: { amount, page } })
    );
  }, [dispatch, text, amount, page]);

  return (
    <div className={styles.wrapper}>
      {products.length === 0 ? (
        <p>Products not found</p>
      ) : (
        <ProductsList products={products} />
      )}
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
export default SearchResultPage;
