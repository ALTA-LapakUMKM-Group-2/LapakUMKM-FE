import React, { useState } from 'react'
import Layout from '../components/Layout'
import Navbar from '../components/Navbar'
import dai from '../assets/dai.jpg'
import { BsChatText } from 'react-icons/bs'
import { MdStarRate } from 'react-icons/md'
import FotoProfile from '../assets/photo_2023-03-16_20-34-20.jpg'
import { MdOutlineLocationOn } from 'react-icons/md'
import CardFeedback from '../components/CardFeedback'
import { formatValue } from 'react-currency-input-field'
import { useNavigate } from 'react-router-dom'
import product from '../dummy/prouct.json'

const Detail = () => {
  const [count, setCount] = useState(1)
  const [price, setPrice] = useState(250000);
  const [totalPrice, setTotalPrice] = useState(price)
  const navigate = useNavigate()

  const handleIncrement = () => {
    setCount(count + 1);
    setTotalPrice(price * (count + 1));

  };
  console.log(totalPrice);

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
      setTotalPrice(totalPrice - price);
    } else {
      setTotalPrice(price)
    }
  };


  const handleUpdate = (e: any) => {
    e.preventDefault()
  }

  return (
    <Layout>
      <Navbar />
      {/* card for image */}
      <div className='w-full mt-10 mx-auto px-5 py-10  border rounded-lg'>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-5 ">
            {/* Card kiri */}
            <div className="bg-white">
              <div className="max-w-5xl max-h-96">
                <img src={dai} className="w-full h-full md:col-span-2 rounded-md" alt="" />
              </div>
              <div className="grid grid-cols-3 gap-2 max-w-5xl mx-auto mt-5">
                <img src={dai} className="w-full h-md rounded-md max-w-xs" alt="" />
                <img src={dai} className="w-full h-md rounded-md max-w-xs" alt="" />
                <img src={dai} className="w-full h-md rounded-md max-w-xs" alt="" />
              </div>
            </div>
            {/* Card kanan */}
            <div className="p-5 rounded-md max-w-3xl w-full h-fit border-2 border-gray-200 shadow-lg mx-auto">
              <div className="w-full h-full">
                <div className="flex justify-between items-center mb-5">
                  <h1 className="font-bold text-2xl">Adudas Mentawai</h1>
                  <button className="btn btn-ghost bg-lapak rounded-xl">
                    <BsChatText size={20} />
                  </button>
                </div>
                <h1 className="font-bold text-2xl">Stock Tersedia : <span className='ml-3'>{`5`}</span></h1>
                <h1 className="font-bold text-2xl">Ukuran : <span className='ml-3'>{`M`}</span></h1>
                <h1 className="font-bold text-2xl flex items-center gap-2">
                  Rating: <span className="text-yellow-500"> <MdStarRate size={25} className='ml-3' /></span> 4.5
                </h1>
                <h1 className="font-bold text-2xl mt-2">Price : <span className='ml-3'>{formatValue({
                  prefix: 'Rp. ',
                  value: JSON.stringify(price),
                  groupSeparator: '.',
                  decimalSeparator: ',',
                })}</span></h1>
                <h1 className="font-bold text-2xl mt-2">total price : <span className='ml-3'> {formatValue({
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
                  <button className='btn  bg-lapak hover:bg-white border-lapak hover:border hover:text-lapak border-none w-fit' >Tambah Keranjang</button>
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
              <img src={FotoProfile} className='w-40 rounded-full' />
              <div className='font-bold text-lg'>
                <h1 className='mb-5'>toko LapakUMKM</h1>
                <h1 className='flex items-center'><MdOutlineLocationOn /> Jakarta</h1>
              </div>
            </div>
            <h1 className='text-3xl font-bold'>Informasi Produk :</h1>
            <div className='w-full shadow-xl p-5 rounded-xl border text-lg font-semibold'>
              <h1>stock : {`unlimited`}</h1>
              <h1>Kategori : {`spatu lari`}</h1>
              <h1>Brand : {`adudas mentawai`}</h1>
              <h1>Ukuran : {`M`}</h1>
              <div className='border-2 mt-5 mb-5'>
              </div>
              <h1 >Deskripsi : </h1>
              <h1>Sepatu asli buatan tangan Indonesia dengan kualitas terbaik dan 100% original</h1>
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
    </Layout>
  )
}

export default Detail