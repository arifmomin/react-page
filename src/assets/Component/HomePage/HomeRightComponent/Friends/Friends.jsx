import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import user from "./FriendsImage/user.png"

const Friends = () => {
  return (
        <div className='h-[50vh] w-[32.5%] bg-white rounded-[20px] drop-shadow-SearchShadow px-5 py-3 flex flex-col gap-y-[10px]'>
        <div className='flex justify-between items-center'>
            <h2 className='text-xl font-Poppins font-semibold text-black'>Friends</h2>
            <span className='text-xl text-commonBackground cursor-pointer'><BsThreeDotsVertical/></span>
        </div>
        <div className=' overflow-y-scroll scrollbar-thin scrollbar-thumb-commonBackground scrollbar-track-gray-200 '>
            {[...new Array (10)].map ((_, index)=>(
                            <div>
                            <div className='HomePageAfter'>
                            <div>
                                <picture><img src={user} alt={user} className='w-[50px] h-[50px] GroupListImage'/></picture>
                            </div>
                            <div className='flex justify-between items-start w-[75%]'>
                                <div>
                                    <h3 className='groupListHeading text-base'>Arif Momin</h3>
                                    <p className='text-[12px] GroupListSumHeading'>Hey, Wassup!</p>
                                </div>
                                <div>
                                    <p className='text-[10px] font-medium font-Poppins text-black opacity-[50%]'>Today, 8:56pm</p>
                                </div>
                            </div>
                        </div>
                            </div>
            ))}

        </div>
    </div>
  )
}

export default Friends