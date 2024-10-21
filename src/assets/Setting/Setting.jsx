import React, { useEffect, useState } from 'react'
import Search from '../Component/HomePage/HomeRightComponent/Search/Search'
import user from "./SettingImage/user.png"
import { AiFillEdit } from 'react-icons/ai'
import { FaAdjust, FaCheck, FaKey, FaUserEdit } from 'react-icons/fa'
import { MdAddPhotoAlternate, MdDelete, MdModeEdit } from 'react-icons/md'
import { IoMdHelpCircleOutline } from 'react-icons/io'
import { getAuth, updateProfile} from 'firebase/auth'
import { getDatabase, onValue, ref, push, set } from "firebase/database";
import Modal from 'react-modal';
import { Errortoast, successtoast } from '../../../Utils/tostify/tostify'

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '30%',
      padding: '10px 15px 20px 20px',
    },
  };
const Setting = () => {
const auth = getAuth();
const db = getDatabase();


const [userinfo, setuserinfo] = useState([]);
const [NameChange, setNameChange] = useState (false);
const [inputValue, setinputValue] = useState ('');
/**
 * todo: modal implement
 */
    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal() {
      setIsOpen(true);
    }
function closeModal() {
    setIsOpen(false);
    setNameChange(false)
}
// ============= user data fetch
useEffect (() =>{
    const userRef = ref(db, 'users/');
    const userArr = [];
    onValue(userRef, (snapshot) => {
        snapshot.forEach((item) =>{
            if(auth.currentUser.uid === item.val().userUid){
                userArr.push({...item.val(), userkey: item.key});
            }
        });
        setuserinfo(userArr)
    });
}, []);
console.log(userinfo);

// ============handlenameEdit function implement
const handlenameEdit = (() =>{
    setNameChange(!NameChange);
});
const handleinput =((event) =>{
    setinputValue(event.target.value);
});
const handleNameChange = (() =>{
    if(inputValue){
        updateProfile(auth.currentUser, {
            displayName: inputValue
          }).then(() =>{
            setNameChange(false);
            setinputValue('');
            successtoast('Name Change Successful');

          }).catch((error) => {
            Errortoast('empty Name Error')
            console.error("Error updating user name in Firebase Authentication:", error);
          });
    }
});
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
                    <picture><img className='w-full h-full rounded-full object-cover' src={userinfo[0]?.UserPhotoUrl || user} alt={user} /></picture>
                </div>
                <div>
                    <h3 className='text-[22px] text-black font-semibold font-openSans'>{userinfo[0]?.userName ||'Name Missing'}</h3>
                    <h4 className='text-[18px] text-black font-Poppins font-normal'>Stay home stay safe</h4>
                </div>
            </div>
            <div className='mt-14 ml-8 flex flex-col justify-start items-start gap-y-7'>
                <div className='flex justify-start items-center gap-x-4 cursor-pointer'>
                <span className='text-2xl text-black'><AiFillEdit/></span>
                <span className='text-xl text-black font-Poppins font-medium' onClick={openModal}>Edit Profile Name.</span>
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
<div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button className='text-2xl text-red-600 font-medium font-openSans flex justify-end w-full' onClick={closeModal}>X</button>
        <form onSubmit={((e) => e.preventDefault())}>
        <div className='mt-3 flex justify-start items-center gap-x-5'>
                <div className='w-[75px] h-[75px]'>
                    <picture><img className='w-full h-full bg-white rounded-full object-cover' src={userinfo[0]?.UserPhotoUrl || user} alt={user} /></picture>
                </div>
                <div className='w-[75%] flex flex-col gap-y-[6px]'>
                    {NameChange ? (

                        <div className='w-full flex justify-between items-center'>
                        <input className='outline-0 bg-commonBackground bg-opacity-30  h-8 px-3 rounded-md text-xl text-black font-medium font-openSans' value={inputValue} onChange={handleinput} type="text"/>
                        <button className='w-8 h-8 rounded bg-commonBackground bg-opacity-30 flex justify-center items-center text-commonBackground' onClick={handleNameChange}><FaCheck/></button>
                       </div>
                    ) : (
                        <div className='w-full flex justify-between items-center cursor-pointer' onClick={handlenameEdit}>
                        <h3 className='text-[22px] text-black font-semibold font-openSans'>{userinfo[0]?.userName ||'Name Missing'}</h3>
                        <span className='text-xl'><MdModeEdit/></span>
                        </div>
                    )}
                    <h4 className='text-[14px] text-black font-Poppins font-normal'>Stay home stay safe</h4>
                </div>
            </div>
        </form>
      </Modal>
    </div>
    </>
  )
}

export default Setting ;