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
            if(auth.currentUser.uid === item.val().ReceivedFriendRequestuid){
                BlocklistArr.push({...item.val(), blockedkey: item.key})  
            }else if(auth.currentUser.uid === item.val().sendFriendRequestuid){
                BlocklistArr.push({...item.val(), blockedkey: item.key})  
            }
        }
    )
        setBlockList (BlocklistArr);
    });
}, [])

/**
 * todo : UnblockUser function implement
 */
const UnblockUser = (item = {}) => {
    console.log(item);
    
    const db = getDatabase();
    const friendsRef = ref(db, 'Friends/');
    set(push(friendsRef), {
        ...item, // Spread the item object to include all its properties
        CreatedAt: moment().format("MM, DD, YYYY, h:mm:ss a"),
    })
    .then(() => {
        const removeFriend = ref(db, "BlockedUser/" + item.blockedkey);
    remove(removeFriend)
        .then(() => {
            console.log('Friend removed successfully');
        })
        .catch((error) => {
            console.error('Error removing friend:', error);
        });
    })
    .catch((error) => {
        console.error("Error unblocking user:", error);
    });
};


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
  <div className='h-full w-full overflow-y-scroll hide-scrollbar'>
      {BlockList?.length > 0 ? (BlockList?.map ((item)=>(
                      <div>
                      <div className='HomePageAfter'>
                        <div className='flex gap-x-2 items-center'>
                        <div>
                          <picture><img src={auth.currentUser.photoURL === item.sendFriendRequestPhotoUrl ? item.ReceivedFriendRequestPhotoUrl : auth.currentUser.photoURL === item.ReceivedFriendRequestPhotoUrl ? item.sendFriendRequestPhotoUrl : esmern} alt={esmern} className='allImage'/></picture>
                      </div>
                          <div>
                              <h3 className='allHeading'>{auth.currentUser.displayName === item.sendFriendRequestUserName ? item.ReceivedFriendRequestUserName : auth.currentUser.displayName === item.ReceivedFriendRequestUserName ? item.sendFriendRequestUserName : "No One"}</h3>
                              <p className='allSubHeading'>{moment(item.CreatedAt).toNow()}</p>
                          </div>
                        </div>
                          <div>
                              <button className='GroupListButton text-base w-[94px]' onClick={(() => { UnblockUser (item)})}>Unblock</button>
                          </div>
                  </div>
                      </div>
      ))) : (<div className='w-full h-full flex justify-center items-center'>
        <div className=' text-base text-red-400 font-Nunito font-medium'>"Your block list is currently empty."

        </div>
              </div>
) }

  </div>
</div>
  )
}

export default BlockedUser