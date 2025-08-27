import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsThunk } from '../store/productsSlice';
import ProductsList from '../components/ProductsList/ProductsList';
import styles from './Pages.module.scss';

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, error, isLoading } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getAllProductsThunk());
  }, [dispatch]);
  return (
    <section className={styles.wrapper}>
      {error && <p>{error}</p>}
      {isLoading && <p>Loadin...</p>}
      <ProductsList products={products}/>
    </section>
  );
};

export default HomePage;
