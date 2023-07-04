import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    // Alternatively, retrieve the token from a secure cookie

    if (!token) {
      navigate('/products');
    }
  }, [navigate]);

  return;
};

export default useAuth;
