import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { HiCog6Tooth } from 'react-icons/hi2'
import { FaSignOutAlt } from 'react-icons/fa'
import { MdOutlineWorkHistory } from 'react-icons/md'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { AiOutlineSearch } from 'react-icons/ai'
import Logo from '../assets/LapakUmkm2.png'

import Swal from 'sweetalert2';
import axios from 'axios';



interface NavbarProps {
    name?: string
    email?: string
    handleProfile?: React.MouseEventHandler;
    children?: React.ReactNode
    imgUser?: string
}

const Navbar: React.FC<NavbarProps> = ({ name, email, handleProfile, children, imgUser }) => {


    // handle log out
    const [cookies, setCookie, removeCookie] = useCookies(['session', 'role','token']);
    const navigate = useNavigate()



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
                removeCookie('session');
                removeCookie('role');
                removeCookie('token');
                navigate("/");
            }
        });
    }

    //Handle Profile Picture 
    const [img, setImg] = React.useState<any>()

    return (
        <div className="navbar w-full bg-base-100 shadow-md z-10 sticky top-0 text-white border-b-2 justify-center">
            <div className='flex gap-4 flex-between justify-center w-full mx-10'>
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
                        <span className="indicator-item badge mx-10 ">99+</span> 
                            <MdOutlineShoppingCart className='text-gray-900 w-10 h-10 my-auto mx-10 cursor-pointer' onClick={()=> navigate('/cart')}/>
                        </div>
                    </div>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="">

                            <div className="avatar">
                                <div className="w-14 rounded-full">
                                    <img src={imgUser} />
                                </div>
                            </div>

                        </label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 text-lapak font-semibold">
                            <div className="px-4 py-3 text-sm text-gray-900">
                                <div>{name}</div>
                                <div className="font-medium truncate">{email}</div>
                            </div>
                            <li onClick={() => navigate('/profile')}><a id='link-profile'>

                                <HiCog6Tooth />
                                Profile
                            </a>
                            </li>
                            <li onClick={() => navigate('/')}><a>
                                <MdOutlineWorkHistory />
                                Your History
                            </a>
                            </li>
                            <li onClick={handleLogout}><a>
                                <FaSignOutAlt />
                                Sign Out
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