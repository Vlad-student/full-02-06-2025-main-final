import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import Product from "../components/Product/Product";
import { searchProductThunk } from "../../store/productsSlice";

const ProductsSearchList = (props) => {
  const { q } = props;
  const dispatch = useDispatch();
  const { products, isLoading, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (q) {
      dispatch(searchProductThunk({ q }));
    }
  }, [dispatch, q]);

  const showProduct = (product) => (
    <Product key={product.id} product={product} />
  );
  if (isLoading) {
    return "Loading ...";
  }
  if (error) {
    return <p>{error}</p>;
  }
  return <div>{products.map(showProduct)}</div>;
};

ProductsSearchList.propTypes = {
  q: PropTypes.string,
};

export default ProductsSearchList;
