import React, { useEffect, useState } from 'react'
import Search from '../Component/HomePage/HomeRightComponent/Search/Search'
import user from "./SettingImage/user.png"
import { AiFillEdit } from 'react-icons/ai'
import { FaAdjust, FaCheck, FaKey, FaUserEdit } from 'react-icons/fa'
import { MdAddPhotoAlternate, MdDelete, MdModeEdit } from 'react-icons/md'
import { IoMdHelpCircleOutline } from 'react-icons/io'
import { getAuth, signOut, updateProfile} from 'firebase/auth'
import { getDatabase, onValue, ref, push, update, child, set, remove } from "firebase/database";
import Modal from 'react-modal';
import { Errortoast, successtoast } from '../../../Utils/tostify/tostify'
import { UploadButton } from "react-uploader";
import { Uploader } from "uploader";
import { FiAlertTriangle } from 'react-icons/fi'
import { Link, useLocation,} from 'react-router-dom'
const uploader = Uploader({
    apiKey: "free"
  });
  const options = { multi: true,mime: "image/*" };
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
    function openModalForName() {
      setIsOpen(true);
    }
function closeModal() {
    setIsOpen(false);
    setNameChange(false)
    setaccountDeletemodalIsOpen(false);
}
// ================== Edite status info modal
const [statusmodalIsOpen, setstatusmodalIsOpen] = useState(false);
const [accountDeletemodalIsOpen, setaccountDeletemodalIsOpen] = useState(false);
const [StatusInfo, setStatusInfo] = useState(false);
const [statusInfoValue, setstatusInfoValue] = useState ('');
function openModalForStatus() {
    setstatusmodalIsOpen(true);
}
function closeModalForStatus() {
    setstatusmodalIsOpen(false);
    setStatusInfo(false)
};
const handleStatusEdit = (() =>{
    setStatusInfo(!StatusInfo)
});
const handleStatusInput = ((event) =>{
    setstatusInfoValue(event.target.value);
});
console.log(statusInfoValue);

// ================account delete 

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
let userinformation = userinfo.find((item) => item.TagName);
console.log();

// ==================== user data push
const handleStatusInfoChange = () =>{
    const userID = userinfo[0].userkey;
    const ProfileStatusTag = statusInfoValue;
    const updates = {};
    updates [`users/${userID}/TagName`] = ProfileStatusTag;
    update(ref(db), updates)
    .then(() =>{
        setStatusInfo(!StatusInfo);
        console.log('Tag name Change Successful');
    }).catch((error) =>{
        console.log(error);
    });
};

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
            const userID = userinfo[0].userkey;
            const ProfileStatusTag = inputValue;
            const updates = {};
            updates [`users/${userID}/userName`] = ProfileStatusTag;
            update(ref(db), updates)
          }).then(() =>{
            setNameChange(false);
            setinputValue('')
            successtoast('Name Change Successful')
            console.log('Tag name Change Successful');
        }).catch((error) => {
            Errortoast('empty Name Error');
          });
    }
});
// ================account delete modal 
const DeletemodalIsOpen = (() =>{
    setaccountDeletemodalIsOpen(true);
});
// ================account delte function implement
const handleDeleteAccount = () => {
    const accountDelete = (ref(db, 'users/' + userinfo[0].userkey));
    remove(accountDelete)
    .then(() =>{
        signOut(auth);
        successtoast('Delete Account Successful');
    }).catch(() =>{
        Errortoast('something wrong');
    })
  };
