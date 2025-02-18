import React from 'react'
import { Link } from 'react-router-dom'

const Riding = () => {
  return (
    <div className='h-screen'>
      <Link to='/home' className='fixed top-2 right-2 w-10 h-10 bg-white flex items-center justify-center p-4 rounded-full'>
      <i className="text-lg font-medium ri-home-5-line"></i>
      </Link>
      <div className='h-1/2 w-full'>
      <img
      className="h-full w-full"
      src="https://s.wsj.net/public/resources/images/BN-XR453_201802_M_20180228165619.gif"
      alt=""
    />
      </div>
      <div className='h-1/2 p-4'>
      <div className='flex items-center justify-between'>
        <img className='h-18' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png" alt="" />
        <div className='text-right'>
          <h2 className='text-lg font-medium'>Sarthak</h2>
          <h4 className='text-xl font-semibold -mt-2 -mb-1'>UP 32 C 5522</h4>
          <p className='text-sm  text-gray-600'>Maruti Suzuki Alto</p>
        </div>
        </div>

        <div className='flex flex-col gap-2 justify-between items-center '>

        <div className='w-full flex flex-col gap-4 mt-5'>
         
          <div className='flex gap-2 items-center border-b-1 border-gray-700 p-1'>
          <i className="text-lg ri-map-pin-2-fill"></i>
          <div>
            <h3 className='text-lg font-medium'>324-A/6B </h3>
            <p className='text-sm -mt-1 text-gray-600'>Ground-of-Rovera, Hartley Street</p>
          </div>
          </div>
          <div className='flex gap-2 items-center  p-1'>
          <i className="text-lg ri-currency-fill"></i>
          <div>
            <h3 className='text-lg font-medium'>₹193.20</h3>
            <p className='text-sm -mt-1 text-gray-600'>Cash Payment</p>
          </div>
          </div>
        </div>
        </div>
      <button className='w-full bg-green-500 mt-3 text-white font-semibold p-2 rounded-lg'>Make a Payment</button>
      </div>
    
  </div>
  )
}

export default Riding