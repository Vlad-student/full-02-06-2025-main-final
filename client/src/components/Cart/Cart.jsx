import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from './CartItem';
import { clearCart } from '../../store/cartSlice';
import CartDeliveryForm from './CartDeliveryForm';
import styles from './Cart.module.scss';

const Cart = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.orders);

  const total = items?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const showItem = (item) => <CartItem key={item._id} item={item} />;
  const handleClear = () => {
    dispatch(clearCart());
  };
  return (
    <section>
      {error && <h3>{error}</h3>}
      <div>
        {items?.length === 0 && <p>empty cart</p>}
        <ul>{items?.map(showItem)}</ul>
        {items?.length > 0 && (
          <button onClick={handleClear} className={styles.clear}>
            clear cart
          </button>
        )}
      </div>
      {items?.length > 0 && <p>total: {total.toFixed(2)} uah</p>}
      {items?.length > 0 && <CartDeliveryForm items={items} />}
    </section>
  );
};

export default Cart;
