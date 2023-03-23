import { useState } from "react"

import CustomButton from "../components/CustomButton"
import CustomInput from "../components/CutomInput"
import CurrencyInput from "react-currency-input-field"
import Layout from "../components/Layout"
import Navbar from "../components/Navbar"
import { formatValue } from "react-currency-input-field"
import Kaos from "../assets/kaos.png"

import { FiShoppingBag } from 'react-icons/fi'
import { BiImageAdd } from 'react-icons/bi'
import { BiMoneyWithdraw } from 'react-icons/bi'
import { AiFillStar } from "react-icons/ai"
import Modal from "../components/Modal"
import TextArea from "../components/TextArea"


interface FormValues {
  produkName: string
  stok: number
  ukuran: string
  price: number
  kategori: string
  deskripsi: string
}

const initialFormValues: FormValues = {
  produkName: '',
  stok: 0,
  kategori: '',
  price: 0,
  ukuran: '',
  deskripsi: ''
};


const ListProduct = () => {

  const [price, setPrice] = useState<number>(250000)
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [showAddProduk, setShowAddProduk] = useState(false)
  const [showEditProduk, setShowEditProduk] = useState(false)
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  
  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();

    event.preventDefault();
    const files: File[] = Array.from(event.dataTransfer.files);
    setSelectedImages(files);
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };
  
  // const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const fileList = event.target.files;
  //   setSelectedImages(fileList)
  // };

  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setFormValues({ ...formValues, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setFormValues(initialFormValues);
      console.log(selectedImages)
  }


  return (
    <Layout>
      <Modal 
      isOpen={showAddProduk}
      isClose={()=>setShowAddProduk(false)}
      title="Tambah Produk Baru"
      >
        <form onSubmit={handleSubmit}>
          <div className=" flex flex-col md:flex-row lg:flex-row py-5 space-x-10">
              <div className="flex items-center justify-center w-96">
                  <label htmlFor="dropzone-file" 
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className="flex flex-col items-center justify-center w-full h-96 border-2 border-lapak border-dashed rounded-lg cursor-pointer bg-gray-50"                  >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <BiImageAdd
                          aria-hidden='true'
                          className="w-10 h-10 mb-3 text-gray-400"
                          />
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                      </div>
                      <input id="dropzone-file" type="file" className="hidden" 
                      accept="image.png, image.jpeg, image.jpg"
                      multiple
                      />
                  </label>
              </div> 
            <div className="w-11/12 md:w-6/12 lg:w-6/12 items-center space-y-5">
              
                <CustomInput
                  id="produkName"
                  label="Nama Produk"
                  name="produkName"
                  type="text"
                  placeholder={"Contoh : Kaos Oblong"}
                  value={formValues.produkName}
                  onChange={handleInputChange}
                />
                <CustomInput
                  id="ukuran"
                  label="Ukuran"
                  name="ukuran"
                  type="text"
                  placeholder={"Contoh : L"}
                  value={formValues.ukuran}
                  onChange={handleInputChange}
                />
                <CustomInput
                  id="stok"
                  label="Stok"
                  name="stok"
                  type="number"
                  placeholder={"Contoh : 45"}
                  value={formValues.stok}
                  onChange={handleInputChange}
                />
                <label className="text-zinc-800 text-[18px] font-semibold" htmlFor='kategori'>
                  Kategori
                </label>
                <select className="border-2 mt-2 border-lapak input input-success w-full max-w-full rounded-lg bg-zinc-100 px-4 font-normal text-zinc-800 placeholder-slate-400 disabled:bg-slate-400 text-[16px]"
                  defaultValue={''}
                  id='kategori'
                  name='kategori'
                  value={formValues.kategori}
                  onChange={handleSelectChange}
                  >
                    <option value={'kaos'}>Kaos</option>
                    <option value={'sepatu'}>Sepatu</option>
                    <option value={'celana'}>Celana</option>
                    <option value={'sembako'}>Sembako</option>
                    <option value={'sendal'}>Sendal</option>
                    <option value={'tas'}>Tas</option>
                </select>
                <label className="text-zinc-800 text-[18px] font-semibold" htmlFor="minprice">Harga</label>
                <CurrencyInput
                  className='input border-2 border-lapak input input-success w-full max-w-full rounded-lg bg-zinc-100 px-4 font-normal text-zinc-800 placeholder-slate-400 disabled:bg-slate-400 text-[16px]'
                  id="price"
                  name="price"
                  prefix='Rp. '
                  decimalSeparator=','
                  groupSeparator='.'
                  placeholder="Rp. "
                  defaultValue={formValues.price}
                  decimalsLimit={2}
                  onValueChange={(value, name) => setFormValues({  ...formValues, price: value ? parseInt(value) : 0 })}
                />
                <TextArea
                  label="Deskripsi"
                  name='deskripsi'
                  value={formValues.deskripsi}
                  onChange={handleTextAreaChange}
                  placeholder="lorem ipsdisadfihbdfas fqweEwa"
                />

              <div className="mt-8">
                <CustomButton
                  id="btn-update"
                  label="Submit"
                  type="submit"
                  onClick={()=> console.log(formValues)}
                />
              </div>
            </div>
          </div>
        </form>
      </Modal>
      <Navbar />
      <div className="w-full h-screen mb-48">
        <p className="text-center mt-5 font-medium text-[28px] tracking-widest">Laporan Minggu Ini</p>

        <div className="mt-10 flex flex-col md:flex-row lg:flex-row items-center justify-center">

            <div className="stats shadow-xl flex flex-col md:flex-row lg:flex-row">      
              <div className="stat p-10">
                <div className="stat-figure text-accent">
                  <FiShoppingBag className="inline-block w-8 h-8 stroke-current"/>
                </div>
                <div className="stat-title">Barang Paling Laris</div>
                <div className="stat-value text-lapak">200 Item</div>
                <div className="stat-desc text-base"> 
                  <p>200 item terjual dari produk :</p> 
                  <p>kaos lengan pendek</p> 
                  </div>
              </div>
              
              <div className="stat p-10">
                <div className="stat-figure text-accent">
                  <BiMoneyWithdraw className="inline-block w-8 h-8 stroke-current"/>
                </div>
                <div className="stat-title">Total Pemasukan</div>
                <div className="stat-value text-accent">
                        {formatValue({
                          value: JSON.stringify(250000),
                          groupSeparator: '.',
                          decimalSeparator: ',',
                          prefix: 'Rp. ',
                        })}</div>
              </div>
            
          </div>
        </div>

        <div className="flex flex-col mt-16 mx-auto w-80 sm:w-96 md:w-[700px] lg:w-[900px]">
          <div className="flex justify-between">
            <p className="text-[16px] md:text-[24px] font-semibold text-zinc-800">Toko Arif Muhammad</p>

            <div className="text-sm md:w-52 lg:w-56 mt-5">
              <CustomButton
                id="btn-tambah produk"
                label="Tambah Produk"
                onClick={()=>setShowAddProduk(true)}
              />
            </div>
          </div>

          <div className="relative overflow-x-auto mt-8 mx-auto">
            <table className="w-60 sm:w-96 md:w-[700px] lg:w-[900px] text-left text-gray-500 ">
              <thead className="text-[12px] md:text-[16px] text-zinc-800 font-semibold bg-white">
                <tr className="border-b-2">
                  <th scope="col" className="px-4 py-3">
                    NO
                  </th>
                  <th scope="col" className="px-6 py-3 text-start">
                    NAMA PRODUK
                  </th>
                  <th scope="col" className="px-4 py-3">
                    HARGA
                  </th>
                  <th scope="col" className="text-center px-2 py-3">
                    STOK BARANG
                  </th>
                  <th scope="col" className="text-center px-2 py-3">
                    PENJUALAN
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody className="text-[15px]">
                <tr className="bg-white border-b ">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    1
                  </th>

                  <td className="px-8 py-">
                    <img src={Kaos} alt="produk.jpg" className="float-left w-12 md:w-20 mr-2" />
                    <p>Kaos Lengan Pendek</p>
                    <p className="flex items-end gap-1"><AiFillStar className="text-yellow-400" size={24} /> 4.5</p>
                  </td>

                  <td className="px-4 py-4">
                    Rp {price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
                  </td>

                  <td className="py-4 text-center">
                    1
                  </td>

                  <td className="py-4 text-center">
                    1
                  </td>

                  <td className="flex flex-col gap-2 px-6 py-16 md:py-14 lg:py-4">
                    <CustomButton
                      id="btn-perbarui"
                      label="Perbarui"
                      className="rounded-xl bg-lapak px-2 md:px-2 lg:px-0 py-1 text-[18px] font-semibold capitalize text-zinc-50 hover:bg-sky-500"
                    />

                    <CustomButton
                      id="btn-hapus"
                      label="Hapus"
                      className="rounded-xl bg-red-500 py-1 text-[18px] font-semibold capitalize text-zinc-50 hover:bg-orange-500"
                    />
                  </td>
                </tr>
                <tr className="bg-white border-b ">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    2
                  </th>

                  <td className="px-8 py-4">
                    <img src={Kaos} alt="produk.jpg" className="float-left w-20 mr-2" />
                    <p>Kaos Lengan Pendek</p>
                    <p className="flex items-end gap-1"><AiFillStar className="text-yellow-400" size={24} /> 4.5</p>
                  </td>

                  <td className="px-4 py-4">
                    Rp {price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
                  </td>

                  <td className="py-4 text-center">
                    1
                  </td>

                  <td className="py-4 text-center">
                    1
                  </td>

                  <td className="flex flex-col gap-2 px-6 py-16 md:py-14 lg:py-4">
                    <CustomButton
                      id="btn-perbarui"
                      label="Perbarui"
                      className="rounded-xl bg-lapak px-2 md:px-2 lg:px-0 py-1 text-[18px] font-semibold capitalize text-zinc-50 hover:bg-sky-500"
                    />

                    <CustomButton
                      id="btn-hapus"
                      label="Hapus"
                      className="rounded-xl bg-red-500 py-1 text-[18px] font-semibold capitalize text-zinc-50 hover:bg-orange-500"
                    />
                  </td>
                </tr>


              </tbody>
            </table>
          </div>
        </div>
      </div>


    </Layout >
  )

}

export default ListProduct