import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import esmern from "./UserListImage/esmern.png"
import { FaPlus } from 'react-icons/fa'
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { getAuth } from 'firebase/auth';
import moment from "moment";

const UserList = () => {
const auth = getAuth();
const db = getDatabase();
const [userList, setuserList] = useState ([]);
const [FriendRequestList, setFriendRequestList] = useState ([]);

    useEffect (()=>{
        const userRef = ref(db, 'users/');
     onValue(userRef, (snapshot) => {
        const userBlank = [];
        snapshot.forEach((item) =>{
            if (auth.currentUser.uid !== item.val().userUid)
                userBlank.push({
                    ...item.val(),
                    userKey: item.key,
                });     
        });     
        setuserList(userBlank);
});
  }, []);


  useEffect (()=>{
    const FriendRequestref = ref(db, 'FriendRequest/');
 onValue(FriendRequestref, (snapshot) => {
    const FriendRequestArr = [];
    snapshot.forEach((item) =>{
        if (true)
            FriendRequestArr.push(
        item.val().sendFriendRequestuid + item.val().ReceivedFriendRequestuid,
    );     
    });     
    setFriendRequestList(FriendRequestArr);
});
}, []);

  const handleFriendRequiest = (item) =>{
    set(push(ref(db, 'FriendRequest/')), {
        sendFriendRequestuid : auth.currentUser.uid,
        sendFriendRequestUserName : auth.currentUser.displayName,
        sendFriendRequestUserEmail : auth.currentUser.email,
        sendFriendRequestPhotoUrl : auth.currentUser.photoURL?auth.currentUser.photoURL : null,
        
        ReceivedFriendRequestuid : item.userUid,
        ReceivedFriendRequestUserName : item.userName,
        ReceivedFriendRequestUserEmail : item.userEmail,
        ReceivedFriendRequestPhotoUrl : item.UserPhotoUrl?item.UserPhotoUrl : null,
        ReceivedFriendRequestUserKey : item.userKey,
        CreatedAtt : moment().format(" MM, DD, YYYY, h:mm:ss a"),
      });
     
};

  return (
    <div className='w-[32.5%] h-[50vh] bg-white rounded-[20px] drop-shadow-SearchShadow px-5 py-3 flex flex-col gap-y-[10px]'>
    <div className='flex justify-between items-center'>
  <div className='relative'>
  <h2 className='text-xl font-Poppins font-semibold text-black'>User List</h2>
        <span class="absolute top-[-4px] right-[-20px] flex h-5 w-5">
  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-commonBackground opacity-75">
    
  </span>
  <span class="relative rounded-full h-5 w-5 bg-commonBackground text-xs text-white flex justify-center items-center">{userList?.length }</span>
   </span>
   </div>
        <span className='text-xl text-commonBackground cursor-pointer'><BsThreeDotsVertical/></span>
    </div>
    <div className='h-full w-full overflow-y-scroll scrollbar-thin scrollbar-thumb-commonBackground scrollbar-track-gray-200'>
        {userList ?.map ((item)=>(
                        <div className='HomePageAfter' key={item.userUid}>
                        <div>
                            <picture><img src={item.UserPhotoUrl || esmern} alt={item.UserPhotoUrl} className='GroupListImage w-[50px] h-[50px]'/></picture>
                        </div>
                        <div className='flex justify-between items-start w-[75%]'>
                            <div>
                                <h3 className='groupListHeading text-base'>{item.userName || "Name Missing"}</h3>
                                <p className='GroupListSumHeading text-[12px]'>{item.userEmail || "Email missing"}</p>
                            </div>
                            <div>
                                {
                                    FriendRequestList.includes(
                                        auth.currentUser.uid + item.userUid
                                    ) ? <button className='GroupListButton w-[30px] h-[30px] text-[16px]' onClick={()=> handleFriendRequiest(item)}>-</button> :<button className='GroupListButton w-[30px] h-[30px] text-[16px]' onClick={()=> handleFriendRequiest(item)}><FaPlus/></button>
                                }
                            </div>
                        </div>
                    </div>
                        
        ))}

    </div>
  </div>
  )
}

export default UserList

