import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './Cart.module.scss';
import {
  removeFromCart,
  decrementQuantity,
  incrementQuantity,
} from '../../store/cartSlice';

const CartItem = (props) => {
  const { item } = props;
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeFromCart(item._id));
  };
  const handleDecrement = () => {
    dispatch(decrementQuantity(item._id));
  };
  const handleIncrement = () => {
    dispatch(incrementQuantity(item._id));
  };
  return (
    <li className={styles['cart-item']}>
      <h3>{item.title}</h3>
      <p>{item.price} uah</p>
      <p>
        <button onClick={handleDecrement}>-</button>
        <span>{item.quantity}</span>
        <button onClick={handleIncrement}>+</button>
      </p>
      <p>{(item.price * item.quantity).toFixed(2)} uah</p>
      <button onClick={handleDelete}>x</button>
    </li>
  );
};

export default CartItem;
