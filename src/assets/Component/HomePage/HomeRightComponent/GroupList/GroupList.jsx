import React, { useState } from 'react'
import Search from '../Search/Search.jsx'
import {BsThreeDotsVertical } from 'react-icons/bs'
import esmern from "../GroupList/GroupListImage/esmern.png"
import Modal from 'react-modal';
import { RxCross2 } from 'react-icons/rx';

const GroupList = () => {
    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
}
function closeModal() {
    setIsOpen(false);
}
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: '#8080800f',
        padding: '10px 15px 20px 20px',
    },
  };
  return (
    <div className='w-[32.5%]'>
        <div className=' mb-5'>
            <Search/>
        </div>
    <div className=' bg-white  rounded-[20px] drop-shadow-SearchShadow px-5 py-3 flex flex-col gap-y-[10px]'>
        <div className='flex justify-between items-center'>
            <h2 className='text-xl font-Poppins font-semibold text-black'>Groups List</h2>
            <span className='text-xl text-commonBackground cursor-pointer' onClick={openModal}><BsThreeDotsVertical/></span>
        </div>
        <div className=' w-full h-[31vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-commonBackground scrollbar-track-gray-200'>
            {[...new Array (10)].map ((_, index)=>(
                            <div className='' key={index}>
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
    <div>
        <Modal className={""}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button className='text-3xl text-red-600 w-full h-full flex justify-end' onClick={closeModal}><RxCross2/></button>
        <h2 className='text-2xl text-commonBackground font-openSans font-semibold mb-2'>Group Information</h2>
        <form className='w-full max-w-[600px]'>
            <label className='text-base text-black font-Poppins font-medium' htmlFor="GroupName">Group Name<span className='text-xl text-red-600'>*</span></label>
          <input className='w-full h-full px-4 py-3 rounded-xl outline-0 mt-1 mb-3 border-[1px] border-red-400' type="text" placeholder='GroupName' id='GroupName' name='GroupName'/>
          <label className='text-base text-black font-Poppins font-medium' htmlFor="GroupName">Group Name<span className='text-xl text-red-600'>*</span></label>
          <input className='w-full h-full px-4 py-3 rounded-xl outline-0 mt-1 mb-3 border-[1px] border-red-400' type="text" placeholder='GroupName' id='GroupName' name='GroupName'/>
          <label className='text-base text-black font-Poppins font-medium' htmlFor="GroupName">Group Name<span className='text-xl text-red-600'>*</span></label>
          <input className='w-full h-full px-4 py-3 rounded-xl outline-0 mt-1 mb-3 border-[1px] border-red-400' type="text" placeholder='GroupName' id='GroupName' name='GroupName'/>
        <button className='w-[150px] h-[50px] bg-white rounded-xl border-[2px] border-gray-300 flex justify-center items-center mt-4 text-base font-Poppins font-medium text-black'>Create Group</button>
        </form>
      </Modal>
    </div>
    </div>
  )
}

export default GroupList