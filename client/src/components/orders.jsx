import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import jwt_decode from "jwt-decode";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import "./orders.css"
import "./hompage.css"
import plantsData from "./plantsdata";
import Orderitem from "./orderitem";
function Orders() {
 
    const Token = localStorage.getItem('token');
  const decodedToken = jwt_decode(Token);
  const userId = decodedToken.userId;
  const [orders, setOrders] = useState([]);  

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get(
          "https://herbalhub-snyx.onrender.com/product/orders"
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
    <>
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
        <Orderitem key={order._id} order={order} plantsData={plantsData} />
      ))}
    </div>
    <footer>
      <ul className="nav-links">
        <li>
          <Link to="/about">About Us</Link>
        </li>
        <li>
          <Link to="/contact">Contact Us</Link>
        </li>
        <li>
        © 2023 Herbal Hub, Inc.
        </li>
        
        </ul>
      </footer>
    </>
  );
}

export default Orders;
