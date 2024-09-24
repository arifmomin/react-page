import React, { useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import esmern from "./UserListImage/esmern.png";
import { FaPlus, FaCheck } from 'react-icons/fa';
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { getAuth } from 'firebase/auth';
import moment from "moment";

const UserList = () => {
  const auth = getAuth();
  const db = getDatabase();
  const [userList, setUserList] = useState([]);
  const [FriendRequestList, setFriendRequestList] = useState([]);
  const [FriendList, setFriendList] = useState([]);

/**
 * todo : fetch user from firebase
 */
  useEffect(() => {
    const userRef = ref(db, 'users/');
    onValue(userRef, (snapshot) => {
      const userBlank = [];
      snapshot.forEach((item) => {
        if (auth.currentUser.uid !== item.val().userUid) {
          userBlank.push({
            ...item.val(),
            userKey: item.key,
          });
        }
      });
      setUserList(userBlank);
    });
  }, []);

  /**
   * todo : Fetch friend requests from Firebase
   */
  useEffect(() => {
    const FriendRequestRef = ref(db, 'FriendRequest/');
    onValue(FriendRequestRef, (snapshot) => {
      const FriendRequestArr = [];
      snapshot.forEach((item) => {
        FriendRequestArr.push({
          key: item.key,
          ...item.val(),
        });
      });
      setFriendRequestList(FriendRequestArr);
    });
  }, []);

  /**
   * todo : Fetch friends from Firebase
   */
  useEffect(() => {
    const FriendsRef = ref(db, 'Friends/');
    onValue(FriendsRef, (snapshot) => {
      const FriendsArr = [];
      snapshot.forEach((item) => {
        if (auth.currentUser.uid === item.val().ReceivedFriendRequestuid || auth.currentUser.uid === item.val().sendFriendRequestuid) {
          FriendsArr.push({ ...item.val(), friendkey: item.key });
        }
      });
      setFriendList(FriendsArr);
    });
  }, []);
console.log(FriendList);

  /**
   * todo : Send a friend request
   */
  const handleFriendRequest = (item) => {
    const newRequestRef = push(ref(db, 'FriendRequest/'));
    set(newRequestRef, {
      sendFriendRequestuid: auth.currentUser.uid,
      sendFriendRequestUserName: auth.currentUser.displayName,
      sendFriendRequestUserEmail: auth.currentUser.email,
      sendFriendRequestPhotoUrl: auth.currentUser.photoURL ? auth.currentUser.photoURL : null,
      ReceivedFriendRequestuid: item.userUid,
      ReceivedFriendRequestUserName: item.userName,
      ReceivedFriendRequestUserEmail: item.userEmail,
      ReceivedFriendRequestPhotoUrl: item.UserPhotoUrl ? item.UserPhotoUrl : null,
      ReceivedFriendRequestUserKey: item.userKey,
      CreatedAt: moment().format("MM, DD, YYYY, h:mm:ss a"),
    });
  };

  /**
   * todo : Cancel a friend request 
   */
  const handleFriendRequestCancel = (item) => {
    const requestToCancel = FriendRequestList.find(
      (request) =>
        request.sendFriendRequestuid === auth.currentUser.uid &&
        request.ReceivedFriendRequestuid === item.userUid
    );

    if (requestToCancel) {
      const requestRef = ref(db, `FriendRequest/${requestToCancel.key}`);
      remove(requestRef)
        .then(() => {
          console.log('Friend request canceled');
        })
        .catch((error) => {
          console.error('Error canceling friend request:', error);
        });
    }
  };

  /**
   * todo: Check if friend request has been sent
   */
  const isFriendRequestSent = (item) => {
    return FriendRequestList.some(
      (request) =>
        request.sendFriendRequestuid === auth.currentUser.uid &&
        request.ReceivedFriendRequestuid === item.userUid
    );
  };

  /**
   * todo: Check if the user is already a friend
   */
  const isFriend = (item) => {
    return FriendList.some(
      (friend) =>
        (friend.sendFriendRequestuid === auth.currentUser.uid && friend.ReceivedFriendRequestuid === item.userUid) ||
        (friend.ReceivedFriendRequestuid === auth.currentUser.uid && friend.sendFriendRequestuid === item.userUid)
    );
  };

  return (
    <div className='w-[32.5%] h-[50vh] bg-white rounded-[20px] drop-shadow-SearchShadow px-5 py-3 flex flex-col gap-y-[10px]'>
      <div className='flex justify-between items-center'>
        <div className='relative'>
          <h2 className='text-xl font-Poppins font-semibold text-black'>User List</h2>
          <span className="absolute top-[-4px] right-[-20px] flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-commonBackground opacity-75"></span>
            <span className="relative rounded-full h-5 w-5 bg-commonBackground text-xs text-white flex justify-center items-center">
              {userList?.length}
            </span>
          </span>
        </div>
        <span className='text-xl text-commonBackground cursor-pointer'><BsThreeDotsVertical /></span>
      </div>
      <div className='h-full w-full overflow-y-scroll scrollbar-thin scrollbar-thumb-commonBackground scrollbar-track-gray-200'>
        {userList?.length > 0 ? (userList?.map((item) => (
          <div className='HomePageAfter' key={item.userUid}>
            <div>
              <picture><img src={item.UserPhotoUrl} alt={item.UserPhotoUrl} className='allImage' /></picture>
            </div>
            <div className='flex justify-between items-start w-[75%]'>
              <div>
                <h3 className='allHeading'>{item.userName}</h3>
                <p className='allSubHeading'>{item.userEmail}</p>
              </div>
              <div>
                {isFriend(item) ? (
                  // Show checkmark if user is already a friend
                  <button className='GroupListButton w-[30px] h-[30px] text-[16px]' disabled>
                    <FaCheck />
                  </button>
                ) : isFriendRequestSent(item) ? (
                  // Show cancel button if friend request is sent
                  <button
                    className='GroupListButton w-[30px] h-[30px] text-[16px]'
                    onClick={() => handleFriendRequestCancel(item)}
                  >
                    -
                  </button>
                ) : (
                  // Show "+" button if no friend request is sent
                  <button
                    className='GroupListButton w-[30px] h-[30px] text-[16px]'
                    onClick={() => handleFriendRequest(item)}
                  >
                    <FaPlus />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))) : (<div className='w-full h-full flex justify-center items-center'>
<div className=' text-base text-red-400 font-Nunito font-medium'>"Currently, no users are available."
</div>
      </div>) }
      </div>
    </div>
  );
};

export default UserList;
