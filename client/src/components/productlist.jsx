import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";
// import jwt_decode from "jwt-decode";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import "./productlist.css";
import Listproduct from "./listproduct";
import plantsData from "./plantsdata";
function ProductLists() {
 
  const token = localStorage.getItem("token");
  // const decodedToken = jwt_decode(token);
  // const userId = decodedToken.userId;
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
 
  const handleSearch = (event) => {
    event.preventDefault(); 
    const query = searchQuery.trim().toLowerCase();

    if (query === "") {
      setSearchResults([]);
    } else {
      const filteredPlants = Object.entries(plantsData).filter(([id, plant]) =>
        plant.name.toLowerCase().includes(query)
      );
      setSearchResults(filteredPlants);
    }
  };

  return (
    <section className="container">
      <header className="header">
        <nav className="navbar">
          <div className="logo">
            <h1>Herbal Hub</h1>
          </div>
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search products"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
            <button type="submit">Search</button>
          </form>
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
      <ul className="product-list">
        {(searchQuery !== "" ? searchResults : Object.entries(plantsData)).map(
          ([id, { name, price, url }]) => (
            <Listproduct
              key={id}
            id={id}
            name={name}
            price={price}
            url={url}
            searchQuery={searchQuery}
            />
          )
        )}
      </ul>
      
    </section>
  );
}

export default ProductLists;


