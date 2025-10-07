import { mdiMagnify } from "@mdi/js";
import Icon from "@mdi/react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import styles from "./SearchBar.module.scss";

const Search = () => {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    navigate(`/search?text=${values.query}`);
  };

  return (
    <Formik initialValues={{ query: "" }} onSubmit={handleSubmit}>
      {() => (
        <Form className={styles["search-form"]}>
          <label className={styles["search-label"]}>
            <Field
              name="query"
              type="text"
              placeholder="Search products"
              className={styles["search-input"]}
            />
            <button type="submit" className={styles["search-button"]}>
              <Icon
                path={mdiMagnify}
                size={1}
                className={styles["search-icon"]}
              />
            </button>
          </label>
        </Form>
      )}
    </Formik>
  );
};

export default Search;
