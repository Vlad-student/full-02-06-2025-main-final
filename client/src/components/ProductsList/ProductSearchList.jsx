import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchProductThunk } from "../../store/searchSlice";
import ProductsList from "./ProductsList";
import { useSearchParams } from "react-router-dom";
import ProductItem from "./ProductItem";

const ProductSearchList = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const dispatch = useDispatch();
  const { products, isLoading, error, searchQuery } = useSelector(
    (state) => state.search
  );

  useEffect(() => {
    dispatch(searchProductThunk(query));
  }, [dispatch, query]);

  if (!searchQuery) {
    return <div>Введіть запит для пошуку</div>;
  }

  return (
    <div>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      <ProductItem key={products._id} product={products} />
    </div>
  );
};

export default ProductSearchList;
