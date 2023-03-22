import React, { useState } from 'react'
import Layout from '../components/Layout'
import Navbar from '../components/Navbar'
import dai from '../assets/dai.jpg'
import { BsChatText } from 'react-icons/bs'
import { MdStarRate } from 'react-icons/md'
import FotoProfile from '../assets/photo_2023-03-16_20-34-20.jpg'
import { MdOutlineLocationOn } from 'react-icons/md'
import CardFeedback from '../components/CardFeedback'

const Detail = () => {
  const [count, setCount] = useState(0)

  const handleIncrement = () => {
    setCount((prev) => {
      return prev + 1
    })
  }
  const handleDecrement = () => {
    setCount((prev) => {
      return Math.max(0, prev - 1);
    });
  }

  return (
    <Layout>
      <Navbar />
      {/* card for image */}
      <div className='w-full h-full shadow-md p-10'>
        <div className="grid grid-cols-1 2xl:grid-cols-3 py-5 p-20 gap-10 w-full mt-10 ">
          <div className="grid gap-2 md:grid-cols-1 sm:grid-cols-1  bg-white">
            <div className="max-w-5xl max-h-96">
              <img src={dai} className="w-full h-full md:col-span-2 rounded-md" alt="" />
            </div>
            <div>
              <div className="grid grid-cols-3 gap-2 w-">
                <img src={dai} className="w-full h-md rounded-md max-w-xs" alt="" />
                <img src={dai} className="w-full h-md rounded-md max-w-xs" alt="" />
                <img src={dai} className="w-full h-md rounded-md max-w-xs" alt="" />
              </div>
            </div>
          </div>
          {/* Card bayar rightside */}
          <div className='p-5 rounded-md max-w-3xl w-full h-fit border-2 col-span-2 border-gray-200 shadow-lg mx-auto'>
            <div className='w-full h-full'>
              <div className='flex justify-between items-center mb-5'>
                <h1 className='font-bold text-2xl'>Adudas Mentawai</h1>
                <button className='btn btn-ghost bg-lapak rounded-xl'>
                  <BsChatText size={20} />
                </button>
              </div>
              <h1 className='font-bold text-2xl'>Stock Tersedia : {`5`}</h1>
              <h1 className='font-bold text-2xl'>Ukuran : {`M`}</h1>
              <h1 className='font-bold text-2xl flex items-center gap-2'>Rating: <span className='text-yellow-500'> <MdStarRate size={25} /></span> 4.5</h1>
              <div className='flex gap-2 border w-fit mt-10 items-center overflow-hidden'>
                <button onClick={handleDecrement} className='btn btn-xs bg-gray-100 text-black border-none hover:bg-gray-100 text-2xl mb-3 mr-5 ml-2'>-</button>
                <h1 className=''>{count}</h1>
                <button onClick={handleIncrement} className='btn btn-xs bg-gray-100 text-black border-none hover:bg-gray-100 text-2xl mb-3 ml-5 mr-2'>+</button>
              </div>
              <div className='border-2 mt-5'>

              </div>
              <div className='flex justify-center gap-5 mt-10 w-fit mx-auto'>
                <button className='btn  bg-lapak border-none w-fit'>Bayar Langsung</button>
                <button className='btn  bg-lapak border-none w-fit'>Tambah Keranjang</button>
              </div>
            </div>
          </div>
        </div>
        {/* Break Line  */}
        <div className='border-2 mt-10'>

        </div>
        {/* Card toko */}
        <div className='flex ml-20 flex-col gap-10'>
          <div className='flex mt-10 shadow-lg w-fit p-10 gap-5 bg-gray-500 rounded-md '>
            <img src={FotoProfile} className='w-40 rounded-full' />
            <div className='font-bold text-lg'>
              <h1 className='mb-5'>toko LapakUMKM</h1>
              <h1 className='flex items-center'><MdOutlineLocationOn /> Jakarta</h1>
            </div>
          </div>
          <h1 className='text-3xl font-bold'>Informasi Produk :</h1>
          <div className='w-full shadow-lg p-5 rounded-md bg-slate-300 text-lg font-semibold'>
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
        <div className='flex ml-20 mt-20 flex-col gap-5'>
          <h1 className='text-2xl font-bold'>Ulasan Pembeli :</h1>
          <CardFeedback rating={0} image={FotoProfile} comment={'spatu ini sangat bagus'} name={'Faizal Triasa'}
          />
          <CardFeedback rating={0} image={FotoProfile} comment={'spatu ini sangat bagus'} name={'Faizal Triasa'}
          />
          <CardFeedback rating={0} image={FotoProfile} comment={'spatu ini sangat bagus'} name={'Faizal Triasa'}
          />
        </div>
      </div>


    </Layout>
  )
}

export default Detail