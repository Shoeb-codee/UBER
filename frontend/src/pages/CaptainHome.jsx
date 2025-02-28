import React, { useRef, useState, useEffect , useContext} from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopup from '../components/ConfirmRidePopup'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CaptainContext'


const CaptainHome = () => {

  const [ridePopupPanel, setridePopupPanel] = useState(true);
  const [confirmRidePopupPanel, setconfirmRidePopupPanel] = useState(false);

  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);

const {socket} = useContext(SocketContext);
const {captain} = useContext(CaptainDataContext);

useEffect(() => {
  socket.emit('join',{
    userId: captain._id,
    userType: "captain"
  })

  const updateLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
  
            socket.emit('update-location-captain', {
                userId: captain._id,
                location: {
                    ltd: position.coords.latitude,
                    lng: position.coords.longitude
                }
            })
        })
    }
  }
   const locationInterval = setInterval(updateLocation, 10000)
 updateLocation()
  
  // return () => clearInterval(locationInterval)
})



  useGSAP(function(){
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelRef.current,{
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(ridePopupPanelRef.current,{
        transform: 'translateY(100%)'
      })
    }
   
  },[ridePopupPanel])

  useGSAP(function(){
    if (confirmRidePopupPanel) {
      gsap.to(confirmRidePopupPanelRef.current,{
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(confirmRidePopupPanelRef.current,{
        transform: 'translateY(100%)'
      })
    }
   
  },[confirmRidePopupPanel])


  return (
    <div className='h-screen'>
      <div>
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt=""
      />
      <Link to='/captain-home' className='fixed top-2 right-2 w-10 h-10 bg-white flex items-center justify-center p-4 rounded-full'>
      <i className="text-lg font-medium ri-logout-box-r-line"></i>
      </Link>
      </div>
      <div className='h-3/5  w-full'>
      <img
      className="h-full w-full"
      src="https://s.wsj.net/public/resources/images/BN-XR453_201802_M_20180228165619.gif"
      alt=""
    />
      </div>
      <div className='h-2/5 p-4'>
      <CaptainDetails  />
      </div>
      <div ref={ridePopupPanelRef} className="fixed w-full translate-y-full z-10 bottom-0 px-3 pt-14 py-10 bg-white">
        <RidePopUp setconfirmRidePopupPanel={setconfirmRidePopupPanel} setridePopupPanel={setridePopupPanel} />
      </div>
      <div ref={confirmRidePopupPanelRef} className="fixed w-full h-screen translate-y-full z-10 bottom-0 px-3 pt-14 py-10 bg-white">
         <ConfirmRidePopup  setconfirmRidePopupPanel={setconfirmRidePopupPanel} setridePopupPanel={setridePopupPanel} />
      </div>
  </div>
  )
}

export default CaptainHome