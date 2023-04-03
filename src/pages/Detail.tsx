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
import NotFound from '../assets/download.png'
import '@smastrom/react-rating/style.css'
import { Rating } from '@smastrom/react-rating';


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

interface FormValues {
  comment: string;
  rating: number;
}

const initialFormValues: FormValues = {
  comment: '',
  rating: 0
};

const Detail = () => {
  
  const { id } = useParams();
  const MySwal = withReactContent(Swal);
  const [loading, setLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [value, setValue] = useState<FormValues>(initialFormValues)
  const [stock, setStock] = useState<number>(0);
  const [size, setSize] = useState('')
  const [address, setAddress] = useState('')
  const [name, setName] = useState('')
  const [showChat, setShowChat] = useState(false)
  const [cookie, setCookie] = useCookies(["token", "id", "roomID", "name" ,'photo_profile', 'tokoId' , 'name'])

  const [feedbacks, setFeedback] = useState<FeedbackTypes[]>([])
  const [diskusi, setDiskusi] = useState<FeedbackTypes[]>([])
  const [balas, setBalas] = useState<string | undefined>("")
  const [newDiskus, setnewDiskus] = useState<string>("")
  const [disable, setDisable] = useState<boolean>(true)
  const [hide, setHide] = useState<boolean>(true)
  const navigate = useNavigate()
  const [test, setTest] = useState<Product[]>([])
  const [productId, setProductId] = useState<any>()
  const [userId, setUserId] = useState<any>()

  const StarDrawing = (
    <path d="M11.0748 3.25583C11.4141 2.42845 12.5859 2.42845 12.9252 3.25583L14.6493 7.45955C14.793 7.80979 15.1221 8.04889 15.4995 8.07727L20.0303 8.41798C20.922 8.48504 21.2841 9.59942 20.6021 10.1778L17.1369 13.1166C16.8482 13.3614 16.7225 13.7483 16.8122 14.1161L17.8882 18.5304C18.1 19.3992 17.152 20.0879 16.3912 19.618L12.5255 17.2305C12.2034 17.0316 11.7966 17.0316 11.4745 17.2305L7.60881 19.618C6.84796 20.0879 5.90001 19.3992 6.1118 18.5304L7.18785 14.1161C7.2775 13.7483 7.1518 13.3614 6.86309 13.1166L3.3979 10.1778C2.71588 9.59942 3.07796 8.48504 3.96971 8.41798L8.50046 8.07727C8.87794 8.04889 9.20704 7.80979 9.35068 7.45955L11.0748 3.25583Z" stroke="#fdd231" strokeWidth="1" ></path>
  );

  const customStyles = {
      itemShapes: StarDrawing,
      activeFillColor: '#FDD231',
      inactiveFillColor: '#ffffff',

  };

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
        setCookie('tokoId', res.data.data.user_id , {path: "/"})
      })
      .catch((err) => {
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

  const handleChangeEditFeedback = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

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

  function feedbackData() {
    setLoading(true);
    axios
      .get(`https://lapakumkm.mindd.site/products/${id}/feedbacks`)
      .then((res) => {
        setFeedback(res.data.data)
      })
      .catch((err) => {

      })
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    feedbackData()
  }, [])

  const [parentId, setParentId] = useState<number|null>()
  const [prodTransDetail, setProdTransDetail] = useState<number|null>()
  const [replyFeed, setReplyFeed] = useState<string>('')
  
  const handleFeedbackReply = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReplyFeed(e.target.value);
  };

  const handleBalasFeedback = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true)
    e.preventDefault()
    const body = {
      product_id: productId,
      parent_id: parentId,
      product_transaction_detail_id: prodTransDetail,
      feedback: replyFeed
    }
    axios
      .post(`https://lapakumkm.mindd.site/feedbacks`, body, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
          Accept: 'application/json',
          "Content-Type": 'application/json'
        }
      })
      .then((res) => {
        MySwal.fire({
          icon: "success",
          iconColor: "#31CFB9",
          title: "Anda berhasil membalas diskusi",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1500
        })
        feedbackData()
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
      .finally(() => setLoading(false))
  }
  const [feedbackId, setFeedbackId] = useState<number | null>()
  const handleEditFeedback = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true)
    e.preventDefault()
    setValue(initialFormValues);
    const body = {
      feedback: value.comment,
      rating: value.rating
    }
    await axios.put(`https://lapakumkm.mindd.site/feedbacks/${feedbackId}`, body, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
          Accept: 'application/json',
          "Content-Type": 'application/json'
        }
      })
      .then((res) => {
        MySwal.fire({
          icon: "success",
          iconColor: "#31CFB9",
          title: res.data.message,
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1500
        })
        feedbackData()
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
      recipient_id: userId
    }

    axios
      .post(`https://lapakumkm.mindd.site/chats`, body, {
        headers: {
          Authorization: `Bearer ${cookie.token}`
        }
      })
      .then((res) => {
        const cekID = res.data.data.room_id
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

  return (
    <Layout>
      {
        loading ? <Loading /> :
          <>
            <Navbar />
            <ChatModal
              img={FotoProfile}
              isOpen={showChat}
              isClose={() => setShowChat(false)}
              product_id={productId}
              Room={roomID}
              Recipient_id={recipientID}
              userID={userId}
            />

            <div className='w-full mt-10 mx-auto px-5 py-10   dark:border-none rounded-lg'>
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-5 ">
                  <div className="bg-transparent shadow-lg  rounded-lg h-fit p-5 dark:border-lapak dark:border-2">
                    {loading   ? <Loading/> : 
                      image ? 
                      <>
                      {
                      image.length === 1? 
                        <div className="max-w-5xl max-h-96 ">
                          <img src={image[0]?.image} className="object-cover w-full max-h-96 md:col-span-2 rounded-md mx-auto" alt="" />
                        </div>
                          :
                        image.length === 2 ?
                        <div className="max-w-5xl max-h-96 grid grid-cols-2 gap-2">
                          <img src={image[0]?.image} className="object-cover w-full h-96 rounded-md" alt="" />
                          <img src={image[1]?.image} className="object-cover w-full h-96 rounded-md" alt="" />
                        </div>
                        :
                        image.length === 3 ?
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-w-5xl mx-auto mt-5">
                            <img src={image[0]?.image} className="md:col-span-2 w-full h-full md:max-h-96 rounded-md" alt="" />
                            <div className="grid grid-rows-2">
                              <img src={image[1]?.image} className="w-full h-sm rounded-md max-w-xs max-h-72" alt="" />
                              <img src={image[2]?.image} className="w-full h-sm rounded-md max-w-xs max-h-72" alt="" />
                            </div>
                          </div>
                        :
                        image.length > 3 ?
                        <div className="grid grid-cols-3 gap-2 max-w-5xl mx-auto mt-5">
                          <img src={image[0]?.image} className="object-cover col-span-3 w-full h-28 md:max-h-60 rounded-md" alt="" />
                          <img src={image[1]?.image} className="w-full h-sm rounded-md max-w-xs max-h-72" alt="" />
                          <img src={image[2]?.image} className="w-full h-sm rounded-md max-w-xs max-h-72" alt="" />
                          <img src={image[3]?.image} className="w-full h-sm rounded-md max-w-xs max-h-72" alt="" />
                        </div>
                      :
                        <div className="max-w-5xl max-h-96 ">
                          <img src={NotFound} className="object-cover w-full max-h-96 md:col-span-2 rounded-md mx-auto" alt="" />
                        </div>
                        }
                      </>
                      :
                      <div className="max-w-5xl max-h-96 ">
                          <img src={NotFound} className="object-cover w-full max-h-96 md:col-span-2 rounded-md mx-auto" alt="" />
                      </div>
                    }
                  </div>
                  <div className="p-5 rounded-md max-w-3xl w-full h-fit border-2 dark:border-lapak border-gray-200 shadow-lg mx-auto">
                    <div className="w-full h-full">
                      <div className="flex justify-between items-center mb-5 ">
                        <h1 className="font-bold text-xl text-zinc-800 dark:text-white">{product} </h1>
                        <button className="btn btn-ghost bg-lapak rounded-xl text-white" onClick={() => handleShowChat()}>
                          <BsChatText size={20} />
                        </button>
                      </div>
                      <h1 className="font-semibold text-lg dark:text-white">Stock Tersedia <span className='dark:text-lapak'>:</span> <span className='ml-3 font-medium'>{stock}</span></h1>
                      <h1 className="font-semibold text-lg dark:text-white">Ukuran <span className='dark:text-lapak'>:</span> <span className='ml-3 font-medium'>{size}</span></h1>
                      <h1 className="font-semibold text-lg flex items-center gap-2 dark:text-white">
                        Rating <span className='dark:text-lapak'>:</span>  <span className=" font-medium flex gap-1"> <MdStarRate size={25} className='ml-3 text-yellow-500 dark:text-lapak' />4.5</span>
                      </h1>
                      <h1 className="font-semibold text-lg dark:text-white">Price <span className='dark:text-lapak'>:</span> <span className='ml-3 font-medium'>{formatValue({
                        prefix: 'Rp. ',
                        value: JSON.stringify(price),
                        groupSeparator: '.',
                        decimalSeparator: ',',
                      })}</span></h1>
                      <h1 className="font-semibold text-lg dark:text-white">total price <span className='dark:text-lapak'>:</span> <span className='ml-3 font-medium'> {formatValue({
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
                <div className='border-2 mt-10 dark:border-lapak'>

                </div>
                <div className='flex flex-col gap-10'>
                  <div className='flex mt-10 shadow-xl w-fit p-10 gap-5 border rounded-md dark:border-lapak'>
                    <div className="avatar cursor-pointer">
                      <div className="w-20 rounded-full">
                        <img src={photoToko ? photoToko : Default} onClick={() => navigate(`/toko/${name}`, {
                          state: {
                            id: userId
                          }
                        })} />
                      </div>
                    </div>
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
                  <h1 className='text-2xl text-zinc-800 mb-2 font-semibold dark:text-white'>Informasi Produk :</h1>
                  <div className='w-full shadow-xl p-5 rounded-xl border text-md font-medium dark:text-white dark:border-lapak dark:border-2'>
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
                <div className='border-2 mt-20 mb-5 dark:border-lapak'>
                </div>

                <div className='flex mt-20 flex-col gap-5 w-80 md:w-[600px]'>
                  <div className='flex justify-between'>
                    <p id='feedback' className='text-2xl text-zinc-800 mb-2 font-semibold dark:text-white'>Ulasan</p>
                    <a href='#diskusi' className='text-[16px] flex items-center text-zinc-800 mb-2  hover:cursor-pointer hover:text-lapak dark:text-white dark:hover:text-lapak'>Lihat diskusi <HiOutlineArrowLongDown /></a>
                  </div>

                  {feedbacks.length === 0 ? <p className='text-[20px] text-zinc-800 font-medium dark:text-zinc-50'>Belum ada ulasan</p> :

                    <div >
                      {feedbacks.map((item) => (
                        <>
                          <div className='p-5 mb-4 border-2 shadow dark:border-lapak rounded-lg relative' key={item.id}>
                            <div className='dropdown dropdown-bottom dropdown-end absolute top-2 right-0'>
                              <label tabIndex={0} className={`${cookie.name === item.user.full_name ? "flex" : "hidden"} btn-ghost btn-circle btn`}>
                                <GoKebabVertical className='text-zinc-800 dark:text-zinc-50' size={20} />
                              </label>

                              <ul
                                tabIndex={0}
                                className="dropdown-content menu rounded-box menu-compact mt-3 bg-zinc-50 text-zinc-800 px-10 py-4 shadow-[0px_2px_6px_0px_rgba(0,0,0,0.3)] space-y-4 text-[16px] hover:cursor-pointer"
                              >
                                <li onClick={() => {handleDisplayEdit(item.id),setValue((prevData) => ({ ...prevData, rating: item.rating, comment: item.feedback })), setFeedbackId(item.id)}} className='hover:text-zinc-500  text-zinc-800'>perbarui</li>
                              </ul>
                            </div>
                            <div className="float-left w-12 h-12 mr-4 overflow-hidden rounded-full flex justify-center" >
                                <img src={item.user.photo_profile ? item.user.photo_profile: Default} alt="profil.svg" />
                            </div>

                            <div className='flex justify-between text-zinc-800 items-center py-3 '>
                                <h1 className='text-lg font-bold dark:text-white'>{item.user.full_name ? item.user.full_name : "Tidak Diketahui"}</h1>
                            </div>
                            <div id={`edit_diskusi ${item.id}`} className="my-5 border-b-2 pb-2 shadow dark:border-lapak">
                              <Rating
                                value={item.rating}
                                style={{ maxWidth: 120 }}
                                itemStyles={customStyles}
                                readOnly
                                className='dark:text-lapak'
                              />
                            <p className='text-gray-700 dark:text-white mt-3'>{item.feedback}</p>
                            </div>
                            {item.childs ?
                            <div className='pl-10 relative'>
                              {item.childs?.map((child) => {
                                return (
                                  <>
                                    <div className="float-left w-12 h-12 mr-4 overflow-hidden rounded-full flex justify-center" >
                                      <img src={child.user.photo_profile ? child.user.photo_profile : Default} alt="profil.svg" />
                                    </div>

                                    <div className='flex justify-between text-zinc-800 items-center py-3'>
                                      <h1 className='text-lg font-bold dark:text-white'>{child.user.full_name ? item.user.full_name : "Tidak Diketahui"}</h1>
                                    </div>

                                    <p id={``} className='text-gray-700 my-4 dark:text-white'>{child.feedback}</p>
                                  </>
                                )
                              })
                              }
                            </div> : ""}
                            <div id={`input-edit_diskusi ${item.id}`} className="relative hidden my-5">
                              <form className='space-y-3' onSubmit={handleEditFeedback}>
                                <label className="text-xs font-medium text-gray-700 dark:text-gray-400 text-[16px] md:text-[16px] lg:text-[16px] 2xl:text-[18px] dark:text-white" htmlFor="minrating" id='minrating'>Edit Rating</label>
                                <Rating
                                  itemStyles={customStyles}
                                  isRequired
                                  style={{ maxWidth: 150 }}
                                  value={value.rating}
                                  visibleLabelId="rating"
                                  onChange={(selectedValue: any) => setValue((data) => ({ ...data, rating: selectedValue }))}
                                />
                                <CustomInput
                                  id={`input-edit-feedback`}
                                  placeholder=''
                                  label='Edit Ulasan'
                                  defaultValue={value.comment}
                                  type='text'
                                  name='comment'
                                  onChange={handleChangeEditFeedback}
                                />
                                <div className='w-3/12 mt-4 ml-auto'>
                                  <CustomButton
                                    id="btn-edit"
                                    label='Perbarui'
                                    type='submit'
                                  />
                                </div>
                              </form>
                              <div className='absolute bottom-0 right-48 w-3/12'>
                                <CustomButton
                                  id="btn-kembali"
                                  label='Kembali'
                                  onClick={() => {handleHide(item.id), setValue((prevData) => ({ ...prevData, rating: 0 })),setFeedbackId(null)}}
                                />
                              </div>
                            </div>
                            <p id={`btn-balas ${item.id}`} onClick={() => {handleDisplay(item.id), setParentId(item.parent_id), setProdTransDetail(item.product_transaction_detail_id)}} className={`${parseInt(cookie.id) === userId ? "flex" : "hidden" } text-zinc-800 inline font-semibold hover:cursor-pointer hover:text-lapak dark:text-white`}>Balas Feedback ...</p>
                              <div id={`input-balas_diskusi ${item.id}`} className="relative mb-5 hidden">
                                <form onSubmit={handleBalasFeedback}>
                                  <CustomInput
                                    id={`input-balas-Feedback`}
                                    placeholder='Balas Ulasan Anda'
                                    label=''
                                    type='text'
                                    name='balas_feedback'
                                    onChange={handleFeedbackReply}
                                  />

                                  <div className='w-3/12 mt-4 ml-auto'>
                                    <CustomButton
                                      id="btn-balas"
                                      label='Balas'
                                      type='submit'
                                    />
                                  </div>
                                </form>

                                <div className='absolute bottom-0 right-48 w-3/12'>
                                  <CustomButton
                                    id="btn-kembali"
                                    label='Kembali'
                                    onClick={() => {handleHide(item.id), setParentId(null), setProdTransDetail(null)}}
                                  />
                                </div>
                              </div>
                          </div>
                        </>
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

                    <div className='flex gap-5 w-40 mt-4 ml-auto'>
                      <CustomButton
                        id="btn-kirim_diskusi"
                        label='Kirim'
                        loading={disable || loading}
                      />
                    </div>
                  </form>


                  {diskusi.length === 0 ? <p className='text-[20px] text-zinc-800 font-medium dark:text-zinc-50'>Belum ada diskusi</p> :

                    diskusi.map((item, index) => (
                      <div key={item.id} className="p-5 mb-4 border-2 shadow dark:border-lapak rounded-lg relative">
                        <div className='dropdown dropdown-bottom dropdown-end absolute top-2 right-0'>
                          <label tabIndex={0} className={`${parseInt(cookie.id) === item.user_id ? "flex" : "hidden"} btn-ghost btn-circle btn`}>
                            <GoKebabVertical className='text-zinc-800 dark:text-zinc-50' size={20} />
                          </label>

                          <ul
                            tabIndex={0}
                            className="dropdown-content menu rounded-box menu-compact mt-3 bg-zinc-50 text-zinc-800 px-10 py-4 shadow-[0px_2px_6px_0px_rgba(0,0,0,0.3)] space-y-4 text-[16px] hover:cursor-pointer dark:bg-slate-700 "
                          >
                            <li onClick={() => handleDisplayEdit(item.id)} className='hover:text-zinc-500  text-zinc-800 dark:text-white'>perbarui</li>
                            <li onClick={() => DeleteDiskusi(item.id)} className={`${item.childs ? "hidden" : "flex" } hover:text-red-400 text-red-500`}>hapus</li>
                          </ul>
                        </div>

                        <div className="float-left w-12 h-12 mr-4 overflow-hidden rounded-full flex justify-center" >
                          <img src={item.user.photo_profile ? item.user.photo_profile : Default} alt="profil.svg" />

                        </div>
                        <div className='flex justify-between text-zinc-800 items-center py-3'>
                          <h1 className='text-lg font-bold dark:text-white'>{item.user.full_name ? item.user.full_name : "Tidak Diketahui"}</h1>
                        </div>
                        <div id={`edit_diskusi ${item.id}`} className="my-5 border-b-2 pb-2 shadow dark:border-lapak">
                          <p id={`edit_diskusi ${item.id}`} className='text-gray-700 my-5 dark:text-white'>{item.discussion}</p>
                        </div>

                        {item.childs ?
                          <div className='pl-10 relative'>
                            {item.childs?.map((child) => {
                              return (
                                <>
                                  <div className="float-left w-12 h-12 mr-4 overflow-hidden rounded-full flex justify-center" >
                                    <img src={child.user.photo_profile ? child.user.photo_profile : Default} alt="profil.svg" />
                                  </div>

                                  <div className='flex justify-between text-zinc-800 items-center py-3'>
                                    <h1 className='text-lg font-bold dark:text-white'>{child.user.full_name ? child.user.full_name : "Tidak Diketahui"}</h1>
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