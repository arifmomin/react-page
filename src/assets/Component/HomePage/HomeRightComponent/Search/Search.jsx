import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { IoSearch } from 'react-icons/io5'

const Search = () => {
  return (
    <div className='w-full'>
      <div className='w-full h-[52px] bg-white drop-shadow-SearchShadow rounded-[20px] px-5 flex justify-between items-center'>
        <span className='text-[27px] pr-8 cursor-pointer'><IoSearch/></span>
        <input type="text" name='Search' id='Search' placeholder='Search' className='w-full h-full outline-0 bg-transparent text-xl text-black font-Poppins font-medium placeholder:font-Poppins placeholder:font-medium placeholder:text-[18px] placeholder:text[#3D3D3D] placeholder:opacity-[35%]' />
        <span className='text-xl text-commonBackground cursor-pointer'><BsThreeDotsVertical/></span>
      </div>
    </div>
  )
}

export default Search