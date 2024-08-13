import React, { useState } from 'react'
import homeImg from "../img/vector-img.png"
import { FaArrowLeft } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {useAuth} from '../context/AuthProvider'
import axios from 'axios'

const Login = () => {
    const [userSigninData, setUserSigninData] = useState({ email: "", password: "" });

    const navigate = useNavigate();
    const location = useLocation()
    const redirectPath = location.state?.path || '/feed';

    const authLocal = useAuth()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:4000/signin", userSigninData);
            const user = response.data;
            authLocal.login(user)
            localStorage.setItem('user', JSON.stringify(user));
            navigate(redirectPath, { replace: true });
            alert("successfully login")
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error)
            alert(errorMessage + ' ' + errorCode);
        }
    }

    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value
        setUserSigninData({ ...userSigninData, [name]: value });
    }

    return (
        <main className='lg:grid lg:grid-cols-12 gap-5 lg:h-full w-full'>
            <div className='hidden lg:block col-span-6'>
                <div className="h-full flex items-center">
                    <img src={homeImg} alt="home image" className='rounded-xl mix-blend-darken' />
                </div>
            </div>

            <div className='col-span-6 lg:pt-5 py-5 lg:pe-10'>
                <div className='flex justify-end'>
                    <Link to={'/'}>
                        <FaArrowLeft className='border border-black text-4xl rounded-full p-2 cursor-pointer' />
                    </Link>
                </div>
                <div className='h-3/4 flex flex-col justify-center'>
                    <div className='text-center'>
                        <h1 className='text-3xl lg:text-4xl font-bold text-blue-800'>Login to Your Account</h1>
                    </div>

                    <form className="max-w-md mx-auto pt-4 w-full">
                        <div className="relative z-0 w-full mb-5 group">
                            <input autoComplete='off' type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={handleInputs} value={userSigninData.email}/>
                            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input autoComplete='off' type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={handleInputs} value={userSigninData.password} />
                            <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                        </div>
                        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleLogin}>Login</button>
                        <p className='text-blue-900 text-lg mt-2'>Don't have an account? <Link to={'/signup'} className='font-bold'>Sign up</Link></p>
                    </form>
                </div>
            </div>
        </main>
    )
}

export default Login