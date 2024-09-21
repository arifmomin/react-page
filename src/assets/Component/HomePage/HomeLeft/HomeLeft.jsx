import React, { useEffect, useState } from 'react'
import userPhoto from "./HomePageImage/userPhoto.png"
import { TbCloudUpload, TbLogout } from 'react-icons/tb'
import {  IoSettingsOutline } from 'react-icons/io5'
import { SlHome } from 'react-icons/sl'
import { AiFillMessage } from 'react-icons/ai'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { Link, useLocation,} from 'react-router-dom'
import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";
import { getAuth, updateProfile  } from 'firebase/auth'
import { getDatabase, ref, onValue, update } from "firebase/database";

const uploader = Uploader({
  apiKey: "free"
});
const options = { multi: true,mime: "image/*" };
const HomeLeft = () => {
  const auth =getAuth();
  const db = getDatabase();
  const [user, setuser] = useState ({});
  const location = useLocation ();

  
  useEffect (()=>{
    const getUserData = ()=>{
      const starCountRef = ref(db, 'users/');
      onValue(starCountRef, (snapshot) => {
        snapshot.forEach ((item)=>{
          if(auth.currentUser.uid === item.val().userUid){
            setuser({ ...item.val(), userKey : item.key});
          }
        })
      });
    }
    getUserData ();
  },[]); 
  return (
<div>
<div className='bg-commonBackground w-[186px] h-[95vh] flex flex-col items-center gap-y-[50px] rounded-[20px]'>
  <div className='flex flex-col items-center justify-center gap-y-2 rounded-full mt-9 '>
<div className='relative cursor-pointer group'>
<picture><img src={user && user.UserPhotoUrl ? user.UserPhotoUrl : userPhoto} alt={userPhoto} className='w-[100px] h-[100px] rounded-full bg-white object-cover transition-opacity duration-200 group-hover:opacity-50'/>
<UploadButton uploader={uploader}
                options={options}
                onComplete={(files)=>
                  
                  update (ref(db, "users/" + user.userKey), {
                    UserPhotoUrl : (files[0].fileUrl)
                  }).then(()=>{
                    updateProfile  (auth.currentUser, {
                      photoURL: files[0].fileUrl,
                    })
                    console.log(PhotoUrl);
                  })
                }>
    {({onClick}) =>
      <button onClick={onClick}>
        <span className='absolute top-[26%] left-[33%] text-[36px] text-white opacity-0 transition-opacity duration-200 ease-linear group-hover:opacity-100'><TbCloudUpload/></span>
      </button>
    }
  </UploadButton>
</picture>

</div>
    <h1 className='text-xl text-center font-openSans font-semibold text-white'>{user && user.userName ? user.userName : "Name Missing"}</h1>
  </div>
  <div className='w-full'>
    <ul className='flex flex-col items-center'>
      <li className={`text-[36px] cursor-pointer relative py-5 text-[#BAD1FF] w-full flex justify-center items-center z-[0] ${location.pathname === "/" && " text-commonBackground before:absolute before:top-0 before:right-0 before:bg-white before:w-[90%] before:h-full before:rounded-l-2xl before:z-[-999] after:absolute after:top-[0px] after:right-[0px] after:w-2 after:h-full after:bg-commonBackground after:rounded-l-3xl after:drop-shadow-custom"}`}>
        <Link className='w-full h-full flex justify-center items-center' to={"/"}>
        <SlHome/>
        </Link>
      </li>
      <li className={`text-[36px] cursor-pointer relative py-5 text-[#BAD1FF] w-full flex justify-center items-center z-[0] ${location.pathname === "/Chat" && " text-commonBackground before:absolute before:top-0 before:right-0 before:bg-white before:w-[90%] before:h-full before:rounded-l-2xl before:z-[-999] after:absolute after:top-[0px] after:right-[0px] after:w-2 after:h-full after:bg-commonBackground after:rounded-l-3xl after:drop-shadow-custom"}`}>
        <Link className='w-full h-full flex justify-center items-center' to={"/Chat"}>
        <AiFillMessage/>
        </Link>
      </li>
      <li className={`text-[36px] cursor-pointer relative py-5 text-[#BAD1FF] w-full flex justify-center items-center z-[0] ${location.pathname === "/Notification" && " text-commonBackground before:absolute before:top-0 before:right-0 before:bg-white before:w-[90%] before:h-full before:rounded-l-2xl before:z-[-999] after:absolute after:top-[0px] after:right-[0px] after:w-2 after:h-full after:bg-commonBackground after:rounded-l-3xl after:drop-shadow-custom"}`}>
        <Link className='w-full h-full flex justify-center items-center' to={"/Notification"}>
        <IoMdNotificationsOutline/>
        </Link>
      </li>
      <li className={`text-[36px] cursor-pointer relative py-5 text-[#BAD1FF] w-full flex justify-center items-center z-[0] ${location.pathname === "/Setting" && " text-commonBackground before:absolute before:top-0 before:right-0 before:bg-white before:w-[90%] before:h-full before:rounded-l-2xl before:z-[-999] after:absolute after:top-[0px] after:right-[0px] after:w-2 after:h-full after:bg-commonBackground after:rounded-l-3xl after:drop-shadow-custom"}`}>
      <Link className='w-full h-full flex justify-center items-center' to={"/Setting"}>
      <IoSettingsOutline/>
        </Link>
        </li>
    </ul>
  </div>
  <div>
    <span className='text-[38px] text-[#BAD1FF]'><TbLogout/></span>
  </div>
  </div>

</div>
  )
}

export default HomeLeft