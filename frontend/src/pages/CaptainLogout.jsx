import React,{useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const CaptainLogout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    
    if (!token) {
      navigate('/captain-login');
      return;
    }

    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
        withCredentials: true
      }
    })
    .then((response) => {
      if (response.status === 200) {
    localStorage.removeItem('token');
        console.log('Logged Out Captain');
        navigate('/captain-login');
      }
    })
    .catch((error) => {
      console.error('Logout failed:', {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers,
        error: error.message
      });
      navigate('/captain-login');
    });
  }, [token]);
  return (
    <div>CaptainLogout</div>
  )
}

export default CaptainLogout