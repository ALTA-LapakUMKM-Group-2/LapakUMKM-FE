import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import FotoProfile from '../assets/photo_2023-03-16_20-34-20.jpg'
import dai from '../assets/dai.jpg'
import Swal from 'sweetalert2'
import Modal from '../components/Modal'
import CustomInput from '../components/CutomInput'
import CustomButton from '../components/CustomButton'
import axios from 'axios'
import Layout from '../components/Layout'
import { useLocation } from 'react-router-dom'

const Payment = () => {
    const [showModal, setShowModal] = useState(false)
    const location = useLocation()

    const test = location.state.dca
    const testPrice = location.state.testPrice
    const testCount = location.state.testCount
    console.log('ceck test' , test);
    console.log('ceck testCount' , testCount);
    console.log('ceck testPrice' , testPrice);
    
    const handleAddAlamat = async () => {
        try {
            const res = await axios.post('')
        } catch (error) {

        }
    }

    return (
        <Layout>
            <div className='w-full h-full'>
            <Modal isOpen={showModal} size='w-96' isClose={() => setShowModal(false)} title='Tambah Alamat'>
                <form action="" onSubmit={handleAddAlamat}>
                    <div className='space-y-5 mt-10'>
                        <CustomInput id={'alamat'} label={'alamat'} name={'alamat'} placeholder={'masukkan alamat'} />
                        <CustomInput id={'pos'} label={'Kode Pos'} name={'pos'} placeholder={'Kode pos'} />
                        <CustomButton id={'btn'} label={'Save'}></CustomButton>
                    </div>
                </form>

            </Modal>
            <Navbar />
            <div className="flex flex-col bg-gradient-to-r px-5 md:px-10 ">
                <div className="grid grid-cols-1 lg:grid-cols-2 w-full lg:mx-auto mt-20 md:mt-24 gap-5 pb-32 md:px-32 ">
                    {/* Card 1 */}
                    <div className="flex flex-col bg-base-100 shadow-xl border mb-5 h-fit rounded-xl justify-center dark:bg-slate-800 dark:border-slate-500">
                        <button className='btn lg:w-8/12 bg-lapak hover:bg-sky-500 border-none my-5 mx-auto' onClick={() => setShowModal(true)}>
                            Pilih Alamat palsu
                        </button>
                        <div className="card-body lg:mx-10 2xl:mx-20">
                            {/* nama toko dan foto */}
                            <div className='flex flex-col p-2 md:p-5 rounded-lg shadow-2xl border border-gray'>
                                <div className='flex'>
                                    <div className='flex flex-row gap-5 p-2 md:p-5'>
                                    <div className="avatar">
                                        <div className="w-20 rounded-full">
                                            <img src={dai} />
                                        </div>
                                    </div>
                                        <div className='flex flex-col text-sm md:text-lg 2xl:text-xl font-semibold'>
                                            <h1>Lapak UMKM</h1>
                                            <h1>Jakarta</h1>
                                        </div>
                                    </div>
                                </div>
                                {/*selesai*/}
                                <div className='flex flex-row mt-5 gap-5 p-2 md:p-5'>
                                    <img src={dai} className='rounded-lg cover w-20 md:w-1/2' />
                                    <div className='flex flex-col text-sm 2xl:text-xl font-semibold justify-center'>
                                        <h1>Adudas Mentawai</h1>
                                        <h1>1 pcs</h1>
                                        <h1>Rp 400.000</h1>
                                    </div>
                                </div>
                                <div className='border-2 mt-5 mb-5'>
                                </div>
                                <div className='flex flex-row justify-between p-2 md:p-5 text-sm md:text-xl font-semibold'>
                                    <h1>Subtotal</h1>
                                    <h1>Rp 400.000</h1>
                                </div>
                            </div>
                            {/* end first card */}
                        </div>
                        <div className="card-body lg:mx-10 2xl:mx-20">
                            {/* nama toko dan foto */}
                            <div className='flex flex-col p-2 md:p-5 rounded-lg shadow-2xl border border-gray'>
                                <div className='flex'>
                                    <div className='flex flex-row gap-5 p-2 md:p-5'>
                                        <img src={FotoProfile} className='w-16 md:w-32 rounded-full' />
                                        <div className='flex flex-col text-sm md:text-lg 2xl:text-xl font-semibold'>
                                            <h1>Lapak UMKM</h1>
                                            <h1>Jakarta</h1>
                                        </div>
                                    </div>
                                </div>
                                {/*selesai*/}
                                <div className='flex flex-row mt-5 gap-5 p-2 md:p-5'>
                                    <img src={dai} className='rounded-lg cover w-20 md:w-1/2' />
                                    <div className='flex flex-col text-sm 2xl:text-xl font-semibold justify-center'>
                                        <h1>Adudas Mentawai</h1>
                                        <h1>1 pcs</h1>
                                        <h1>Rp 400.000</h1>
                                    </div>
                                </div>
                                <div className='border-2 mt-5 mb-5'>
                                </div>
                                <div className='flex flex-row justify-between p-2 md:p-5 text-sm md:text-xl font-semibold'>
                                    <h1>Subtotal</h1>
                                    <h1>Rp 400.000</h1>
                                </div>
                            </div>
                            {/* end first card */}
                        </div>
                    </div>
                    {/* Card 2 */}
                    <div className="grid grid-rows-1 gap-5">

                        {/* End Card 2 */}

                        {/* Card 3 */}

                        <div key={`index`} className="card bg-base-100 shadow-xl border mb-5 lg:w-[450px] lg:mx-auto h-fit">
                            <div className="card-body">
                                <h1 className="2xl:text-2xl">Ringkasan Belanja :</h1>
                                <div>
                                    <div className="flex flex-row  justify-between mt-5 text-sm lg:text-lg font-semibold">
                                        <div>Nama toko :</div>
                                        <div>{`Panjul Store`}</div>
                                    </div>
                                    <div className="flex flex-row  justify-between text-sm lg:text-lg  font-semibold">
                                        <div>Total Harga 1 Barang :</div>
                                        <div>{`Rp 400.000`}</div>
                                    </div>
                                    <div className='border-2 mt-5 mb-5'>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex flex-row  justify-between mt-5 text-sm lg:text-lg font-semibold">
                                        <div>Nama toko :</div>
                                        <div>{`Panjul Store`}</div>
                                    </div>
                                    <div className="flex flex-row  justify-between text-sm lg:text-lg font-semibold">
                                        <div>Total Harga 1 Barang :</div>
                                        <div>{`Rp 400.000`}</div>
                                    </div>
                                    <div className='border-2 mt-5 mb-5'>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex flex-row justify-between mt-5text-sm lg:text-lg font-semibold">
                                        <div>Nama toko :</div>
                                        <div>{`Panjul Store`}</div>
                                    </div>
                                    <div className="flex flex-row  justify-between text-sm lg:text-lg font-semibold">
                                        <div>Total Harga 1 Barang :</div>
                                        <div>{`Rp 400.000`}</div>
                                    </div>
                                    <div className='border-2 mt-5 mb-5'>
                                    </div>
                                </div>
                                <div className="flex justify-center mt-10">
                                    <button
                                        className="btn btn-wide flex bg-lapak border-none text-white hover:bg-lapak hover:text-white hover:translate-y-1"

                                    >
                                        Confirm and Pay
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* End Card 3 */}
                    </div>
                </div>
            </div>
        </div>
        </Layout>
    )
}

export default Payment