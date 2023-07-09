import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./hompage.css";
import PersonIcon from "@mui/icons-material/Person";
import jwt_decode from "jwt-decode";
// Example data structure for featured or new arrival herbal plants

const Homepage = () => {
  const token = !!localStorage.getItem("token");
  if (token) {
    const Token = localStorage.getItem("token");
    var decodedToken = jwt_decode(Token);
    var username = decodedToken.name;
  }

  return (
    <div className="container">
      <header className="header">
        <nav className="navbar">
          <div className="logo">
            <h1>Herbal Hub</h1>
          </div>
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>

            {token ? (
              <li style={{ display: "flex", alignItems: "center" ,color:"black"}}>
                <PersonIcon />
                <span style={{ marginLeft: "3px" ,marginTop: "4px" }}>
                  Hi! {username.toUpperCase()}
                </span>
              </li>
            ) : null}
            <li>
              {token ? (
                <Link to="/logout">Logout</Link>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </li>
            <li>
              <Link to="/signup">SignUp</Link>
            </li>
          </ul>
        </nav>
      </header>

      <div className="content">
        <div className="welcome">
          <h2>
            Welcome to HERBAL HUB, your one-stop destination for all your herbal
            plant needs!
          </h2>
        </div>
        <div className="welcomepara">
          <p>
            At Herbal Hub, we believe in the power of nature to enhance our
            well-being and bring harmony to our lives. We offer a wide selection
            of premium quality herbal plants that are carefully sourced and
            nurtured to ensure their vitality and effectiveness.
          </p>
        </div>
        <div className="link">
          {" "}
          {token ? (
            <Link to="/products">Shop Now</Link>
          ) : (
            <Link to="/login">Shop Now</Link>
          )}
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
    </div>
  );
};

export default Homepage;
