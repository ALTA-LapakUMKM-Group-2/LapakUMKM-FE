import React, { useEffect, useState } from "react"
import { useCookies } from "react-cookie"

import CustomButton from "../components/CustomButton"
import CustomInput from "../components/CutomInput"
import CurrencyInput from "react-currency-input-field"
import Layout from "../components/Layout"
import Navbar from "../components/Navbar"
import { formatValue } from "react-currency-input-field"
import Kaos from "../assets/kaos.png"

import { FiShoppingBag } from 'react-icons/fi'
import { FaUpload } from 'react-icons/fa';
import { BiImageAdd } from 'react-icons/bi'
import { BiMoneyWithdraw } from 'react-icons/bi'
import { AiFillStar } from "react-icons/ai"
import Modal from "../components/Modal"
import TextArea from "../components/TextArea"
import axios from "axios"
import { Cookies } from "react-cookie"
import Swal from "sweetalert2"


interface FormValues {
  produkName: string
  stock_remaining: string
  ukuran: string
  price: number
  categori_id: string
  deskripsi: string
}

const initialFormValues: FormValues = {
  produkName: '',
  stock_remaining: '',
  categori_id: '',
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
  const [category, setCategory] = useState<any>([])
  const [dropZoneStyle, setDropZoneStyle] = useState('border-2 border-lapak border-dashed rounded-lg cursor-pointer bg-gray-50');
  const [cookie, setCookie] = useCookies(["token"]);
  const productEndpoint = 'https://lapakumkm.mindd.site/products'
  const categoryEndpoint = 'https://lapakumkm.mindd.site/categories'
  
  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();

    event.preventDefault();
    const files: File[] = Array.from(event.dataTransfer.files);
    // const reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onload = (e) => {
    //   const previewImageSrc = e.target?.result;
    //   setPreviewImage(previewImageSrc as string);
    // }
    setSelectedImages(files);
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files != null) {
        const filesArray: File[] = Array.from(files);
        setSelectedImages(filesArray);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDropZoneStyle('border-2 border-lapak border-dashed rounded-lg cursor-pointer bg-gray-100');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setFormValues({ ...formValues, [e.target.name]: e.target.value})
  }

  const fetchCategory = async () => {
    try {
      const res = await axios.get(categoryEndpoint,{
        headers:{
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJleHAiOjE2Nzk5MTc2MjN9.K8lerhsq124A_-y4Lf8gNAPIJtLe9xRUMLKjN_tWIZA`
        }
      })
      setCategory(res.data.data)
    } catch (error) {

    }
  }

  useEffect(() => {
    fetchCategory()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setFormValues(initialFormValues);
      await axios.post(productEndpoint, {
        category_id : parseInt(formValues.categori_id),
        product_name : formValues.produkName,
        description : formValues.deskripsi,
        price : formValues.price,
        stock_remaining : parseInt(formValues.stock_remaining),
        size : formValues.ukuran
      },
      {
        headers:{
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJleHAiOjE2Nzk5MTc2MjN9.K8lerhsq124A_-y4Lf8gNAPIJtLe9xRUMLKjN_tWIZA`,
          "Content-Type": 'application/json',
          Accept: 'application/json'
        }
      }
      )
      .then((response)=> {
        Swal.fire({
          position: "center",
          icon: "success",
          text: response.data.message,
          iconColor: '#31CFB9',
          color: '#353E3C',
          background: '#ffffff ',
          showConfirmButton: false,
          timer: 1500,
        })
        setShowAddProduk(false)
      })
      .catch((error)=> {
        Swal.fire({
          icon: "error",
          title: "gagal",
          text: "gagal",
          showConfirmButton: false,
          showCancelButton: false,
          timer: 1500,
        })
      })
  }
  const handleEditProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormValues(initialFormValues);
    await axios.put(`${productEndpoint}/10`, {
      category_id : parseInt(formValues.categori_id),
      product_name : formValues.produkName,
      description : formValues.deskripsi,
      price : formValues.price,
      stock_remaining : parseInt(formValues.stock_remaining),
      size : formValues.ukuran
    },
    {
      headers:{
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJleHAiOjE2Nzk5MTc2MjN9.K8lerhsq124A_-y4Lf8gNAPIJtLe9xRUMLKjN_tWIZA`,
        "Content-Type": 'application/json',
        Accept: 'application/json'
      }
    }
    )
    .then((response)=> {
      console.log(response.data.data)
      Swal.fire({
        position: "center",
        icon: "success",
        text: response.data.message,
        iconColor: '#31CFB9',
        showConfirmButton: false,
        timer: 2000,
      })
      setShowEditProduk(false)
    })
    .catch((error)=> {
      console.log(error)
      Swal.fire({
        icon: "error",
        title: error.message,
        text: "gagal",
        showConfirmButton: false,
        showCancelButton: false,
        timer: 1500,
      })
    })
}

  const handleDelete = async (id:any) =>{
    Swal.fire({
      icon: "warning",
      title: "Anda yakin Ingin menghapus Barang ini?",
      confirmButtonText: "Saya Yakin",
      confirmButtonColor: "#31CFB9",
      reverseButtons: true,
      showCancelButton: true,
      cancelButtonText: "Cancel",
      cancelButtonColor: "#db1f1f"
    }).then((willDelete) => {
      if (willDelete.isConfirmed) {
        axios.delete(`${productEndpoint}/${id}`,{
          headers:{
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InNlbGxlciIsImV4cCI6MTY3OTk0MDE4M30.HIuVb2eUrrgkR5q3o9lqV9EPzYAm6E6WgBU55FmzC_Q`
          }
        })
        .then((response)=>{
          Swal.fire({
            position: "center",
            icon: "success",
            text: response.data.message,
            iconColor: '#31CFB9',
            showConfirmButton: false,
            timer: 2000,
          })
        })
        .catch((error)=> {
          console.log(error)
          Swal.fire({
            icon: "error",
            title: error.message,
            text: "gagal",
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1500,
          })
        })
      }
    })
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
              <div className="items-center justify-center w-80 space-y-5">
                  <label htmlFor="dropzone-file" 
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className={`flex flex-col items-center justify-center w-full h-48 ${dropZoneStyle} border-2 border-lapak border-dashed rounded-lg cursor-pointer bg-gray-50`}>
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <BiImageAdd
                          aria-hidden='true'
                          className="w-10 h-10 mb-3 text-gray-400"
                          />
                          {
                            selectedImages.length > 0 ? 
                              selectedImages.map((item:any, index:any) => {
                                return(
                                  <div key={index}>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.name}</p>
                                  </div>
                                )
                              })
                            :
                            <>
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            </>
                            
                          }

                      </div>
                      <input id="dropzone-file" type="file" className="hidden" 
                      accept="image.png, image.jpeg, image.jpg"
                      multiple
                      onChange={handleImageChange}
                      />
                  </label>
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
              </div> 
            <div className="w-11/12 md:w-80 items-center space-y-5">
                <CustomInput
                  id="stock_remaining"
                  label="Stok"
                  name="stock_remaining"
                  type="number"
                  placeholder={"Contoh : 45"}
                  value={formValues.stock_remaining}
                  onChange={handleInputChange}
                />
                <label className="text-zinc-800 text-[18px] font-semibold" htmlFor='categori_id'>
                  Kategori
                </label>
                <select className="border-2 mt-2 border-lapak input input-success w-full max-w-full rounded-lg bg-zinc-100 px-4 font-normal text-zinc-800 placeholder-slate-400 disabled:bg-slate-400 text-[16px]"
                  defaultValue={''}
                  id='categori_id'
                  name='categori_id'
                  value={formValues.categori_id}
                  onChange={handleSelectChange}
                  >
                    {category.map((item:any, index:any) => {
                        return(
                          <option value={item.id}>{item.category}</option>
                        )
                      })        
                    } 
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
      <Modal 
      isOpen={showEditProduk}
      isClose={()=>setShowEditProduk(false)}
      title="Edit Produk"
      >
        <form onSubmit={handleEditProduct}>
          <div className=" flex flex-col md:flex-row lg:flex-row py-5 space-x-10">
              <div className="items-center justify-center w-80 space-y-5">
                  <label htmlFor="dropzone-file" 
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className={`flex flex-col items-center justify-center w-full h-48 ${dropZoneStyle} border-2 border-lapak border-dashed rounded-lg cursor-pointer bg-gray-50`}>
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <BiImageAdd
                          aria-hidden='true'
                          className="w-10 h-10 mb-3 text-gray-400"
                          />
                          {
                            selectedImages.length > 0 ? 
                              selectedImages.map((item:any, index:any) => {
                                return(
                                  <div key={index}>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.name}</p>
                                  </div>
                                )
                              })
                            :
                            <>
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            </>
                            
                          }

                      </div>
                      <input id="dropzone-file" type="file" className="hidden" 
                      accept="image.png, image.jpeg, image.jpg"
                      multiple
                      onChange={handleImageChange}
                      />
                  </label>
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
              </div> 
            <div className="w-11/12 md:w-80 items-center space-y-5">
                <CustomInput
                  id="stok_remaining"
                  label="Stok"
                  name="stok_remaining"
                  type="number"
                  placeholder={"Contoh : 45"}
                  value={formValues.stock_remaining}
                  onChange={handleInputChange}
                />
                <label className="text-zinc-800 text-[18px] font-semibold" htmlFor='categori_id'>
                  Kategori
                </label>
                <select className="border-2 mt-2 border-lapak input input-success w-full max-w-full rounded-lg bg-zinc-100 px-4 font-normal text-zinc-800 placeholder-slate-400 disabled:bg-slate-400 text-[16px]"
                  defaultValue={''}
                  id='categori_id'
                  name='categori_id'
                  value={formValues.categori_id}
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
                      onClick={()=>setShowEditProduk(true)}
                    />

                    <CustomButton
                      id="btn-hapus"
                      label="Hapus"
                      className="rounded-xl bg-red-500 py-1 text-[18px] font-semibold capitalize text-zinc-50 hover:bg-orange-500"
                      onClick={()=> handleDelete(10)}
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