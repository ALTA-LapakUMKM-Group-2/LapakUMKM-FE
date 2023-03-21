import React, { useState } from 'react'
import bgLogin from '../assets/bgLogin.jpg'
import { HiEye, HiEyeOff, HiOutlineMail } from "react-icons/hi";
import { TfiUnlock } from "react-icons/tfi";
import { useNavigate } from 'react-router-dom';
import LapakUmkm from '../assets/LapakUmkm2.png'


const Login = () => {
const [showPassword,  setShowPassword] = useState(false);
const [password, setPassword] = useState('')
const [email, setEmail] = useState('')
const navigate = useNavigate()

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
      };
    const bg = {
        backgroundImage: `linear-gradient(
          rgba(0, 0, 0, 0.3),
          rgba(0, 0, 0, 0.3)
        ), url('${bgLogin}')`,
        backgroundSize: "cover",
      };
  return (
    <div style={bg} className="h-screen w-screen top-0 mt-0 flex items-center">
      <div className="mx-auto lg:max-w-md w-full  bg-white rounded-lg p-10 px-20">

<img src={LapakUmkm} width={200} className='flex justify-center mx-auto mb-20' />
<form className="flex flex-col">
  
  <div className="relative z-0 w-full mb-5 2xl:mb-10 group ">
    <input
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      type="email"
      name="email"
      id="email"
      className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-black appearance-none dark:text-black dark:border-black dark:focus:border-black focus:outline-none focus:ring-0 focus:border-black peer"
      placeholder=" "
      required
    />
    <label
      htmlFor="email"
      className="peer-focus:font-medium flex flex-row gap-2 absolute text-sm text-black dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    >
      <HiOutlineMail size={20} /> Email address
    </label>
  </div>
  <div className="relative z-0 w-full mb-10 group">
    <input
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      type={showPassword ? "text" : "password"}
      name="password"
      id="password"
      className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-black appearance-none dark:text-black dark:border-black dark:focus:border-black focus:outline-none focus:ring-0 focus:border-black peer"
      placeholder=" "
      required
    />
    <label
      htmlFor="password"
      className="flex flex-row gap-2 peer-focus:font-medium absolute text-sm text-black dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    >
      <TfiUnlock size={20} /> Password
    </label>
    <button
      type="button"
      className="absolute right-2 top-2 text-white"
      onClick={handleTogglePassword}
    >
      {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
    </button>
  </div>

  <button
    type="submit"
    className="btn btn-wide btn-md 2xl:btn-lg flex mx-auto 2xl:mt-10 2xl:mb-10 px-4 tracking-wide border-lapak hover:border-lapak text-white transition-colors duration-200 transform bg-lapak rounded-md hover:bg-lapak focus:outline-none focus:bg-dark-alta"
  >
    <p className="text-xl 2xltext-2xl">Masuk Pak eko</p>
  </button>
</form>

<p className="mt-8 text-lg font-light text-center text-white mb-10">
  {" "}
  Don't have an account?{" "}
  <p
    onClick={() => navigate('/register')}
    className="font-medium text-white hover:underline hover:text-orange-600"
  >
    Sign up
  </p>
</p>
</div>
        </div>
  
  )
}

export default Login