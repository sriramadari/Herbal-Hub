import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import "./signup.css";




function Signupform() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [otp,setotp]=useState("");
  const [loading,setloading]=useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpresponse, setotpresponse] = useState(false);
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
const handleOtpChange=(e)=>{
  setotp(e.target.value);
}
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleOtp = async (e) => {
    e.preventDefault();
    if (!username || !email || !phoneNumber || !password) {
      alert("Please enter all fields");
      return;
    }
    setloading(true);
    try {
      const response = await axios.post("http://localhost:5000/otprequest", {
        email
      });
      console.log(response);
      if (response.status===201) {
        console.log(response.data.message.envelope);
        alert("OTP sent to your email: "+response.data.message.envelope.to[0])
        setotpresponse(true);
      } 
      else {
        console.log(response);
        alert("Someone already has that email.Try another?");
        setEmail("");
      }
      setloading(false);
    } catch (error) {
      console.error('Error during OTP request:', error);
      setError(error.response.data.message);
    }
  };
  

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/verify-otp", {
        username,
        email,
        password,
        phoneNumber,
        otp
      });

      console.log(response); // Response from the backend
      if (response.status===201) {
        try {
          await axios.post("http://localhost:5000/success", {
            email,
            username,
          });
          alert("User Registered Successfully");
          navigate("/login");
        } catch (error) {
          console.error("Error sending success email:", error);
        }
      }
      else{
        alert("Invalid otp! try again");
        setotpresponse(false);
      }
    } catch (error) {
      setError(error.response);
    }
  };
  const handlePhoneNumberChange = async (e) => {
    setPhoneNumber(e.target.value);
  };
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
              
                <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">SignUp</Link>
            </li>
          </ul>
        </nav>
      </header>

    <div className="signup-container">
      <h2>Create Account</h2>
      <form>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            className="input-field"
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="input-field"
            required
          />
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            className="input-field"
            required
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="input-field"
            required
          />
        </div>
        {!otpresponse?<div className="signup-button-div">
        {loading?(<CircularProgress color="success" />):
        <button onClick={handleOtp} className="signup-button">
            Request OTP
          </button>}
          </div>:(<div className="form-group">
          <label>OTP:</label>
          <input
            type="text"
            value={otp}
            onChange={handleOtpChange}
            className="input-field"
            required
          />
          <div className="signup-button-div">
          <button onClick={handleSubmit} className="signup-button">
            verify-otp
          </button>
        </div>
        </div>)}
        
      </form>
      <div className="signup-text-link">
        <p className="signup-text">Existing user?</p>
        <Link to="/login" className="signup-link">
          Log in
        </Link>{" "}
        {/*copied from signup-form */}
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

export default Signupform;

