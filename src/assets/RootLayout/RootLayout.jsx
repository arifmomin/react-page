import React, { useEffect, useState } from'react'
import HomeLeft from "../Component/HomePage/HomeLeft/HomeLeft.jsx"
import { Outlet } from 'react-router-dom'
import { Triangle } from 'react-loader-spinner'
const RootLayout = () => {
  const [loading, setloading] = useState (true);
  useEffect(()=>{
    setTimeout (()=>{
      setloading (false)
    }, 1000 );
  }, []);
  return (
<div>
            {loading? <div className='w-full h-screen flex justify-center items-center'>
            <Triangle
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        />
        </div> : <div className='flex py-[15px] px-[15px] gap-x-8'>
        <HomeLeft/>
        <Outlet/>
      </div>}
      </div>
  )
}

export default RootLayout