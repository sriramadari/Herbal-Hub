import React, { useState } from "react";
import { useParams ,Link,useNavigate} from "react-router-dom";
import plantsData from "./plantsdata";
import jwt_decode from "jwt-decode";
import axios from "axios";
import "./product.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import "./hompage.css"
function Product() {
  const { id } = useParams();
  const navigate=useNavigate();
  const product = plantsData[id];
  const token = localStorage.getItem("token");
  const decodedToken = jwt_decode(token);
  const userId = decodedToken.userId;
  const [quantity, setQuantity] = useState(1);
  const [deliveryDetails, setDeliveryDetails] = useState({
    name:"",
    address: "",
    city: "",
    state: "", // Initialize with empty string
    postalCode: "",
    phonenumber:"",
    emailid:"",
  });

  const { name, url, description ,price} = product;

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  const handleDeliveryDetailsChange = (e) => {
    setDeliveryDetails({
      ...deliveryDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleBuyProduct = () => {
   
    axios.post("http://localhost:5000/orders", 
   { productid:id,
    productname:name,
    quantity:quantity
    ,deliveryDetails: deliveryDetails,
    userId: userId,
    price:price,
  })
      .then(response => {
        // Handle the response from the server, e.g., show a success message
        console.log("Order placed successfully:", response.data);
        alert("Order placed successfully!");
        navigate("/products")
      })
      .catch(error => {
        // Handle errors, e.g., display an error message
        console.error("Error placing order:", error);
        alert("Error placing order. Please try again.");
      });
  };

  if (!product) {
    return <span>The product you've requested doesn't exist.</span>;
  }
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
              <Link to="/products/orders">Orders</Link>
            </li>
            <li>
              <Link to="/products/cart">
                <ShoppingCartIcon />
              </Link>
            </li>
            {token ? (
              <li>
                <Link to="/logout">
                  <LogoutIcon />
                </Link>
              </li>
            ) : (
              <li>
                <Link to="/login">SignUp/Login</Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <div className="product-container">
      <div className="product-details-card">
      <img src={url} alt="plant" className="product-image" />
      <h3 className="product-name">{name}</h3>
      <p className="product-description">{description}</p>
      <p className="product-price">₹{price}</p>
    </div>
    
        <div className="delivery-details">
        <div className="input-container">
            <label htmlFor="name" className="label">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={deliveryDetails.name||" "}
              onChange={handleDeliveryDetailsChange}
              className="input"
            />
          </div>
          <div className="input-container">
            <label htmlFor="quantity" className="label">
              Quantity:
            </label>
            <input
  type="number"
  id="quantity"
  value={quantity || ""}
  onChange={handleQuantityChange}
  className="input"
/>
          </div>
    
          <div className="input-container">
            <label htmlFor="address" className="label">
              Address:
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={deliveryDetails.address||" "}
              onChange={handleDeliveryDetailsChange}
              className="input"
            />
          </div>
    
          <div className="input-container">
            <label htmlFor="city" className="label">
              City:
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={deliveryDetails.city||" "}
              onChange={handleDeliveryDetailsChange}
              className="input"
            />
          </div>
    
          <div className="input-container">
            <label htmlFor="state" className="label">
              State:
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={deliveryDetails.state||" "}
              onChange={handleDeliveryDetailsChange}
              className="input"
            />
          </div>
          <div className="input-container">
            <label htmlFor="postalCode" className="label">
              Postal Code:
            </label>
            <input
              type="number"
              id="postalCode"
              name="postalCode"
              value={deliveryDetails.postalCode||"" }
              onChange={handleDeliveryDetailsChange}
              className="input"
            />
          </div>
          <div className="input-container">
            <label htmlFor="phonenumber" className="label">
              Phonenumber:
            </label>
            <input
              type="number"
              id="phonenumber"
              name="phonenumber"
              value={deliveryDetails.phonenumber||"" }
              onChange={handleDeliveryDetailsChange}
              className="input"
            />
          </div>
          <div className="input-container">
            <label htmlFor="emailid" className="label">
              Email:
            </label>
            <input
              type="email"
              id="emailid"
              name="emailid"
              value={deliveryDetails.emailid||"" }
              onChange={handleDeliveryDetailsChange}
              className="input"
            />
          </div>
    
          <button onClick={handleBuyProduct} className="checkoutbutton">
            Place order
          </button>
        </div>
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

export default Product;
