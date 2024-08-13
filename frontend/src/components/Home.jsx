import React from 'react'
import homeImg from "../img/vector-img.png"
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <main className='lg:grid lg:grid-cols-12 gap-5 lg:h-full w-full'>
            <div className='hidden lg:block col-span-6'>
                <div className="h-full flex items-center">
                    <img src={homeImg} alt="home image" className='rounded-xl mix-blend-darken' />
                </div>
            </div>

            <div className='col-span-6 flex items-center justify-center'>
                <div className='w-full'>
                    <h1 className='font-bold text-6xl'>MERN <span className='text-blue-700'>SocialSway</span></h1><span className='font-bold text-6xl'>App</span>
                    <div className='mt-8'>
                        <Link to={'/login'} className='bg-blue-700 text-white rounded-lg py-2 px-5 me-2'>Login</Link>
                        <Link to={'/signup'} className='bg-blue-700 text-white rounded-lg py-2 px-5'>Signup</Link>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Home