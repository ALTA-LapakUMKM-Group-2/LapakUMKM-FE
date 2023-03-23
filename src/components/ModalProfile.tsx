import Avatar from "../assets/profile.jpg"
import CustomButton from "./CustomButton"
import CustomInput from "./CutomInput"

import CurrencyInput from "react-currency-input-field"

const ModalProfile = () => {

  return (
    <div className="bg-white flex flex-col md:flex-row lg:flex-row py-5">
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
        <form className="space-y-5">
          <CustomInput
            id="input-nama"
            label="Nama Lengkap :"
            name="nama"
            type="text"
            placeholder={"Contoh : Arif Muhammad"}
          />

          <CustomInput
            id="input-alamat"
            label="Alamat Lengkap :"
            name="alamat"
            type="text"
            placeholder={"Contoh : Jl. Hayam wuruk no.13, Garum, Blitar"}
          />

          <CustomInput
            id="input-email"
            label="E-mail :"
            name="email"
            type="text"
            placeholder={"Contoh : arifmuhammad12@gmail.com"}
          />

          <CustomInput
            id="input-telepon"
            label="Telepon :"
            name="telepon"
            type="text"
            placeholder={"Contoh : 089523894188"}
          />

        </form>

        <div className="mt-8">
          <CustomButton
            id="btn-update"
            label="Perbarui Profile"
          />
        </div>
      </div>
    </div>



  )

}

export default ModalProfile