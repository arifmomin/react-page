import React from 'react'
import LoginLeft from '../Component/LoginPage/LoginLeft'
import LoginRight from '../Component/LoginPage/LoginRight'

const Login = () => {
  return (
    <div className='flex'>
        <LoginLeft/>
        <LoginRight/>
    </div>
  )
}

export default Login