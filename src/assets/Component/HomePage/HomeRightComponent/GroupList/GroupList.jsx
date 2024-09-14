import React from 'react'
import Search from '../Search/Search.jsx'
import { BsThreeDotsVertical } from 'react-icons/bs'
import esmern from "../GroupList/GroupListImage/esmern.png"
const GroupList = () => {
  return (
    <div className='w-[32.5%]'>
        <div className=' mb-5'>
            <Search/>
        </div>
    <div className=' bg-white  rounded-[20px] drop-shadow-SearchShadow px-5 py-3 flex flex-col gap-y-[10px]'>
        <div className='flex justify-between items-center'>
            <h2 className='text-xl font-Poppins font-semibold text-black'>Groups List</h2>
            <span className='text-xl text-commonBackground cursor-pointer'><BsThreeDotsVertical/></span>
        </div>
        <div className=' w-full h-[31vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-commonBackground scrollbar-track-gray-200'>
            {[...new Array (10)].map ((_, index)=>(
                            <div>
                            <div className='HomePageAfter'>
                            <div>
                                <picture><img src={esmern} alt={esmern} className='GroupListImage'/></picture>
                            </div>
                            <div className='flex justify-between items-start w-[75%]'>
                                <div>
                                    <h3 className='groupListHeading'>ES-MERN-2307</h3>
                                    <p className='GroupListSumHeading'>Hi Guys, Wassup!</p>
                                </div>
                                <div>
                                    <button className='GroupListButton'>Join</button>
                                </div>
                            </div>
                        </div>
                            </div>
            ))}

        </div>
    </div>
    </div>
  )
}

export default GroupList