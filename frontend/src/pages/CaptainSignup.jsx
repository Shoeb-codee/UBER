import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const CaptainSignup = () => {
   const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [userData, setUserData] = useState({});
  
    const submitHandler = (e) =>{
      e.preventDefault();
  
      setUserData({
        fullName:{
          firstName: firstName,
          lastName: lastName
        },
        email: email,
        password: password
      })
      setEmail('');
      setPassword('');
      setfirstName('');
      setlastName('');
    }
  return (
    <div className='px-5 py-7 flex flex-col justify-between h-screen'>
    <div>
    <img className='w-20 mb-1' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSVCO4w_adxK32rCXFeKq3_NbLcR9b_js14w&s" alt="" />

      <form onSubmit={(e)=>{
        submitHandler(e);
      }}>
        <h3 className='text-lg font-medium mb-2'>What's our Captain's name</h3>
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

        <h3 className='text-lg font-medium mb-2'>What's our Captain's email</h3>
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
      <p className='text-center'>Already have an account? <Link to='/captain-login' className='text-blue-600 '>Login here</Link></p>

    </div>
    <div>
      <p className='text-[11px] leading-3'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service Apply</span> </p>
    </div>
  </div>
  )
}

export default CaptainSignup