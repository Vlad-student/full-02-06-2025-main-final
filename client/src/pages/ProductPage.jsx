import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneProductThunk } from '../store/productsSlice';
import Product from '../components/Product/Product';
import styles from './Pages.module.scss';

const ProductPage = () => {
  const { idProduct } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct , error, isLoading} = useSelector((state) => state.products);
  useEffect(() => {
    if (idProduct) {
      dispatch(getOneProductThunk(idProduct));
    }
  }, [dispatch, idProduct]);
  if(!selectedProduct){
    return <p>404</p>
  }
  return (
    <section className={styles.wrapper}>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <Product product={selectedProduct}/>
    </section>
  );
};

export default ProductPage;
