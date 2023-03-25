import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useDispatch } from "react-redux";
import { handleAuth } from '../utils/redux/reducer/reducer';
import axios from 'axios';

import Swal from 'sweetalert2';

import Logo from '../assets/LapakUmkm2.png'
import Default from '../assets/default.jpg'

import { HiCog6Tooth } from 'react-icons/hi2'
import { FaSignOutAlt, FaSignInAlt } from 'react-icons/fa'
import { MdOutlineWorkHistory } from 'react-icons/md'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { AiOutlineSearch } from 'react-icons/ai'





interface NavbarProps {
    name?: string
    email?: string
    handleProfile?: React.MouseEventHandler;
    children?: React.ReactNode
    imgUser?: string
}

const Navbar: React.FC<NavbarProps> = ({ name, email, handleProfile, children, imgUser }) => {

    // handle log out
    const dispatch = useDispatch()
    const [cookies, setCookie, removeCookie] = useCookies(['id', 'token']);
    const checkToken = cookies.token
    const navigate = useNavigate()
    const [cart, setCart] = useState([])
    const [nama, setNama] = useState<string>("")
    const [mail, setMail] = useState<string>("")
    const [photo, setPhoto] = useState<string>("")

    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            color: '#353E3C',
            background: '#ffffff ',
            confirmButtonColor: "#31CFB9",
            cancelButtonColor: "#FE4135",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    text: "Logout successfully",
                    iconColor: '#31CFB9',
                    color: '#353E3C',
                    background: '#ffffff ',
                    showConfirmButton: false,
                    timer: 1500,
                })
                dispatch(handleAuth(false));
                removeCookie('id');
                removeCookie('token');
                navigate("/");
            }
        });
    }

    useEffect(() => {
        checkToken ? fetchData() : 0
    }, [])

    function fetchData() {
        axios
            .get(`https://virtserver.swaggerhub.com/UMARUUUN11_1/ALTA-LapakUMKM/1.0.0/carts`, {
                headers: {
                    Authorization: `Bearer ${checkToken}`
                }
            })
            .then((res) => {
                const { data } = res.data
                setCart(data)
            })
            .catch((err) => {
                const { statusText } = err.response
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: statusText,
                    text: "Gagal Download Cart",
                    iconColor: '#31CFB9',
                    color: '#353E3C',
                    background: '#ffffff ',
                    showConfirmButton: false,
                    showCancelButton: false,
                    timer: 1500,
                })
            })
    }

    useEffect(() => {
        checkToken ? ProfileData() : ""
    }, [])

    function ProfileData() {
        axios
            .get(`https://lapakumkm.mindd.site/users`, {
                headers: {
                    Authorization: `Bearer ${checkToken}`
                }
            })
            .then((res) => {
                const { full_name, email, photo_profile } = res.data.data
                setNama(full_name)
                setMail(email)
                setPhoto(photo_profile)

                console.log(res.data.data.photo_profile)
            })
            .catch((err) => {
                const { statusText } = err.response
                console.log(statusText)

            })
    }

    return (
        <div className="navbar py-4 w-full bg-base-100 shadow-md z-10 sticky top-0 text-white border-b-2 justify-center">
            <div className='flex gap-4 justify-between w-full mx-10'>
                <div>
                    <button onClick={() => navigate("/home")} className="font-semibold md:flex text-4xl text-white hover:text-accent">
                        <img src={Logo} alt="Lapak_umkm" className='w-24' />
                    </button >
                </div>
                <div className="w-full justify-center mx-20">
                    {children}
                </div>
                <div className="flex">
                    <div className="tooltip tooltip-bottom tooltip-accent" data-tip="Keranjang">
                        <div className="indicator">
                            <span className="indicator-item badge mx-10 ">{cart.length}</span>
                            <MdOutlineShoppingCart className='text-gray-900 w-10 h-10 my-auto mx-10 cursor-pointer' onClick={() => navigate('/cart')} />
                        </div>
                    </div>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="">

                            <div className="avatar">
                                <div className="w-14 rounded-full">
                                    <img src={checkToken || photo ? photo : Default} />
                                </div>
                            </div>

                        </label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 text-lapak font-semibold">
                            {checkToken ?
                                <>
                                    <div className="px-4 py-3 text-sm text-gray-900">
                                        <div> {nama}</div>
                                        <div className="font-medium truncate">{mail}</div>
                                    </div>
                                </>
                                : <></>}
                            <li onClick={() => checkToken ? navigate('/profile') : navigate('/')}><a id='link-profile'>

                                <HiCog6Tooth />
                                Profile
                            </a>
                            </li>
                            <li onClick={() => checkToken ? navigate('/historypembeli') : navigate('/')}><a>
                                <MdOutlineWorkHistory />
                                Your History
                            </a>
                            </li>
                            <li onClick={() => checkToken ? handleLogout() : navigate("/")}><a>
                                {checkToken ? <FaSignOutAlt /> : <FaSignInAlt />}
                                {checkToken ? "Keluar" : "Masuk"}
                            </a>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Navbar