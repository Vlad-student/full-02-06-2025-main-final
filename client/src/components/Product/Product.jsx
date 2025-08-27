import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import CONSTANTS from '../../constants';
import styles from './Product.module.scss';

const Product = (props) => {
  const { product } = props;
  const { title, price, images, description, stockQty, category } = product;
  const dispatch = useDispatch();

  const imagesGallery = images.map((img) => ({
    original: `${CONSTANTS.BASE_URL}/${CONSTANTS.UPLOAD_FOLDER}/${img}`,
    thumbnail: `${CONSTANTS.BASE_URL}/${CONSTANTS.UPLOAD_FOLDER}/${img}`,
  }));

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <article className={styles.product}>
      <div className={styles.images}>
        <ImageGallery
          items={imagesGallery}
          showPlayButton={false}
          showNav={false}
        />
      </div>
      <div className={styles.info}>
        <h2>{title}</h2>
        <p className={styles.price}>{price} uah</p>
        <p>
          <span>category: </span>
          <Link to={`/categories/${category?._id}`} className={styles.category}>{category?.name}</Link>
        </p>
        
        <p><span>description: </span>{description}</p>
        <p><span>available: </span>{stockQty}</p>
        <button onClick={handleAddToCart}>add to cart</button>
      </div>
    </article>
  );
};

export default Product;
