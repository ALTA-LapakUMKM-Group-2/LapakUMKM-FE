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
    const [cookies, setCookie, removeCookie] = useCookies(['session', 'role']);
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
                navigate("/");
            }
        });
    }

    //Handle Profile Picture
    const [loading, setLoading] = React.useState(true)
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

                    <form>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <AiOutlineSearch className='w-5 h-5 text-gray-900' />
                            </div>
                            <input type="search" className="block input-accent w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50" placeholder="Search Produk" required />
                            <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-lapak hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Search</button>
                        </div>
                    </form>
                </div>
                <div className="flex">
                    <MdOutlineShoppingCart className='text-gray-900 w-10 h-10 my-auto mx-10' />
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="">
                            <div className="avatar">
                                <div className="w-20 rounded-full">
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