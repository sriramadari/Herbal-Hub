import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import jwt_decode from "jwt-decode";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
function CartPage() {
    const Token = localStorage.getItem('token');
  const decodedToken = jwt_decode(Token);
  const userId = decodedToken.userId;
  console.log(userId);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/products/cart"
          ,{
            params: {
              ID: userId
          }
        }
        );
        setCartItems(response.data.cartItems);
        console.log(response.data.cartItems);
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
              <Link to="/orders">Orders</Link>
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
      {cartItems.map((cartItem) => (
        <div className="product-card cart" key={cartItem._id}>
          <h3 className="plink">{cartItem.name}</h3>
          <p className="price">Price: ₹{cartItem.price}</p>
          <p className="plink">quantity:{cartItem.quantity}</p>
        </div>
      ))}
    </div>
  );
}

export default CartPage;
