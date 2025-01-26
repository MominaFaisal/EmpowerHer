import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId,orderList } = useSelector((state) => state.order);
  // const { order } = location.state;
  console.log({orderList});

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Order Placed Successfully!</h1>
      <div style={styles.orderDetails}>
        <p><strong>Order ID:</strong> {orderList._id}</p>
        <p><strong>Total Amount:</strong> ${orderList.totalAmount}</p>
        <p><strong>Order Status:</strong> {orderList.orderStatus}</p>
        <p><strong>Payment Status:</strong> {orderList.paymentStatus}</p>
        <p><strong>Order Date:</strong> {new Date(orderList.orderDate).toLocaleString()}</p>
      </div>
      {/* <button style={styles.button} onClick={() => navigate('/shop/orders')}> */}
        View All Orders
      {/* </button> */}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#fff',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  orderDetails: {
    textAlign: 'left',
    marginBottom: '20px',
  },
  button: {
    display: 'block',
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default OrderSuccess;
