import React from 'react';
import { Link } from 'react-router-dom';


const Orderitem = ({ order, plantsData }) => {
  const selectedProduct = Object.entries(plantsData).find(
    ([productId]) => productId === order.productId
  );

  const imageUrl = selectedProduct ? selectedProduct[1].url : '';

  return (
    <div className="order-card">
    <div className='orderinfo'>
      <img src={imageUrl} alt="product" className="order-product-image" />
      <Link to={`/products/${order.productId}`} className="order-link">
        <h3 className="productname">{order.productname}</h3>
      </Link>
      </div>
      <div className='orderinfo'>
      <p><strong>Quantity: </strong>{order.quantity}</p>
      <p><strong>Price per Item: </strong>₹{order.price}</p>
      <p>
      <strong>Delivery address: </strong>{order.deliveryDetails.address}, {order.deliveryDetails.city}
      </p>
      <p><strong>Order ID: </strong>{order._id}</p>
      <p><strong>Delivery by: </strong>{order.estimatedDelivery}</p>
      <p><strong>Total Amount:</strong> ₹{order.quantity * order.price}</p>
      </div>
    </div>
  );
};

export default Orderitem;
