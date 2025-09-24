import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { mdiMagnify } from '@mdi/js';
import Icon from '@mdi/react';

const SearchBar = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      q: '',
    },
    onSubmit: (values) => {
      const trimQ = values.q.trim();
      navigate(`/products/search?q=${trimQ}`);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        type="search"
        name="q"
        placeholder="search products..."
        value={formik.values.q}
        onChange={formik.handleChange}
      />
      <button type="submit">
        <Icon size={0.3} path={mdiMagnify} />
      </button>
    </form>
  );
};

export default SearchBar;