// ================= cancle function implement
const handleCancle = (() =>{
    setaccountDeletemodalIsOpen(false);
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
                    <h3 className='text-[22px] text-black font-semibold font-openSans'>{userinfo[0]?.userName ||'Name Missing'}</h3>{userinformation?.TagName ? userinformation?.TagName : <h4 className='text-[18px] text-black font-Poppins font-normal'>Stay home stay safe</h4>}
                    
                </div>
            </div>
            <div className='mt-14 ml-8 flex flex-col justify-start items-start gap-y-7'>
                <div className='flex justify-start items-center gap-x-4 cursor-pointer'>
                <span className='text-2xl text-black'><AiFillEdit/></span>
                <span className='text-xl text-black font-Poppins font-medium' onClick={openModalForName}>Edit Profile Name.</span>
                </div>
                <div className='flex justify-start items-center gap-x-4 cursor-pointer'>
                <span className='text-2xl text-black'><FaUserEdit/></span>
                <span className='text-xl text-black font-Poppins font-medium' onClick={openModalForStatus}>Edit Profile Status Info.</span>
                </div>
                <div>
                <UploadButton uploader={uploader}
                options={options}
                onComplete={(files)=>
                  update (ref(db, `users/${userinfo[0].userkey}`), {
                    UserPhotoUrl : (files[0].fileUrl)
                  }).then(()=>{
                    updateProfile  (auth.currentUser, {
                      photoURL: files[0].fileUrl,
                    })
                    console.log(PhotoUrl);
                  })
                }>
    {({onClick}) =>
    <button className='flex justify-start items-center gap-x-4 cursor-pointer' onClick={onClick}>
         <span className='text-2xl text-black'><MdAddPhotoAlternate/></span>
         <span className='text-xl text-black font-Poppins font-medium'>Edit Profile Photo.</span>
    </button>                
    }
  </UploadButton>
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
                <span className='text-xl text-black font-Poppins font-medium' onClick={DeletemodalIsOpen}>Delete Account.</span>
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
            <Modal
        isOpen={statusmodalIsOpen}
        onRequestClose={closeModalForStatus}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button className='text-2xl text-red-600 font-medium font-openSans flex justify-end w-full' onClick={closeModalForStatus}>X</button>
        <form onSubmit={((e) => e.preventDefault())}>
        <div className='mt-3 flex justify-start items-center gap-x-5'>
                <div className='w-[75px] h-[75px]'>
                    <picture><img className='w-full h-full bg-white rounded-full object-cover' src={userinfo[0]?.UserPhotoUrl || user} alt={user} /></picture>
                </div>
                <div className='w-[75%] flex flex-col gap-y-[6px]'>
                    <h3 className='text-[22px] text-black font-semibold font-openSans'>{userinfo[0]?.userName ||'Name Missing'}</h3>
                    {StatusInfo ? (
                        <div className='w-full flex justify-between items-center'>
                        <input className='outline-0 bg-commonBackground bg-opacity-30  h-7 px-3 rounded-md text-base text-black font-medium font-openSans w-[87%]' onChange={handleStatusInput} type="text"/>
                        <button className='w-7 h-7 rounded bg-commonBackground bg-opacity-30 flex justify-center items-center text-commonBackground'onClick={handleStatusInfoChange}><FaCheck/></button>
                       </div>
                    ) : (
                        <div>
                    <div className='w-full flex justify-between items-center cursor-pointer'onClick={handleStatusEdit}>
                    <h4 className='text-[14px] text-black font-Poppins font-normal'>{'Stay home stay safe'}</h4>
                    <span className='text-xl'><MdModeEdit/></span>
                    </div>
                        </div>
                    )

                    }
                </div>
            </div>
        </form>
      </Modal>
      <Modal
        isOpen={accountDeletemodalIsOpen}
        onRequestClose={closeModal}
        style={{
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                width: '35%',
                padding: '10px 15px 20px 20px',
              },
        }}
        contentLabel="Example Modal"
      >
        <button className='text-2xl text-red-600 font-medium font-openSans flex justify-end w-full' onClick={closeModal}>X</button>
        <form onSubmit={((e) => e.preventDefault())}>
            <div className='flex justify-start items-start gap-x-5'>
                <div className='flex h-12 w-12 items-center justify-center rounded-full bg-red-100'><span className='mx-auto text-2xl mb-1 text-red-600'><FiAlertTriangle/></span></div>
                <div className='w-[85%]'>
                    <h2 className='text-base font-semibold text-gray-900'>Delete Account</h2>
                    <p className='text-wrap'>Are you sure you want to delete your account? All of your data will be permanently removed. This action cannot be undone.</p>
                </div>
            </div>
            <div class="pt-6 w-full flex justify-end gap-x-3 pr-3">
            <button className='w-[80px] h-[40px] text-base text-black flex justify-center transition duration-100 ease-in-out hover:bg-gray-50 items-center bg-transparent border-2 border-gray-400 rounded-md' onClick={handleCancle}>Cancle</button>
          <Link className='w-[90px] h-[40px] text-base text-white flex justify-center transition duration-100 ease-in-out hover:bg-red-500 items-center bg-red-600 rounded-md' to={'/Registration'}  onClick={handleDeleteAccount}>Delete</Link>
        </div>
        </form>
      </Modal>
    </div>
    </>
  )
}

export default Setting ;