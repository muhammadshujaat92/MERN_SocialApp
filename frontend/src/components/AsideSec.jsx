import React from 'react'
import sponImage from "../img/sponsored-img.png"
import FriendReq from './FriendReq'

const AsideSec = ({ friendrequest, confirmReq, delReq }) => {
  return (
    <main className='hidden lg:flex flex-col gap-8'>
      <div className='bg-white h-fit p-4 rounded-xl'>
        <div className='flex justify-between items-center pb-3'>
          <h1 className='font-semibold'>Sponsored</h1>
          <span className='text-[13px] opacity-50'>Create Ad</span>
        </div>
        <div>
          <img className='rounded-lg' src={sponImage} alt="s-image" />
        </div>
        <div className='pt-3'>
          <div className='flex justify-between mb-1'>
            <h2 className='text-sm'>MikaCosmetics</h2>
            <span className='text-[13px] opacity-50'>mikacosmetics.com</span>
          </div>
          <p className='text-[13px] opacity-50'>Your pathway to stunning and immaculate beauty and made sure your skin is exfoilating skin and shining like light</p>
        </div>
      </div>
      <FriendReq friendrequest={friendrequest} confirmReq={confirmReq} delReq={delReq} />
    </main>
  )
}

export default AsideSec