import React from 'react'
// import image from "../img/dollar-glue-stick.png"
import { MdOutlinePersonAddAlt } from "react-icons/md";
// import { MdOutlinePersonRemove } from "react-icons/md";
import { GoHeart } from "react-icons/go";
// import { IoHeartSharp } from "react-icons/io5";

const PostItem = ({ post,sendFriendReq }) => {
    return (
        <main className='bg-white lg:rounded-xl h-fit lg:px-5 px-3'>
            <div className='flex justify-between pb-3 items-center py-5'>
                <div className='flex gap-3 items-center'>
                    <img src={"../src/uploads/" + post.userImage} alt="userImage" className='w-12 rounded-full h-12' />
                    <div className='flex flex-col leading-5'>
                        <span className='font-semibold text-md'>{post.firstName} {post.lastName}</span>
                        <span className='text-[12px] opacity-50'>{post.location}</span>
                    </div>
                </div>
                <div className='bg-cyan-500 text-black p-2 rounded-full'>
                    <MdOutlinePersonAddAlt className='text-lg cursor-pointer' onClick={() => sendFriendReq(post.userId)}/>
                </div>
            </div>
            <p className='text-sm pb-2'>{post.description}</p>
            <div className='flex justify-center'>
                <img src={"../src/uploads/" + post.image} alt="post" className='h-[35rem] w-[35rem] rounded-xl' />
            </div>
            <hr />
            <div className='flex items-center gap-1 py-2'>
                <GoHeart />
                <span className='text-sm'>1</span>
            </div>
        </main>
    )
}

export default PostItem