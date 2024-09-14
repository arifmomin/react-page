import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import esmern from "./UserListImage/esmern.png"
import { FaPlus } from 'react-icons/fa'
const UserList = () => {
  return (
    <div className='w-[32.5%] h-[50vh] bg-white rounded-[20px] drop-shadow-SearchShadow px-5 py-3 flex flex-col gap-y-[10px]'>
    <div className='flex justify-between items-center'>
        <h2 className='text-xl font-Poppins font-semibold text-black'>User List</h2>
        <span className='text-xl text-commonBackground cursor-pointer'><BsThreeDotsVertical/></span>
    </div>
    <div className='h-full w-full overflow-y-scroll scrollbar-thin scrollbar-thumb-commonBackground scrollbar-track-gray-200'>
        {[...new Array (10)].map ((_, index)=>(
                        <div>
                        <div className='HomePageAfter'>
                        <div>
                            <picture><img src={esmern} alt={esmern} className='GroupListImage w-[50px] h-[50px]'/></picture>
                        </div>
                        <div className='flex justify-between items-start w-[75%]'>
                            <div>
                                <h3 className='groupListHeading text-base'>Arif Momin</h3>
                                <p className='GroupListSumHeading text-[12px]'>Today, 8:56pm</p>
                            </div>
                            <div>
                                <button className='GroupListButton w-[30px] h-[30px] text-[16px]'><FaPlus/></button>
                            </div>
                        </div>
                    </div>
                        </div>
        ))}

    </div>
  </div>
  )
}

export default UserList