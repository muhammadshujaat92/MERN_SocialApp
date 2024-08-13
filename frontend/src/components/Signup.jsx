import React, { useState } from 'react'
import homeImg from "../img/vector-img.png"
import { FaArrowLeft } from "react-icons/fa";
import axios from 'axios';
import { useAuth } from '../context/AuthProvider'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const Signup = () => {

  const [userdata, setUserdata] = useState({ firstname: "", lastname: "", email: "", password: "", dateofBirth: "", location: "", occupation: "" });

  const [image, setImage] = useState();

  const { firstname, lastname, email, password, dateofBirth, location, occupation } = userdata;

  const navigate = useNavigate();
  const locationPath = useLocation();
  const redirectPath = locationPath.state?.path || '/feed';
  const authLocal = useAuth();

  const formData = new FormData();
  formData.append("firstname", firstname);
  formData.append("lastname", lastname);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("dateofBirth", dateofBirth);
  formData.append("location", location);
  formData.append("occupation", occupation);
  formData.append("image", image);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/register", formData)
      const user = response.data;
      console.log(user)
      localStorage.setItem('user', JSON.stringify(user))
      authLocal.login(user);
      navigate(redirectPath, { replace: true });
      alert("successfully Signup");

    } catch (error) {
      console.log(error)
      alert(error.message)
    }
  }

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUserdata({ ...userdata, [name]: value });
  }

  return (
    <main className='lg:grid lg:grid-cols-12 gap-5 lg:h-full w-full'>
      <div className='hidden lg:block col-span-6'>
        <div className="h-full flex items-center">
          <img src={homeImg} alt="home image" className='rounded-xl mix-blend-darken' />
        </div>
      </div>
      <div className='col-span-6 lg:pt-5 py-5'>
        <div className='flex items-center justify-between md:justify-center md:gap-28 lg:px-10'>
          <h1 className='text-3xl lg:text-4xl font-bold text-blue-800'>Create an Account</h1>
          <NavLink to={"/"}>
            <FaArrowLeft className='border border-black text-4xl rounded-full p-2 cursor-pointer' />
          </NavLink>
        </div>

        <form method='POST' encType='multipart/form-data' className="max-w-md mx-auto lg:h-[32rem] flex flex-col justify-center pt-4">
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">

              <input autoComplete='off' type="text" name="firstname" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={handleInputs} value={userdata.firstname} />

              <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">

              <input autoComplete='off' type="text" name="lastname" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={handleInputs} value={userdata.lastname} />

              <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
            </div>
          </div>
          <div className="relative z-0 w-full mb-5 group">

            <input autoComplete='off' type="email" name="email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={handleInputs} value={userdata.email} />

            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
          </div>
          <div className="relative z-0 w-full mb-5 group">

            <input autoComplete='off' type="password" name="password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={handleInputs} value={userdata.password} />

            <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">

              <input autoComplete='off' type="text" name="location" id="location" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={handleInputs} value={userdata.location} />

              <label htmlFor="location" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Location</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">

              <input autoComplete='off' type="text" name="occupation" id="occupation" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={handleInputs} value={userdata.occupation} />

              <label htmlFor="occupation" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Occupation</label>
            </div>
          </div>

          <div className='relative z-0 w-full mb-5 group'>
            <label className="block mb-2 text-sm font-medium" htmlFor="user_avatar">Profile Photo</label>

            <input className="block w-full text-sm border border-gray-300 rounded-lg cursor-pointer focus:outline-none" aria-describedby="user_avatar_help" id="user_avatar" type="file" onChange={(e) => setImage(e.target.files[0])} />

            <div className="mt-1 text-sm" id="user_avatar_help">A profile picture is useful to confirm your are logged into your account</div>
          </div>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleSignup}>Signup</button>
          <p className='text-blue-900 text-lg mt-2'>Already have an account? <NavLink to={"/login"} className='font-bold'>Login</NavLink></p>
        </form>

      </div>
    </main>
  )
}

export default Signup