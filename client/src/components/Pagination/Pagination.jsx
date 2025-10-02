import React from "react";
import CONSTANTS from "../../constants";

const Pagination = (props) => {
  const { page, setPage, total, amount, setAmount } = props;

  const handlePrev = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };
  const handleNext = () => {
    if (page < total / amount) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  const showOption = (option) => (
    <option key={option} value={option}>
      {option}
    </option>
  );

  const handleChange = (event) => {
    setAmount(event.target.value);
    setPage(1);
  };

  return (
    <div>
      <span onClick={handlePrev}>prev</span>
      <span>{page}</span>
      <span onClick={handleNext}>next</span>

      <select value={amount} onChange={handleChange}>
        {CONSTANTS.ORDER_AMOUNT.map(showOption)}
      </select>
    </div>
  );
};

export default Pagination;
