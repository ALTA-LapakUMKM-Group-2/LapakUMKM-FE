import { formatValue } from 'react-currency-input-field'
import { useNavigate, useParams, Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
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
import Loading from '../components/Loading'
import { useCookies } from 'react-cookie'
import { FeedbackTypes } from '../utils/types/DataType'
import CustomInput from '../components/CutomInput'
import CustomButton from '../components/CustomButton'



const Detail = () => {
  const { id } = useParams();
  const MySwal = withReactContent(Swal);
  const [loading, setLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [stock, setStock] = useState<number>(0);
  const [count, setCount] = useState<number>(1);
  const [size, setSize] = useState('')
  const [address, setAddress] = useState('')
  const [name, setName] = useState('')
  const [showChat, setShowChat] = useState(false)
  const [cookie, setCookie] = useCookies(['token'])
  const [feedback, setFeedback] = useState<FeedbackTypes[]>([])
  const [diskusi, setDiskusi] = useState<FeedbackTypes[]>([])

  const navigate = useNavigate()

  const handleUpdate = (e: any) => {
    e.preventDefault()
  }

  const handleIncrement = () => {
    setCount(count + 1);
    setTotalPrice(price * (count + 1));
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
      setTotalPrice(totalPrice - price);
    } else {
      setTotalPrice(price)
    }
  };

  const [price, setPrice] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(price)
  useEffect(() => {
    fetchData();
  }, [])


  const [productId, setProductId] = useState<any>()
  const [userId, setUserId] = useState<any>()

  const addToCart = async () => {

    const data = {
      product_id: parseInt(productId),
      product_pcs: count,
      user_id: userId
    };

    console.log(typeof data);
    console.log(typeof count);
    console.log("test id ", data);

    try {
      const res = await axios.post('https://lapakumkm.mindd.site/carts', data, {
        headers: {
          Authorization: `Bearer ${cookie.token}`
        }
      })
      if (res.data) {
        console.log('testos add to cart', res.data);
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

  const [image, setImage] = useState<any>([])
  const [photoToko, setPhotoToko] = useState('')
  const [category, setCategory] = useState<any>('')
  function fetchData() {
    setLoading(true);
    axios
      .get(`https://lapakumkm.mindd.site/products/${id}`)
      .then((res) => {
        const { full_name, address , shop_name , photo_profile} = res.data.data.user
        console.log('test user', res.data.data.user);
        console.log('test data', res.data.data.category.category);
        console.log('test dataaaaa', res.data.data);
        
        const category  =  res.data.data.category.category
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
      })
      .catch((err) => {
        console.log(err.response.statusText)
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
      .finally(() => setLoading(false))
  }
  console.log('cek user id' , userId);
  
  useEffect(() => {
    feedbackData()
  }, [])

  function feedbackData() {
    setLoading(true);
    axios
      .get(`https://virtserver.swaggerhub.com/UMARUUUN11_1/ALTA-LapakUMKM/1.0.0/products/${id}/feedbacks`)
      .then((res) => {
        const { data } = res.data
        setFeedback(data)

      })
      .catch((err) => {

      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    diskusiData()
  }, [])

  function diskusiData() {
    setLoading(true);
    axios
      .get(`https://virtserver.swaggerhub.com/UMARUUUN11_1/ALTA-LapakUMKM/1.0.0/products/${id}/discussions`)
      .then((res) => {
        const { data } = res.data
        setDiskusi(data)

      })
      .catch((err) => {

      })
      .finally(() => setLoading(false))
  }

  const [balas, setBalas] = useState<string>("")
  const [newDiskus, setnewDiskus] = useState<string>("")
  const [disable, setDisable] = useState<boolean>(true)
  const [disable2, setDisable2] = useState<boolean>(true)
  const [hidden, setHidden] = useState<string>("hidden")

  useEffect(() => {
    newDiskus ? setDisable(false) : setDisable(true)
  }, [newDiskus])

  const handleNewDiskusi = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true)
    e.preventDefault()
    const body = {
      product_id: id,
      discussion: newDiskus
    }
    axios
      .post(`https://virtserver.swaggerhub.com/UMARUUUN11_1/ALTA-LapakUMKM/1.0.0/discussions`, body, {
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
      .finally(() => setLoading(false))
  }

  const changeDiskus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBalas(e.target.value);
  };

  const handleBalas = (id_diskusi: number) => {
    setLoading(true)
    const body = {
      product_id: id,
      discussion: balas
    }
    axios
      .post(`https://virtserver.swaggerhub.com/UMARUUUN11_1/ALTA-LapakUMKM/1.0.0/discussions`, body, {
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
      .finally(() => setLoading(false))
  }
  console.log('cek kategor', category);
  
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
            >
              <div className="chat chat-start">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img src={FotoProfile} />
                  </div>
                </div>
                <div className="chat-header">
                  Obi-Wan Kenobi
                </div>
                <div className="chat-bubble">You were the Chosen One! Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia sequi assumenda eveniet accusantium tempora dolore dolorum fugiat doloremque rerum possimus commodi ipsam illum, dolor laborum harum voluptatibus unde maiores voluptates.</div>
              </div>
              <div className="chat chat-end">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img src={FotoProfile} />
                  </div>
                </div>
                <div className="chat-header">
                  Anakin
                </div>
                <div className="chat-bubble bg-lapak">I hate you! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam voluptatem architecto deleniti error nisi quam eveniet tenetur veniam, ab ducimus eaque soluta numquam consequatur unde nostrum qui magnam alias commodi!</div>
              </div>
            </ChatModal>
            {/* card for image */}
            <div className='w-full mt-10 mx-auto px-5 py-10  border dark:border-none rounded-lg'>
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-5 ">
                  {/* Card kiri */}
                  <div className="bg-transparent shadow-lg  rounded-lg h-fit p-5 dark:border-white dark:border-2">
                    <div className="max-w-5xl max-h-96 ">
                      { loading ? <Loading /> :
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
                          console.log("test image", item);
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
                  <div className="p-5 rounded-md max-w-3xl w-full h-fit border-2 border-gray-200 shadow-lg mx-auto">
                    <div className="w-full h-full">
                      <div className="flex justify-between items-center mb-5 ">
                        <h1 className="font-bold text-2xl dark:text-white">{product} </h1>
                        <button className="btn btn-ghost bg-lapak rounded-xl text-white" onClick={() => setShowChat(true)}>
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
                      <div className="flex gap-2 border w-fit mt-10 items-center overflow-hidden">
                        <button onClick={handleDecrement} className="btn btn-xs bg-gray-100 text-black border-none hover:bg-gray-100 dark:bg-transparent dark:text-white dark:hover:text-lapak text-2xl mb-3 mr-5 ml-2">-</button>
                        <h1 className="font-bold dark:text-white">{count}</h1>
                        <button onClick={handleIncrement} className="btn btn-xs bg-gray-100 text-black border-none hover:bg-gray-100 dark:bg-transparent dark:text-white dark:hover:text-lapak text-2xl mb-3 ml-5 mr-2">+</button>
                      </div>
                      <div className="border-2 mt-5"></div>
                      <div className="flex justify-center gap-5 mt-10 w-fit mx-auto ">
                        <button className="btn  bg-lapak hover:bg-white border-lapak hover:border hover:text-lapak border-none w-fit" onClick={() => {
                          navigate('/payment')
                        }}>Bayar Langsung</button>
                        <button className='btn  bg-lapak hover:bg-white border-lapak hover:border hover:text-lapak border-none w-fit' onClick={addToCart}>Tambah Keranjang</button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Break Line  */}
                <div className='border-2 mt-10'>

                </div>
                {/* Card toko */}
                <div className='flex flex-col gap-10'>
                  <div className='flex mt-10 shadow-xl w-fit p-10 gap-5 border rounded-md '>
                    <img src={photoToko} className='w-20 rounded-full cursor-pointer' onClick={() => navigate(`/toko/${name}` ,{
                                    state: {
                                        id: userId
                                    }
                                })} />
                    <div className='font-bold text-lg dark:text-white'>
                      <h1 className='mb-5 cursor-pointer' onClick={() => navigate(`/toko/${name}` ,{
                                    state: {
                                        id: userId
                                    }
                                })}>{name}</h1>
                      <h1 className='flex items-center cursor-pointer' onClick={() => navigate(`/toko/${name}`,{
                                    state: {
                                        id: userId
                                    }
                                } )} ><MdOutlineLocationOn className='dark:text-lapak mr-2' /> {address}</h1>
                    </div>
                  </div>
                  <h1 className='text-3xl font-bold dark:text-white'>Informasi Produk :</h1>
                  <div className='w-full shadow-xl p-5 rounded-xl border text-lg font-semibold dark:text-white'>
                    <h1>stock : <span className='ml-4'>{stock}</span> </h1>
                    <h1>Kategori : <span className='ml-4'>{category}</span></h1>
                    <h1>Brand : <span className='ml-4'>{product}</span></h1>
                    <h1>Ukuran : <span className='ml-4'>{size}</span></h1>
                    <div className='border-2 mt-5 mb-5'>
                    </div>
                    <h1 >Deskripsi : </h1>
                    <h1>{description}</h1>
                  </div>
                </div>
                {/* end */}
                <div className='border-2 mt-20 mb-5'>
                </div>

                <div className='flex mt-20 flex-col gap-5 w-7/12'>
                  <div className='flex justify-between'>
                    <p id='feedback' className='text-2xl text-zinc-800 mb-2 font-semibold dark:text-white'>Ulasan</p>
                    <a href='#diskusi' className='text-[16px] flex items-center text-zinc-800 mb-2  hover:cursor-pointer hover:text-lapak dark:text-white dark:hover:text-lapak'>Lihat diskusi <HiOutlineArrowLongDown /></a>
                  </div>

                  <div >
                    {feedback.map((item) => (
                      <CardFeedback key={item.id} rating={item.rating} image={item.user.map((user) => (user.profile_picture))} comment={item.feedback} name={item.user.map((user) => (user.username))}
                      />
                    ))}
                  </div>

                  <div className='flex justify-between mt-8 '>
                    <p id='diskusi' className='text-2xl text-zinc-800 mb-2 font-semibold dark:text-white'>Diskusi</p>
                    <a href='#feedback' className='text-[16px] flex items-center hover:cursor-pointer hover:text-lapak text-zinc-800 mb-2 dark:text-white dark:hover:text-lapak'>Lihat Ulasan <HiOutlineArrowLongUp /></a>
                  </div>

                  <form onSubmit={(e) => handleNewDiskusi(e)} className='p-4 border-2 border-zinc-300 rounded-md'>
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

                  {diskusi.map((item) => (
                    <div key={item.id} className='p-2 mb-4 border-b-2 border-zinc-400'>
                      {item.user.map((profile) => (
                        <>
                          <div key={profile.id} className="float-left w-12 h-12 mr-4 overflow-hidden rounded-full flex justify-center" >
                            <img src={profile.profile_picture} alt="profil.svg" />

                          </div>
                          <div className='flex justify-between text-zinc-800 items-center py-3'>
                            <h1 className='text-lg font-bold dark:text-white'>{profile.username}</h1>
                          </div>
                        </>
                      ))}
                      <p className='text-gray-700 my-5 dark:text-white'>{item.discussion}</p>

                      <p className='text-zinc-800 inline font-semibold hover:cursor-pointer hover:text-lapak dark:text-white'>Balas diskusi ...</p>

                      <div className={`mb-5`}>
                        <CustomInput
                          id='input-balas_diskusi'
                          placeholder='balas diskusi disini'
                          label=''
                          type='text'
                          name='balas_diskusi'
                          onChange={changeDiskus}
                        />

                        <div className='flex gap-5 w-3/12 mt-4 ml-auto'>
                          <CustomButton
                            id="btn-balas"
                            label='Balas'
                            type='submit'
                            onClick={() => handleBalas(item.id)}
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