import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';

const RequireAuth = (WrappedComponent) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Perform a check to see if the user is authenticated
    // You can use your preferred method for user authentication here (e.g., JWT, session, etc.)

    // Example: Check if the user is authenticated based on a token stored in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      navigate('/login'); // Redirect to login page if not authenticated
    }
  }, [navigate]);

  return isAuthenticated ? <WrappedComponent /> : null;
};

export default RequireAuth;
