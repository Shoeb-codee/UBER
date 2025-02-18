import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';

const UserSignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

const {user, setUser} = React.useContext(UserDataContext);


  const submitHandler = async (e) =>{
    e.preventDefault();

    const newUser = {
      fullname:{
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password
    } 
    
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`,newUser);
    if(response.status == 201){
      const data = response.data;

      setUser(data.user)
      localStorage.setItem('token', data.token);
      
      navigate('/home')
    }
    setEmail('');
    setPassword('');
    setfirstName('');
    setlastName('');
  }
  return (
    <div className='px-5 py-10 flex flex-col justify-between h-screen'>
      <div>
        <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

        <form onSubmit={(e)=>{
          submitHandler(e);
        }}>
          <h3 className='text-lg font-medium mb-2'>What's your name</h3>
          <div className='flex gap-4 mb-4'>
          <input value={firstName}
          onChange={(e)=>{
            setfirstName(e.target.value);
          }}
          className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base' required type="text" placeholder='First name' />
          <input value={lastName} 
          onChange={(e)=>{
            setlastName(e.target.value);
          }}
          className='bg-[#eeeeee]  rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base' required type="text" placeholder='Last name' />

          </div>

          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input value={email}
          onChange={(e)=>{
            setEmail(e.target.value);
          }}
          className='bg-[#eeeeee] mb-4 rounded px-4 py-2 border w-full text-lg placeholder:text-base' required type="email" placeholder='email@example.com' />

          <h3 className='text-lg font-medium mb-2'>Enter Password </h3>
          <input value={password}
          onChange={(e)=>{
            setPassword(e.target.value);
          }}
           className='bg-[#eeeeee] mb-4 rounded px-4 py-2 border w-full text-lg placeholder:text-base' required type="password" placeholder='ghj@*246' />

          <button className='bg-[#111] font-semibold text-white mb-4 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Register</button>
        </form>
        <p className='text-center'>Already have an account? <Link to='/login' className='text-blue-600 '>Login here</Link></p>

      </div>
      <div>
        <p className='text-[11px] leading-3'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service Apply</span> </p>
      </div>
    </div>
  )
}

export default UserSignUp