import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import axios from 'axios';
import 'remixicon/fonts/remixicon.css';
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfrimRide from "../components/ConfrimRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { useContext } from 'react';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from "../context/SocketContext";

const Home = () => {
  const [pickup, setpickup] = useState("");
  const [destination, setdestination] = useState("");
  const [panelOpen, setpanelOpen] = useState(false);
  const panelRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const panelCloseRef = useRef(null);
  const [vehiclePanel, setvehiclePanel] = useState(false);
  const [confirmRidePanel, setconfirmRidePanel] = useState(false);
  const [vehicleFound, setvehicleFound] = useState(false);
  const [waitingForDriver, setwaitingForDriver] = useState(false);
  const [ pickupSuggestions, setpickupSuggestions ] = useState([])
  const [ destinationSuggestions, setDestinationSuggestions ] = useState([])
  const [ activeField, setActiveField ] = useState(null)
  const [fare, setfare] = useState({});
  const [vehicleType, setvehicleType] = useState(null);

const { socket } = useContext(SocketContext);
const {user} = useContext(UserDataContext);

useEffect(() => {
  socket.emit("join",{userType:"user", userId: user._id })
}, [ user ]);



  const navigate = useNavigate()

  const handlePickupChange = async (e) => {
    setpickup(e.target.value)
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
            params: { input: e.target.value },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }

        })
        setpickupSuggestions(response.data)
    } catch {
        // handle error
    }
}

const handleDestinationChange = async (e) => {
  setdestination(e.target.value)
  try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
          params: { input: e.target.value },
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      })
      setDestinationSuggestions(response.data)
  } catch {
      // handle error
  }
}

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP( function(){
    
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "60%",
        padding: 24,
      });
      gsap.to(panelCloseRef.current,{
        opacity: 1
      })
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
        padding: 0,
      });
      gsap.to(panelCloseRef.current,{
        opacity: 0
      })
    }
  }, [panelOpen]);

  useGSAP(function(){
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current,{
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(vehiclePanelRef.current,{
        transform: 'translateY(100%)'
      })
    }
   
  },[vehiclePanel])

  useGSAP(function(){
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current,{
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(confirmRidePanelRef.current,{
        transform: 'translateY(100%)'
      })
    }
   
  },[confirmRidePanel])

  useGSAP(function(){
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current,{
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(vehicleFoundRef.current,{
        transform: 'translateY(100%)'
      })
    }
   
  },[vehicleFound])

  useGSAP(function(){
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current,{
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(waitingForDriverRef.current,{
        transform: 'translateY(100%)'
      })
    }
   
  },[waitingForDriver])
  
 async function findTrip(){ 
    setvehiclePanel(true);
    setpanelOpen(false);

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
      params: { pickup, destination },
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
      }
  })

  setfare(response.data)
  }

  async function createRide(){
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
      pickup,
      destination,
      vehicleType
  }, {
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
      }
  })
console.log(response.data)
  }

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt=""
      />
      <div className=" h-screen w-screen">
        {/* image for temporary use  */}
        <img
          className="h-full w-full"
          src="https://s.wsj.net/public/resources/images/BN-XR453_201802_M_20180228165619.gif"
          alt=""
        />
      </div>
      <div className=" h-screen absolute w-full flex top-0 flex-col justify-end">
        <div className="h-[30%] bg-white p-5 relative">
          <h5 ref={panelCloseRef} onClick={()=>{
            setpanelOpen(false)
          }} className="absolute opacity-0 top-4 right-3 font-bold text-xl">
          <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-3xl font-semibold mb-2">Find a Trip </h4>
          <form 
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line h-16 left-10 w-1 absolute top-[43%] bg-gray-900 rounded-full"></div>
            <input
                            onClick={() => {
                                setpanelOpen(true)
                                setActiveField('pickup')
                            }}
                            value={pickup}
                            onChange={handlePickupChange}
                            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full'
                            type="text"
                            placeholder='Add a pick-up location'
                        />
            <input
                            onClick={() => {
                                setpanelOpen(true)
                                setActiveField('destination')
                            }}
                            value={destination}
                            onChange={handleDestinationChange}
                            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3'
                            type="text"
                            placeholder='Enter your destination' />
         </form>
         <button onClick={findTrip} className="bg-black text-white px-4 py-2 w-full rounded-lg mt-4">
          Find Trip
         </button>
        </div>
        <div ref={panelRef} className='bg-white h-0'>
                    <LocationSearchPanel
                        suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                        setpanelOpen={setpanelOpen}
                        setvehiclePanel={setvehiclePanel}
                        setpickup={setpickup}
                        setdestination={setdestination}
                        activeField={activeField}
                    />
                </div>
      </div>
      {/* Panel After giving location */}
      <div ref={vehiclePanelRef} className="fixed w-full translate-y-full z-10 bottom-0 px-3 pt-14 py-10 bg-white">
       <VehiclePanel selectVehicle={setvehicleType} fare={fare} setconfirmRidePanel={setconfirmRidePanel} setvehiclePanel={setvehiclePanel} />
      </div>
      {/* Panel after confirming vehicle */}
      <div ref={confirmRidePanelRef} className="fixed w-full translate-y-full z-10 bottom-0 px-3 pt-14 py-10 bg-white">
        <ConfrimRide fare={fare} vehicleType={vehicleType} createRide={createRide} pickup={pickup} destination={destination} setconfirmRidePanel={setconfirmRidePanel}  setvehicleFound={setvehicleFound}  />
      </div>
      <div ref={vehicleFoundRef} className="fixed w-full translate-y-full z-10 bottom-0 px-3 pt-14 py-10 bg-white">
        <LookingForDriver fare={fare} vehicleType={vehicleType} createRide={createRide} pickup={pickup} destination={destination} setvehicleFound={setvehicleFound} setconfirmRidePanel={setconfirmRidePanel} />
      </div>
      <div ref={waitingForDriverRef} className="fixed w-full z-10 bottom-0 px-3 pt-14 py-10 bg-white">
        <WaitingForDriver waitingForDriver={waitingForDriver}  />
      </div>
    </div>
  );
};

export default Home;