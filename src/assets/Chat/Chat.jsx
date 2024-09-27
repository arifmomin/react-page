import React from 'react'
import Search from '../Component/HomePage/HomeRightComponent/Search/Search'
import { BsCamera, BsEmojiSmile, BsThreeDotsVertical } from 'react-icons/bs'
import esmern from "../Component/HomePage/HomeRightComponent/GroupList/GroupListImage/esmern.png"
import user from "./ChatImage/user.png"
import { IoIosSend } from 'react-icons/io'
const Chat = () => {
  return (
    <div className='w-full h-[94vh] flex gap-x-7'>
        <div className='w-[35%] flex flex-col gap-y-[27px]'>
        <div className='w-full h-[50%] flex flex-col gap-y-[4%]'>
<div className=' h-[15%]'>
            <Search/>
        </div>
    <div className=' bg-white h-[85%] rounded-[20px] drop-shadow-SearchShadow px-5 py-3 flex flex-col gap-y-[10px]'>
        <div className='flex justify-between items-center'>
        <div className="relative">
          <h2 className='text-xl font-Poppins font-semibold text-black'>Groups</h2>
            <span className="absolute top-[-4px] right-[-20px] flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-commonBackground opacity-75"></span>
            <span className="relative rounded-full h-5 w-5 bg-commonBackground text-xs text-white flex justify-center items-center">
              
            </span>
          </span>
          </div>
            <div className="relative">
      <button className=" text-xl text-commonBackground cursor-pointer">
      <BsThreeDotsVertical/>
      </button>
    </div>
        </div>
        <div className=' w-full h-full hide-scrollbar'>
        {Array.from({ length: 10 }).map((_, index) =>(
                            <div className=''>
                            <div className='HomePageAfter'>
                                <div className='flex gap-x-3 items-center'>
                                <div>
                                <picture><img src={esmern} alt="esmern" className='allImage w-[60px] h-[60px]' /></picture>
                            </div>
                            <div>
                                    <h3 className='allHeading text-[18px]'> "Name missing"</h3>
                                    <p className='allSubHeading text-[14px]'> "tag name missing"</p>
                                </div>
                                </div>
                        </div>
                            </div>
            ))}
        </div>
    </div>
    </div>
    <div className='w-full h-[50%]'>
    <div className=' bg-white h-[92%] rounded-[20px] drop-shadow-SearchShadow px-5 py-3 flex flex-col gap-y-[10px]'>
        <div className='flex justify-between items-center'>
        <div className="relative">
          <h2 className='text-xl font-Poppins font-semibold text-black'>Groups</h2>
            <span className="absolute top-[-4px] right-[-20px] flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-commonBackground opacity-75"></span>
            <span className="relative rounded-full h-5 w-5 bg-commonBackground text-xs text-white flex justify-center items-center">
              
            </span>
          </span>
          </div>
            <div className="relative">
      <button className=" text-xl text-commonBackground cursor-pointer">
      <BsThreeDotsVertical/>
      </button>
    </div>
        </div>
        <div className=' w-full h-full hide-scrollbar'>
        {Array.from({ length: 10 }).map((_, index) =>(
                            <div className=''>
                            <div className='HomePageAfter'>
                                <div className='flex gap-x-3 items-center'>
                                <div>
                                <picture><img src={esmern} alt="esmern" className='allImage w-[60px] h-[60px]' /></picture>
                            </div>
                            <div>
                                    <h3 className='allHeading text-[18px]'> "Name missing"</h3>
                                    <p className='allSubHeading text-[14px]'> "tag name missing"</p>
                                </div>
                                </div>
                        </div>
                            </div>
            ))}
        </div>
    </div>
</div>
        </div>
        <div className='w-[65%] h-full bg-white flex flex-col justify-between drop-shadow-SearchShadow rounded-[20px] p-5 pl-6'>
            <div className='w-full h-[15%]'>
            <div className='flex justify-between items-center relative after:absolute after:w-[95%] after:h-[1px] after:opacity-[25%] after:bg-black after:bottom-[-15px] after:left-[22px]'>
            <div className='flex gap-x-5 items-center'>
            <div>
                <picture><img src={user} alt={user} className='allImage w-[65px] h-[65px]'/></picture>
            </div>
            <div>
                <h2 className='text-[22px] font-semibold font-Poppins text-black leading-[24px]'>Arif Momin</h2>
                <span className='text-sm font-normal font-Poppins text-black text-opacity-[85%]'>Online</span>
            </div>
            </div>
            <div>
            <span className='text-2xl text-commonBackground cursor-pointer'><BsThreeDotsVertical/></span>
            </div>
            </div>
            </div>
            <div className='w-full h-[75%] p-5 overflow-y-scroll hide-scrollbar'>
                <div className='flex flex-col gap-y-5 justify-between items-baseline'>
                    <div className='w-full flex justify-starts'>
                    <div className='w-[55%] flex flex-col items-start'>
                <span className='w-fit text-base font-Poppins font-medium text-black px-6 py-3 rounded-lg bg-[#F1F1F1] relative left-message'>Hey There !</span>
                <span className='text-[12px] text-black text-opacity-[25%] font-medium font-Poppins mt-1'>Today, 2:01pm</span>
                </div>
                    </div>
                <div className='w-full flex justify-start'>
                <div className='w-[55%] flex flex-col items-start'>
                <span className='w-fit text-base font-Poppins font-medium text-black px-6 py-3 rounded-lg bg-[#F1F1F1] relative left-message text-wrap'>How are you doing?</span>
                <span className='text-[12px] text-black text-opacity-[25%] font-medium font-Poppins mt-1'>Today, 2:01pm</span>
                </div>
                </div>
                <div className='w-full flex justify-end'>
                <div className='w-[55%] flex flex-col items-end'>
                <span className='w-fit text-base font-Poppins font-medium text-white px-6 py-3 rounded-lg bg-[#5F35F5] relative right-message text-wrap'>How are you doing?</span>
                <span className='text-[12px] text-black text-opacity-[25%] font-medium font-Poppins mt-1'>Today, 2:01pm</span>
                </div>
                </div>
                <div className='w-full flex justify-end'>
                <div className='w-[55%] flex flex-col items-end'>
                <span className='w-fit text-base font-Poppins font-medium text-white px-6 py-3 rounded-lg bg-[#5F35F5] relative right-message text-wrap'>I am good  and hoew about you?</span>
                <span className='text-[12px] text-black text-opacity-[25%] font-medium font-Poppins mt-1'>Today, 2:01pm</span>
                </div>
                </div>
                <div className='w-full flex justify-start'>
                <div className='w-[55%] flex flex-col items-start'>
                <span className='w-fit text-base font-Poppins font-medium text-black px-6 py-3 rounded-lg bg-[#F1F1F1] relative left-message text-wrap'>I am doing well. Can we meet up tomorrow?</span>
                <span className='text-[12px] text-black text-opacity-[25%] font-medium font-Poppins mt-1'>Today, 2:01pm</span>
                </div>
                </div>
                <div className='w-full flex justify-end'>
                <div className='w-[55%] flex flex-col items-end'>
                <span className='w-fit text-base font-Poppins font-medium text-white px-6 py-3 rounded-lg bg-[#5F35F5] relative right-message text-wrap'>Sure!</span>
                <span className='text-[12px] text-black text-opacity-[25%] font-medium font-Poppins mt-1'>Today, 2:01pm</span>
                </div>
                </div>
                </div>
            </div>


              <div className='w-full h-[10%]'>
                <div className=' w-full h-full flex justify-between items-end'>
                <div className='w-[92%] h-[45px] rounded-xl bg-[#F1F1F1] pl-5 pr-3 flex items-center'>
                    <input type="text" placeholder='Type a message' name='message' className='message outline-0 w-[90%] h-full bg-transparent text-base text-black font-Poppins font-medium ' id='message' />
                    <div className='flex gap-x-1 w-[13%] justify-end items-center'>
                    <span className='w-[35px] h-[35px] flex justify-center items-center rounded-md hover:bg-[#e0e0e0db] text-xl text-[#707070] cursor-pointer'><BsEmojiSmile/></span>
                    <span className='w-[35px] h-[35px] flex justify-center items-center rounded-md hover:bg-[#e0e0e0db] text-xl text-[#707070] cursor-pointer'><BsCamera/></span>
                    </div>
                </div>
                <div className='w-[45px] h-[45px] bg-[#5F35F5] rounded-xl flex justify-center items-center cursor-pointer group'>
                    <span className=' text-white text-2xl group-hover:rotate-45 ease-linear duration-200'><IoIosSend /></span>
                </div>
                </div>
              </div>
        </div>
    </div>
  )
}

export default Chat