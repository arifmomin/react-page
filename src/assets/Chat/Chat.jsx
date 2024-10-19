import React from 'react'

import ChatLeft from '../Component/ChatComponent/ChatLeftComponent/ChatLeft'
import ChatRight from '../Component/ChatComponent/ChatRightComponent/ChatRight'

const Chat = () => {
  

  return (
    <div className='w-full h-[95vh] flex gap-x-7'>
      <div className='w-[35%]'>
      <ChatLeft/>
      </div>
      <div className='w-[65%]'>
      <ChatRight/>
      </div>
    </div>
  )
}

export default Chat