import React from 'react'
import HomeLeft from "../Component/HomePage/HomeLeft/HomeLeft.jsx"
import { Outlet } from 'react-router-dom'
const RootLayout = () => {
  return (
    <div className='flex py-[15px] px-[15px] gap-x-8'>
      <HomeLeft/>
      <Outlet/>
      </div>
  )
}

export default RootLayout