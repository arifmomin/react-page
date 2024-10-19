import React, { useEffect, useState } from 'react'
import { IoIosSend } from 'react-icons/io'
import EmojiPicker from 'emoji-picker-react';
import { getDatabase, onValue, ref, push, set } from "firebase/database";
import esmern from "../../../Component/HomePage/HomeRightComponent/GroupList/GroupListImage/esmern.png"
import { getAuth } from 'firebase/auth'
import moment from 'moment'
import Modal from 'react-modal';
import { VscSend } from 'react-icons/vsc'
import { useDispatch, useSelector } from 'react-redux'
import { BsCamera, BsEmojiSmile, BsThreeDotsVertical } from 'react-icons/bs'
import { getStorage, ref as uploadref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '10px 15px 20px 20px',
      width: '60%'
    },
  };
const ChatRight = () => {
    const auth = getAuth();
    const db = getDatabase();
    const [Emoji, setEmoji] = useState (false);
    const [message, setmessage] = useState ("");
    const [modalIsOpen, setIsOpen] = useState(false);
    const [image, setimage] = useState('');
    function openModal() {
        setIsOpen(true);
      }
      function closeModal() {
        setIsOpen(false);
      }
    
    const {friendinfo} = useSelector ((state) =>(state.friend));
    const handleSendMessage = () =>{
        if(friendinfo){
            set(push(ref(db, 'sendMessage/')), {
                whoSendMessageUid: auth.currentUser.uid,
                whoSendMessageName: auth.currentUser.displayName,
                whoSendMessageEmail: auth.currentUser.email,
                whoSendMessageProfilePic : auth.currentUser.photoURL,
                Message: message,
                image:image? image : null,
                whoReceiveMessageUid: friendinfo.id,
                whoReceiveMessageName: friendinfo.name,
                whoReceiveMessageEmail: friendinfo.email,
                whoReceiveMessageProfilePicture: friendinfo.profilePhoto,
                CreatedAt: moment().format("MM, DD, YYYY, h:mm:ss a"),
              }).then(() =>{
                console.log('all done');
              }).catch((err) =>{
                console.error.log('error', err);
              }).finally(() =>{
                setmessage('')
              });
        }
    };
    console.log(friendinfo);    
 // handle emoji icon
 const handleEmoji = () =>{
    setEmoji (!Emoji);
}    
// ===========handleemojiclick function implement
const handleemojiclick = ((event) =>{
    setmessage((prev) =>{
    return `${prev}${event?.emoji}`;
});
});
        // ==========handleInputValue function implement
const handleInputValue = ((event) =>{
    const {value} = event.target;  
    setmessage(value);
});
// =============handleimagepicker function implement
let sendInputImage = null
    const handleImagePicker = ((event) =>{
     sendInputImage = event.target.files[0];
});
   
//  ====================== Handle send message
const handleSendImage = (() =>{
    if(!sendInputImage){
      console.log('select a image');
    }else{
      const storage = getStorage();
      const storageRef = uploadref(storage, 'images/' + sendInputImage.name);
      const uploadTask = uploadBytesResumable(storageRef, sendInputImage);
      
      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          closeModal();
        }, 
        (error) => {
          console.error('image upload error', error);
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setimage( downloadURL);
          });
        }
      );
    };
  });

  return (
    <>
            <div className='w-full h-full bg-white flex flex-col justify-between drop-shadow-SearchShadow rounded-[20px] p-5 pl-6'>
            <div className='w-full h-[15%]'>
            <div className='flex justify-between items-center relative after:absolute after:w-[95%] after:h-[1px] after:opacity-[25%] after:bg-black after:bottom-[-15px] after:left-[22px]'>
            <div className='flex gap-x-5 items-center'>
            <div>
                <picture><img src={friendinfo.profilePhoto|| esmern} alt={esmern} className='allImage w-[65px] h-[65px]'/></picture>
            </div>
            <div>
                <h2 className='text-[22px] font-semibold font-Poppins text-black leading-[24px]'>{friendinfo.name || 'No One'}</h2>
                <span className='text-sm font-normal font-Poppins text-black text-opacity-[85%]'>Online</span>
            </div>
            </div>
            <div>
            <span className='text-2xl text-commonBackground cursor-pointer'><BsThreeDotsVertical/></span>
            </div>
            </div>
            </div>
            <div className='w-full h-[75%] p-5 overflow-y-scroll hide-scrollbar background-img'>
                <div className='flex flex-col gap-y-5 justify-between items-baseline'>
                    <div className='w-full flex justify-starts'>
                    <div className='w-[55%] flex flex-col items-start'>
                <span className='w-fit text-base font-Poppins font-medium text-black px-6 py-3 rounded-lg bg-[#F1F1F1] relative left-message'>Hi there</span>
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
                    <input type="text" placeholder='Type a message' name='message' className='message outline-0 w-[90%] h-full bg-transparent text-base text-black font-Poppins font-medium ' id='message' value={message} onChange={handleInputValue}/>
                    <div className='flex gap-x-1 w-[13%] justify-end items-center'>
                    <div className='relative'>
                    {
                            Emoji && <span className='absolute bottom-[40px] right-0'><EmojiPicker onEmojiClick={handleemojiclick}/></span>
                        }
                        <span className='w-[35px] h-[35px] flex justify-center items-center rounded-md hover:bg-[#e0e0e0db] text-xl text-[#707070] cursor-pointer' onClick={handleEmoji}><BsEmojiSmile/></span>
                    </div>                    
                    <div><span className='w-[35px] h-[35px] flex justify-center items-center rounded-md hover:bg-[#e0e0e0db] text-xl text-[#707070] cursor-pointer' onClick={openModal}><BsCamera/></span></div>
                    </div>
                    
                </div>
                <div className='w-[45px] h-[45px] bg-[#5F35F5] rounded-xl flex justify-center items-center cursor-pointer group'>
                    <span className=' text-white text-2xl group-hover:rotate-45 ease-linear duration-200' onClick={handleSendMessage}><IoIosSend /></span>
                </div>
                </div>
              </div>
        </div>
        <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button className='w-full h-full flex justify-end text-2xl text-red-600 font-medium font-openSans' onClick={closeModal}>X</button>

        <form onSubmit={(e) =>{e.preventDefault()}}>
        <div className="flex items-center justify-center w-full mt-5">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64  rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-200 hover:bg-gray-100 dark:hover:bg-gray-300">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-200 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                    </svg>
                    <p className="mb-2 text-sm text-gray-200 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" onChange={handleImagePicker}/>
            </label>
        </div>
        <div className='w-full h-full flex justify-end items-center mt-6'>
                    <button className='w-[42px] h-[38px] flex justify-center items-center bg-[#5F35F5] hover:bg-opacity-80 cursor-pointer rounded-md  text-white text-xl ease-linear duration-200' onClick={handleSendImage}><VscSend/></button>
         </div>
        </form>
      </Modal>
    </div>
    </>
  )
}

export default ChatRight