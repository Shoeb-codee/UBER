import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import FinishRide from '../components/FinishRide';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const CaptainRiding = () => {

  const [finishRidePanel, setfinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);


  useGSAP(function(){
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current,{
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(finishRidePanelRef.current,{
        transform: 'translateY(100%)'
      })
    }
   
  },[finishRidePanel])


  return (
    <div className='h-screen'>
      <div>
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt=""
      />
      <Link to='/home' className='fixed top-2 right-2 w-10 h-10 bg-white flex items-center justify-center p-4 rounded-full'>
      <i className="text-lg font-medium ri-logout-box-r-line"></i>
      </Link>
      </div>
      <div className='h-4/5  w-full'>
      <img
      className="h-full w-full"
      src="https://s.wsj.net/public/resources/images/BN-XR453_201802_M_20180228165619.gif"
      alt=""
    />
      </div>
      <div onClick={()=>{
        setfinishRidePanel(true);

      }} className='flex items-center justify-between relative h-1/5 p-3 bg-yellow-400'>
      <h5 className="p-1 text-center w-[95%] absolute top-0" onClick={()=>{

   }}><i className="text-2xl text-gray-700 ri-arrow-up-wide-fill"></i></h5>
      <h4 className='text-xl font-semibold'>4 KM Away</h4>
      <button className=' bg-green-400 text-white font-semibold p-3 px-8 rounded-lg'>Complete Ride</button>
      </div>
      <div ref={finishRidePanelRef} className="fixed w-full translate-y-full z-10 bottom-0 px-3 pt-14 py-10 bg-white">
        <FinishRide setfinishRidePanel={setfinishRidePanel} />
      </div>
  </div>
  )
}

export default CaptainRiding