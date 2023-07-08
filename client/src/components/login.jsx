import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
function Loginform({setAuthentication}){
   const navigate = useNavigate();
    const [email,setemail] = useState('');
    const [password,setpassword] = useState(''); 
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
    return(
        <div>
        <form onSubmit={handlesubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleemailChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit">Login</button>
        </form>
        <p>New User?</p><Link to="/signup">Sign Up</Link>
        </div>
    )
}

export default Loginform;