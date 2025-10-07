import React, { useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@mdi/react";
import { mdiPurseOutline } from "@mdi/js";
import { getAllCategoriesThunk } from "../../store/categoriesSlice";
import { logoutUserThunk } from "../../store/authSlice";
import styles from "./Header.module.scss";
import { resetOrders } from "../../store/ordersSlice";
import SalePage from "../../pages/SalePage";
import SearchBar from "../SearchBar/SearchBar";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.categories);
  const { items } = useSelector((state) => state.cart);

  const total = items?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  useEffect(() => {
    if (categories?.length === 0) {
      dispatch(getAllCategoriesThunk());
    }
  }, [dispatch, categories?.length]);
  const showCategory = (category) => (
    <li key={category._id}>
      <NavLink to={`/categories/${category._id}`}>{category.name}</NavLink>
    </li>
  );

  const logout = () => {
    dispatch(resetOrders());
    dispatch(logoutUserThunk());
  };
  return (
    <header>
      <div className={styles.wrapper}>
        <div className={styles["top-header"]}>
          {user ? (
            <>
              <NavLink
                to="/account"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Hi, {user?.name}
              </NavLink>
              {user?.role === "admin" && (
                <NavLink
                  to="/admin-panel"
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  Admin Panel
                </NavLink>
              )}
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Sign in
              </NavLink>{" "}
              |{" "}
              <NavLink
                to="/register"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Sign up
              </NavLink>
            </>
          )}
        </div>
        <div className={styles["middle-header"]}>
          <NavLink className={styles.logo} to="/">
            <img src="/logo.png" alt="" />
          </NavLink>
          <NavLink to="/cart" className={styles.cart}>
            <span className={styles.badge}>{items.length}</span>
            <Icon path={mdiPurseOutline} size={2} />
            <div className={styles["cart-info"]}>
              <div>Shopping cart: </div>
              <div className={styles.price}>{total.toFixed(2)} usd</div>
            </div>
          </NavLink>
        </div>
        <nav>
          <ul className={styles["main-menu"]}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Home
              </NavLink>
            </li>
            {categories?.map(showCategory)}
            <li>
              <NavLink to="/products/sale"> Sale </NavLink>
            </li>
            <li>
              <SearchBar />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
