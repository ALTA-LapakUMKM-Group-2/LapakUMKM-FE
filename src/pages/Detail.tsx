import { formatValue } from 'react-currency-input-field'
import { useNavigate, useParams, Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2/dist/sweetalert2.all.js';
import CardFeedback from '../components/CardFeedback'
import ChatModal from '../components/ChatModal'
import Layout from '../components/Layout'
import Navbar from '../components/Navbar'
import FotoProfile from '../assets/photo_2023-03-16_20-34-20.jpg'
import dai from '../assets/dai.jpg'
import { MdOutlineLocationOn } from 'react-icons/md'
import { BsChatText } from 'react-icons/bs'
import { MdStarRate } from 'react-icons/md'
import { HiOutlineArrowLongDown, HiOutlineArrowLongUp } from 'react-icons/hi2'
import { GoKebabVertical } from 'react-icons/go'
import Loading from '../components/Loading'
import { useCookies } from 'react-cookie'
import { FeedbackTypes } from '../utils/types/DataType'
import CustomInput from '../components/CutomInput'
import CustomButton from '../components/CustomButton'
import Default from "../assets/default.jpg"
import { stringify } from 'querystring'

interface Product {
  selected: unknown
  id: number
  lapak_address: string
  lapak_name: string
  product_id: number
  product_name: string
  product_pcs: number
  product_price: number
  user_id: number
  total_price: number
}


const Detail = () => {
  
  const { id } = useParams();
  const MySwal = withReactContent(Swal);
  const [loading, setLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [stock, setStock] = useState<number>(0);
  const [size, setSize] = useState('')
  const [address, setAddress] = useState('')
  const [name, setName] = useState('')
  const [showChat, setShowChat] = useState(false)
  const [cookie, setCookie] = useCookies(["token", "id", "roomID" ,'photo_profile', 'tokoId' , 'name'])

  const [feedback, setFeedback] = useState<FeedbackTypes[]>([])
  const [diskusi, setDiskusi] = useState<FeedbackTypes[]>([])
  const [balas, setBalas] = useState<string | undefined>("")
  const [newDiskus, setnewDiskus] = useState<string>("")
  const [disable, setDisable] = useState<boolean>(true)
  const [hide, setHide] = useState<boolean>(true)
  const navigate = useNavigate()
  const [test, setTest] = useState<Product[]>([])
  const [productId, setProductId] = useState<any>()
  const [userId, setUserId] = useState<any>()

  const handleUpdate = (e: any) => {
    e.preventDefault()
  }
  const [count, setCount] = useState<number>(1);
  const [price, setPrice] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(price)
  const [testCount, SetTestCount] = useState<any>(count)
  const [dca, setDca] = useState<any>({})
  const [tesPrice, setTestPrice] = useState<any>(totalPrice)
  const [image, setImage] = useState<any>([])
  const [photoToko, setPhotoToko] = useState('')
  const [category, setCategory] = useState<any>('')

  function fetchData() {
    setLoading(true);
    axios
      .get(`https://lapakumkm.mindd.site/products/${id}`)
      .then((res) => {
        const { full_name, address, shop_name, photo_profile } = res.data.data.user
        setDca(res.data.data)
        const category = res.data.data.category.category
        const { product_name, description, price, stock_remaining, size, user_id, id, product_image } = res.data.data;
        setProduct(product_name);
        setDescription(description);
        setPrice(price);
        setStock(stock_remaining);
        setSize(size)
        setName(shop_name)
        setAddress(address)
        setTotalPrice(price);
        setUserId(user_id)
        setProductId(id)
        setImage(product_image)
        setPhotoToko(photo_profile)
        setCategory(category)
        res.data.data.total_price = totalPrice
        res.data.data.product_pcs = count
        SetTestCount(res.data.data.product_pcs)
        setTestPrice(res.data.data.total_price)
        console.log('res.data.data', res.data.data);
        setCookie('tokoId', res.data.data.user_id , {path: "/"})
      })
      .catch((err) => {
        // console.log(err.response.statusText)
        MySwal.fire({
          icon: "error",
          title: err.response.statusText,
          text: "Gagal mengunduh data",
          showCancelButton: false,
          confirmButtonText: "Dibaca",
          confirmButtonColor: "#31CFB9",
          showConfirmButton: true
        })
      })
    setLoading(false)
  }


  // console.log("product_id :", productId)
  // console.log(typeof productId)

  useEffect(() => {
    fetchData();
  }, [])
  const handleIncrement = () => {
    const tstCount = count + 1
    const newTotal = price * tstCount
    setCount(tstCount);
    setTotalPrice(newTotal);
    setTestPrice(newTotal)
    SetTestCount(tstCount)

  };

  const handleDecrement = () => {
    const tstCount = count - 1
    const newTotal = totalPrice
    if (count > 1) {
      SetTestCount(tstCount);
      setTestPrice(totalPrice - price);
      setTotalPrice(newTotal - price);
      setCount(tstCount);
    } else {
      setTotalPrice(price)
    }

  };

  const addToCart = async () => {

    const data = {
      product_id: parseInt(productId),
      product_pcs: count,
      user_id: userId
    };

    try {
      const res = await axios.post('https://lapakumkm.mindd.site/carts', data, {
        headers: {
          Authorization: `Bearer ${cookie.token}`
        }
      })
      if (res.data) {
        MySwal.fire({
          icon: "success",
          title: "Produk ditambahkan ke keranjang",
          showCancelButton: false,

        })
      }
      navigate('/cart');

    } catch (err: any) {
      MySwal.fire({
        icon: "error",
        title: "Gagal menambahkan produk ke keranjang",
        text: err.response.statusText,
        showCancelButton: false,
        confirmButtonText: "Dibaca",
        confirmButtonColor: "#31CFB9",
        showConfirmButton: true
      })
    }

  }

  useEffect(() => {
    feedbackData()
  }, [])

  function feedbackData() {
    setLoading(true);
    axios
      .get(`https://lapakumkm.mindd.site/products/${id}/feedbacks`)
      .then((res) => {
        const { data } = res.data
        setFeedback(data)

      })
      .catch((err) => {

      })
      .finally(() => setLoading(false))
  }

  function diskusiData() {
    setLoading(true);
    axios
      .get(`https://lapakumkm.mindd.site/products/${id}/discussions`)
      .then((res) => {
        const { data } = res.data
        setDiskusi(data)
      })
      .catch((err) => {

      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    diskusiData()
  }, [])

  const handleDisplayEdit = (id: number) => {
    const element = document.getElementById("input-edit_diskusi " + id)
    const element2 = document.getElementById("edit_diskusi " + id)
    const element3 = document.getElementById("btn-balas " + id)

    if (element) {
      element.style.display = "block"
    }

    if (element2) {
      element2.style.display = "none"
    }

    if (element3) {
      element3.style.display = "none"
    }
  }

  const handleDisplay = (id: number) => {
    const element = document.getElementById("input-balas_diskusi " + id)

    if (element) {
      element.style.display = "block"
    }
  }

  const handleHide = (id: number) => {
    const element = document.getElementById("input-balas_diskusi " + id)
    const element2 = document.getElementById("input-edit_diskusi " + id)
    const element3 = document.getElementById("edit_diskusi " + id)
    const element4 = document.getElementById("btn-balas " + id)

    if (element) {
      element.style.display = "none"
    }
    if (element2) {
      element2.style.display = "none"
    }
    if (element3) {
      element3.style.display = "block"
    }
    if (element4) {
      element4.style.display = "block"
    }
  }


  useEffect(() => {
    newDiskus ? setDisable(false) : setDisable(true)
  }, [newDiskus])

  const handleNewDiskusi = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true)
    e.preventDefault()
    const body = {
      product_id: productId,
      discussion: newDiskus
    }
    axios
      .post(`https://lapakumkm.mindd.site/discussions`, body, {
        headers: {
          Authorization: `Bearer ${cookie.token}`
        }
      })
      .then((res) => {
        MySwal.fire({
          icon: "success",
          iconColor: "#31CFB9",
          title: res.data.message,
          text: "Menambahkan diskusi",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1500
        })
      })
      .catch((err) => {
        MySwal.fire({
          icon: "error",
          title: err.response.data.message,
          text: "Gagal menambahkan diskusi",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1500
        })
      })
      .finally(() => diskusiData())
      .finally(() => setLoading(false))
  }

  const [diskus, setDiskus] = useState<string>("")

  const changeDiskus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiskus(e.target.value);
  };

  const handleEdit = (id: number) => {
    setLoading(true)
    const body = {
      discussion: diskus
    }
    axios
      .put(`https://lapakumkm.mindd.site/discussions/${id}`, body, {
        headers: {
          Authorization: `Bearer ${cookie.token}`
        }
      })
      .then((res) => {
        MySwal.fire({
          icon: "success",
          title: res.data.data.message,
          text: "Diskusi berhasil di edit",
          showCloseButton: false,
          showConfirmButton: false,
          timer: 1500
        })
      })
      .catch((err) => {
        MySwal.fire({
          icon: "error",
          title: err.response.data.message,
          text: "Gagal megubah diskusi",
          showConfirmButton: false,
          showCancelButton: false,
          timer: 1500
        })
      })
      .finally(() => diskusiData())
      .finally(() => setLoading(false))
  }

  const [newBalas, setNewBalas] = useState<string>("")

  const changeDiskusBalas = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBalas(e.target.value);
    if (balas) {
      setNewBalas(balas)
    }
  };

  const handleBalas = (parent_id: number) => {
    setLoading(true)
    const body = {
      product_id: productId,
      discussion: newBalas,
      parent_id
    };
    axios
      .post(`https://lapakumkm.mindd.site/discussions`, body, {
        headers: {
          Authorization: `Bearer ${cookie.token}`
        }
      })
      .then((res) => {
        MySwal.fire({
          icon: "success",
          iconColor: "#31CFB9",
          title: res.data.message,
          text: "Menambahkan diskusi",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1200
        })
      })
      .catch((err) => {
        MySwal.fire({
          icon: "error",
          title: err.response.data.message,
          text: "Gagal menambahkan diskusi",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1200
        })
      })
      .finally(() => diskusiData())
      .finally(() => setLoading(false))
  }

  const DeleteDiskusi = (id: number) => {
    setLoading(true);
    axios
      .delete(`https://lapakumkm.mindd.site/discussions/${id}`, {
        headers: {
          Authorization: `Bearer ${cookie.token}`
        }
      })
      .then((res) => {
        MySwal.fire({
          icon: "success",
          title: res.data.message,
          text: "Berhasil menghapus diskusi",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1500
        })
      })
      .catch((err) => {
        MySwal.fire({
          icon: "error",
          title: err.response.data.message,
          text: "Gagal menghapus diskusi",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1500
        })
      })
      .finally(() => diskusiData())
      .finally(() => setLoading(false))
  }

  const [roomID, setRoomID] = useState<string>("")
  const [senderID, setSenderID] = useState<number>(0)
  const [recipientID, setRecipientID] = useState<number>(0)
  const [idFetch, setIdFetch] = useState<any>('')

  const handleShowChat = () => {
    setShowChat(true)
    const body = {
      recipient_id: productId
    }

    axios
      .post(`https://lapakumkm.mindd.site/chats`, body, {
        headers: {
          Authorization: `Bearer ${cookie.token}`
        }
      })
      .then((res) => {
        // setIdFetch(res.data.data.room_id)
        console.log("room_id :", res.data.data.room_id)
        const cekID = res.data.data.room_id
        console.log('cek room', res.data.data);
        
        if (cekID) {
          setRoomID(cekID)
          setSenderID(res.data.data.sender_id)
          setRecipientID(res.data.data.recipient_id)
        }
      }
      
      )
      .catch((err) => {
        console.log(err.response.data.message)
      })
      
    }

