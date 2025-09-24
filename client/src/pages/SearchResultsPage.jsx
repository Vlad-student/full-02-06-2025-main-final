import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { searchProductThunk } from "../store/productsSlice";

export default function SearchResults() {
  const [params] = useSearchParams();
  const query = params.get("q");

  const dispatch = useDispatch();
  const { results, status } = useSelector((state) => state.products);

  useEffect(() => {
    if (query) dispatch(searchProductThunk(query));
  }, [query, dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (!results.length) return <p>Products not found</p>;

  return (
    <div className="results">
      {results.map((product) => (
        <div key={product._id}>
          <img src={product.image} alt={product.title} width="100" />
          <h3>{product.title}</h3>
          <p>{product.price} $</p>
        </div>
      ))}
    </div>
  );
}
