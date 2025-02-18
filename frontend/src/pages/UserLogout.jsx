import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const UserLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      navigate('/login');
      return;
    }

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      })
    .then((response) => {
      if (response.status === 200) {
        localStorage.removeItem('token');
        console.log("Logged out successfully")
        navigate('/login');
      }
    })
    .catch((error) => {
      console.log(error);
      console.error('Logout failed:', {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers,
        error: error.message
      });
      navigate('/login');
    });
  }, []);
  return (
    <div>UserLogout</div>
  )
}

export default UserLogout