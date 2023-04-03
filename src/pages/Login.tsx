import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux"
import { useCookies } from 'react-cookie';
import axios from 'axios';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';
import { handleAuth } from '../utils/redux/reducer/reducer';
import Loading from '../components/Loading';
import Layout from '../components/Layout';
import LapakUmkm from '../assets/LapakUmkm2.png'
import { HiEye, HiEyeOff } from "react-icons/hi";
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CutomInput';
import { useGoogleLogin } from '@react-oauth/google';
import Modal from '../components/Modal';
import { FcGoogle } from 'react-icons/fc'

const Login = () => {

  const [user, setUser] = useState<any>({});
  const [profile, setProfile] = useState<any>({});
  const [openModal, setModalOpen] = useState<boolean>(false)
  const [LupaPassword, setLupaPassword] = useState<string>("")
  const [cookie, setCookie] = useCookies(["token", "id", "photo_profile", "name", "full_name"]);

  const login = useGoogleLogin({
    onSuccess: tokenResponse =>  setUser(tokenResponse),
  });

  const handleGetAccessToken = async () => {
    try {
      const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
          Accept: 'application/json'
        }
      });
      setProfile(response.data);
      if (response.data) {
        handleLoginWithGoogle(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginWithGoogle = async (profile: any) => {
    setLoading(true);
    try {
      const response = await axios.post(`https://lapakumkm.mindd.site/auth/sso-response-callback`, {
        email: profile.email,
        verified_email: profile.verified_email,
        photo: profile.picture
      });
      const { message, data } = response.data;
      setCookie("token", data.token, { path: "/" });
      setCookie('id', data.user.id, { path: '/' })
      setCookie('name', data.user.full_name, { path: '/' })
      setCookie('photo_profile', profile.picture, { path: '/' })
      MySwal.fire({
        icon: "success",
        title: message,
        text: "Berhasil Melakukan Login",
        showConfirmButton: false,
        showCancelButton: false,
        timer: 1500,
      });
      navigate('/home');
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      handleGetAccessToken();
    }
  }, [user]);



  const navigate = useNavigate();
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);
  const [disable, setDisable] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (email && password) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [email, password]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const body = {
      email,
      password,
    };

    axios
      .post(`
      https://lapakumkm.mindd.site/auth/login`, body)
      .then((res) => {
        const { message, data } = res.data
        setCookie("token", data.token, { path: "/" });
        setCookie('id', data.user.id, { path: '/' })
        setCookie('full_name', data.user.full_name, { path: '/' })
        setCookie('photo_profile', data.user.photo_profile, { path: '/' })
        dispatch(handleAuth(true))
        MySwal.fire({
          icon: "success",
          title: message,
          text: "Berhasil Melakukan Login",
          showConfirmButton: false,
          showCancelButton: false,
          timer: 1500,
        })
        navigate('/home')
      })
      .catch((err) => {
        const { data } = err.response;
        MySwal.fire({
          icon: "error",
          title: data.message,
          text: "Gagal melakukan login",
          showCancelButton: false,
        })
      })
      .finally(() => setLoading(false))
  }

  const [disable2, setDisable2] = useState<boolean>(true)
  const [lupaPassword2, setLupaPassword2] = useState<string>("")

  useEffect(() => {
    LupaPassword ? setDisable2(false) : setDisable2(true)
  }, [LupaPassword])

  function lupaPassword(event: any) {
    setLupaPassword(event.target.value);
  }

  const handleChange = () => {
    setLoading(true)
    setLupaPassword2(LupaPassword)
    if (lupaPassword2) {
      dataLupaPassword(lupaPassword2)
    }
    setLoading(false)
  }

  const link = "https://mail.google.com/mail/u/0/#inbox"

  async function dataLupaPassword(password: any) {
    // setLoading(true)
    await axios
      .get(`https://lapakumkm.mindd.site/auth/forget-password?email=${password}`)
      .then((res) => {
        setModalOpen(false)
        Swal.fire({
          icon: "info",
          title: "Silahkan Cek Email Anda",
          confirmButtonText: "Cek Email",
          confirmButtonColor: "#31CFB9",
        }).then((cekEmail) => {
          if (cekEmail.isConfirmed) {
            window.open(`${link}`)
          }
        })
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: err.response.data.message,
          text: "Email tidak terdaftar",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1500
        })
      })
      .finally(() => setLoading(false))
  }

  return (
    <Layout>
      {loading ? <Loading /> :
        <>
          <div className="login relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="lg:my-16 2xl:my-8 p-4 md:p-6 lg:p-5 2xl:p-10 m-auto bg-white rounded-md shadow-xl  ring-2 ring-lapak w-9/12 md:w-5/12 lg:w-3/12 2xl:max-w-xl mx-auto">
              <img src={LapakUmkm} className='flex justify-center mx-auto md:mb-10 lg:mb-10 2xl:mb-20 w-5/12 md:w-5/12 lg:w-6/12 2xl:w-7/12' />
              <form onSubmit={(e) => handleLogin(e)} className="mt-6 w-full border-b-4 pb-4">
                <div className="mb-5">
                  <label
                    htmlFor="email"
                    className="block text-sm md:text-[16px] lg:text-[16px] 2xl:text-[18px] font-semibold text-gray-800"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className="input input-bordered input-accent w-full max-w-lg pr-10"
                    onChange={(e) => setEmail(e.target.value)}
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
                      type={showPassword ? "text" : "password"}
                      className="input input-bordered input-accent w-full max-w-lg pr-10"
                      onChange={(e) => setPassword(e.target.value)}
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
                <div className="flex flex-col md:flex-row lg:flex-row 2xl:flex-row items-start md:items-center lg:items-center 2xl:items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500
                  border-gray-300 rounded cursor-pointer"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-black font-medium">
                      Ingat saya
                    </label>
                  </div>

                  <div className="text-sm">
                    <a onClick={() => setModalOpen(true)} className="hover:cursor-pointer font-medium text-black hover:underline ">
                      Lupa password?
                    </a>
                  </div>
                </div>
                <div className="mt-10">
                  <CustomButton
                    id='btn-login'
                    label='Masuk'
                    loading={disable || loading}
                  />
                </div>
              </form>

              <div className="mt-3">
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => login()}
                  className="btn mb-2 flex  px-6 bg-white text-black hover:bg-slate-200 hover:scale-125 rounded-xl font-semibold shadow-xl  border-gray-300 w-80  uppercase leading-normal  transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                  >
                    <FcGoogle className='mr-5' size={25}/>
                  Masuk Dengan Google 
                </button>
              </div>
              </div>

              <p className="mt-8 text-sm font-semibold  text-center text-gray-700">
                {" "}
                Belum memiliki akun?{" "}
                <a
                  onClick={() => navigate('/register')}
                  className="font-medium text-indigo-600 hover:underline"
                >
                  Daftar
                </a>
              </p>
            </div>
          </div>

          <Modal isOpen={openModal} isClose={() => setModalOpen(false)}>
            <div className=" flex flex-col md:flex-col lg:flex-col py-5" title="Lupa Password">

              <CustomInput
                id="input-passwordlama"
                label="Masukkan email anda "
                name="password_lama"
                type="text"
                placeholder="contoh: admin@gmail.com"
                onChange={lupaPassword}
              />

              <div className="mt-8">
                <CustomButton
                  id="btn-update"
                  label="Perbarui Password"
                  onClick={() => handleChange()}
                  loading={disable2 || loading}
                />
              </div>
            </div>
          </Modal>
        </>
      }

    </Layout>

  )
}

export default Login