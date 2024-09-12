import React from 'react'
import user from "../HomePage/HomePageImage/user.png"
import { TbCloudUpload, TbLogout } from 'react-icons/tb'
import { IoHome, IoSettingsOutline } from 'react-icons/io5'
import { SlHome } from 'react-icons/sl'
import { AiFillMessage } from 'react-icons/ai'
import { IoMdNotificationsOutline } from 'react-icons/io'
const HomeLeft = () => {
  return (
<div>
<div className='bg-commonBackground w-[186px] h-[90vh] flex flex-col items-center gap-y-[68px] rounded-[20px]'>
  <div className='w-[100px] h-[100px] rounded-full mt-9 relative cursor-pointer group'>
    <picture><img src={user} alt={user} className='w-[100px] h-[100px] rounded-full bg-white object-contain'/></picture>
    <span className='absolute top-[41%] left-[42%] text-xl opacity-0 transition-opacity duration-200 delay-200 group-hover:opacity-100'><TbCloudUpload/></span>
  </div>
  <div className='w-full'>
    <ul className='flex flex-col gap-y-[32px] items-center'>
      <li className='text-[36px] text-commonBackground cursor-pointer relative bg-white py-5 pl-[52px] pr-[73px] flex justify-center items-center rounded-l-2xl mr-[-25px] after:absolute after:top-[0px] after:right-[0px] after:w-2 after:h-full after:bg-commonBackground after:rounded-l-3xl after:drop-shadow-custom'><SlHome/></li>
      <li className='text-[36px] text-[#BAD1FF] flex justify-center items-center cursor-pointer'><AiFillMessage/></li>
      <li className='text-[36px] text-[#BAD1FF] flex justify-center items-center cursor-pointer'><IoMdNotificationsOutline/></li>
      <li className='text-[36px] text-[#BAD1FF] flex justify-center items-center cursor-pointer'><IoSettingsOutline/></li>
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