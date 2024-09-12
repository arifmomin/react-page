import React from 'react'
import registration from "../RegistrationPage/RegistrationImage/registration.png"

function RegistrationRight() {
  return (
    <div className='w-[45%] h-screen'>
        <picture><img className='w-full h-full' src= {registration} alt={registration} /></picture>
    </div>
  )
}

export default RegistrationRight