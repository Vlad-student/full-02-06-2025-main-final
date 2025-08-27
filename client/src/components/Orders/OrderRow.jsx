import React from 'react';

const OrderRow = (props) => {
  const { order, setIdOrder } = props;
  const { _id, createdAt, totalSumma, status } = order;
  const handleViewDetail = () => {
    setIdOrder(_id);
  };
  return (
    <tr>
      <td>{_id}</td>
      <td>{createdAt.slice(0, 10)}</td>
      <td>{totalSumma} usd</td>
      <td>{status}</td>
      <td>
        <button onClick={handleViewDetail}>view detail</button>
      </td>
    </tr>
  );
};

export default OrderRow;
