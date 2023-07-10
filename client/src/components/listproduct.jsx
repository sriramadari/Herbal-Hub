import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import plantsData from "./plantsdata";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "./productlist.css";
const Listproduct = ({ id, name, price, url }) => {
    const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem("token");
  const decodedToken = jwt_decode(token);
  const userId = decodedToken.userId;
  const [count, setCount] = useState(0);

  const incQuantity = () => {
    setCount(count + 1);
  };

  const decQuantity = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
    const addToCart = (id) => {
      if (count === 0) {
        alert("Please select at least one product.");
        return;
      }
        const selectedProduct = Object.entries(plantsData).find(
          ([productId]) => productId === id
        );
    
        if (selectedProduct) {
          const newCartItem = {
            id: selectedProduct[1].id,
            name: selectedProduct[1].name,
            price: selectedProduct[1].price,
            quantity: count,
          };
    
          const existingCartItem = cartItems.find(
            (item) => item.id === newCartItem.id
          );
    
          if (existingCartItem) {
            existingCartItem.quantity += count;
            setCartItems([...cartItems]);
          } else {
            setCartItems([...cartItems, newCartItem]);
          }
    
          axios
            .post("http://localhost:5000/products/cart", {
              cartItems: [newCartItem],
              userId: userId,
            })
            .then((response) => {
              console.log(response.data.message);
              alert(response.data.message);
            })
            .catch((error) => {
              console.error("Error adding cart items:", error.message);
            });
        }
      };
    
      useEffect(() => {
        console.log(cartItems);
      }, [cartItems]);
 
  
  return (
    <li className="product-card">
      <img className="plant-img" src={url} alt="plant" />
      <Link className="plink" to={`/products/${id}`}>
        <h3>{name}</h3>
      </Link>
      <p className="price">Price: ₹{price}</p>
      <div className="quantity-control">
        <button onClick={() => addToCart(id)}>Add to Cart</button>
        <button onClick={decQuantity}>-</button>
        <span className="count">{count}</span>
        <button onClick={incQuantity}>+</button>
        
      </div>
    </li>
  );
};

export default Listproduct;
