import React, {useContext, useEffect, useState} from 'react';
import { UserDataContext } from '../context/UserContext';
import { useNavigate, Route } from 'react-router-dom';
import axios from 'axios';

const UserProtectedWrapper = ({
  children
}) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const {user, setUser} = useContext(UserDataContext);
    const [isLoading, setIsLoading] = useState(true);
  
  

  useEffect(()=>{
    if(!token){
      navigate('/login');
    }
    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    }).then(response =>{
      if(response.status === 200){
        setUser(response.data);
        setIsLoading(false);
      }
    }).catch( err =>{
      console.log(err);
      console.log("There is error")
      localStorage.removeItem('token');
      navigate('/login');
    })
  },[token])
  
  

  if(isLoading){
    return <div> Loading... </div>
  }

  return (
    <>
    {children}
    </>
  )
}

export default UserProtectedWrapper