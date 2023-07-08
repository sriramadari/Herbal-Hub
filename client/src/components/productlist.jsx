import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
function ProductLists({ plants }) {
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem("token");
  const decodedToken = jwt_decode(token);
  const userId = decodedToken.userId;
  const [count,setcount]=useState(0);
  const incquantity=()=>{
    setcount(count+1);
  }
  const decquantity=()=>{
    setcount(count-1);
  }
  const addToCart = (id) => {
    const selectedProduct = Object.entries(plants).find(
      ([productId]) => productId === id
    );

    if (selectedProduct) {
      const newCartItem = {
        id: selectedProduct[1].id,
        name: selectedProduct[1].name,
        price: selectedProduct[1].price,
        quantity: 1,
      };
      console.log(selectedProduct);
      console.log(userId);
      const existingCartItem = cartItems.find(
        (item) => item.id === newCartItem.id
      );

      if (existingCartItem) {
        // Update the quantity of the existing cart item
        existingCartItem.quantity += 1;
        setCartItems([...cartItems]); // Trigger re-render
      } else {
        setCartItems([...cartItems, newCartItem]); // Add the new cart item
      }
      axios
        .post("http://localhost:5000/products/cart", {
          cartItems: [newCartItem],
          userId: userId,
        })
        .then((response) => {
          console.log(response.data.message);
        })
        .catch((error) => {
          console.error("Error adding cart items:", error.message);
        });
      // Make a POST request to add cart items
    }
  };
  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  return (
    <section>
      <header>
        <nav>
          <ul className="App-header">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              {token ? (
                <Link to="/logout">Logout</Link>
              ) : (
                <Link to="/login">SignUp/Login</Link>
              )}
            </li>
            <li>
              <Link to="/products/cart">Cart</Link>
            </li>
            <li>
              <Link to="/orders">Orders</Link>
            </li>
          </ul>
        </nav>
      </header>
      <ul>
        {Object.entries(plants).map(([id, { name, price }]) => (
          <li key={id}>
            <Link to={`/products/${id}`}>
              <h3>{name}</h3>
            </Link>
            <p>Price: ${price}</p>
            <button onClick={() => addToCart(id)}>Add to Cart</button>
            <button onClick={incquantity}>+</button>{count}<button onClick={decquantity}>-</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ProductLists;
