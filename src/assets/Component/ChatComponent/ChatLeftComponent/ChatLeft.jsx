import React, { useEffect, useState } from 'react'
import Search from '../../HomePage/HomeRightComponent/Search/Search'
import { BsThreeDotsVertical } from 'react-icons/bs'
import esmern from "../../../Component/HomePage/HomeRightComponent/GroupList/GroupListImage/esmern.png"
import { getDatabase, onValue, ref, push, set } from "firebase/database";
import { getAuth } from 'firebase/auth'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import {friendsAction} from '../../../../Redux/Features/FriendSlice'
const ChatLeft = () => {
    const auth = getAuth();
    const db = getDatabase();
    const Dispatch = useDispatch();
    const [allGroupList, setallGroupList] = useState([]);
    const [allFriend, setallFriend] = useState([]);
        /**
     * todo: firebase data 
     */
        useEffect(()=>{
            const GroupListRef = ref(db, 'Groups/');
            onValue(GroupListRef, (snapshot) => {
            const GroupBlankArr = [];
            snapshot.forEach((item) =>{
                if(item.val().WhoCreateGroupUid !== auth.currentUser.uid){
                    GroupBlankArr.push({...item.val(), Groupkey: item.key})
                }
            });
            setallGroupList(GroupBlankArr);
    });
        }, []);
        console.log(allGroupList);
        
    /**
     * todo: firebase Friend datafatch
     */
    useEffect(() =>{
        const friendsref = ref(db, 'Friends/');
        onValue(friendsref, (snapshot) =>{
            const FriendsArr = [];
            snapshot.forEach((item) =>{
                if(auth.currentUser.uid === item.val().sendFriendRequestuid){
                    FriendsArr.push({...item.val(), friendkey : item.key});
                }else if(auth.currentUser.uid === item.val().ReceivedFriendRequestuid){
                    FriendsArr.push({...item.val(), friendkey : item.key});
                }
                            
            });
            setallFriend(FriendsArr);
        });
    }, []);
    // ================ Redux Dispatch data
    const handleFriends = (item = {}) =>{
        if(auth.currentUser.uid === item.ReceivedFriendRequestuid){
            Dispatch(friendsAction({
                id : item.sendFriendRequestuid,
                name: item.sendFriendRequestUserName,
                email: item.sendFriendRequestUserEmail,
                profilePhoto: item.sendFriendRequestPhotoUrl,
                
            }));
            console.log('from is block');
        }else if(auth.currentUser.uid === item.sendFriendRequestuid){
            Dispatch(friendsAction({
                id : item.ReceivedFriendRequestuid,
                name: item.ReceivedFriendRequestUserName,
                email: item.ReceivedFriendRequestUserEmail,
                profilePhoto: item.ReceivedFriendRequestPhotoUrl,
            }));
        console.log('from else block');
        
        }
    };

return (
<div className='w-full h-full flex flex-col gap-y-[27px]'>
        <div className='w-full h-full flex flex-col gap-y-[4%]'>
            <div className=''>
            <Search/>
        </div>
    <div className=' w-full h-full bg-white rounded-[20px] drop-shadow-SearchShadow px-5 py-3 flex flex-col gap-y-[10px]'>
        <div className='flex justify-between items-center'>
        <div className="relative">
          <h2 className='text-xl font-Poppins font-semibold text-black'>Groups</h2>
            <span className="absolute top-[-4px] right-[-20px] flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-commonBackground opacity-75"></span>
            <span className="relative rounded-full h-5 w-5 bg-commonBackground text-xs text-white flex justify-center items-center">
              {allGroupList?.length}
            </span>
          </span>
          </div>
            <div className="relative">
      <button className=" text-xl text-commonBackground cursor-pointer">
      <BsThreeDotsVertical/>
      </button>
    </div>
        </div>
        <div className=' w-full h-full hide-scrollbar'>
        {allGroupList.map((item) =>(
                            <div key={item.Groupkey}>
                            <div className='HomePageAfter'>
                                <div className='flex gap-x-3 items-center'>
                                <div>
                                <picture><img src={item? item.GroupPhotoUrl : esmern} alt="esmern" className='allImage w-[60px] h-[60px]' /></picture>
                            </div>
                            <div>
                                    <h3 className='allHeading text-[18px]'>{item? item.GroupName : 'Name Missing'}</h3>
                                    <p className='allSubHeading text-[14px]'>{item? item.GroupTagName : 'Group Tag Name Missing'}</p>
                                </div>
                                </div>
                        </div>
                            </div>
            ))}
        </div>
    </div>
    </div>
    <div className='w-full h-full flex justify-end flex-col'>
    <div className=' bg-white h-full rounded-[20px] drop-shadow-SearchShadow px-5 py-3 flex flex-col gap-y-[10px]'>
        <div className='flex justify-between items-center'>
        <div className="relative">
          <h2 className='text-xl font-Poppins font-semibold text-black'>Friends</h2>
            <span className="absolute top-[-4px] right-[-20px] flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-commonBackground opacity-75"></span>
            <span className="relative rounded-full h-5 w-5 bg-commonBackground text-xs text-white flex justify-center items-center">
              {allFriend?.length}
            </span>
          </span>
          </div>
            <div className="relative">
      <button className=" text-xl text-commonBackground cursor-pointer">
      <BsThreeDotsVertical/>
      </button>
    </div>
        </div>
        <div className=' w-full h-full hide-scrollbar'>
        {allFriend.map((item) =>(
                            <div key={item.friendkey} onClick={(()=> handleFriends(item))}>
                            <div className='HomePageAfter'>
                                <div className='flex gap-x-3 items-center'>
                                <div>
                                <picture><img src={auth.currentUser.photoURL === item.ReceivedFriendRequestPhotoUrl ? item.sendFriendRequestPhotoUrl : auth.currentUser.photoURL === item.sendFriendRequestPhotoUrl ? item.ReceivedFriendRequestPhotoUrl : esmern} alt="esmern" className='allImage w-[60px] h-[60px]' /></picture>
                            </div>
                            <div>
                                    <h3 className='allHeading text-[18px]'>{auth.currentUser.displayName === item.ReceivedFriendRequestUserName? item.sendFriendRequestUserName :auth.currentUser.displayName === item.sendFriendRequestUserName ? item.ReceivedFriendRequestUserName : "no name"}</h3>
                                    <p className='allSubHeading text-[14px]'>{item? moment(item.CreatedAt).toNow() : 'Time Missing'}</p>
                                </div>
                                </div>
                        </div>
                            </div>
            ))}
        </div>
    </div>
</div>
        </div>
  )
}

export default ChatLeft