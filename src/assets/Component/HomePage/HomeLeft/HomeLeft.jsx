import React from 'react'
import user from "./HomePageImage/user.png"
import { TbCloudUpload, TbLogout } from 'react-icons/tb'
import {  IoSettingsOutline } from 'react-icons/io5'
import { SlHome } from 'react-icons/sl'
import { AiFillMessage } from 'react-icons/ai'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { Link, useLocation } from 'react-router-dom'
const HomeLeft = () => {
  const location = useLocation ();
  console.log(location.pathname);
  
  return (
<div>
<div className='bg-commonBackground w-[186px] h-[95vh] flex flex-col items-center gap-y-[68px] rounded-[20px]'>
  <div className='w-[100px] h-[100px] rounded-full mt-9 relative cursor-pointer group'>
    <picture><img src={user} alt={user} className='w-[100px] h-[100px] rounded-full bg-white object-contain transition-opacity duration-200 group-hover:opacity-50'/></picture>
    <span className='absolute top-[35%] left-[33%] text-[36px] text-white opacity-0 transition-opacity duration-200 ease-linear group-hover:opacity-100'><TbCloudUpload/></span>
  </div>
  <div className='w-full'>
    <ul className='flex flex-col gap-y-[32px] items-center'>
      <li className={`text-[36px] cursor-pointer relative text-[#BAD1FF] ${location.pathname === "/Home" && " text-commonBackground bg-white py-5 pl-[52px] pr-[73px] flex justify-center items-center rounded-l-2xl mr-[-25px] after:absolute after:top-[0px] after:right-[0px] after:w-2 after:h-full after:bg-commonBackground after:rounded-l-3xl after:drop-shadow-custom"}`}>
        <Link to={"/Home"}>
        <SlHome/>
        </Link>
      </li>
      <li className={`text-[36px] cursor-pointer relative text-[#BAD1FF] ${location.pathname === "/Chat" && " text-commonBackground bg-white py-5 pl-[52px] pr-[73px] flex justify-center items-center rounded-l-2xl mr-[-25px] after:absolute after:top-[0px] after:right-[0px] after:w-2 after:h-full after:bg-commonBackground after:rounded-l-3xl after:drop-shadow-custom"}`}>
        <Link to={"/Chat"}>
        <AiFillMessage/>
        </Link>
      </li>
      <li className={`text-[36px] cursor-pointer relative text-[#BAD1FF] ${location.pathname === "/Notification" && " text-commonBackground bg-white py-5 pl-[52px] pr-[73px] flex justify-center items-center rounded-l-2xl mr-[-25px] after:absolute after:top-[0px] after:right-[0px] after:w-2 after:h-full after:bg-commonBackground after:rounded-l-3xl after:drop-shadow-custom"}`}>
        <Link to={"/Notification"}>
        <IoMdNotificationsOutline/>
        </Link>
      </li>
      <li className={`text-[36px] cursor-pointer relative text-[#BAD1FF] ${location.pathname === "/Setting" && " text-commonBackground bg-white py-5 pl-[52px] pr-[73px] flex justify-center items-center rounded-l-2xl mr-[-25px] after:absolute after:top-[0px] after:right-[0px] after:w-2 after:h-full after:bg-commonBackground after:rounded-l-3xl after:drop-shadow-custom"}`}>
      <Link to={"/Setting"}>
      <IoSettingsOutline/>
        </Link>
        </li>
    </ul>
  </div>
  <div>
    <span className='text-[38px] text-[#BAD1FF]'><TbLogout/></span>
  </div>
  </div>

</div>
  )
}

export default HomeLeft