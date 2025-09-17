import React, { useEffect } from "react";
import ProductsList from "../components/ProductsList/ProductsList";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsOnSaleThunk } from "../store/productsSlice";

const SalePage = () => {
  const dispatch = useDispatch();
  const { saleProducts, error, isLoading } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    dispatch(getAllProductsOnSaleThunk());
  }, [dispatch]);
  return (
    <section>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      <ProductsList products={saleProducts} />
    </section>
  );
};

export default SalePage;
