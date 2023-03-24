import React, { useState } from 'react'
import Layout from '../components/Layout'
import LapakUmkm from '../assets/LapakUmkm2.png'
import { HiEye, HiEyeOff, HiOutlineMail } from "react-icons/hi";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')

    const navigate = useNavigate()

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    }

    console.log(password);
    console.log(name);
    console.log(email);

    const handleRegister = async (e: any) => {
        e.preventDefault()

        if (!email || !password || !name) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                text: 'All fields are required',
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }
        const data = {
            email: email,
            password: password,
            full_name: name,
        }
        try {
            const res = await axios.post('https://lapakumkm.mindd.site/auth/register', data)
            if (res.data) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    text: 'Registered successfully',
                    showConfirmButton: false,
                    timer: 1500,
                });
                setEmail('');
                setPassword('');
                setName('');
                navigate('/');
            }
        } catch (error) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: { error },
                showConfirmButton: true,
            });
        }

    }

    return (
        <Layout>
            <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
                <div className="w-full p-10 m-auto bg-white rounded-md shadow-xl shadow-lapak ring-2 ring-lapak lg:max-w-xl mx-auto">
                    <img src={LapakUmkm} width={300} className='flex justify-center mx-auto mb-10' />
                    <form className="mt-6 w-full" onSubmit={handleRegister}>
                        <div className="mb-5">
                            <label
                                htmlFor="name"
                                className="block text-md font-semibold text-gray-800"
                            >
                                fullName
                            </label>
                            <input
                                onChange={(e) => setName(e.target.value)}
                                type="name"
                                className="input input-bordered input-accent w-96 max-w-lg"
                            />
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="email"
                                className="block text-md font-semibold text-gray-800"
                            >
                                Email
                            </label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
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
                                    onChange={(e) => setPassword(e.target.value)}
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
                        <div className="mt-10">
                            <button className="w-full px-4 py-2 tracking-wide text-white font-semibold text-lg transition-colors duration-200 transform bg-lapak rounded-md hover:lapak focus:outline-none focus:bg-lapak hover:translate-y-1">
                                Register
                            </button>
                        </div>
                    </form>

                    <p className="mt-8 text-sm font-semibold  text-center text-gray-700">
                        {" "}
                        Already have an account?{" "}
                        <a
                            href="/"
                            className="font-medium text-indigo-600 hover:underline"
                        >
                            Sign in
                        </a>
                    </p>
                </div>
            </div>

        </Layout>
    )
}

export default Register