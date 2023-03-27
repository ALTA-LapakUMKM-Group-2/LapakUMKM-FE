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
import { useLocation } from "react-router-dom"
import Loading from "../components/Loading"


interface FormValues {
  produkName: string
  stockRemaining: string
  ukuran: string
  price: number | any
  categoriId: string
  deskripsi: string
  image: File[] | []
}

const initialFormValues: FormValues = {
  produkName: '',
  stockRemaining: '',
  categoriId: '',
  price: 0,
  ukuran: '',
  deskripsi: '',
  image: []
};


const ListProduct = () => {

  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [showAddProduk, setShowAddProduk] = useState(false)
  const [showEditProduk, setShowEditProduk] = useState(false)
  const [showImage, setShowImage] = useState(false)
  const [category, setCategory] = useState<any>([])
  const [productId, setProductId] = useState<number>(0)
  const [picture, setPicture] = useState<any>([])
  const [loading, setLoading] = useState(false)
  const [imageLoading, setImageLoading] = useState(false)
  const [product, setProduct] = useState<any>([])
  const [selectedImage, setSelectedImage] = useState<File[] | []>([])
  const location = useLocation()
  const [dropZoneStyle, setDropZoneStyle] = useState('border-2 border-lapak border-dashed rounded-lg cursor-pointer bg-gray-50');
  const [cookie, setCookie] = useCookies(["token"]);
  const productEndpoint = 'https://lapakumkm.mindd.site/products'
  const categoryEndpoint = 'https://lapakumkm.mindd.site/categories'
  const user_id = location.state.id
  const [shopName, setShopName] = useState('')
  const [editMode, setEditMode] = useState(false)

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.preventDefault();
    const files: File[] = Array.from(event.dataTransfer.files);
    setSelectedImage(files)
    setFormValues((prev)=> ({
      ...prev,
      image: files
    }))
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files != null) {
        const filesArray: File[] = Array.from(files);
        setSelectedImage(filesArray)
        setFormValues((prev)=> ({
          ...prev,
          image: filesArray
        }))
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
          Authorization: `Bearer ${cookie.token}`
        }
      })
      setCategory(res.data.data)
    } catch (error) {

    }
  }

  useEffect(() => {
    fetchCategory()
  }, [])

  const fetchProduct = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${productEndpoint}?user_id=${user_id}`,{
        headers:{
          Authorization: `Bearer ${cookie.token}`
        }
      })
      setShopName(res.data.data[0].user.shop_name)
      setProduct(res.data.data)
    } catch (error) {

    }
    setLoading(false)
  }

  useEffect(() => {
    fetchProduct()
  }, [])
  console.log(product)

  const fetchImage = async (id: number) => {
    setLoading(true)
    try {
      const res = await axios.get(`${productEndpoint}/${id}/images`,{
        headers:{
          Authorization: `Bearer ${cookie.token}`
        }
      })
      setPicture(res.data)
      console.log(res.data)
    } catch (error) {
      
    }
    setLoading(false)
  }
  
  useEffect(() => {
    fetchImage(productId)
  }, [])
  console.log("product Id", productId)
  console.log("gambaer",picture)


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      setLoading(true)
      e.preventDefault();
      setFormValues(initialFormValues);
      const formData = new FormData()
      formData.append("photo_product", formValues.image[0].name)
      formData.append("category_id", formValues.categoriId)
      formData.append("product_name", formValues.produkName)
      formData.append("description", formValues.deskripsi)
      formData.append("price", formValues.price)
      formData.append("stock_remaining", formValues.stockRemaining)
      formData.append("size", formValues.ukuran)
      await axios.post(productEndpoint, formData,
      {
        headers:{
          Authorization: `Bearer ${cookie.token}`,
          "Content-Type": 'multipart/form-data',
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
        fetchProduct()
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
      }).finally(()=> setLoading(false))
  }
  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true)
    e.preventDefault();
    setFormValues(initialFormValues);
    const formData = new FormData()
    formData.append("photo_product", selectedImage[0])
    await axios.post(`${productEndpoint}/${productId}/upload-photo`, formData,
    {
      headers:{
        Authorization: `Bearer ${cookie.token}`,
        "Content-Type": 'multipart/form-data'
      }
    }
    )
    .then((response)=> {
      fetchProduct()
      setShowImage(false)
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
    }).finally(()=> setLoading(false))
  }

  const handleDeleteImage = async (id:any) =>{
    setLoading(true)
    Swal.fire({
      icon: "warning",
      title: "Anda yakin Ingin menghapus Foto ini?",
      confirmButtonText: "Saya Yakin",
      confirmButtonColor: "#31CFB9",
      reverseButtons: true,
      showCancelButton: true,
      cancelButtonText: "Cancel",
      cancelButtonColor: "#db1f1f"
    }).then((willDelete) => {
      if (willDelete.isConfirmed) {
        axios.delete(`${productEndpoint}/${productId}/delete-photo/${id}`,{
          headers:{
            Authorization: `Bearer ${cookie.token}`
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
          fetchProduct()
          setShowImage(false)
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
        }).finally(()=> setLoading(false))
      }
    })
  }

  const initialEditValues: FormValues = {
    produkName: '',
    stockRemaining: '',
    categoriId: '',
    price: 0,
    ukuran: '',
    deskripsi: '',
    image: []
  };

  const [editValues, setEditValues] = useState<FormValues>(initialEditValues);

  const handleEditValue = (id: number) => {
    const editValue = product.find((i:any) => i.id === id)
    if(!editValue){
      return
    }
    setEditMode(true)
    setEditValues({
      produkName: editValue.product_name,
      stockRemaining: editValue.stock_remaining,
      categoriId: editValue.category_id,
      price: editValue.price,
      ukuran: editValue.size,
      deskripsi: editValue.description,
      image: []
    })
  }

  useEffect(() => {
    if (editMode === true) {
      setFormValues(editValues);
    } else {
      setFormValues(initialFormValues)
    }
  }, [editValues, editMode]);

  const handleEditProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true)
    e.preventDefault();
    setFormValues(initialFormValues);
    await axios.put(`${productEndpoint}/${productId}`, {
      category_id : parseInt(formValues.categoriId),
      product_name : formValues.produkName,
      description : formValues.deskripsi,
      price : formValues.price,
      stock_remaining : parseInt(formValues.stockRemaining),
      size : formValues.ukuran
    },
    {
      headers:{
        Authorization: `Bearer ${cookie.token}`,
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
      fetchProduct()
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
    }).finally(()=>setLoading(true))
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
        setLoading(true)
        axios.delete(`${productEndpoint}/${id}`,{
          headers:{
            Authorization: `Bearer ${cookie.token}`
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
          fetchProduct()
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
        }).finally(()=> setLoading(false))
      }
    })
  }
  const imgUrl = 'https://storage.googleapis.com/images_lapak_umkm/product/'
  return (
    <Layout>
      {loading ? <Loading/> : 
        <>
        
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
                                formValues.image.length > 0 ? 
                                  formValues.image.map((item:any, index:any) => {
                                    return(
                                      <div key={index}>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{item.name}</p>
                                      </div>
                                    )
                                  })
                                :
                                <>
                                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Klik untuk Upload</span> Atau Seret</p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or JPEG</p>
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
                      id="stockRemaining"
                      label="Stok"
                      name="stockRemaining"
                      type="number"
                      placeholder={"Contoh : 45"}
                      value={formValues.stockRemaining}
                      onChange={handleInputChange}
                    />
                    <label className="text-zinc-800 text-[18px] font-semibold" htmlFor='categoriId'>
                      Kategori
                    </label>
                    <select className="border-2 mt-2 border-lapak input input-success w-full max-w-full rounded-lg bg-zinc-100 px-4 font-normal text-zinc-800 placeholder-slate-400 disabled:bg-slate-400 text-[16px]"
                      defaultValue={''}
                      id='categoriId'
                      name='categoriId'
                      value={formValues.categoriId}
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
                      disabled={formValues === null}
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
                      id="stockRemaining"
                      label="Stok"
                      name="stockRemaining"
                      type="number"
                      placeholder={"Contoh : 45"}
                      value={formValues.stockRemaining}
                      onChange={handleInputChange}
                    />
                  </div> 
                <div className="w-11/12 md:w-80 items-center space-y-5">
                    <label className="text-zinc-800 text-[18px] font-semibold" htmlFor='categori_id'>
                      Kategori
                    </label>
                    <select className="border-2 mt-2 border-lapak input input-success w-full max-w-full rounded-lg bg-zinc-100 px-4 font-normal text-zinc-800 placeholder-slate-400 disabled:bg-slate-400 text-[16px]"
                      defaultValue={''}
                      id='categoriId'
                      name='categoriId'
                      value={formValues.categoriId}
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
                      defaultValue={formValues.price !== null ? formValues.price : ''}
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
                <p className="text-[16px] md:text-[24px] font-semibold text-zinc-800">{shopName}</p>

                <div className="text-sm md:w-52 lg:w-56 mt-5">
                  <CustomButton
                    id="btn-tambah produk"
                    label="Tambah Produk"
                    onClick={()=>{setShowAddProduk(true), setEditMode(false), setProductId(0)}}
                  />
                </div>
              </div>

              <div className="relative overflow-x-auto mt-8 mx-auto w-full">
                <table className="sm:w-96 md:w-[700px] lg:w-[900px] text-left text-gray-500 overflow-x-auto">
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
                    { !product  ? (
                      <>
                      </>
                    ) : (
                      product.map((item:any, index:any)=>{
                        return(
                        <tr className="bg-white border-b ">
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                            {index + 1}
                          </th>
                          <td className="px-8 py-">
                            {item.product_image === null ? (
                              <BiImageAdd
                              aria-hidden='true'
                              className="float-left w-12 h-12 md:w-20 mr-2 cursor-pointer"
                              onClick={()=>{setShowImage(true), setProductId(item.id), fetchImage(item.id)}}
                              />
                            ):(
                              <img src={item.product_image[0].image} alt="produk.jpg" className="float-left w-12 h-12 md:w-20 mr-2 cursor-pointer" onClick={()=>{setShowImage(true), setProductId(item.id), fetchImage(item.id)}}/>
                            )}
                            <p>{item.product_name}</p>
                            <p className="flex items-end gap-1"><AiFillStar className="text-yellow-400" size={24} />{item.rating}</p>
                          </td>
                          <td className="px-4 py-4">
                            Rp {item.price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
                          </td>
  
                          <td className="py-4 text-center">
                            {item.stock_remaining}
                          </td>
  
                          <td className="py-4 text-center">
                            {item.stock_sold}
                          </td>
  
                          <td className="flex flex-col gap-2 px-6 py-16 md:py-14 lg:py-4">
                            <CustomButton
                              id="btn-perbarui"
                              label="Perbarui"
                              className="rounded-xl bg-lapak px-2 md:px-2 lg:px-0 py-1 text-[18px] font-semibold capitalize text-zinc-50 hover:bg-sky-500"
                              onClick={()=> {setShowEditProduk(true), setProductId(item.id), handleEditValue(item.id)}}
                            />
                            <CustomButton
                              id="btn-hapus"
                              label="Hapus"
                              className="rounded-xl bg-red-500 py-1 text-[18px] font-semibold capitalize text-zinc-50 hover:bg-orange-500"
                              onClick={()=> handleDelete(item.id)}
                            />
                          </td>
                      </tr>
                        
                        )
                      })
                    ) 
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <Modal
          isOpen={showImage}
          isClose={()=>setShowImage(false)}
          title="Gambar Produk"
          >
          <div className="grid grid-cols-3 gap-3">
                    { picture.data !== null ? 
                        picture?.data?.map((item:any, index:any) => {
                          return(
                            <label
                              className={`flex flex-col items-center justify-center w-full h-48 ${dropZoneStyle} border-2 border-lapak border-dashed rounded-lg cursor-pointer bg-gray-50`}>
                              <div className="flex flex-col items-center justify-center ">
                                <div key={index}>
                                  <img src={item.image} className="w-20 h-20" alt="" />
                                </div>
                              </div>
                              <button className="btn btn-sm btn-outline btn-error mt-2" onClick={()=> handleDeleteImage(item.id)}>Hapus</button>
                            </label>
                          )
                        })
                      :
                      <>
                      </> }
              <form onSubmit={handleUpload}>
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
                        formValues.image.length > 0 ? 
                          formValues.image.map((item:any, index:any) => {
                            return(
                              <div key={index}>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{item.name}</p>
                              </div>
                            )
                          })
                        :
                        <>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Klik untuk Upload</span> Atau Seret</p>
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
                <div className="mt-8">
                    <CustomButton
                      id="btn-update"
                      label="Submit"
                      type="submit"
                      onClick={()=> console.log(formValues)}
                    />
                </div>
              </form>
            </div>
          </Modal>
        </>
      }

    </Layout >
  )

}

export default ListProduct