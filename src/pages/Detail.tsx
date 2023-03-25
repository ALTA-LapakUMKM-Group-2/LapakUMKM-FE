import { formatValue } from 'react-currency-input-field'
import { useNavigate, useParams } from 'react-router-dom'
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
import product from '../dummy/prouct.json'
import Loading from '../components/Loading'
import { useCookies } from 'react-cookie'



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

  
    console.log("alamat ", address);
    console.log("nama ", name);
console.log('total price', totalPrice);



const [productId ,setProductId] = useState<any>()
const [userId, setUserId] =useState<any>()

const addToCart =  async () => {
  
  const data = {
    product_id: parseInt(productId),
    product_pcs: count,
    user_id: userId
  };
  console.log(typeof data);
  console.log(typeof count);
  
  console.log("test id ", data);
  try {
    
const res = await axios.post('https://lapakumkm.mindd.site/carts', data ,{
      headers : {
        Authorization: `Bearer ${cookie.token}`
      }
    })
    if(res.data) {  
      console.log('testos add to cart', res.data);
      MySwal.fire({
        icon: "success",
        title: "Produk ditambahkan ke keranjang",
        showCancelButton: false,
       
      })
    }
    navigate('/cart');
    
  } catch (err : any) {
    console.log('Failed add to cart', err.response);
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
  function fetchData() {
    setLoading(true);
    axios
    .get(`https://lapakumkm.mindd.site/products/${id}`)
    .then((res) => {
      console.log('detail', res.data.data);
      const { full_name, address } = res.data.data.user
      const { product_name, description, price, stock_remaining, size ,user_id ,id, product_image } = res.data.data;
      setProduct(product_name);
      setDescription(description);
      setPrice(price);
      setStock(stock_remaining);
      setSize(size)
      setName(full_name)
      setAddress(address)
      setTotalPrice(price);
      setUserId(user_id)
      setProductId(id)
      setImage(product_image)
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
//  console.log('check image', image[0].image);
//  console.log(JSON.stringify(image[0]?.image));
 
// console.log(image[0].image);

const imgUrl = 'https://storage.googleapis.com/images_lapak_umkm/product/'
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
            <div className='w-full mt-10 mx-auto px-5 py-10  border rounded-lg'>
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-5 ">
                  {/* Card kiri */}
                  <div className="bg-white">
                    <div className="max-w-5xl max-h-96">
                      <img src={imgUrl + image[1]?.image} className="w-full h-full md:col-span-2 rounded-md" alt="" />
                      {/* <img src={dai} className="w-full h-full md:col-span-2 rounded-md" alt="" /> */}
                    </div>
                    <div className="grid grid-cols-3 gap-2 max-w-5xl mx-auto mt-5">
                    {
                      image.map((item:any) => {
                        console.log("test image", item);
                        return (
                        <>
                            <img src={imgUrl + item.image} className="w-full h-md rounded-md max-w-xs" alt="" />
                           
                        </>
                        )
                      })
                    }
                    
                    </div>
                  </div>
                  {/* Card kanan */}
                  <div className="p-5 rounded-md max-w-3xl w-full h-fit border-2 border-gray-200 shadow-lg mx-auto">
                    <div className="w-full h-full">
                      <div className="flex justify-between items-center mb-5">
                        <h1 className="font-bold text-2xl">{product}</h1>
                        <button className="btn btn-ghost bg-lapak rounded-xl text-white" onClick={() => setShowChat(true)}>
                          <BsChatText size={20} />
                        </button>
                      </div>
                      <h1 className="font-bold text-2xl">Stock Tersedia : <span className='ml-3 font-medium'>{stock}</span></h1>
                      <h1 className="font-bold text-2xl">Ukuran : <span className='ml-3 font-medium'>{size}</span></h1>
                      <h1 className="font-bold text-2xl flex items-center gap-2">
                        Rating: <span className=" font-medium flex gap-1"> <MdStarRate size={25} className='ml-3 text-yellow-500' />4.5</span>
                      </h1>
                      <h1 className="font-bold text-2xl mt-2">Price : <span className='ml-3 font-medium'>{formatValue({
                        prefix: 'Rp. ',
                        value: JSON.stringify(price),
                        groupSeparator: '.',
                        decimalSeparator: ',',
                      })}</span></h1>
                      <h1 className="font-bold text-2xl mt-2">total price : <span className='ml-3 font-medium'> {formatValue({
                        prefix: 'Rp. ',
                        value: JSON.stringify(totalPrice),
                        groupSeparator: '.',
                        decimalSeparator: ',',
                      })}</span></h1>
                      <div className="flex gap-2 border w-fit mt-10 items-center overflow-hidden">
                        <button onClick={handleDecrement} className="btn btn-xs bg-gray-100 text-black border-none hover:bg-gray-100 text-2xl mb-3 mr-5 ml-2">-</button>
                        <h1 className="">{count}</h1>
                        <button onClick={handleIncrement} className="btn btn-xs bg-gray-100 text-black border-none hover:bg-gray-100 text-2xl mb-3 ml-5 mr-2">+</button>
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
                    <img src={FotoProfile} className='w-40 rounded-full cursor-pointer' onClick={() => navigate(`/toko/${id}`)} />
                    <div className='font-bold text-lg'>
                      <h1 className='mb-5 cursor-pointer' onClick={() => navigate(`/toko/${id}`)}>{name}</h1>
                      <h1 className='flex items-center cursor-pointer' onClick={() => navigate(`/toko/${id}`)} ><MdOutlineLocationOn /> {address}</h1>
                    </div>
                  </div>
                  <h1 className='text-3xl font-bold'>Informasi Produk :</h1>
                  <div className='w-full shadow-xl p-5 rounded-xl border text-lg font-semibold'>
                    <h1>stock : {stock}</h1>
                    <h1>Kategori : {`spatu lari`}</h1>
                    <h1>Brand : {product}</h1>
                    <h1>Ukuran : {size}</h1>
                    <div className='border-2 mt-5 mb-5'>
                    </div>
                    <h1 >Deskripsi : </h1>
                    <h1>{description}</h1>
                  </div>
                </div>
                {/* end */}
                <div className='border-2 mt-20 mb-5'>
                </div>
                <div className='flex mt-20 flex-col gap-5'>
                  <h1 className='text-2xl font-bold'>Ulasan Pembeli :</h1>
                  <CardFeedback rating={0} image={FotoProfile} comment={'spatu ini sangat bagus'} name={'Faizal Triasa'}
                  />
                  <CardFeedback rating={0} image={FotoProfile} comment={'spatu ini sangat bagus'} name={'Faizal Triasa'}
                  />
                  <CardFeedback rating={0} image={FotoProfile} comment={'spatu ini sangat bagus'} name={'Faizal Triasa'}
                  />
                </div>
              </div>

            </div>
          </>
      }

    </Layout>
  )
}

export default Detail