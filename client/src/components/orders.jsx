import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import jwt_decode from "jwt-decode";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import "./orders.css"
function Orders() {
    const Token = localStorage.getItem('token');
  const decodedToken = jwt_decode(Token);
  const userId = decodedToken.userId;
  const [orders, setOrders] = useState([]);  

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/product/orders"
          ,{
            params: {
              ID: userId
          }
        }
        );
        setOrders(response.data.orders);
        console.log(response.data.orders);
      } catch (error) {
        console.error("Error retrieving cart data:", error.message);
      }
    };

    fetchCartData();
  }, []);
  return (
    <div>
    <header className="header">
        <nav className="navbar">
          <div className="logo">
            <h1>Herbal Hub</h1>
          </div>
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/products">
                  products
                </Link>
              </li>
            <li>
              <Link to="/products/orders">Orders</Link>
            </li>
            <li>
              <Link to="/products/cart">
                <ShoppingCartIcon />
              </Link>
            </li>
              <li>
                <Link to="/logout">
                  <LogoutIcon />
                </Link>
              </li>
          </ul>
        </nav>
      </header>
      <div className="orders-container">
      <h2>My Orders</h2>
      {orders.map((order) => (
        <div key={order._id} className="order-card">
          <h3>ProductName:{order.productname}</h3>
          <p>Quantity: {order.quantity}</p>
          <p>Price per Item: ₹{order.price}</p>
          <p>Delivery address:{order.deliveryDetails.address
},{order.deliveryDetails.city}</p>
          <p>Order ID: {order._id}</p>
          <p>Delivery by: {order.estimatedDelivery}</p>
          <p>Total Amount:₹{(order.quantity)*(order.price)}</p>
        </div>
      ))}
    </div>
     
    </div>
  );
}

export default Orders;
