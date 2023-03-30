import React, { useState, useEffect, useCallback } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from "react-redux"
import { Cookies, useCookies } from 'react-cookie';
import axios from 'axios';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { handleAuth } from '../utils/redux/reducer/reducer';
import Loading from '../components/Loading';
import Layout from '../components/Layout';
import LapakUmkm from '../assets/LapakUmkm2.png'
import bgregis from '../assets/bgregis.jpg'
import { HiEye, HiEyeOff, HiOutlineMail } from "react-icons/hi";
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CutomInput';
import Modal from '../components/Modal';

const LupaPassword = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const ChangePasswordEndpoint = 'https://lapakumkm.mindd.site/auth/new-password'

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password === confirmPassword) {
            handleChangePassword(password, confirmPassword)
        } else {
        // Passwords don't match, show error
            Swal.fire({
                icon: 'error',
                title: 'Password Tidak Sama',
                confirmButtonText: "Oke",
                confirmButtonColor: "#31CFB9",
                reverseButtons: true,
                imageAlt: 'Custom image',
            })
        }
    };

    const handleChangePassword = async (password: string, newPassword: string) => {
        setLoading(true)
        try {
            const response = await axios.post(ChangePasswordEndpoint, {
                token: token,
                new_password: password,
                confirm_password: newPassword,
            })
            const { message, data } = response.data;
            Swal.fire({
                icon: "success",
                title: message,
                text: "Berhasil Mengganti Password",
                showConfirmButton: false,
                showCancelButton: false,
                timer: 1500,
            });
            navigate('/');
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };
    const handleToggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };
    console.log(token)

    return (
        <Layout>
        <div className="login relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="lg:my-16 2xl:my-8 p-4 md:p-6 lg:p-5 2xl:p-10 m-auto bg-white rounded-md shadow-xl  ring-2 ring-lapak w-9/12 md:w-5/12 lg:w-3/12 2xl:max-w-xl mx-auto">
                <img src={LapakUmkm} className='flex justify-center mx-auto md:mb-10 lg:mb-10 2xl:mb-20 w-5/12 md:w-5/12 lg:w-6/12 2xl:w-7/12' />
                <form className="flex flex-col mt-6 w-full" onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label
                    htmlFor="password"
                    className="block text-sm md:text-[16px] lg:text-[16px] 2xl:text-[18px] font-semibold text-gray-800"
                    >
                    Password Baru
                    </label>
                    <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        className="input input-bordered input-accent w-full max-w-lg pr-10"
                        onChange={handlePasswordChange}
                        minLength={8}
                    />
                    <button
                        type="button"
                        className="absolute right-2 top-3 text-zinc-800"
                        onClick={handleTogglePassword}
                    >
                        {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                    </button>
                    </div>
                </div>

                <div className="mb-5">
                    <label
                    htmlFor="password"
                    className="block text-sm md:text-[16px] lg:text-[16px] 2xl:text-[18px] font-semibold text-gray-800"
                    >
                    Konfirmasi Password
                    </label>
                    <div className="relative">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        className="input input-bordered input-accent w-full max-w-lg pr-10"
                        onChange={handleConfirmPasswordChange}
                        minLength={8}
                    />
                    <button
                        type="button"
                        className="absolute right-2 top-3 text-zinc-800"
                        onClick={handleToggleConfirmPassword}
                    >
                        {showConfirmPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                    </button>
                    </div>
                </div>

                <div className="mt-10">
                    <CustomButton
                        id='btn-login'
                        label='Ubah Password'
                    />
                </div>
                
                </form>
            </div>
        </div>
        </Layout >
    )
}

export default LupaPassword