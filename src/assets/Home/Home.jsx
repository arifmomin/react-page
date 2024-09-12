import React from 'react'
import HomeLeft from '../Component/HomePage/HomeLeft'
import HomeRight from '../Component/HomePage/HomeRight'
const Home = () => {
  return (
        <div className='flex justify-start items-start py-8 px-6'>
            <HomeLeft/>
            <HomeRight/>
        </div>
  )
}

export default Home