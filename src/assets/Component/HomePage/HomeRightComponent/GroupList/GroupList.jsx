import { React, useEffect, useState } from "react";
import Search from '../Search/Search.jsx'
import {BsThreeDotsVertical } from 'react-icons/bs'
import esmern from "../GroupList/GroupListImage/esmern.png"
import { onValue, ref, getDatabase, set, push, remove } from "firebase/database";
import { getAuth } from "firebase/auth";
import moment from "moment";
const GroupList = () => {
    const db = getDatabase();
    const auth = getAuth();
    const [allGroupList, setallGroupList] = useState ([]);
    const [allGroupListRequiest, setallGroupListRequiest] = useState ([]);
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


const handleGroupRequest = ((item = {}) =>{
    set(push(ref(db, "GroupRequest/")), {
         ...item,
        WhoJoinGroupUid: auth.currentUser.uid,
        WhoJoinGroupName : auth.currentUser.displayName,
        WhoJoinGroupEmail: auth.currentUser.email,
        WhoJoinGroupPhotoUrl: auth.currentUser.photoURL,
        CreatedAt: moment().format("MM, DD, YYYY, h:mm:ss a"),
    } ) 
});
/**
 * todo: Group Join requiest implement
 */
useEffect(()=>{
    const GroupListRef = ref(db, `GroupRequest/`);
    onValue(GroupListRef, (snapshot) => {
    const GroupRequiestBlankArr = [];
    snapshot.forEach((item) =>{
            GroupRequiestBlankArr.push(item.val().Groupkey + item.val().WhoJoinGroupUid);
    });
    setallGroupListRequiest(GroupRequiestBlankArr);
});
}, []);
console.log(allGroupListRequiest);

/**
 * todo: handleGroupcancleRequest button implement
 */
    const handleGroupcancleRequest = (item)=>{
        const removeFndReq = (ref(db, "GroupRequest/"));    
        remove(removeFndReq);
    };
  return (
    <div className='w-[32.5%] h-[50vh]'>
<div>
<div className=' mb-5'>
            <Search/>
        </div>
    <div className=' bg-white min-h-[276px] rounded-[20px] drop-shadow-SearchShadow px-5 py-3 flex flex-col gap-y-[10px]'>
        <div className='flex justify-between items-center'>
        <div className="relative">
          <h2 className='text-xl font-Poppins font-semibold text-black'>Group List</h2>
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
        <div className=' w-full h-[31vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-commonBackground scrollbar-track-gray-200'>
            {allGroupList.map ((item)=>(
                            <div className='' key={item.key}>
                            <div className='HomePageAfter'>
                            <div>
                                <picture><img src={item? item.GroupPhotoUrl : esmern} alt={item? item.GroupPhotoUrl : esmern} className='allImage w-[60px] h-[60px]'/></picture>
                            </div>
                            <div className='flex justify-between items-start w-[75%]'>
                                <div>
                                    <h3 className='allHeading text-[18px]'>{item? item.GroupName : "Name missing"}</h3>
                                    <p className='allSubHeading text-[14px]'>{item? item.GroupTagName : "tag name missing"}</p>
                                </div>
                                <div>
                                    {
                                        allGroupListRequiest?.includes(item.Groupkey + auth.currentUser.uid) ? (
                                        <button className='GroupListButton' onClick={() => handleGroupcancleRequest (item)}>Cancle</button>) : (
                                        <button className='GroupListButton'onClick={() => handleGroupRequest (item)}>join</button>)
                                    }
                                    
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

export default GroupList