import React from 'react'
import registration from '../../image/registration.png'

function PageRight() {
  return (
    <div className='w-[45%] h-screen'>
        <picture><img className='w-full h-full' src= {registration} alt={registration} /></picture>
    </div>
  )
}

export default PageRight