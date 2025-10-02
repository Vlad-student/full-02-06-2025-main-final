import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ProductSearchList from "../components/ProductsList/ProductSearchList";
import { searchProductThunk, setSearchQuery } from "../store/searchSlice";

const SearchResultsPage = () => {
  const dispatch = useDispatch();
  const { searchQuery } = useSelector((state) => state.search);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  useEffect(() => {
    if (query && query !== searchQuery) {
      dispatch(setSearchQuery(query));
      dispatch(searchProductThunk(query));
    }
  }, [dispatch, query, searchQuery]);

  return (
    <div>
      <section>
        <ProductSearchList />
      </section>
    </div>
  );
};

export default SearchResultsPage;
