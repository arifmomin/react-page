import React from 'react'

function PageLeft() {
  return (
    <div className='w-[55%] h-screen flex justify-center items-center flex-col bg-white'>
<div>
<div className="pageLeft_heading">
            <h1 className='text-[34px] font-bold font-Nunito leading-[22px] text-commonColor'>Get started with easily register</h1>
            <h2 className='text-xl font-normal font-Nunito leading-[22px] text-[rgba(0,0,0,0.42)] mt-[13px]'>Free register and you can enjoy it</h2>
        </div>
<div className='w-[368px] flex justify-center items-center flex-col'>
<form action="#" method='post' className='w-full flex flex-col justify-start items-stretch pt-[39px] gap-y-[25px]'>
<div className=''>
<fieldset className='border-2 border-solid border-[rgba(17,23,93,0.30)] rounded-lg pt-[5px] pb-[16px] pl-5 pr-[15px]'>
    <legend className='px-[10px] text-[13px] font-semibold font-Nunito text-[rgba(17,23,93,0.70)]'>Email Address:</legend>
    <input type="email" className='email w-full bg-transparent outline-0 text-xl font-medium font-Nunito text-commonColor pl-[10px]' placeholder='arifmominweb@gmail.com' />
  </fieldset>
</div>
<div className=''>
<fieldset className='border-2 border-solid border-[rgba(17,23,93,0.30)] rounded-lg pt-[5px] pb-[16px] pl-5 pr-[15px]'>
    <legend className='px-[10px] text-[13px] font-semibold font-Nunito text-[rgba(17,23,93,0.70)]'>Ful name</legend>
    <input type="name" className='name w-full bg-transparent outline-0 text-xl font-medium font-Nunito text-commonColor pl-[10px]' placeholder='Arif Momin' />
  </fieldset>
</div>
<div className=''>
<fieldset className='border-2 border-solid border-[rgba(17,23,93,0.30)] rounded-lg pt-[5px] pb-[16px] pl-5 pr-[15px]'>
    <legend className='px-[10px] text-[13px] font-semibold font-Nunito text-[rgba(17,23,93,0.70)]'>Email Address:</legend>
    <input type="password" className='password w-full bg-transparent outline-0 text-xl font-medium font-Nunito text-commonColor pl-[10px]' placeholder='*********' />
  </fieldset>
</div>
        </form>
        <div className='w-full'>
            <button className='w-full h-[60px] bg-[#5F35F5] text-lg font-semibold font-Nunito text-white rounded-full flex justify-center items-center mt-10 hover:bg-transparent transition-all ease-linear duration-300 hover:text-[#000] hover:border-2 hover:border-commonColor'>Sign up</button>
        </div>
        <div>
            <h3 className='text-xs text-[#03014C] font-normal font-openSans mt-[35px]'>Already  have an account ? <span><a className="text-[#EA6C00] font-bold hover:text-commonColor transition-all ease-linear duration-300" href="#">Sign In</a></span></h3>
        </div>
</div>

</div>
    </div>
  )
}

export default PageLeft