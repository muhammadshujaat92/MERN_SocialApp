import React from 'react'
import image from "../img/dollar-glue-stick.png"
import { MdOutlineImage } from "react-icons/md";
import { MdOutlineGifBox } from "react-icons/md";
import { IoMdAttach } from "react-icons/io";
import { AiFillAudio } from "react-icons/ai";
import PostItem from './PostItem';

const Posts = ({ user, postsData, addPost, description, setDesc, setPostImage,sendFriendReq }) => {
  return (
    <div className='col-span-2 flex flex-col gap-8'>
      <div className='bg-white lg:rounded-xl h-fit lg:px-5 px-3'>
        <div className='flex py-5 items-center gap-2 lg:gap-4'>
          <div>
            <img src={"../src/uploads/" + user.image} alt="userImage" className='w-14 rounded-full h-14' />
          </div>
          <div className='lg:w-[30rem]'>
            <input type="text" placeholder="What's on your mind..." className='block w-full p-4 ps-10 text-sm bg-gray-200 border-0 rounded-3xl' name='description' value={description} onChange={(e) => setDesc(e.target.value)} />
          </div>
        </div>

        <hr className="opacity-40" />

        <div className='flex justify-between py-3'>

          <label className='px-5 p-1 rounded-3xl text-sm flex items-center gap-1 cursor-pointer' htmlFor="postImage"><MdOutlineImage />Image</label>

          <input className="hidden text-sm border border-gray-300 rounded-lg cursor-pointer focus:outline-none" aria-describedby="user_avatar_help" id="postImage" name='postImage' type="file" onChange={(e) => setPostImage(e.target.files[0])} />

          <button className='px-5 p-1 rounded-3xl text-sm lg:flex items-center gap-1 hidden' disabled><MdOutlineGifBox />Clip</button>
          <button className='px-5 p-1 rounded-3xl text-sm lg:flex items-center gap-1 hidden' disabled><IoMdAttach />Attachment</button>
          <button className='px-5 p-1 rounded-3xl text-sm lg:flex items-center gap-1 hidden' disabled><AiFillAudio />Audio</button>
          <button className='bg-cyan-500 px-5 p-1 rounded-3xl text-sm' onClick={addPost}>Post</button>
        </div>
      </div>
      {
        postsData.map((post) => (
          <PostItem key={post._id} post={post} sendFriendReq={sendFriendReq} />
        ))
      }
    </div>
  )
}

export default Posts