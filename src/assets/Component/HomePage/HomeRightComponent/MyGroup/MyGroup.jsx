import React, { useEffect, useState } from 'react'
import user from "./MyGroupImage/user.png"
import { BsThreeDotsVertical } from 'react-icons/bs'
import { getDatabase, ref, onValue } from "firebase/database";
import moment from 'moment';
import { getAuth } from 'firebase/auth';
const MyGroup = () => {
    const auth = getAuth();
    const db = getDatabase();
    const [allGroupList, setallGroupList] = useState ([]);
    useEffect(()=>{
        const GroupListRef = ref(db, 'Groups/');
        onValue(GroupListRef, (snapshot) => {
        const GroupBlankArr = [];
        snapshot.forEach((item) =>{
            if(item.val().WhoCreateGroupUid === auth.currentUser.uid){
                GroupBlankArr.push({...item.val(), Groupkey: item.key})
            }
        });
        setallGroupList(GroupBlankArr);
});
    }, []);
  return (
    <div className='w-[32.5%] h-[43vh] bg-white rounded-[20px] drop-shadow-SearchShadow px-5 py-3 flex flex-col gap-y-[10px]'>
  <div className='flex justify-between items-center'>
<div className='relative'>
<h2 className='text-xl font-Poppins font-semibold text-black'>My Group</h2>
      <span className="absolute top-[-4px] right-[-20px] flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-commonBackground opacity-75"></span>
            <span className="relative rounded-full h-5 w-5 bg-commonBackground text-xs text-white flex justify-center items-center">
              {allGroupList?.length}
            </span>
          </span>
</div>
      <span className='text-xl text-commonBackground cursor-pointer'><BsThreeDotsVertical/></span>
  </div>
  <div className='h-full w-full overflow-y-scroll scrollbar-thin scrollbar-thumb-commonBackground scrollbar-track-gray-200'>
      {allGroupList?.map ((item)=>(
                      <div>
                      <div className='HomePageAfter'>
                      <div>
                          <picture><img src={item? item.GroupPhotoUrl : user} alt={item? item.GroupPhotoUrl : user} className='GroupListImage w-[50px] h-[50px]'/></picture>
                      </div>
                      <div className='flex justify-between items-start w-[75%]'>
                          <div>
                              <h3 className='groupListHeading text-base'>{item? item.GroupName : "Laughter Lounge"}</h3>
                              <p className='GroupListSumHeading text-[12px]'>{item? item.GroupTagName : "Hi Guys, Wassup!"}</p>
                          </div>
                          <div>
                              <p className='text-[12px] font-medium font-Poppins text-black opacity-[50%]'>{moment(item.CreatedAt).toNow()}</p>
                          </div>
                      </div>
                  </div>
                      </div>
      ))}

  </div>
    </div>
  )
}

export default MyGroup