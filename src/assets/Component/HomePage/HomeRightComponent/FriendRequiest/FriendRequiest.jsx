import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import user from "./FriendRequiestImage/user.png"
const FriendRequiest = () => {
  return (
    <div className='w-[32.5%] h-[43vh] bg-white rounded-[20px] drop-shadow-SearchShadow px-5 py-3 flex flex-col gap-y-[10px]'>
    <div className='flex justify-between items-center'>
        <h2 className='text-xl font-Poppins font-semibold text-black'>Friend Request</h2>
        <span className='text-xl text-commonBackground cursor-pointer'><BsThreeDotsVertical/></span>
    </div>
    <div className='h-full w-full overflow-y-scroll scrollbar-thin scrollbar-thumb-commonBackground scrollbar-track-gray-200'>
        {[...new Array (10)].map ((_, index)=>(
                        <div>
                        <div className='HomePageAfter'>
                        <div>
                            <picture><img src={user} alt={user} className='GroupListImage '/></picture>
                        </div>
                        <div className='flex justify-between items-start w-[75%]'>
                            <div>
                                <h3 className='groupListHeading'>No One</h3>
                                <p className='GroupListSumHeading'>Hey, it's me, No one.</p>
                            </div>
                            <div>
                                <button className='GroupListButton'>Accept</button>
                            </div>
                        </div>
                    </div>
                        </div>
        ))}

    </div>
</div>
  )
}

export default FriendRequiest