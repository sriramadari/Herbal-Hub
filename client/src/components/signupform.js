import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
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
      alert("Please fill in all the required fields.");
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
        alert("OTP sent to your email: " + response.data.message.envelope.to[0]);
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
          alert("User registered successfully");
          navigate("/login");
        } catch (error) {
          console.error("Error sending success email:", error);
        }
      }
      else{
        alert("Invalid otp");
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
        {loading?(<div className="loading">loading.....</div>):
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
  );
}

export default Signupform;
