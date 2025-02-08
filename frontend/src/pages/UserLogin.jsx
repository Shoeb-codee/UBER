import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserLogin = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState({})
  

  const submitHandler = (e)=>{
    e.preventDefault();
    setUserData({
      email: email,
      password: password
    });
    console.log(userData)
    setEmail('');
  setPassword('');
  }

  return (
    <div className='px-5 py-10 flex flex-col justify-between h-screen'>
      <div>
        <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

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
        <p className='text-center'>New here?<Link to='/signup' className='text-blue-600 '>Create new Account</Link></p>

      </div>
      <div>
      <Link to='/captain-login' className='bg-[#10b461] flex items-center justify-center font-semibold text-white mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Sign in as Captain</Link>
      </div>
      <p className='text-[11px] leading-3'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service Apply</span> </p>
    </div>
  )
}

export default UserLogin