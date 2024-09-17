import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import esmern from "./BlockedUserImage/esmern.png"
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import moment from 'moment';

const BlockedUser = () => {
    const auth = getAuth();
    const db = getDatabase();
    const [BlockList, setBlockList] = useState ([]);

useEffect(()=>{
    const starCountRef = ref(db, 'BlockedUser/');
    onValue(starCountRef, (snapshot) => {
        const BlocklistArr = [];
        snapshot.forEach((item) =>{
            if(auth.currentUser.uid === item.val().ReceivedFriendRequestuid)
                BlocklistArr.push({...item.val(),})  
        })
        setBlockList (BlocklistArr);
    });
    console.log(BlockList);
}, [])




  return (
    <div className='w-[32.5%] h-[43vh] bg-white rounded-[20px] drop-shadow-SearchShadow px-5 py-3 flex flex-col gap-y-[10px]'>
  <div className='flex justify-between items-center'>
<div className='relative'>
<h2 className='text-xl font-Poppins font-semibold text-black'>Blocked Users</h2>
      <span class="absolute top-[-4px] right-[-20px] flex h-5 w-5">
  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-commonBackground opacity-75">
    
  </span>
  <span class="relative rounded-full h-5 w-5 bg-commonBackground text-xs text-white flex justify-center items-center">{BlockList?.length }</span>
   </span>
</div>
      <span className='text-xl text-commonBackground cursor-pointer'><BsThreeDotsVertical/></span>
  </div>
  <div className='h-full w-full overflow-y-scroll scrollbar-thin scrollbar-thumb-commonBackground scrollbar-track-gray-200'>
      {BlockList?.map ((item)=>(
                      <div>
                      <div className='HomePageAfter'>
                      <div>
                          <picture><img src={item.sendFriendRequestPhotoUrl || esmern} alt={esmern} className='GroupListImage w-[50px] h-[50px]'/></picture>
                      </div>
                      <div className='flex justify-between items-start w-[75%]'>
                          <div>
                              <h3 className='groupListHeading text-base'>{item.sendFriendRequestUserName || "No One"}</h3>
                              <p className='GroupListSumHeading text-[12px]'>{moment(item.CreatedAt).toNow()}</p>
                          </div>
                          <div>
                              <button className='GroupListButton text-base w-[94px]'>Unblock</button>
                          </div>
                      </div>
                  </div>
                      </div>
      ))}

  </div>
</div>
  )
}

export default BlockedUser