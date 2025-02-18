import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import 'remixicon/fonts/remixicon.css';
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfrimRide from "../components/ConfrimRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";

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
              value={pickup}
              onClick={() => {
                setpanelOpen(true);
              }}
              onChange={(e) => {
                setpickup(e.target.value);
              }}
              className="bg-[#eee] py-2 px-12 rounded-lg text-xl w-full mb-3"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              value={destination}
              onClick={() => {
                setpanelOpen(true);
              }}
              onChange={(e) => {
                setdestination(e.target.value);
              }}
              className="bg-[#eee] py-2 px-12 rounded-lg text-xl w-full"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
        </div>
        <div ref={panelRef} className=" bg-white h-0">
        <LocationSearchPanel setpanelOpen={setpanelOpen} setvehiclePanel={setvehiclePanel} />
        </div>
      </div>
      {/* Panel After giving location */}
      <div ref={vehiclePanelRef} className="fixed w-full translate-y-full z-10 bottom-0 px-3 pt-14 py-10 bg-white">
       <VehiclePanel setconfirmRidePanel={setconfirmRidePanel} setvehiclePanel={setvehiclePanel} />
      </div>
      {/* Panel after confirming vehicle */}
      <div ref={confirmRidePanelRef} className="fixed w-full translate-y-full z-10 bottom-0 px-3 pt-14 py-10 bg-white">
        <ConfrimRide setconfirmRidePanel={setconfirmRidePanel}  setvehicleFound={setvehicleFound}  />
      </div>
      <div ref={vehicleFoundRef} className="fixed w-full translate-y-full z-10 bottom-0 px-3 pt-14 py-10 bg-white">
        <LookingForDriver setvehicleFound={setvehicleFound} setconfirmRidePanel={setconfirmRidePanel} />
      </div>
      <div ref={waitingForDriverRef} className="fixed w-full z-10 bottom-0 px-3 pt-14 py-10 bg-white">
        <WaitingForDriver waitingForDriver={waitingForDriver}  />
      </div>
    </div>
  );
};

export default Home;
