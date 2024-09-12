import React from 'react'
import loginimage from "../LoginPage/LoginPageImage/loginimage.png"
const LoginRight = () => {
  return (
    <div className='h-screen w-[45% flex justify-center items-center'>
        <picture><img className='w-full h-[80vh] ' src= {loginimage} alt={loginimage} /></picture>
    </div>
  )
}

export default LoginRight