import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import user from "./FriendsImage/user.png"
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import moment from 'moment';

const Friends = () => {
    const auth = getAuth();
    const db = getDatabase();
    const [FriendList, setFriendList] = useState ([]);

    useEffect(()=>{
        const starCountRef = ref(db, 'Friends/');
      onValue(starCountRef, (snapshot) => {
        const FriendsArr = [];
        snapshot.forEach((item)=>{
            if (auth.currentUser.uid === item.val().ReceivedFriendRequestuid) {
                
                FriendsArr.push({...item.val(), friendkey : item.key }); 
            }
        })
        setFriendList(FriendsArr);
        
    });
}, []);

/**
 * todo : handleBlocked function emplement
 */
const handleBlocked =(item = {})=>{
    console.log(item);
    const BlockedUserref = ref(db, "BlockedUser/");
    set(push(BlockedUserref), item);
    const removeFriend = ref(db, "Friends/" + item.friendkey)
    remove (removeFriend);
};

  return (
        <div className='h-[50vh] w-[32.5%] bg-white rounded-[20px] drop-shadow-SearchShadow px-5 py-3 flex flex-col gap-y-[10px]'>
        <div className='flex justify-between items-center'>
        <div className='relative'>
        <h2 className='text-xl font-Poppins font-semibold text-black'>Friends</h2>
            <span class="absolute top-[-4px] right-[-20px] flex h-5 w-5">
  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-commonBackground opacity-75">
    
  </span>
  <span class="relative rounded-full h-5 w-5 bg-commonBackground text-xs text-white flex justify-center items-center">{FriendList?.length }</span>
   </span>
        </div>
            <span className='text-xl text-commonBackground cursor-pointer'><BsThreeDotsVertical/></span>
        </div>
        <div className=' overflow-y-scroll scrollbar-thin scrollbar-thumb-commonBackground scrollbar-track-gray-200 '>
            {FriendList?.map ((item)=>(
                            <div key={item.key}>
                            <div className='HomePageAfter'>
                            <div>
                                <picture><img src={item.sendFriendRequestPhotoUrl || user} alt={user} className='w-[50px] h-[50px] GroupListImage'/></picture>
                            </div>
                            <div className='flex justify-between items-start w-[75%]'>
                                <div>
                                    <h3 className='groupListHeading text-base'>{item? item.sendFriendRequestUserName : "No One"}</h3>
                                    <p className='text-[12px] GroupListSumHeading'>{moment(item.CreatedAt).toNow()}</p>
                                </div>
                                <div>
                                    <button className='GroupListButton bg-red-500' onClick={(()=> handleBlocked(item))}>Block</button>
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