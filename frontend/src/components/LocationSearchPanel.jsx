import React from 'react'

const LocationSearchPanel = (props) => {
  const locations = [
    "24B, Near Kapoor's cafe, Sheryians Coding School. ",
    "12D, Near Burger Junction cafe, Ibad Complex. ",
    "4033A, Purani Building , Naya Mohalla School. ",
    "B-12, Near Kapoor's cafe, Sheryians Coding School. "
  ]
  return (
    <div>
      {/* This is just a sample data  */}
      {
        locations.map((elem,idx)=>{
          return <div key={idx} onClick={()=>{
            props.setvehiclePanel(true);
            props.setpanelOpen(false);
          }} className='flex gap-4 items-center justify-start my-4 rounded-xl p-2 border-2 border-gray-100 active:border-black'>
          <h2 className='bg-[#eee] flex items-center justify-center h-8 w-12 rounded-full'><i className="ri-map-pin-fill"></i></h2>
          <h4 className='font-medium'>{elem}</h4>
        </div>
        })
      }

    </div>
  )
}

export default LocationSearchPanel