import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import FotoProfile from '../assets/photo_2023-03-16_20-34-20.jpg'
import dai from '../assets/dai.jpg'
import Swal from 'sweetalert2'
import Modal from '../components/Modal'
import CustomInput from '../components/CutomInput'
import CustomButton from '../components/CustomButton'
import axios from 'axios'

const Payment = () => {
    const [showModal, setShowModal] = useState(false)

    const handleAddAlamat = async () => {
        try {
            const res = await axios.post('')
        } catch (error) {

        }
    }

    return (
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
            <div className="flex flex-col bg-gradient-to-r px-10 min-h-screen ">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:cols-row-2 w-full md:mx-auto mt-20 md:mt-24 gap-5 pb-32 md:px-32">
                    {/* Card 1 */}
                    <div className="grid grid-rows-2 bg-base-100 shadow-xl border mb-5 h-full">
                        <div className="card-body">
                            <div>
                                <button className='btn w-full bg-lapak hover:bg-lapak border-none mb-5' onClick={() => setShowModal(true)}>
                                    Pilih Alamat palsu
                                </button>
                            </div>
                            {/* nama toko dan foto */}
                            <div className='flex flex-col p-10  rounded-lg shadow-2xl'>
                                <div className='flex'>
                                    <div className='flex flex-row gap-5 p-5'>
                                        <img src={FotoProfile} className='w-32 rounded-full' />
                                        <div className='flex flex-col text-xl font-semibold'>
                                            <h1>Lapak UMKM</h1>
                                            <h1>Jakarta</h1>
                                        </div>
                                    </div>
                                </div>
                                {/*selesai*/}
                                <div className='flex flex-row mt-5 gap-5  p-5'>
                                    <img src={dai} className='rounded-lg w-1/2' />
                                    <div className='flex flex-col text-xl font-semibold justify-center'>
                                        <h1>Adudas Mentawai</h1>
                                        <h1>1 pcs</h1>
                                        <h1>Rp 400.000</h1>
                                    </div>
                                </div>
                                <div className='border-2 mt-5 mb-5'>
                                </div>
                                <div className='flex flex-row justify-between p-5 text-xl font-semibold'>
                                    <h1>Subtotal</h1>
                                    <h1>Rp 400.000</h1>
                                </div>
                            </div>

                            {/* end first card */}
                        </div>
                    </div>
                    {/* Card 2 */}
                    <div className="grid grid-rows-2 gap-5">

                        {/* End Card 2 */}

                        {/* Card 3 */}

                        <div key={`index`} className="card w-full bg-base-100 shadow-xl border mb-5 h-full">
                            <div className="card-body">
                                <h1 className="text-2xl">Ringkasan Belanja :</h1>
                                <div>
                                    <div className="flex flex-row  justify-between mt-5 text-xl font-semibold">
                                        <div>Nama toko :</div>
                                        <div>{`Panjul Store`}</div>
                                    </div>
                                    <div className="flex flex-row  justify-between  text-xl font-semibold">
                                        <div>Total Harga 1 Barang :</div>
                                        <div>{`Rp 400.000`}</div>
                                    </div>
                                    <div className='border-2 mt-5 mb-5'>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex flex-row  justify-between mt-5 text-xl font-semibold">
                                        <div>Nama toko :</div>
                                        <div>{`Panjul Store`}</div>
                                    </div>
                                    <div className="flex flex-row  justify-between  text-xl font-semibold">
                                        <div>Total Harga 1 Barang :</div>
                                        <div>{`Rp 400.000`}</div>
                                    </div>
                                    <div className='border-2 mt-5 mb-5'>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex flex-row  justify-between mt-5 text-xl font-semibold">
                                        <div>Nama toko :</div>
                                        <div>{`Panjul Store`}</div>
                                    </div>
                                    <div className="flex flex-row  justify-between  text-xl font-semibold">
                                        <div>Total Harga 1 Barang :</div>
                                        <div>{`Rp 400.000`}</div>
                                    </div>
                                    <div className='border-2 mt-5 mb-5'>
                                    </div>
                                </div>
                                <div className="flex justify-center md:justify-end mt-10">
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
    )
}

export default Payment