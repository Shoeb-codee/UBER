import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainSignup = () => {
  const navigate = useNavigate();
  const {captain, setCaptain} = useContext(CaptainDataContext);


   const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [vehicleColor, setVehicleColor] = useState('');
    const [vehiclePlate, setVehiclePlate] = useState('');
    const [vehicleCapacity, setVehicleCapacity] = useState('');
    const [vehicleType, setVehicleType] = useState('');

  
    const submitHandler = async (e) =>{
      e.preventDefault();
      const captainData = {
        fullname:{
          firstname: firstName,
          lastname: lastName
        },
        email: email,
        password: password,
        vehicle:{
          color: vehicleColor,
          plate: vehiclePlate,
          capacity: parseInt(vehicleCapacity),
          vehicleType: vehicleType
        }
      }

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData);
      if(response.status === 201){
        const data = response.data;
        setCaptain(data.captain)
        localStorage.setItem('token', data.token );
        navigate('/captain-home')

      }

      setEmail('');
      setPassword('');
      setfirstName('');
      setlastName('');
      setVehicleCapacity('');
      setVehicleColor('');
      setVehiclePlate('');
      setVehicleType('');
    } 
  return (
    <div className='px-5 py-5 flex flex-col justify-between h-screen'>
    <div>
    <img className='w-20 mb-1' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSVCO4w_adxK32rCXFeKq3_NbLcR9b_js14w&s" alt="" />

      <form onSubmit={(e)=>{
        submitHandler(e);
      }}>
        <h3 className='text-lg font-medium mb-1'>What's our Captain's name</h3>
        <div className='flex gap-4 mb-4'>
        <input value={firstName}
        onChange={(e)=>{
          setfirstName(e.target.value);
        }}
        className='bg-[#eeeeee] rounded px-4 py-1 border w-1/2 text-lg placeholder:text-base' required type="text" placeholder='First name' />
        <input value={lastName} 
        onChange={(e)=>{
          setlastName(e.target.value);
        }}
        className='bg-[#eeeeee]  rounded px-4 py-1 border w-1/2 text-lg placeholder:text-base' required type="text" placeholder='Last name' />

        </div>

        <h3 className='text-lg font-medium mb-1'>What's our Captain's email</h3>
        <input value={email}
        onChange={(e)=>{
          setEmail(e.target.value);
        }}
        className='bg-[#eeeeee] mb-4 rounded px-4 py-1 border w-full text-lg placeholder:text-base' required type="email" placeholder='email@example.com' />

        <h3 className='text-lg font-medium mb-1'>Enter Password </h3>
        <input value={password}
        onChange={(e)=>{
          setPassword(e.target.value);
        }}
         className='bg-[#eeeeee] mb-4 rounded px-4 py-1 border w-full text-lg placeholder:text-base' required type="password" placeholder='ghj@*246' />
        <h3 className='text-lg font-medium mb-1'>Vehicle Details</h3>
        <div className='flex gap-4 mb-4'>
          <input value={vehicleColor}
            onChange={(e) => {
              setVehicleColor(e.target.value);
            }}
            className='bg-[#eeeeee] rounded px-4 py-1 border w-1/2 text-lg placeholder:text-base'
            required type="text"
            placeholder='Vehicle Color' />
          <input value={vehiclePlate}
            onChange={(e) => {
              setVehiclePlate(e.target.value);
            }}
            className='bg-[#eeeeee] rounded px-4 py-1 border w-1/2 text-lg placeholder:text-base'
            required type="text"
            placeholder='Vehicle Plate Number' />
        </div>

        <div className='flex gap-4 mb-4'>
          <select value={vehicleType}
            onChange={(e) => {
              setVehicleType(e.target.value);
            }}
            className='bg-[#eeeeee] rounded px-4 py-1 border w-1/2 text-lg placeholder:text-base'
            required>
            <option value="">Select Vehicle Type</option>
  <option value="car">Car</option>
  <option value="Auto">Auto</option>
  <option value="motorcycle">Motorcycle</option>
          </select>
          <input value={vehicleCapacity}
            onChange={(e) => {
              setVehicleCapacity(e.target.value);
            }}
            className='bg-[#eeeeee] rounded px-4 py-1 border w-1/2 text-lg placeholder:text-base'
            required type="number"
            min="1"
            placeholder='Vehicle Capacity' />
        </div>
        <button className='bg-[#111] font-semibold text-white mb-4 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Create Captain Account</button>
      </form>
      <p className='text-center'>Already have an account? <Link to='/captain-login' className='text-blue-600 underline'>Login here</Link></p>

    </div>
    <div>
      <p className='text-[11px] leading-3'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service Apply</span> </p>
    </div>
  </div>
  )
}

export default CaptainSignup