import React, { useState } from 'react'
import bgregis from '../assets/bgregis.jpg'
import { HiEye, HiEyeOff, HiOutlineMail } from "react-icons/hi";

import { useNavigate } from 'react-router-dom';
import LapakUmkm from '../assets/LapakUmkm2.png'
import Layout from '../components/Layout';


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
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
        ), url('${bgregis}')`,
    backgroundSize: "cover",
  };
  return (
    <Layout>
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-10 m-auto bg-white rounded-md shadow-xl shadow-lapak ring-2 ring-lapak lg:max-w-xl mx-auto">
          <img src={LapakUmkm} width={300} className='flex justify-center mx-auto mb-10' />
          <form className="mt-6 w-full">


            <div className="mb-5">
              <label
                htmlFor="email"
                className="block text-md font-semibold text-gray-800"
              >
                Email
              </label>
              <input
                type="email"
                className="input input-bordered input-accent w-96 max-w-lg"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block text-md font-semibold text-gray-800"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered input-accent w-full max-w-lg pr-10"
                />
                <button
                  type="button"
                  className="absolute right-2 top-3 text-black"
                  onClick={handleTogglePassword}
                >
                  {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500
                  border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-black font-medium">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-black hover:underline ">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-10">
              <button className="w-full px-4 py-2 tracking-wide text-white font-semibold text-lg transition-colors duration-200 transform bg-lapak rounded-md hover:lapak focus:outline-none focus:bg-lapak hover:translate-y-1">
                Masuk pak eko
              </button>
            </div>
          </form>

          <p className="mt-8 text-sm font-semibold  text-center text-gray-700">
            {" "}
            Dont have an account?{" "}
            <a
              href="/register"
              className="font-medium text-indigo-600 hover:underline"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </Layout>

  )
}

export default Login