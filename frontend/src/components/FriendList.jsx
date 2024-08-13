import React from 'react'
import image from "../img/dollar-glue-stick.png"
import { MdOutlinePersonRemove } from "react-icons/md";

const FriendList = ({ friends }) => {
    return (
        <main className='bg-white rounded-xl px-4 pb-3'>
            <h1 className='font-semibold pt-4'>Friend List</h1>
            {friends.map((data) => (
                <div className='flex justify-between pb-3 items-center py-5' key={data._id}>
                    <div className='flex gap-3 items-center'>
                        <img src={'../src/uploads/' + data.image} alt="userImage" className='w-12 rounded-full h-12' />
                        <div className='flex flex-col leading-5'>
                            <span className='font-semibold text-md'>{data.firstname} {data.lastname}</span>
                            <span className='text-[12px] opacity-50'>{data.occupation}</span>
                        </div>
                    </div>
                    <div className='bg-cyan-500 text-black p-2 rounded-full'>
                        <MdOutlinePersonRemove className='text-md' />
                    </div>
                </div>
            ))}

        </main>
    )
}

export default FriendList