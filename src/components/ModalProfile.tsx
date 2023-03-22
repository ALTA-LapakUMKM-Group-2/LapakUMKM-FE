import Avatar from "../assets/profile.jpg"
import CustomButton from "./CustomButton"
import CustomInput from "./CutomInput"

const ModalProfile = () => {

  return (
    <div className="bg-white flex py-5">
      <div className="w-6/12 flex flex-col items-center justify-center">
        <p className="text-zinc-800 text-[22px] font-semibold mb-8">Tambah Foto Porfile</p>
        <div
          className="md:w-[12rem] md:h-[12rem] lg:w-[16rem] lg:h-[16rem] overflow-hidden rounded-full"
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
          className="w-full mt-8 text-[18px] text-zinc-800 text-center file:rounded-lg file:bg-lapak file:py-2 file:lg:px-10 file:md:px-8 file:px-5 file:text-[18px] file:text-zinc-50 hover:file:bg-green-400 hover:file:text-zinc-800 hover:file:cursor-pointer"
        />
      </div>

      <div className="w-6/12 items-center mx-24">
        <div className="space-y-5">
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
        </div>

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