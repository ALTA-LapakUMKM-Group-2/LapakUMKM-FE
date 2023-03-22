import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

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

const Profile = () => {
  const navigate = useNavigate()
  const MySwal = withreactcontent(Swal)
  const [modal, setModal] = useState<string>("modal")

  const handleModal = () => {
    setModal("modal-open")
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

  return (
    <Layout>
      <Navbar />

      <div className="w-full px-5 md:px-16 lg:px-28">
        <h1 className="text-zinc-800 text-[30px] text-center md:text-start lg:text-start font-semibold md:mt-10 lg:mt-16 tracking-wider">Profile Detail Saya</h1>

        <div className="flex flex-col md:flex-row lg:flex-row mt-4 md:mt-10 lg:mt-14">
          <div className="bg-none md:bg-white lg:bg-white p-6  md:shadow-[0px_2px_5px_0px_rgba(0,0,0,0.5)] lg:shadow-[0px_2px_5px_0px_rgba(0,0,0,0.5)] rounded-lg flex flex-col items-center md:w-5/12 lg:w-3/12 h-[23rem]">
            <div className="rounded-full w-9/12 md:w-11/12 lg:w-11/12 overflow-hidden h-4/6 ">
              <img src={Avatar} alt="profile.png" className="" />
            </div>

            <p className="text-[20px] font-semibold text-zinc-800 mt-8">Arif Muhammad</p>
            <p className="text-[20px] font-semibold text-zinc-800">Pedagang</p>
          </div>

          <div className="w-10/12 md:w-7/12 lg:w-7/12 pl-0 md:pl-16 lg:pl-16 pt-0 md:pt-8 lg:pt-8 flex flex-col text-[18px] text-zinc-800">
            <p className="flex gap-2 font-semibold text-center"><BsHouseDoor size={24} /> Alamat :</p>
            <p className="tracking-wide"> Jl. Hasanuddin no.13 RT 01 RW 03, Garum, Blitar</p>
            <p className="flex gap-2 mt-5 md:mt-10 lg:mt-10 font-semibold text-center"><MdOutlineAlternateEmail size={24} /> E - mail :</p>
            <p className="tracking-wide"> arifmuhammad12@gmail.com</p>
            <p className="flex gap-2 mt-5 md:mt-10 lg:mt-10 font-semibold text-center"><HiOutlineDevicePhoneMobile size={24} />Telepon :</p>
            <p className="tracking-wide"> 089523567889</p>
          </div>
        </div>

        <div onClick={() => handleModal()} className="flex text-[18px] w-7/12 md:w-3/12 lg:w-2/12 text-zinc-800 font-medium gap-2 mt-10 text-center hover:cursor-pointer hover:text-zinc-500"><FiEdit size={24} />Perbarui Profile</div>

        <div className="flex text-[18px] w-10/12 md:w-5/12 lg:w-3/12 text-zinc-800 font-medium gap-2 mt-4 text-center hover:cursor-pointer hover:text-zinc-500"><MdOutlineWorkHistory size={24} />Lihat history pembelian ?</div>

        <div onClick={() => handleVerified()} className="flex text-[18px] w-10/12 md:w-5/12 lg:w-3/12 text-zinc-800 font-medium gap-2 mt-4 text-center hover:cursor-pointer hover:text-zinc-500"><SlHandbag size={24} />Ingin menjadi penjual ?</div>

        <div onClick={() => navigate("/listproduct")} className="flex text-[18px] w-10/12 md:w-5/12 lg:w-3/12 text-zinc-800 font-medium gap-2 mt-4 text-center hover:cursor-pointer hover:text-zinc-500"><GoPackage size={24} />Lihat product anda</div>


        <div className="flex text-[18px] w-7/12 md:w-3/12 lg:w-2/12 mb-10 text-red-500 font-medium gap-2 mt-4 text-center hover:cursor-pointer hover:text-red-400"><VscTrash size={24} />Hapus akun </div>
      </div>


      <div id="open-modalEdit" className={`modal ${modal}`}>
        <div className="modal-box max-w-full shadow-xl md:w-11/12 lg:w-9/12">
          <div
            id="btn-closeModal1"
            onClick={() => setModal("modal")}
            className="rounded-full w-7 text-center absolute right-4 top-3 text-[20px] font-bold text-zinc-800 hover:cursor-pointer hover:bg-lapak hover:text-zinc-100"
          >
            ✕
          </div>
          <ModalProfile />
        </div>
      </div>

    </Layout>
  )

}

export default Profile