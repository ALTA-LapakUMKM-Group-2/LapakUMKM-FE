import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
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

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);
  const [cookie, setCookie] = useCookies(["token", "user", "email"]);
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

        const { message } = res.data
        setCookie("token", res.data.data.token, { path: "/" });
        setCookie('user', res.data.data.user.full_name, { path: '/' })
        setCookie('email', res.data.data.user.email, { path: '/' })
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
  const bg = {
    backgroundImage: `linear-gradient(
          rgba(0, 0, 0, 0.3),
          rgba(0, 0, 0, 0.3)
        ), url('${bgregis}')`,
    backgroundSize: "cover",
  };

  return (
    <Layout>
      {loading ? <Loading /> :

        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden " >
          <div className="w-full p-10 m-auto bg-white rounded-md shadow-xl shadow-lapak ring-2 ring-lapak lg:max-w-xl mx-auto">
            <img src={LapakUmkm} width={300} className='flex justify-center mx-auto mb-20' />
            <form onSubmit={(e) => handleLogin(e)} className="mt-6 w-full">

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
                  onChange={(e) => setEmail(e.target.value)}
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
                    onChange={(e) => setPassword(e.target.value)}
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
                <CustomButton
                  id='btn-login'
                  label='Login'
                  loading={disable || loading}
                />
              </div>
            </form>

            <p className="mt-8 text-sm font-semibold  text-center text-gray-700">
              {" "}
              Don't have an account?{" "}
              <a
                href="/register"
                className="font-medium text-indigo-600 hover:underline"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      }
    </Layout>

  )
}

export default Login