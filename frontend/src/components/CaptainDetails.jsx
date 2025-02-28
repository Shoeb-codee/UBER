import React, {useContext} from 'react'
import CaptainContext from '../context/CaptainContext'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext);

  return (
    <div>
      <div className='flex p-4 items-center justify-between'>
        <div className='flex gap-2 items-center justify-start'>
          <img className='w-14 h-14 rounded-full object-cover' src="https://i.pinimg.com/474x/cb/33/d8/cb33d80fe655e221ae05f41c8edd0cdb.jpg" alt="" />
          <h4 className='text-lg font-medium capitalize'>{captain.fullname.firstname +" " + captain.fullname.lastname}</h4>
        </div>
        <div className=''>
          <h4 className='text-xl font-semibold'>₹193.20</h4>
          <p className='text-sm text-gray-600'>Earned</p>
        </div>
      </div>

      <div className=' flex p-2 mt-3 bg-gray-200 rounded-xl items-start gap-14 justify-center'>
      <div className='text-center'>
      <i className="text-2xl font-thin ri-timer-line"></i>
      <h5 className='text-lg font-medium'>10.2</h5>
      <p className='text-sm text-gray-600'>Hours Online </p>
      </div>
      <div className='text-center'>
      <i className="text-2xl font-thin ri-speed-up-line"></i>
      <h5 className='text-lg font-medium'>10.2</h5>
      <p className='text-sm text-gray-600'>Hours Online  </p>
      </div>
      <div className='text-center p-1'>
      <i className="text-2xl font-thin ri-booklet-line"></i>
      <h5 className='text-lg font-medium'>10.2</h5>
      <p className='text-sm text-gray-600'>Hours Online  </p>
      </div>

      </div>
    </div>
  )
}

export default CaptainDetails