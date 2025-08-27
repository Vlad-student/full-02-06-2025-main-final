import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiSale, mdiPurseOutline } from '@mdi/js';
import styles from './ProductsList.module.scss';
import CONSTANTS from '../../constants';
import { addToCart } from '../../store/cartSlice';

const ProductItem = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product } = props;
  const { title, price, stockQty, isSale, images, category } = product;
  const handleAddToCart = (event) => {
    event.stopPropagation();
    dispatch(addToCart(product));
  };
  const navigateProduct = () =>{navigate(`/products/${product._id}`)}
  return (
    <article className={styles.product} onClick={navigateProduct}>
      {isSale && <Icon path={mdiSale} size={2}  className={styles.sale}/>}
      <div className={styles.pic}>
        <img
          src={`${CONSTANTS.BASE_URL}/${CONSTANTS.UPLOAD_FOLDER}/${images[0]}`}
          alt={title}
        />
      </div>
      <h3>{title}</h3>
      <p>{price} uah</p>
      <p className={styles.category}>{category?.name}</p>
      <p>{stockQty > 0 ? 'Available' : 'Not Available'}</p>
      <Icon className={styles.cart} path={mdiPurseOutline} size={1} onClick={handleAddToCart} />
    </article>
  );
};

export default ProductItem;
