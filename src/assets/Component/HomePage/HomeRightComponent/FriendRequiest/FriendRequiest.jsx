import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import user from "./FriendRequiestImage/user.png"
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
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
/**
 * todo : handleAcceptFndReq button implement
 * @param {(item)}
 */
const handleAcceptFndReq = ((item)=>{
    set(push (ref(db, "Friends/")),{
        ...item,
        CreatedAt: moment().format("MM, DD, YYYY, h:mm:ss a"),        
        FriendRequestKey : null,
        ReceivedFriendRequestPhotoUrl : auth.currentUser.photoURL,
    }).then(()=>{
        const FriendReqRef = (ref(db, "FriendRequest/" + item.FriendRequestKey))
        remove(FriendReqRef);
    });
});



/**
 * todo : HandleRejectFndReq button implement
 * @param {(item)}
 */
const HandleRejectFndReq = (item)=>{
    const removeFndReq = (ref(db, "FriendRequest/" + item.FriendRequestKey))
    remove(removeFndReq);
};

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
    <div className='h-full w-full overflow-y-scroll hide-scrollbar'>
        {FriendRequestList?.length > 0 ? (FriendRequestList?.map ((item)=>(
                        <div key={item.FriendRequestKey}>
                        <div className='HomePageAfter'>
                            <div className='flex gap-x-2 items-center'>
                            <div className='w-[50px]'>
                            <picture><img src={item.sendFriendRequestPhotoUrl || user} alt={item.sendFriendRequestPhotoUrl || user} className='allImage '/></picture>
                        </div>
                            <div>
                                <h3 className='allHeading'> {item.sendFriendRequestUserName}</h3>
                                <p className='allSubHeading'>{item.sendFriendRequestUserEmail}</p>
                            </div>
                            </div>
                        <div className='flex justify-between items-start'>
                            <div className='flex justify-center items-center gap-x-1'>
                                <button className='GroupListButton w-[60px] text-[12px]' onClick={(()=> handleAcceptFndReq (item))}>Confirm</button>
                                <button className='GroupListButton w-[60px] text-[12px] bg-[#D8DADF] text-black text-opacity-55' onClick={()=> HandleRejectFndReq (item)}>Delete</button>
                            </div>
                        </div>
                    </div>
                        </div>
        ))) : (<div className='w-full h-full flex justify-center items-center'>
<div className=' text-base text-red-400 font-Nunito font-medium'>"You currently have no pending friend requests."
</div>
      </div>) }

    </div>
</div>
  )
}

export default FriendRequiest