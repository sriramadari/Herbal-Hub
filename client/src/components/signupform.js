import React, { useState } from "react";
import {Link,useNavigate} from "react-router-dom";
import axios from "axios";
function Signupform(){
   const navigate=useNavigate();
    const [username,setUsername]=useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const handleUsernameChange = (e) => {
      setUsername(e.target.value);
    };
  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:5000/signup', {
          username,
          email,
          password,
        });
  
        console.log(response.data); // Response from the backend
        if(response){navigate('/login');}
      } catch (error) {
        setError(error.response.data.message);
      }
    };  
    return (
        <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit">Sign Up</button>
      </form>
     <p>Already user</p> <Link to="/login">Login</Link>
    </div>
    );
}

export default Signupform;