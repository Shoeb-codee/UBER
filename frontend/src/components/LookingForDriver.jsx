import React from 'react'

const LookingForDriver = (props) => {
  return (
    <div>
      <h5 className="p-3 text-center w-[92%] absolute top-0" onClick={()=>{
          props.setvehicleFound(false);
        }}><i className="text-2xl text-gray-300 ri-arrow-down-wide-fill"></i></h5>
        <h3 className="text-2xl font-semibold mb-3">Looking for a Driver</h3>

        <div className='flex flex-col gap-2 justify-between items-center '>
        <img className='h-24' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png" alt="" />

        <div className='w-full flex flex-col gap-4 mt-5'>
          <div className='flex gap-2 items-center border-b-1 border-gray-700 p-1'>
          <i className="text-lg ri-map-pin-user-fill"></i>
          <div>
            <h3 className='text-lg font-medium'>324-A/6B </h3>
            <p className='text-sm -mt-1 text-gray-600'>{props.pickup}</p>
          </div>
          </div>
          <div className='flex gap-2 items-center border-b-1 border-gray-700 p-1'>
          <i className="text-lg ri-map-pin-2-fill"></i>
          <div>
            <h3 className='text-lg font-medium'>324-A/6B </h3>
            <p className='text-sm -mt-1 text-gray-600'>{props.destination}</p>
          </div>
          </div>
          <div className='flex gap-2 items-center  p-1'>
          <i className="text-lg ri-currency-fill"></i>
          <div>
            <h3 className='text-lg font-medium'>₹{props.fare[props.vehicleType]}</h3>
            <p className='text-sm -mt-1 text-gray-600'>Cash Payment</p>
          </div>
          </div>
        </div>
        </div>
    </div>
  )
}

export default LookingForDriver