import React from 'react'
import image from "../img/dollar-glue-stick.png"
import { PiBagSimple } from "react-icons/pi";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import FriendList from './FriendList';

const UserDetail = (props) => {
  const { _id, firstname, lastname, image, email, dateofBirth, location, occupation } = props.user;
  return (
    <main className='lg:flex flex-col gap-8 hidden'>

      <div className='bg-white h-[23rem] rounded-xl px-3 py-5'>

        <div className='flex justify-between pb-3 items-center'>
          <div className='flex gap-3 items-center'>
            <img src={'../src/uploads/' + image} alt="userImage" className='w-14 rounded-full h-14' />
            <div className='flex flex-col'>
              <span className='font-semibold text-xl'>{firstname} {lastname}</span>
              <span className='text-[13px] opacity-50'>4 Friends</span>
            </div>
          </div>
          <div>
            <FaUser />
          </div>
        </div>

        <hr className='opacity-30' />

        <div className='py-3 flex gap-3 items-center'>
          <div className='flex gap-2 flex-col'>
            <IoLocationOutline className='text-3xl' />
            <PiBagSimple className='text-3xl' />
          </div>
          <div className='flex flex-col gap-4'>
            <p className='text-[13px] opacity-50'>{location}</p>
            <p className='text-[13px] opacity-50'>{occupation}</p>
          </div>
        </div>

        <hr className='opacity-30' />

        <div className='pt-3'>
          <h1>Social Profiles</h1>
          <div className='flex justify-between py-3 items-center'>
            <div className='flex gap-3 items-center'>
              <FaTwitter className='text-2xl opacity-65' />
              <div className='flex flex-col'>
                <span className='font-semibold text-sm'>Twitter</span>
                <span className='text-[12px] opacity-50'>Social Network</span>
              </div>
            </div>
            <MdOutlineEdit className='text-xl' />
          </div>
          <div className='flex justify-between items-center'>
            <div className='flex gap-3 items-center'>
              <FaLinkedin className='text-2xl opacity-65' />
              <div className='flex flex-col'>
                <span className='font-semibold text-sm'>Linkedin</span>
                <span className='text-[12px] opacity-50'>Network Platform</span>
              </div>
            </div>
            <MdOutlineEdit className='text-xl' />
          </div>
        </div>
      </div>

      <FriendList friends={props.friends} />
    </main>
  )
}

export default UserDetail