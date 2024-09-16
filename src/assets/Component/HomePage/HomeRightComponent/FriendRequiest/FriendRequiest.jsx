import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import user from "./FriendRequiestImage/user.png"
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { getAuth } from 'firebase/auth';
import moment from "moment";
const FriendRequiest = () => {
const auth = getAuth();
const db = getDatabase();
const [FriendRequestList, setFriendRequestList] = useState ([]);

useEffect (()=>{
    const FriendRequestref = ref(db, 'FriendRequest/');
 onValue(FriendRequestref, (snapshot) => {
    const FriendRequestArr = [];
    snapshot.forEach((item) =>{
        if (auth.currentUser.uid === item.val().ReceivedFriendRequestuid)
            FriendRequestArr.push(
        {
            ...item.val(), FriendRequestKey: item.key
        }
    );     
    });   
    
    setFriendRequestList(FriendRequestArr);
});

}, []);

console.log(FriendRequestList);

  return (
    <div className='w-[32.5%] h-[43vh] bg-white rounded-[20px] drop-shadow-SearchShadow px-5 py-3 flex flex-col gap-y-[10px]'>
    <div className='flex justify-between items-center'>
  <div className='relative'>
  <h2 className='text-xl font-Poppins font-semibold text-black'>Friend Request</h2>
        <span class="absolute top-[-4px] right-[-20px] flex h-5 w-5">
  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-commonBackground opacity-75">
    
  </span>
  <span class="relative rounded-full h-5 w-5 bg-commonBackground text-xs text-white flex justify-center items-center">{FriendRequestList?.length }</span>
   </span>
   </div>
        <span className='text-xl text-commonBackground cursor-pointer'><BsThreeDotsVertical/></span>
    </div>
    <div className='h-full w-full overflow-y-scroll scrollbar-thin scrollbar-thumb-commonBackground scrollbar-track-gray-200'>
        {FriendRequestList?.map ((item)=>(
                        <div key={item.FriendRequestKey}>
                        <div className='HomePageAfter'>
                        <div>
                            <picture><img src={item.sendFriendRequestPhotoUrl || user} alt={item.sendFriendRequestPhotoUrl || user} className='GroupListImage '/></picture>
                        </div>
                        <div className='flex justify-between items-start w-[75%]'>
                            <div>
                                <h3 className='groupListHeading capitalize'> {item.sendFriendRequestUserName}</h3>
                                <p className='GroupListSumHeading'>{item.sendFriendRequestUserEmail}</p>
                            </div>
                            <div className='flex justify-center items-center gap-x-1'>
                                <button className='GroupListButton w-[60px] text-[14px]'>Confirm</button>
                                <button className='GroupListButton w-[60px] text-[14px] bg-gray-500'>Delete</button>
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