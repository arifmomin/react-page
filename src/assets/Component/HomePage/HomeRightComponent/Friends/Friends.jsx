import React, { useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import user from "./FriendsImage/user.png";
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import moment from 'moment';
import { FaUserCheck, FaUserMinus, FaUserXmark } from 'react-icons/fa6';

const Friends = () => {
    const auth = getAuth();
    const db = getDatabase();
    const [FriendList, setFriendList] = useState([]);
    const [activeFriend, setactiveFriend] = useState(null);

    useEffect(() => {
        const starCountRef = ref(db, 'Friends/');
        onValue(starCountRef, (snapshot) => {
            const FriendsArr = [];
            snapshot.forEach((item) => {
                if (auth.currentUser.uid === item.val().sendFriendRequestuid) {
                    FriendsArr.push({ ...item.val(), friendkey: item.key });
                } else if (auth.currentUser.uid === item.val().ReceivedFriendRequestuid) {
                    FriendsArr.push({ ...item.val(), friendkey: item.key });
                }
            });
            setFriendList(FriendsArr);
        });
    }, []);
console.log(FriendList);
// ================Blocked Function implement
    const handleBlocked = (item = {}) => {
        const BlockedUserref = ref(db, "BlockedUser/");
        set(push(BlockedUserref), item);
        const removeFriend = ref(db, "Friends/" + item.friendkey);
        remove(removeFriend)
            .then(() => {
                setactiveFriend(null);
            })
            .catch((error) => {
                console.error('Error removing friend:', error);
            });
    };
    // ==================Friends function implement
    const HandleFriends = (friendId) => {
        setactiveFriend(activeFriend === friendId ? null : friendId);
    };
// ================unfriend functino implement
    const handleUnFriend = (item = {}) => {
        const handleUnFriendref = ref(db, "Friends/" + item.friendkey);
        remove(handleUnFriendref).then(() => {
            setactiveFriend(null);
        }).catch(() => {
            console.log("something error");
        });
    };

    return (
        <div className='h-[50vh] w-[32.5%] bg-white rounded-[20px] drop-shadow-SearchShadow px-5 py-3 flex flex-col gap-y-[10px]'>
            <div className='flex justify-between items-center'>
                <div className='relative'>
                    <h2 className='text-xl font-Poppins font-semibold text-black'>Friends</h2>
                    <span className="absolute top-[-4px] right-[-20px] flex h-5 w-5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-commonBackground opacity-75"></span>
                        <span className="relative rounded-full h-5 w-5 bg-commonBackground text-xs text-white flex justify-center items-center">
                            {FriendList?.length}
                        </span>
                    </span>
                </div>
                <span className='text-xl text-commonBackground cursor-pointer'><BsThreeDotsVertical /></span>
            </div>
            <div className='w-full h-full overflow-y-scroll hide-scrollbar'>
                {FriendList?.length > 0 ? (
                    FriendList.map((item) => (
                        <div key={item.friendkey}>
                            <div className='HomePageAfter'>
                                <div className='flex gap-x-2 items-center'>
                                    <div>
                                        <picture>
                                            <img src={auth.currentUser.uid === item.sendFriendRequestuid ? item.ReceivedFriendRequestPhotoUrl : auth.currentUser.uid === item.ReceivedFriendRequestuid ? item.sendFriendRequestPhotoUrl : user} alt="friend" className='allImage' />
                                        </picture>
                                    </div>
                                    <div>
                                        <h3 className='allHeading'>
                                            {auth.currentUser.uid === item.sendFriendRequestuid
                                                ? item.ReceivedFriendRequestUserName
                                                : auth.currentUser.uid === item.ReceivedFriendRequestuid
                                                    ? item.sendFriendRequestUserName
                                                    : "no name"}
                                        </h3>
                                        <p className='allSubHeading'>{moment(item.CreatedAt).toNow()}</p>
                                    </div>
                                </div>
                                <div>
                                    <button className='w-[100px] h-[35px] rounded-md text-base text-black font-Nunito font-medium bg-[#D8DADF] flex justify-center items-center' onClick={() => HandleFriends(item.friendkey)}>
                                        <span className='text-[18px] text-[#00000075] pr-[5px]'><FaUserCheck /></span> Friends
                                    </button>
                                    {activeFriend === item.friendkey && (
                                        <div className="absolute top-[60px] right-[27px] w-[170px] flex flex-col justify-center items-center py-[15px] bg-white drop-shadow-SearchShadow rounded-lg z-20">
                                            <button className='text-gray-400 hover:text-commonBackground font-medium font-openSans text-[16px] w-full flex items-center py-[6px] hover:bg-[#8080803d] group' onClick={() => handleUnFriend(item)}>
                                                <span className='text-[18px] text-[#00000075] pl-[15px] pr-[16px] group-hover:text-commonBackground'><FaUserMinus /></span>Unfriend
                                            </button>
                                            <button className='text-gray-400 hover:text-commonBackground font-medium font-openSans text-[16px] w-full flex items-center py-[6px] hover:bg-[#8080803d] group' onClick={() => handleBlocked(item)}>
                                                <span className='text-[18px] text-[#00000075] pl-[15px] pr-[16px] group-hover:text-commonBackground'><FaUserXmark /></span>Block
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='w-full h-full flex justify-center items-center'>
                        <div className='text-base text-red-400 font-Nunito font-medium'>"No friends have been connected yet."</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Friends;
