import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import LapakUmkm from '../assets/LapakUmkm2.png'
import PasswordStrengthBar from 'react-password-strength-bar';
import { HiEye, HiEyeOff, HiOutlineMail } from "react-icons/hi";
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../components/CustomButton';
import Loading from '../components/Loading';


const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [loading, setLoading] = useState<boolean>(false)
    const [disable, setDisable] = useState<boolean>(true)

    const navigate = useNavigate()

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    }

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
            setLoading(true)
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
                navigate('/login');
            }
        } catch (error) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Registrasi Gagal',
                text: 'Email Mungkin Sudah Terdaftar',
                showConfirmButton: true,
            });
        }
        setLoading(false)
    }

    useEffect(() => {
        name && email && password ? setDisable(false) : setDisable(true)
    }, [name, email, password])

    return (
        <Layout>
            {loading ? <Loading /> :
                <div className="login relative flex flex-col justify-center min-h-screen overflow-hidden">
                    <div className="lg:my-12 2xl:my-8 p-4 md:p-6 lg:p-5 2xl:p-10 m-auto bg-white rounded-md  ring-2 ring-lapak w-9/12 md:w-5/12 lg:w-3/12 2xl:max-w-xl mx-auto">
                        <img src={LapakUmkm} className='flex justify-center mx-auto md:mb-10 lg:mb-10 2xl:mb-20 w-5/12 md:w-5/12 lg:w-6/12 2xl:w-7/12' />
                        <form className="mt-6 w-full" onSubmit={handleRegister}>
                            <div className="mb-5">
                                <label
                                    htmlFor="name"
                                    className="mb-1 block text-sm md:text-[16px] lg:text-[16px] 2xl:text-[18px] font-semibold text-gray-800"
                                >
                                    Nama Lengkap
                                </label>
                                <input
                                    onChange={(e) => setName(e.target.value)}
                                    type="name"
                                    className="input input-bordered input-accent w-full max-w-lg pr-10"
                                />
                            </div>
                            <div className="mb-5">
                                <label
                                    htmlFor="email"
                                    className="block text-sm md:text-[16px] lg:text-[16px] 2xl:text-[18px] font-semibold text-gray-800"
                                >
                                    Email
                                </label>
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    className="input input-bordered input-accent w-full max-w-lg pr-10"
                                />
                            </div>
                            <div className="mb-5">
                                <label
                                    htmlFor="password"
                                    className="block text-sm md:text-[16px] lg:text-[16px] 2xl:text-[18px] font-semibold text-gray-800"
                                >
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        onChange={(e) => setPassword(e.target.value)}
                                        type={showPassword ? "text" : "password"}
                                        className="input input-bordered input-accent w-full max-w-lg pr-10 mb-2"
                                        minLength={8}
                                    />
                                    <PasswordStrengthBar password={password}/>
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
                                <CustomButton
                                    id="btn-submit"
                                    label='Mendaftar'
                                    loading={loading || disable}
                                />
                            </div>
                        </form>

                        <p className="mt-8 text-sm font-semibold  text-center text-gray-700">
                            {" "}
                            Sudah punya akun ?{" "}
                            <a
                                onClick={()=> navigate('/login')}
                                className="font-medium text-indigo-600 hover:underline"
                            >
                                Masuk
                            </a>
                        </p>
                    </div>
                </div>
            }
        </Layout >
    )
}

export default Register