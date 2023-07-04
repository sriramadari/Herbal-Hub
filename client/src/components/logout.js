import React, { useEffect } from "react";
import {useNavigate} from "react-router-dom";
const Logout =()=>{
    const navigate=useNavigate();
    localStorage.removeItem('token');
    // setAuthentication(false);
    useEffect(() => {
        const handleLogout = () => {
          // Remove the token from local storage
          localStorage.removeItem('token');
    
          // Redirect to the login page or any other desired page
          navigate('/');
        };
    
        handleLogout();
      }, [navigate]);
    return null;
}
export default Logout;