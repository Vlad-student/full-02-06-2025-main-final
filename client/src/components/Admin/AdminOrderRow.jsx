import React from 'react';
import AdminOrderForm from './AdminOrderForm';

const AdminOrderRow = (props) => {
  const { order } = props;
  const {
    user,
    products,
    shippingPhone,
    shippingMethod,
    shippingAddress,
    shippingPrice,
    totalSumma,
    status,
  } = order;
  const showProduct = (product) => (
    <tr key={product?.productId._id}>
      <td>{product?.productId?.title}</td>
      <td>{product?.productPrice}</td>
      <td>{product.quantity}</td>
    </tr>
  );
  return (
    <tr>
      <td>{user?.email}</td>
      <td>{shippingPhone}</td>
      <td>{shippingMethod}</td>
      <td>{shippingAddress}</td>
      <td>{shippingPrice.toFixed(2)}</td>
      <td>
        <table>
          <tbody>{products?.map(showProduct)}</tbody>
        </table>
      </td>
      <td>{totalSumma.toFixed(2)}</td>
      <td>{status}</td>
      <td>
        <AdminOrderForm order={order} />
      </td>
    </tr>
  );
};

export default AdminOrderRow;
