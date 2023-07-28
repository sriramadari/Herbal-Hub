import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link,useNavigate} from "react-router-dom";
import jwt_decode from "jwt-decode";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import CartItem from "./cartitem";
function CartPage() {
    const Token = localStorage.getItem('token');
  const decodedToken = jwt_decode(Token);
  const userId = decodedToken.userId;
  console.log(userId);
  const [cartItems, setCartItems] = useState([]);
const [x,setx]=useState(false);
  
const navigate = useNavigate();

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
  }, [x]);


  const updateSubtotal = () => {
    // setCartItems([...cartItems]);
    // fetchCartData();
    setx(!x);
  };
  const handlecheckout=()=>{
    navigate('/products/checkout');
  }
  
  const calculateSubtotal = () => {
    let subtotal = 0;
    cartItems.forEach((cartItem) => {
      subtotal += cartItem.price * cartItem.quantity;
    });
    return subtotal;
  };

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
      <div className="cartpage-container">
        <div  className ="cartitems-container">
          <div className="cartitems">
          {cartItems.length > 0 ? (
              cartItems.map((cartItem) => (
                <CartItem key={cartItem._id} cartItem={cartItem} updateSubtotal={updateSubtotal} />
              ))
            ) : (
              <p>No items in the cart</p>
            )}
          </div>
        </div>
        <div className="subtotal-container">
          <div className="subtotal">
            Subtotal: ₹{calculateSubtotal()} {/* Display the subtotal price */}
          </div>
          <div className="subtotal">
            <button onClick={handlecheckout}>Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
