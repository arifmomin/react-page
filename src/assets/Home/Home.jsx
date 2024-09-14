import React from 'react'
import GroupList from '../Component/HomePage/HomeRightComponent/GroupList/GroupList.jsx'
import Friends from '../Component/HomePage/HomeRightComponent/Friends/Friends.jsx'
import UserList from '../Component/HomePage/HomeRightComponent/UserList/UserList.jsx'
import FriendRequiest from '../Component/HomePage/HomeRightComponent/FriendRequiest/FriendRequiest.jsx'
import MyGroup from '../Component/HomePage/HomeRightComponent/MyGroup/MyGroup.jsx'
import BlockedUser from '../Component/HomePage/HomeRightComponent/BlockedUser/BlockedUser.jsx'
const Home = () => {
  return (
        <div className='w-full flex flex-wrap justify-between items-start gap-y-[15px]'>
          <GroupList/>
          <Friends/>
          <UserList/>
          <FriendRequiest/>
          <MyGroup/>
          <BlockedUser/>
        </div>
  )
}

export default Home