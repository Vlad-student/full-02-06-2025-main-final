import styles from "./Pagination.module.scss";

const Pagination = ({ page, setPage, amount, setAmount, totalItems }) => {
  const handlePrevClick = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  const handleNextClick = () => {
    if (page * amount >= totalItems) return;
    setPage((prevPage) => prevPage + 1);
  };
  return (
    <div className={styles["pagination-container"]}>
      <div className={styles["page-container"]}>
        <span
          onClick={handlePrevClick}
          className={page === 1 ? styles.disabled : styles.switches}
        >
          prev
        </span>
        <span className={styles["page-count"]}>{page}</span>
        <span
          onClick={handleNextClick}
          className={
            page * amount >= totalItems ? styles.disabled : styles.switches
          }
        >
          next
        </span>
      </div>
      <div className={styles["amount-container"]}>
        <span>Amount per page</span>
        <select
          value={amount}
          onChange={(e) => {
            setAmount(Number(e.target.value));
            setPage(1);
          }}
          className={styles["amount-select"]}
        >
          <option value={2}>2</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>
    </div>
  );
};
export default Pagination;