//   function fetchDataChat(room_id: any) {
//     setLoading(true)
//     console.log("room ID ceked 2:", room_id)
//     axios
//         .get(`https://lapakumkm.mindd.site/rooms/${idFetch}/chats`, {
//             headers: {
//                 Authorization: `Bearer ${cookie.token}`
//             }
//         })
//         .then((res) => {
//             console.log("data chat :", res.data.data)
             
//         })
//         .catch((err) => { })
//         .finally(() => setLoading(false))
// }
  return (
    <Layout>
      {
        loading ? <Loading /> :
          <>
            <Navbar />

            {/* chatting */}

            <ChatModal
              img={FotoProfile}
              isOpen={showChat}
              isClose={() => setShowChat(false)}
              product_id={productId}
              Room={roomID}
              Recipient_id={recipientID}
            />

            {/* card for image */}
            <div className='w-full mt-10 mx-auto px-5 py-10   dark:border-none rounded-lg'>
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-5 ">
                  {/* Card kiri */}
                  <div className="bg-transparent shadow-lg border rounded-lg h-fit p-5 dark:border-lapak dark:border-2">
                    <div className="max-w-5xl max-h-96 ">
                      {loading ? <Loading /> :
                        image ?
                          <img src={image[0]?.image} className="max-w-fit max-h-72 md:col-span-2 rounded-md mx-auto" alt="" />
                          :
                          <img src={dai} className="w-full h-full md:col-span-2 rounded-md" alt="" />
                      }
                    </div>
                    <div className="grid grid-cols-3 gap-2 max-w-5xl mx-auto mt-5">
                      {
                        loading ? <Loading /> :
                          image ?
                            image.map((item: any) => {
                              // console.log("test image", item);
                              return (
                                <>
                                  <img src={item.image} className="w-full h-sm rounded-md max-w-xs max-h-72" alt="" />

                                </>
                              )
                            }) :
                            <>
                              <img src={dai} className="w-full h-md rounded-md max-w-xs" alt="" />
                              <img src={dai} className="w-full h-md rounded-md max-w-xs" alt="" />
                              <img src={dai} className="w-full h-md rounded-md max-w-xs" alt="" />
                            </>
                      }

                    </div>
                  </div>
                  {/* Card kanan */}
                  <div className="p-5 rounded-md max-w-3xl w-full h-fit border-2 dark:border-lapak border-gray-200 shadow-lg mx-auto">
                    <div className="w-full h-full">
                      <div className="flex justify-between items-center mb-5 ">
                        <h1 className="font-bold text-2xl dark:text-white">{product} </h1>
                        <button className="btn btn-ghost bg-lapak rounded-xl text-white" onClick={() => handleShowChat()}>
                          <BsChatText size={20} />
                        </button>
                      </div>
                      <h1 className="font-bold text-2xl dark:text-white">Stock Tersedia <span className='dark:text-lapak'>:</span> <span className='ml-3 font-medium'>{stock}</span></h1>
                      <h1 className="font-bold text-2xl dark:text-white">Ukuran <span className='dark:text-lapak'>:</span> <span className='ml-3 font-medium'>{size}</span></h1>
                      <h1 className="font-bold text-2xl flex items-center gap-2 dark:text-white">
                        Rating <span className='dark:text-lapak'>:</span>  <span className=" font-medium flex gap-1"> <MdStarRate size={25} className='ml-3 text-yellow-500 dark:text-lapak' />4.5</span>
                      </h1>
                      <h1 className="font-bold text-2xl mt-2 dark:text-white">Price <span className='dark:text-lapak'>:</span> <span className='ml-3 font-medium'>{formatValue({
                        prefix: 'Rp. ',
                        value: JSON.stringify(price),
                        groupSeparator: '.',
                        decimalSeparator: ',',
                      })}</span></h1>
                      <h1 className="font-bold text-2xl mt-2 dark:text-white">total price <span className='dark:text-lapak'>:</span> <span className='ml-3 font-medium'> {formatValue({
                        prefix: 'Rp. ',
                        value: JSON.stringify(totalPrice),
                        groupSeparator: '.',
                        decimalSeparator: ',',
                      })}</span></h1>
                      <div className="flex gap-2 border w-fit mt-10 items-center overflow-hidden dark:border-lapak">
                        <button onClick={handleDecrement} className="btn btn-xs bg-transparent text-black border-none hover:bg-none dark:bg-transparent dark:text-white dark:hover:text-lapak text-2xl mb-3 mr-5 ml-2">-</button>
                        <h1 className="font-bold dark:text-white">{count}</h1>
                        <button onClick={handleIncrement} className="btn btn-xs bg-transparent text-black border-none hover:bg-transparent dark:bg-transparent dark:text-white dark:hover:text-lapak text-2xl mb-3 ml-5 mr-2">+</button>
                      </div>
                      <div className="border-2 mt-5 dark:border-lapak"></div>
                      <div className="flex 2xl:flex-row lg:flex-row md:flex-row flex-col justify-center gap-5 mt-10 w-fit mx-auto ">
                        <button className="btn  bg-lapak hover:bg-white border-lapak hover:border hover:text-lapak border-none w-fit" onClick={() => {
                          navigate(`/payment/${name}`, {
                            state: {
                              dca: dca,
                              testPrice: totalPrice,
                              testCount: testCount
                            }
                          })
                        }}>Bayar Langsung</button>
                        <button className='btn  bg-lapak hover:bg-white border-lapak hover:border hover:text-lapak border-none w-fit' onClick={addToCart}>Tambah Keranjang</button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Break Line  */}
                <div className='border-2 mt-10 dark:border-lapak'>

                </div>
                {/* Card toko */}
                <div className='flex flex-col gap-10'>
                  <div className='flex mt-10 shadow-xl w-fit p-10 gap-5 border rounded-md dark:border-lapak'>
                    <img src={photoToko ? photoToko : Default} className='w-20 rounded-full cursor-pointer' onClick={() => navigate(`/toko/${name}`, {
                      state: {
                        id: userId
                      }
                    })} />
                    <div className='font-bold text-lg dark:text-white'>
                      <h1 className='mb-5 cursor-pointer' onClick={() => navigate(`/toko/${name}`, {
                        state: {
                          id: userId
                        }
                      })}>{name}</h1>
                      <h1 className='flex items-center cursor-pointer' onClick={() => navigate(`/toko/${name}`, {
                        state: {
                          id: userId
                        }
                      })} ><MdOutlineLocationOn className='dark:text-lapak mr-2' /> {address}</h1>
                    </div>
                  </div>
                  <h1 className='text-3xl font-bold dark:text-white'>Informasi Produk :</h1>
                  <div className='w-full shadow-xl p-5 rounded-xl border text-lg font-semibold dark:text-white dark:border-lapak dark:border-2'>
                    <h1>stock : <span className='ml-4'>{stock}</span> </h1>
                    <h1>Kategori : <span className='ml-4'>{category}</span></h1>
                    <h1>Brand : <span className='ml-4'>{product}</span></h1>
                    <h1>Ukuran : <span className='ml-4'>{size}</span></h1>
                    <div className='border-2 mt-5 mb-5 dark:border-lapak'>
                    </div>
                    <h1 >Deskripsi : </h1>
                    <h1>{description}</h1>
                  </div>
                </div>
                {/* end */}
                <div className='border-2 mt-20 mb-5 dark:border-lapak'>
                </div>

                <div className='flex mt-20 flex-col gap-5 w-7/12'>
                  <div className='flex justify-between'>
                    <p id='feedback' className='text-2xl text-zinc-800 mb-2 font-semibold dark:text-white'>Ulasan</p>
                    <a href='#diskusi' className='text-[16px] flex items-center text-zinc-800 mb-2  hover:cursor-pointer hover:text-lapak dark:text-white dark:hover:text-lapak'>Lihat diskusi <HiOutlineArrowLongDown /></a>
                  </div>

                  {feedback.length === 0 ? <p className='text-[20px] text-zinc-800 font-medium dark:text-zinc-50'>Belum ada ulasan</p> :

                    <div >
                      {feedback.map((item) => (
                        <CardFeedback key={item.id} rating={item.rating} image={item.user.photo_profile} comment={item.feedback} name={item.user.full_name}
                        />
                      ))}
                    </div>
                  }

                  <div className='flex justify-between mt-8 '>
                    <p id='diskusi' className='text-2xl text-zinc-800 mb-2 font-semibold dark:text-white'>Diskusi</p>
                    <a href='#feedback' className='text-[16px] flex items-center hover:cursor-pointer hover:text-lapak text-zinc-800 mb-2 dark:text-white dark:hover:text-lapak'>Lihat Ulasan <HiOutlineArrowLongUp /></a>
                  </div>

                  <form onSubmit={(e) => handleNewDiskusi(e)} className='p-4 border-2 border-zinc-300 rounded-md dark:border-lapak'>
                    <p className='dark:text-white'>Ada pertanyaan ? Diskusikan dengan penjual disini</p>
                    <CustomInput
                      id='input-diskusi'
                      placeholder='Apa yang ingin anda tanyakan ?'
                      label=''
                      type='text'
                      name='diskusi'
                      onChange={(e) => setnewDiskus(e.target.value)}
                    />

                    <div className='flex gap-5 w-3/12 mt-4 ml-auto'>
                      <CustomButton
                        id="btn-kirim_diskusi"
                        label='Kirim'
                        loading={disable || loading}
                      />
                    </div>
                  </form>


                  {diskusi === null ? <p className='text-[20px] text-zinc-800 font-medium dark:text-zinc-50'>Belum ada diskusi</p> :

                    diskusi.map((item, index) => (
                      <div key={item.id} className="p-2 mb-4 border-b-2 border-zinc-400 relative">
                        <div className='dropdown dropdown-bottom dropdown-end absolute top-2 right-0'>
                          <label tabIndex={0} className={`${parseInt(cookie.id) === item.user_id ? "flex" : "hidden"} btn-ghost btn-circle btn`}>
                            <GoKebabVertical className='text-zinc-800 dark:text-zinc-50' size={20} />
                          </label>

                          <ul
                            tabIndex={0}
                            className="dropdown-content menu rounded-box menu-compact mt-3 bg-zinc-50 text-zinc-800 px-10 py-4 shadow-[0px_2px_6px_0px_rgba(0,0,0,0.3)] space-y-4 text-[16px] hover:cursor-pointer"
                          >
                            <li onClick={() => handleDisplayEdit(item.id)} className='hover:text-zinc-500  text-zinc-800'>perbarui</li>
                            <li onClick={() => DeleteDiskusi(item.id)} className='hover:text-red-400 text-red-500'>hapus</li>
                          </ul>
                        </div>

                        <div className="float-left w-12 h-12 mr-4 overflow-hidden rounded-full flex justify-center" >
                          <img src={item.user.photo_profile ? item.user.photo_profile : Default} alt="profil.svg" />

                        </div>
                        <div className='flex justify-between text-zinc-800 items-center py-3'>
                          <h1 className='text-lg font-bold dark:text-white'>{item.user.full_name}</h1>
                        </div>

                        <p id={`edit_diskusi ${item.id}`} className='text-gray-700 my-5 dark:text-white'>{item.discussion}</p>

                        {item.childs ?
                          <div className='pl-10 relative'>
                            {item.childs?.map((child) => {
                              return (
                                <>
                                  <div className="float-left w-12 h-12 mr-4 overflow-hidden rounded-full flex justify-center" >
                                    <img src={child.user.photo_profile ? child.user.photo_profile : Default} alt="profil.svg" />
                                  </div>

                                  <div className='flex justify-between text-zinc-800 items-center py-3'>
                                    <h1 className='text-lg font-bold dark:text-white'>{child.user.full_name}</h1>
                                  </div>

                                  <p id={``} className='text-gray-700 my-4 dark:text-white'>{child.discussion}</p>
                                </>
                              )
                            })
                            }
                          </div> : ""}

                        <div id={`input-edit_diskusi ${item.id}`} className="relative hidden my-5">
                          <form>
                            <CustomInput
                              id={`input-edit_diskusi`}
                              placeholder=''
                              label=''
                              defaultValue={item.discussion}
                              type='text'
                              name='edit_diskusi'
                              onChange={changeDiskus}
                            />
                            <div className='w-3/12 mt-4 ml-auto'>
                              <CustomButton
                                id="btn-edit"
                                label='Perbarui'
                                type='submit'
                                onClick={() => handleEdit(item.id)}
                              />
                            </div>
                          </form>

                          <div className='absolute bottom-0 right-48 w-3/12'>
                            <CustomButton
                              id="btn-kembali"
                              label='Kembali'
                              onClick={() => handleHide(item.id)}
                            />
                          </div>
                        </div>

                        <p id={`btn-balas ${item.id}`} onClick={() => handleDisplay(item.id)} className='text-zinc-800 inline font-semibold hover:cursor-pointer hover:text-lapak dark:text-white'>Balas diskusi ...</p>
                        <div id={`input-balas_diskusi ${item.id}`} className="relative mb-5 hidden">
                          <form>
                            <CustomInput
                              id={`input-balas_diskusi`}
                              placeholder='balas diskusi disini'
                              label=''
                              type='text'
                              name='balas_diskusi'
                              onChange={changeDiskusBalas}
                            />

                            <div className='w-3/12 mt-4 ml-auto'>
                              <CustomButton
                                id="btn-balas"
                                label='Balas'
                                type='submit'
                                onClick={() => handleBalas(item.parent_id)}
                              />
                            </div>
                          </form>

                          <div className='absolute bottom-0 right-48 w-3/12'>
                            <CustomButton
                              id="btn-kembali"
                              label='Kembali'
                              onClick={() => handleHide(item.id)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div >
          </>
      }

    </Layout >
  )
}

export default Detail