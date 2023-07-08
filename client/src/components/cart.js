import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

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
      <h2>Cart</h2>
      {cartItems.map((cartItem) => (
        <div key={cartItem._id}>
          <h3>{cartItem.name}</h3>
          <p>Price: ₹{cartItem.price}</p>
          <p>quantity:{cartItem.quantity}</p>
        </div>
      ))}
    </div>
  );
}

export default CartPage;
