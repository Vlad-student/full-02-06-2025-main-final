import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Pages.module.scss';

const CancelPage = () => {
  return (
    <section className={styles.wrapper}>
      <h2>Payment canceled</h2>
      <Link to="/">return to shop</Link>
    </section>
  );
};

export default CancelPage;
