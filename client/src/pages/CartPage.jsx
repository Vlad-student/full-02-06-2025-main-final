import React from 'react';
import Cart from '../components/Cart/Cart';
import styles from './Pages.module.scss';

const CartPage = () => {
  return (
    <div  className={styles.wrapper}>
      <h2>Cart</h2>
      <Cart />
    </div>
  );
};

export default CartPage;
