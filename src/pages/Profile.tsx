import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

import withreactcontent from "sweetalert2-react-content"
import Swal from "sweetalert2"

import Layout from "../components/Layout"
import Navbar from "../components/Navbar"

import Avatar from "../assets/profile.jpg"

import { MdOutlineAlternateEmail, MdOutlineWorkHistory } from "react-icons/md"
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2"
import { BsHouseDoor } from "react-icons/bs"
import { GoPackage } from "react-icons/go"
import { SlHandbag } from "react-icons/sl"
import { VscTrash } from "react-icons/vsc"
import { FiEdit } from "react-icons/fi"
import ModalProfile from "../components/ModalProfile"
import Modal from "../components/Modal"
import CustomInput from "../components/CutomInput"
import CustomButton from "../components/CustomButton"
import axios from "axios"
import { useCookies } from "react-cookie"
import Loading from "../components/Loading"

const Profile = () => {
  const navigate = useNavigate()
  const MySwal = withreactcontent(Swal)
  const [modal, setModal] = useState<string>("modal")
  const [showModal, setShowModal] = useState(false)
  const [modalAing, setModalAing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>([])
  const [disable, setDisable] = useState<boolean>(true);
  const [shopName, setShopName] = useState('')

  const handleUpdateStatus = async (e: any) => {
    e.preventDefault()
    try {
      const res = await axios.post('https://lapakumkm.mindd.site/users/update-to-seller', {
        shop_name: shopName
      }, {
        headers: {
          Authorization: `Bearer ${cookies.token}`
        }
      })
      const { data } = res.data
      console.log(data);

      if (data) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Berhasil update nama toko",
          showConfirmButton: false,
          timer: 1500
        })
      }
      getProfile()
      setModalAing(false)
    } catch (error) {

    }
  }

  const handleVerified = () => {
    MySwal.fire({
      icon: "info",
      title: "Ingin melanjutkan verifikasi ?",
      text: "pilih lanjutkan",
      confirmButtonText: "lanjutkan",
      confirmButtonColor: "#31CFB9",
      reverseButtons: true,
      showCancelButton: true,
      cancelButtonText: "kembali",
      cancelButtonColor: "#db1f1f"
    }).then((lanjutkan) => {
      if (lanjutkan.isConfirmed) {
        console.log("oke")
      }
    })
  }

  const getProfile = async () => {
    setLoading(true)
    try {
      const res = await axios.get('https://lapakumkm.mindd.site/users', {
        headers: {
          Authorization: `Bearer ${cookies.token}`
        }
      })
      setData(res.data.data)

    } catch (error) {

    }
    setLoading(false)
  }

  useEffect(() => {
    getProfile()
  }, [])

  const [fullName, setFullName] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [cookies, setCookies,removeCookies] = useCookies(['token'])
  const [imageProfile, setImageProfile] = useState<File>()
  console.log("test token ", cookies.token);
  const id = useParams()

  const handleEditProfile = async (e: any) => {
    e.preventDefault()

    const data = {
      full_name: fullName,
      address: address,
      email: email,
      phone_number: phone
    }
    // formData.append('photo_profile' , imageProfile)  
    try {
      const res = await axios.post(`https://lapakumkm.mindd.site/users`, data, {
        headers: {
          Authorization: `Bearer ${cookies.token}`

        }
      })
      if (res.data) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "profile Update berhasil",
          showConfirmButton: false,
          timer: 1500
        })
      }
      getProfile()
      setShowModal(false)
    } catch (error) {
      console.log(error);
    }
  }
  
  const deleteUser = async() => {
    const res = await Swal.fire({
    title: "Hapus Akun?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Hapus",
    cancelButtonText: "Tidak",
    color: '#353E3C',
    background: '#ffffff ',
    confirmButtonColor: "#31CFB9",
    cancelButtonColor: "#FE4135",
  });

  if (res.isConfirmed) {
    try {
      const res = await axios.delete('https://lapakumkm.mindd.site/users', {
        headers: {
          Authorization: `Bearer ${cookies.token}`
        }
      });
      console.log(res.data);
      if(res.data) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Hapus Akun Berhasil",
          showConfirmButton: false,
          timer: 1500
        });
        removeCookies('token');
         navigate("/");

      }
    } catch (error) {
      console.log(error);
    }
  }
};






  return (
    <Layout>
      <Navbar />
        {
          loading ? <Loading /> : <>
            <Modal isOpen={modalAing} isClose={() => setModalAing(false)}>
        <form onSubmit={handleUpdateStatus}>
          <CustomInput
            onChange={(e) => setShopName(e.target.value)}
            id="shop_name"
            label="Nama Toko"
            name="shop_name"
            placeholder="Masukkan nama toko anda" />
          <div className="mt-8">
            <CustomButton
              id="btn-update"
              label="Perbaharui"
              loading={!shopName}
            />
          </div>
        </form>
      </Modal>

      <div className="w-full px-5 md:px-16 lg:px-28">
        <h1 className="text-zinc-800 text-[30px] text-center md:text-start lg:text-start font-semibold md:mt-10 lg:mt-16 tracking-wider">Profile Detail Saya</h1>

        <div className="flex flex-col md:flex-row lg:flex-row mt-4 md:mt-10 lg:mt-14">


          <div className="bg-none md:bg-white lg:bg-white p-6  md:shadow-[0px_2px_5px_0px_rgba(0,0,0,0.5)] lg:shadow-[0px_2px_5px_0px_rgba(0,0,0,0.5)] rounded-lg flex flex-col items-center md:w-5/12 lg:w-3/12 h-[23rem]">
            <div className="rounded-full w-9/12 md:w-11/12 lg:w-11/12 overflow-hidden h-4/6 ">
              <img src={data.photo_profile} alt="profile.png" className="" />
            </div>

            <p className="text-[20px] font-semibold text-zinc-800 mt-8">{data.shop_name ? data.shop_name : data.full_name}</p>
            <p className="text-[20px] font-semibold text-zinc-800">{data.role}</p>
          </div>

          <div className="w-10/12 md:w-7/12 lg:w-7/12 pl-0 md:pl-16 lg:pl-16 pt-0 md:pt-8 lg:pt-8 flex flex-col text-[18px] text-zinc-800">
            <p className="flex gap-2 font-semibold text-center"><BsHouseDoor size={24} /> Alamat :</p>
            <p className="tracking-wide"> {data.address}</p>
            <p className="flex gap-2 mt-5 md:mt-10 lg:mt-10 font-semibold text-center"><MdOutlineAlternateEmail size={24} /> E - mail :</p>
            <p className="tracking-wide">{data.email}</p>
            <p className="flex gap-2 mt-5 md:mt-10 lg:mt-10 font-semibold text-center"><HiOutlineDevicePhoneMobile size={24} />Telepon :</p>
            <p className="tracking-wide"> {data.phone_number}</p>
          </div>
        </div>

        <div onClick={() => setShowModal(true)} className="flex text-[18px] w-7/12 md:w-3/12 lg:w-2/12 text-zinc-800 font-medium gap-2 mt-10 text-center hover:cursor-pointer hover:text-zinc-500"><FiEdit size={24} />Perbarui Profile</div>

        <div onClick={() => navigate('/historypembeli')} className="flex text-[18px] w-10/12 md:w-5/12 lg:w-3/12 text-zinc-800 font-medium gap-2 mt-4 text-center hover:cursor-pointer hover:text-zinc-500"><MdOutlineWorkHistory size={24} />Lihat history pembelian ?</div>

        <div onClick={() => setModalAing(true)} className="flex text-[18px] w-10/12 md:w-5/12 lg:w-3/12 text-zinc-800 font-medium gap-2 mt-4 text-center hover:cursor-pointer hover:text-zinc-500"><SlHandbag size={24} />Ingin menjadi penjual ?</div>

        <div onClick={() => navigate("/listproduct")} className="flex text-[18px] w-10/12 md:w-5/12 lg:w-3/12 text-zinc-800 font-medium gap-2 mt-4 text-center hover:cursor-pointer hover:text-zinc-500"><GoPackage size={24} />Lihat product anda</div>


        <div onClick={deleteUser} className="flex text-[18px] w-7/12 md:w-3/12 lg:w-2/12 mb-10 text-red-500 font-medium gap-2 mt-4 text-center hover:cursor-pointer hover:text-red-400"><VscTrash size={24} />Hapus akun </div>
      </div>

      <Modal isOpen={showModal} isClose={() => setShowModal(false)} title='Edit Profile'>
        <form action="" onSubmit={handleEditProfile}>
          <div className=" flex flex-col md:flex-row lg:flex-row py-5">
            <div className="w-11/12 md:w-6/12 lg:w-6/12 flex flex-col items-center justify-center">
              <p className="text-zinc-800 text-[22px] font-semibold mb-8">Tambah Foto Porfile</p>
              <div
                className="w-[10em] h-[10rem] md:w-[12rem] md:h-[12rem] lg:w-[16rem] lg:h-[16rem] overflow-hidden rounded-full"
              >
                <img
                  src={Avatar}
                  alt="porfil.jpg"
                  className="w-full"
                />
              </div>
              <input
                id="upload_gambar"
                type="file"
                accept="image.png, image.jpeg, image.jpg"
                className="w-full mt-8 text-[18px] text-zinc-800 text-center file:rounded-lg file:bg-lapak file:py-1 file:md:py-2 file:lg:py-2 file:px-4 file:md:px-8 file:lg:px-10   file:text-[18px] file:text-white hover:file:bg-sky-500 hover:file:cursor-pointer"
              />
            </div>

            <div className="w-11/12 md:w-6/12 lg:w-6/12 items-center mx-2 md:mx-24 lg:mx-24 mt-8 md:mt-0 lg:mt-0">

              <CustomInput
                id="full_name"
                label="Nama Lengkap :"
                name="full_name"
                type="text"
                placeholder={data.fullname}
                onChange={(e) => setFullName(e.target.value)}
              />

              <CustomInput
                id="address"
                label="Alamat Lengkap :"
                name="address"
                type="text"
                placeholder={data.address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <CustomInput
                id="email"
                label="E-mail :"
                name="email"
                type="text"
                placeholder={data.email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <CustomInput
                id="phone_number"
                label="Telepon :"
                name="phone_number"
                type="text"
                placeholder={data.phone_number}
                onChange={(e) => setPhone(e.target.value)}
              />



              <div className="mt-8">
                <CustomButton
                  id="btn-update"
                  label="Perbarui Profile"
                  loading={!fullName && !address && !email && !phone}
                />
              </div>
            </div>
          </div>
        </form>
      </Modal>
          </> 
        }

    </Layout>
  )

}

export default Profile