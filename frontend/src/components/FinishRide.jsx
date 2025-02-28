import React from 'react'
import { Link } from 'react-router-dom';

const FinishRide = (props) => {
  return (
    <div>
      <h5
        className="p-3 text-center w-[92%] absolute top-0"
        onClick={() => {
          props.setfinishRidePanel(false);

        }}
      >
        <i className="text-2xl text-gray-300 ri-arrow-down-wide-fill"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-3">
        Finish this Ride
      </h3>
      <div className="flex justify-between items-center p-2 border-2 border-yellow-400 rounded-xl mt-5">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKEteAJrjN9f2hN9iwxUB88GCT9WjUimEUxA&s"
            alt=""
          />
          <h2 className="text-lg font-medium">Aahil Bhai</h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>

      <div className="flex flex-col gap-2 justify-between items-center ">
        <div className="w-full flex flex-col gap-4 mt-5">
          <div className="flex gap-2 items-center border-b-1 border-gray-700 p-1">
            <i className="text-lg ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">324-A/6B </h3>
              <p className="text-sm -mt-1 text-gray-600">
                Ground-of-Rovera, Hartley Street
              </p>
            </div>
          </div>
          <div className="flex gap-2 items-center border-b-1 border-gray-700 p-1">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">324-A/6B </h3>
              <p className="text-sm -mt-1 text-gray-600">
                Ground-of-Rovera, Hartley Street
              </p>
            </div>
          </div>
          <div className="flex gap-2 items-center  p-1">
            <i className="text-lg ri-currency-fill"></i>
            <div>
              <h3 className="text-lg font-medium">₹193.20</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Payment</p>
            </div>
          </div>
        </div>
        <div className="mt-6 w-full">
        <Link
              to="/captain-home"
              className="w-full flex text-lg justify-center bg-green-400 mt-7 text-white font-semibold p-3 rounded-lg"
            >
              Ride Finished
            </Link>
            <p className='text-xs mt-10'>Click on 'Ride Finished' if you have completed the payment</p>
        </div>
      </div>
    </div>
  )
}

export default FinishRide