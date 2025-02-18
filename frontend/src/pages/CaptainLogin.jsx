import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';


const CaptainLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [captainData, setCaptainData] = useState({})
    
    const {captain, setCaptain} = useContext(CaptainDataContext);
    const navigate = useNavigate();

  
    const submitHandler = async (e)=>{
      e.preventDefault();
      const captain = {
        email: email,
        password: password
      }
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain);
      if(response.status === 200){
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem('token', data.token);
        console.log("Logged in Captain");
        navigate('/captain-home');
      }
    }
  return (
    <div className='px-5 py-7 flex flex-col justify-between h-screen'>
    <div>
      <img className='w-20 mb-1' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSVCO4w_adxK32rCXFeKq3_NbLcR9b_js14w&s" alt="" />

      <form onSubmit={(e)=>{
        submitHandler(e);
      }}>
        <h3 className='text-lg font-medium mb-2'>What's your email</h3>
        <input value={email} onChange={(e)=>{
          setEmail(e.target.value);
        }} className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' required type="email" placeholder='email@example.com' />

        <h3 className='text-lg font-medium mb-2'>Enter Password </h3>
        <input value={password} onChange={(e)=>{
          setPassword(e.target.value);
        }} className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' required type="password" placeholder='ghj@*246' />

        <button className='bg-[#111] font-semibold text-white mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Login</button>
      </form>
      <p className='text-center'>Join a fleet? <Link to='/captain-signup' className='text-blue-600 '>Register as a Captain</Link></p>

    </div>
    <div>
    <Link to='/login' className='bg-[#ffbd03] flex items-center justify-center font-semibold text-white mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Sign in as User</Link>
    </div>
    <p className='text-[11px] leading-3'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service Apply</span> </p>
  </div>
  )
}

export default CaptainLogin