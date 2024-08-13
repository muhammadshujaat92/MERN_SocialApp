import React, { useEffect } from 'react'
import image from "../img/dollar-glue-stick.png"

const FriendReq = ({ friendrequest, confirmReq, delReq }) => {
    useEffect(() => {
        console.log(friendrequest)
    }, [])
    return (
        <main className='bg-white rounded-xl px-4 pb-3'>
            <h1 className='font-semibold pt-4'>Friend Requests</h1>
            {friendrequest.map((req) => (
                <div key={req.requester._id} className='flex justify-between pb-3 items-center py-5 flex-wrap gap-2'>
                    <div className='flex gap-2 items-center'>
                        <img src={"../src/uploads/" + req.requester.image} alt="userImage" className='w-12 rounded-full h-12' />
                        <div className='flex flex-col leading-4'>
                            <span className='font-semibold text-sm'>{req.requester.firstname} {req.requester.lastname}</span>
                            <span className='text-[12px] opacity-50'>{req.requester.location}</span>
                        </div>
                    </div>
                    <div className='w-full text-center'>
                        <button className='bg-sky-600 text-sm me-2 py-1 rounded-sm px-3 text-white' onClick={() => confirmReq(req.requests._id)}>Confirm</button>
                        <button className='bg-sky-600 text-sm py-1 rounded-sm px-3 text-white' onClick={() => delReq(req.requester._id)}>Delete</button>
                    </div>
                    <hr className='w-full' />
                </div>
            ))}

        </main>
    )
}

export default FriendReq