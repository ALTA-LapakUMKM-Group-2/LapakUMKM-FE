import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useDispatch } from "react-redux";
import { handleAuth } from '../utils/redux/reducer/reducer';
import axios from 'axios';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';
import Logo from '../assets/LapakUmkm2.png'
import Default from '../assets/default.jpg'
import { MdOutlineWorkHistory, MdOutlineShoppingCart } from 'react-icons/md'
import { FaSignOutAlt, FaSignInAlt } from 'react-icons/fa'
import { HiCog6Tooth } from 'react-icons/hi2'
import { BsWechat } from 'react-icons/bs'
import ChatModal from './ChatModal';
import { Chat } from '../utils/types/DataType';

interface NavbarProps {
    name?: string
    email?: string
    handleProfile?: React.MouseEventHandler;
    children?: React.ReactNode
    imgUser?: string
}

const Navbar: React.FC<NavbarProps> = ({ name, email, handleProfile, children, imgUser }) => {

    // handle log out
    const MySwal = withReactContent(Swal)
    const dispatch = useDispatch()
    const [cookies, setCookie, removeCookie] = useCookies(['id', 'token', 'photo_profile', 'full_name', "name","TokoId"]);
    const checkToken = cookies.token
    const navigate = useNavigate()
    const [cart, setCart] = useState([])
    const [nama, setNama] = useState<string>("")
    const [mail, setMail] = useState<string>("")
    const [photo, setPhoto] = useState<string>("")
    const [role, setRole] = useState<string>("")
    const [dataRoomsID, setDataRoomsID] = useState<Chat[]>([])
    const [showChat, setShowChat] = useState<boolean>(false)

    const handleLogout = () => {
        MySwal.fire({
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
                MySwal.fire({
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
                removeCookie('name');
                removeCookie('token');
                removeCookie('id');
                removeCookie('photo_profile');
                removeCookie('TokoId');
                removeCookie('full_name');
                navigate("/login");
                localStorage.removeItem('theme')
            }
        });
    }

    useEffect(() => {
        checkToken ? fetchDataCart() : 0
    }, [])


    const cartEndPoint = 'https://lapakumkm.mindd.site/carts'
    const fetchDataCart = async () => {
        try {
            const response = await axios.get(cartEndPoint, {
                headers: {
                    Authorization: `Bearer ${cookies.token}`
                }
            });
            const data = response.data.data
            setCart(data);
        } catch (error) {
            console.log(error);
        } finally {

        }
    };

    useEffect(() => {
        fetchDataCart()
    }, [])

    function ProfileData() {
        axios
            .get(`https://lapakumkm.mindd.site/users`, {
                headers: {
                    Authorization: `Bearer ${checkToken}`
                }
            })
            .then((res) => {
                const { full_name, email, photo_profile, role } = res.data.data
                setNama(full_name)
                setMail(email)
                setPhoto(photo_profile)
                setRole(role)
            })
            .catch((err) => {
                console.log(err);

            })
    }

    useEffect(() => {
        checkToken ? ProfileData() : ""
    }, [])



    const handleNavigate = () => {
        if (!cookies.token) {
            Swal.fire({
                icon: "warning",
                title: "Anda Belum Login",
                text: "Silahkan Login terlebih dahulu",
                confirmButtonText: "Login",
                confirmButtonColor: "#31CFB9",
                cancelButtonText: "Cancel",
                cancelButtonColor: "#FF6E40",
                showCancelButton:true,
            }).then((go) => {
                if(go.isConfirmed)
                navigate('/login')
            })
        } else {
            navigate('/cart')
        }
    }

    // DarkMode
    const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    const handleThemeSwitch = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };


    const handleShowChat = async () => {
        setShowChat(true)
        axios
            .get(`https://lapakumkm.mindd.site/chats/users`, {
                headers: {
                    Authorization: `Bearer ${cookies.token}`
                }
            })
            .then((res) => {
                setDataRoomsID(res.data.data)
            })
            .catch((err) => {
                console.log(err.response.data.message)
            })
    }

    return (
        <>
            <ChatModal
                img={photo}
                isOpen={showChat}
                isClose={() => setShowChat(false)}
                RoomsChat={dataRoomsID}
                role={role}
            />

            <div className="navbar py-4 w-full bg-base-100 shadow-md z-10 sticky top-0 text-white border-b-2 dark:border-b-2 dark:border-lapak justify-center dark:bg-slate-800 ">
                <div className='flex gap-4 justify-between w-full md:mx-10'>
                    <div>
                        <button onClick={() => navigate("/home")} className="font-semibold md:flex text-4xl text-white hover:text-accent">
                            <img src={Logo} alt="Lapak_umkm" className='w-24' />
                        </button >
                    </div>
                    <div className="w-full justify-center md:mx-20">
                        {children}
                    </div>
                    <div className="flex">
                        <div className='flex  h-12 w-12 items-center my-auto hover:border hover:translate-x-1'>
                            <label className="swap swap-rotate  mx-auto">
                                <input type="checkbox" onClick={handleThemeSwitch} />
                                <svg
                                    className="swap-on fill-current -mr-5 w-10 h-8 text-black dark:text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                                </svg>

                                <svg
                                    className="swap-off fill-current w-10 h-7 my-auto text-black dark:text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                                </svg>
                            </label>
                        </div>

                        <div className='flex  h-12 w-12 items-center my-auto  mx-4   md:mx-10 hover:border hover:p-2'>
                            <div className="tooltip tooltip-bottom tooltip-accent " data-tip="Keranjang">
                                <div className="indicator ">
                                    <span className="indicator-item badge mt-3 bg-lapak border-none">{cart.length}</span>
                                    <MdOutlineShoppingCart className='text-gray-900 dark:text-white w-8 h-8  cursor-pointer mt-3' onClick={handleNavigate} />
                                </div>
                            </div>
                        </div>

                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="">

                                <div className="avatar">
                                    <div className="w-14 rounded-full">
                                        <img src={checkToken && photo ? photo : cookies.photo_profile ? cookies.photo_profile : Default} />
                                    </div>
                                </div>

                            </label>
                            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 text-lapak font-semibold dark:bg-slate-700 ">
                                {checkToken ?
                                    <>
                                        <div className="px-4 py-3 text-sm text-gray-900 w-44 dark:text-white">
                                            <div className=''> {nama}</div>
                                            <div className="font-medium ">{mail}</div>
                                        </div>
                                    </>
                                    : <></>}
                                {
                                    checkToken ?
                                        <>
                                            <li onClick={() => checkToken ? navigate('/profile') : navigate('/')}><a id='link-profile'>

                                                <HiCog6Tooth />
                                                Data Diri
                                            </a>
                                            </li>
                                            <li onClick={() => checkToken ? navigate('/historypembeli') : navigate('/')}><a>
                                                <MdOutlineWorkHistory />
                                                Riwayat Belanja
                                            </a>
                                            </li>
                                            {role === "seller" ? <li onClick={() => handleShowChat()}><a>
                                                <BsWechat />
                                                Obrolan
                                            </a>
                                            </li> : ""}

                                            <li onClick={() => checkToken ? handleLogout() : navigate("/")}><a>
                                                {checkToken ? <FaSignOutAlt /> : <FaSignInAlt />}
                                                {checkToken ? "Keluar" : "Masuk"}
                                            </a>
                                            </li>
                                        </> : <>
                                            <li onClick={() => checkToken ? handleLogout() : navigate("/login")}><a>
                                                {checkToken ? <FaSignOutAlt /> : <FaSignInAlt />}
                                                {checkToken ? "Keluar" : "Masuk"}
                                            </a>
                                            </li></>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar