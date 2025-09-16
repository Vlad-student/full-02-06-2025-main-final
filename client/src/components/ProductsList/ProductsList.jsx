import React from "react";
import ProductItem from "./ProductItem";
import styles from "./ProductsList.module.scss";

const ProductsList = (props) => {
  const { products, limit } = props;

  if (!products || !Array.isArray(products) || products.length === 0) {
    return <p> Products not found </p>;
  }
  return (
    <section className={styles.products}>
      {products.slice(0, limit).map((product) => (
        <ProductItem key={product._id} product={product} />
      ))}
    </section>
  );
};

export default ProductsList;
