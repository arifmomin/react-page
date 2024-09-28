import React from 'react'
import Search from '../Component/HomePage/HomeRightComponent/Search/Search'
import user from "./SettingImage/user.png"
import { AiFillEdit } from 'react-icons/ai'
import { FaAdjust, FaKey, FaUserEdit } from 'react-icons/fa'
import { MdAddPhotoAlternate, MdDelete } from 'react-icons/md'
import { IoMdHelpCircleOutline } from 'react-icons/io'
const Setting = () => {
  return (
    <>
<div className='w-full h-[95vh] flex flex-col justify-start items-start gap-y-5'>
    <div className=' w-full h-fit'>
        <Search className ="w-full"/>
    </div>
    <div className='w-full h-full flex justify-start items-center gap-x-8'>
        <div className='w-[50%] h-full bg-white drop-shadow-SearchShadow rounded-2xl p-7'>
            <div>
            <h2 className='text-xl text-black font-semibold font-Poppins'>Profile Settings</h2>
            </div>
            <div className='mt-8 p-4 flex justify-start items-center gap-x-5 relative after:absolute after:w-[96%] after:h-[1px] after:bg-black after:bottom-[-20px] after:left-3'>
                <div className='w-[80px] h-[80px]'>
                    <picture><img className='w-full h-full rounded-full' src={user} alt={user} /></picture>
                </div>
                <div>
                    <h3 className='text-[22px] text-black font-semibold font-openSans'>Arif Momin</h3>
                    <h4 className='text-[18px] text-black font-Poppins font-normal'>Stay home stay safe</h4>
                </div>
            </div>
            <div className='mt-14 ml-8 flex flex-col justify-start items-start gap-y-7'>
                <div className='flex justify-start items-center gap-x-4 cursor-pointer'>
                <span className='text-2xl text-black'><AiFillEdit/></span>
                <span className='text-xl text-black font-Poppins font-medium'>Edit Profile Name.</span>
                </div>
                <div className='flex justify-start items-center gap-x-4 cursor-pointer'>
                <span className='text-2xl text-black'><FaUserEdit/></span>
                <span className='text-xl text-black font-Poppins font-medium'>Edit Profile Status Info.</span>
                </div>
                <div className='flex justify-start items-center gap-x-4 cursor-pointer'>
                <span className='text-2xl text-black'><MdAddPhotoAlternate/></span>
                <span className='text-xl text-black font-Poppins font-medium'>Edit Profile Photo.</span>
                </div>
                <div className='flex justify-start items-center gap-x-4 cursor-pointer'>
                <span className='text-2xl text-black'><IoMdHelpCircleOutline/></span>
                <span className='text-xl text-black font-Poppins font-medium'>Help.</span>
                </div>
            </div>
        </div>
        <div className='w-[50%] h-full bg-white drop-shadow-SearchShadow rounded-2xl p-7'>
            <div>
                <h2 className='text-xl text-black font-semibold font-Poppins'>Account Settings</h2>
            </div>
            <div className='mt-8 ml-8 flex flex-col justify-start items-start gap-y-7'>                
            <div className='flex justify-start items-center gap-x-4 cursor-pointer'>
                <span className='text-2xl text-black'><FaKey/></span>
                <span className='text-xl text-black font-Poppins font-medium'>Change Password</span>
            </div>
            <div className='flex justify-start items-center gap-x-4 cursor-pointer'>
                <span className='text-2xl text-black'><FaAdjust/></span>
                <span className='text-xl text-black font-Poppins font-medium'>Theme.</span>
            </div>
            <div className='flex justify-start items-center gap-x-4 cursor-pointer'>
                <span className='text-2xl text-black'><MdDelete/></span>
                <span className='text-xl text-black font-Poppins font-medium'>Delete Account.</span>
            </div>
            </div>
        </div>
    </div>
</div>
    </>
  )
}

export default Setting