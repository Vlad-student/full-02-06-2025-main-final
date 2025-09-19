import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminStatsThunk } from "../../store/authSlice";
import styles from "./Admin.module.scss";

const AdminStatsPage = () => {
  const dispatch = useDispatch();
  const { stats, isLoading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAdminStatsThunk());
  }, [dispatch]);

  if (error) {
    return <p>Error</p>;
  }

  if (isLoading) {
    return <p>loading...</p>;
  }
  return (
    <div className={styles.statsTable}>
      <h2>Detailed Statistics</h2>
      <table>
        <thead>
          <tr>
            <th>Metric</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Users</td>
            <td>{stats.users}</td>
          </tr>
          <tr>
            <td>Orders</td>
            <td>{stats.orders}</td>
          </tr>
          <tr>
            <td>Products</td>
            <td>{stats.products}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AdminStatsPage;
