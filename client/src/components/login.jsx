import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import "./login.css";
function Loginform(){
   const navigate = useNavigate();
    const [email,setemail] = useState('');
    const [password,setpassword] = useState(''); 
    const [showPassword, setShowPassword] = useState(false);
    const [error,seterror]=useState('');

    const handleemailChange = (e) => {
        setemail(e.target.value);
      };
    
      const handlePasswordChange = (e) => {
        setpassword(e.target.value);
      };
    
      const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', {
              email,
              password
            });
            setemail('');
            setpassword('');
            seterror('');
            localStorage.setItem('token', response.data.token);
            // setAuthentication(true);
            console.log(response.data.message);
            console.log(response.data.token);// Response from the backend
            navigate('/');
            // Optionally, you can redirect the user to a different page upon successful signup
          } catch (error) {
            seterror(error.response.data.message);
          }
        }; 
        const togglePasswordVisibility = () => {
          setShowPassword(!showPassword);
        };
    return(
      <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handlesubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleemailChange}
            className="input-field"
          />
        </div>
        <div className="form-group">
        <label>Password:</label>
        <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              className="input-field"
            />
            {showPassword ? (
              <VisibilityOffIcon
                className="password-visibility-icon"
                onClick={togglePasswordVisibility}
              />
            ) : (
              <VisibilityIcon
                className="password-visibility-icon"
                onClick={togglePasswordVisibility}
              />
            )}
        </div>
        <div className="login-button-div">
        <button type="submit" className="login-button">Login</button>
        </div>
      </form>
      <div className="signup-text-link">
      <p className="signup-text">New to HerbalHub?</p>
      <Link to="/signup" className="signup-link">Create an account</Link>
      </div>
    </div>
    )
}

export default Loginform;