import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import FotoProfile from '../assets/photo_2023-03-16_20-34-20.jpg'
import dai from '../assets/dai.jpg'
import Swal from 'sweetalert2'
import Modal from '../components/Modal'
import CustomInput from '../components/CutomInput'
import CustomButton from '../components/CustomButton'
import axios from 'axios'
import Layout from '../components/Layout'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { formatValue } from 'react-currency-input-field'
import { MdLocationOn } from 'react-icons/md'
import { BsShop } from 'react-icons/bs'
import Loading from '../components/Loading'
type Detail = {
    product_id: number
    total_products: number
}

interface Transactions extends Detail {
    total_products: number
    total_payment: number
    product_detail: Detail



}



const Payment = () => {
    // const [showModal, setShowModal] = useState(false)
    const [cookie, setCookie] = useCookies(['token'])
    const location = useLocation()
    const navigate = useNavigate()
    const [dataTrans, setDataTrans] = useState<Transactions | any>()
    const [cartTrans, setCartTrans] = useState<any>()
    const [totalCartPrice, setTotalCartPrice] = useState<number>()
    const cart = location.state.forPayment
    const cartPrice = location.state.totalPrice
    const test = location.state.dca
    const testPrice = location.state.testPrice
    const testCount = location.state.testCount
    // console.log('ceck dca', test);
    // console.log('ceck testCount', testCount);
    // console.log('ceck testPrice', testPrice);
    // // console.log('test dca id', test.id);
    console.log('total cart price', cartPrice);

    // // .map((item: any) => { 
    // //     return item.product_pcs
    // // })


    useEffect(() => {
        if (cart && cartPrice) {
            setCartTrans(
                cart
            )
            setTotalCartPrice(cartPrice)
            if (cartTrans && totalCartPrice) {
                setDataTrans({
                    total_payment: totalCartPrice,
                    total_products: cartTrans.reduce((total: any, item: any) => {
                        return total + item.product_pcs
                    }, 0),
                    product_detail: cartTrans.map((item: any) => {
                        return {
                            product_id: item.product_id,
                            total_products: item.product_pcs
                        }

                    })
                })
                console.log('dataTrans', dataTrans);
            }
        }
    }, [totalCartPrice, cartTrans])
    // console.log('cek id ', cartTrans.id);
    // console.log('cek dan pcs', cartTrans.product_pcs);
    // console.log("test cart", cart)
    // console.log("test cart2", cartTrans)
    // console.log("test cartPrice", totalCartPrice)
    useEffect(() => {
        if (test && testPrice && testCount) {
            setDataTrans({
                total_payment: testPrice,
                total_products: testCount,
                product_detail: [{ product_id: test.id, total_products: testCount }]
            })
            console.log('dataTrans', dataTrans);
        }

    }, [test, testPrice, testCount])
    const [loading, setLoading] = useState(false)
    const payToWin = async (e: any) => {
        e.preventDefault()
        const data = dataTrans
        console.log('test clone', data);
        setLoading(true)

        try {
            const res = await axios.post('https://lapakumkm.mindd.site/transactions', data, {
                headers: {
                    Authorization: `Bearer ${cookie.token}`
                }
            })
            console.log('test respon payment', res.data);

            console.log('res.data', res.data.data.payment_link);

            if (res.data) {
                window.open(res.data.data.payment_link, "_blank")
                navigate('/historypembeli')
            } else if (res.data) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Pembayaran berhasil",
                    showConfirmButton: false,
                    timer: 1500
                });
            }

        } catch (error) {
            console.log('gagal payment', error);

        }
        setLoading(false);
    }
    const handleAddAlamat = async () => {
        try {
            const res = await axios.post('')
        } catch (error) {

        }
    }
    const imgUrl = 'https://storage.googleapis.com/images_lapak_umkm/product/'
    return (
        <Layout>

            {/* <Modal isOpen={showModal} size='w-96' isClose={() => setShowModal(false)} title='Tambah Alamat'>
                    <form action="" onSubmit={handleAddAlamat}>
                        <div className='space-y-5 mt-10'>
                            <CustomInput id={'alamat'} label={'alamat'} name={'alamat'} placeholder={'masukkan alamat'} />
                            <CustomInput id={'pos'} label={'Kode Pos'} name={'pos'} placeholder={'Kode pos'} />
                            <CustomButton id={'btn'} label={'Save'}></CustomButton>
                        </div>
                    </form>

                </Modal> */}
            {
                loading ? <Loading /> : <>
                    <div className='w-full h-full'>
                    <Navbar />
                        <div className="flex flex-col bg-gradient-to-r px-5 md:px-10 ">
                            <div className="grid grid-cols-1 lg:grid-cols-2 w-full lg:mx-auto mt-20 md:mt-24 gap-5 pb-32 md:px-32 ">
                                {/* Card 1 */}
                                <div className="flex flex-col bg-base-100 shadow-xl border mb-5 h-fit rounded-xl justify-center dark:bg-slate-800  dark:border-lapak">
                                    {/* <button className='btn lg:w-8/12 bg-lapak hover:bg-sky-500 border-none my-5 mx-auto' onClick={() => setShowModal(true)}>
                                Pilih Alamat palsu
                            </button> */}
                                    <div className="card-body lg:mx-10 2xl:mx-20">
                                        {/* nama toko dan foto */}
                                        {/* end first card */}
                                    </div>
                                    <div className="card-body lg:mx-10 2xl:mx-5">
                                        {/* nama toko dan foto */}
                                        <div className='flex flex-col p-2 md:p-5 rounded-lg     border border-gray dark:border-lapak'>
                                            {
                                                cart ?
                                                    cart.map((item: any, i: number) => {
                                                        console.log('test isi cart', item);

                                                        return (
                                                            <>
                                                                <div className='flex'>
                                                                    <div className='flex flex-row gap-5 p-2 md:p-5'>
                                                                        <img src={imgUrl + item.product_image} className='w-16 md:w-32 rounded-full' />
                                                                        <div className='flex flex-col text-sm md:text-lg 2xl:text-xl font-semibold gap-2'>
                                                                            <h1 className='dark:text-white flex'> <BsShop className=' w-6 h-6 mr-2 dark:text-white mt-1' />{item.lapak_name}</h1>
                                                                            <h1 className='dark:text-white flex'><MdLocationOn className=' w-6 h-6 mr-2 dark:text-white mt-1' />{item.lapak_address}</h1>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/*selesai*/}
                                                                <div className='flex flex-row mt-5 gap-5 p-2 md:p-5'>
                                                                    <img src={imgUrl + item.product_image} className='rounded-lg cover w-20 md:w-1/2' />
                                                                    <div className='flex flex-col text-sm 2xl:text-xl font-semibold justify-center gap-2'>
                                                                        <h1 className='dark:text-white 2xl:text-3xl'>{item.product_name}</h1>
                                                                        <h1 className='dark:text-white'>{item.product_pcs} pcs</h1>
                                                                        <h1 className='dark:text-white'>{formatValue({
                                                                            prefix: 'Rp. ',
                                                                            value: JSON.stringify(item.product_price),
                                                                            groupSeparator: '.',
                                                                            decimalSeparator: ',',
                                                                        })}</h1>
                                                                    </div>
                                                                </div>
                                                                <div className='border-2 mt-5 mb-5'>
                                                                </div>
                                                                <div className='flex flex-row justify-between p-2 md:p-5 text-sm md:text-xl font-semibold'>
                                                                    <h1 className='dark:text-white'>Subtotal</h1>
                                                                    <h1 className='dark:text-white'>{formatValue({
                                                                        prefix: 'Rp. ',
                                                                        value: JSON.stringify(item.product_price * item.product_pcs),
                                                                        groupSeparator: '.',
                                                                        decimalSeparator: ',',
                                                                    })}</h1>
                                                                </div>
                                                                <div className='border-2 mt-5 mb-5'>
                                                                </div>
                                                            </>
                                                        )
                                                    }) : <>

                                                    </>
                                            }

                                            {
                                                test ?
                                                    <>
                                                        <div className='flex'>
                                                            <div className='flex flex-row gap-5 p-2 md:p-5'>
                                                                <img src={test.user.photo_profile} className='w-16 md:w-32 rounded-full' />
                                                                <div className='flex flex-col text-sm md:text-lg 2xl:text-xl font-semibold gap-2'>
                                                                    <h1 className='dark:text-white flex'><BsShop className=' w-6 h-6 mr-2 dark:text-white mt-1' />{test.user.shop_name}</h1>
                                                                    <h1 className='dark:text-white flex'><MdLocationOn className=' w-6 h-6 mr-2 dark:text-white mt-1' />{test.user.address}</h1>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/*selesai*/}
                                                        <div className='flex flex-row mt-5 gap-5 p-2 md:p-5'>
                                                            <img src={test.product_image[0].image} className='rounded-lg cover w-20 md:w-1/2' />
                                                            <div className='flex flex-col text-sm 2xl:text-xl font-semibold justify-center'>
                                                                <h1 className='dark:text-white 2xl:text-3xl'>{test.product_name}</h1>
                                                                <h1 className='dark:text-white'>{testCount} pcs</h1>
                                                                <h1 className='dark:text-white'>{formatValue({
                                                                    prefix: 'Rp. ',
                                                                    value: JSON.stringify(testPrice),
                                                                    groupSeparator: '.',
                                                                    decimalSeparator: ',',
                                                                })} /pcs</h1>
                                                            </div>
                                                        </div>
                                                        <div className='border-2 mt-5 mb-5'>
                                                        </div>
                                                        <div className='flex flex-row justify-between p-2 md:p-5 text-sm md:text-xl font-semibold'>
                                                            <h1 className='dark:text-white'>Subtotal</h1>
                                                            <h1 className='dark:text-white' >{formatValue({
                                                                prefix: 'Rp. ',
                                                                value: JSON.stringify(testPrice * testCount),
                                                                groupSeparator: '.',
                                                                decimalSeparator: ',',
                                                            })}</h1>
                                                        </div>
                                                    </>

                                                    : <>
                                                    </>
                                            }
                                        </div>
                                        {/* end first card */}
                                    </div>
                                </div>
                                {/* Card 2 */}
                                <div className="grid grid-rows-1 gap-5">

                                    {/* End Card 2 */}

                                    {/* Card 3 */}

                                    <div key={`index`} className="card bg-base-100 shadow-xl border mb-5 lg:w-[450px] lg:mx-auto h-fit 2xl:w-full 2xl:ml-20 dark:bg-slate-800 dark:border-2 dark:border-lapak">
                                        <div className="card-body">
                                            <h1 className="2xl:text-4xl 2xl:font-semibold dark:text-white">Ringkasan Belanja </h1>
                                            <div className='border-2 mt-5 mb-5'>
                                                                    </div >
                                            {
                                                cart ?
                                                    cart.map((item: any, i: number) => {
                                                        return (
                                                            <>
                                                                <div>
                                                                    <div className="flex flex-row  justify-between mt-5 text-sm lg:text-lg font-semibold 2xl:font-semibold 2xl:text-2xl dark:text-white">
                                                                        <div>Nama Toko :</div>
                                                                        <div className=''>{item.lapak_name}</div>
                                                                    </div>
                                                                    <div className="flex flex-row  justify-between text-sm lg:text-lg  font-semibold 2xl:text-xl dark:text-white">
                                                                        <div>Total Harga 1 Barang :</div>
                                                                        <div className=''>
                                                                            {formatValue({
                                                                                prefix: 'Rp. ',
                                                                                value: JSON.stringify(item.product_price),
                                                                                groupSeparator: '.',
                                                                                decimalSeparator: ',',
                                                                            })}</div>
                                                                    </div>
                                                                    <div className='border-2 mt-5 mb-5'>
                                                                    </div >


                                                                </div>
                                                            </>
                                                        )
                                                    }) : <>
                                                    </>
                                            }
                                            {
                                                test ?
                                                    <>
                                                        <div>
                                                            <div className="flex flex-row  justify-between mt-5 text-sm lg:text-lg font-semibold 2xl:font-semibold 2xl:text-2xl">
                                                                <div>Nama toko :</div>
                                                                <div>{test.user.shop_name}</div>
                                                            </div>
                                                            <div className="flex flex-row  justify-between text-sm lg:text-lg  font-semibold 2xl:text-xl">
                                                                <div>Total Harga 1 Barang :</div>
                                                                <div className=''>{
                                                                    formatValue({
                                                                        prefix: 'Rp. ',
                                                                        value: JSON.stringify(testPrice),
                                                                        groupSeparator: '.',
                                                                        decimalSeparator: ',',
                                                                    })
                                                                }</div>
                                                            </div>
                                                            <div className='border-2 mt-5 mb-5'>
                                                            </div>
                                                        </div>
                                                    </> : <></>
                                            }

                                            {
                                                cart ?
                                                    <>
                                                        <div className="flex flex-row  justify-between text-sm lg:text-lg  font-semibold 2xl:font-bold 2xl:text-3xl dark:text-white mt-5">
                                                            <div>
                                                                Total Semua
                                                            </div>
                                                            <div className=''>
                                                                {formatValue({
                                                                    prefix: 'Rp. ',
                                                                    value: JSON.stringify(cartPrice),
                                                                    groupSeparator: '.',
                                                                    decimalSeparator: ',',
                                                                })}</div>
                                                        </div>
                                                    </> : <></>
                                            }

                                            {
                                                test ?
                                                    <>
                                                        <div className="flex flex-row  justify-between text-sm lg:text-lg  font-semibold 2xl:font-bold 2xl:text-3xl dark:text-white mt-5" >
                                                            <div>
                                                                Total Semua
                                                            </div>
                                                            <div className=''>
                                                                {formatValue({
                                                                    prefix: 'Rp. ',
                                                                    value: JSON.stringify(testPrice * testCount),
                                                                    groupSeparator: '.',
                                                                    decimalSeparator: ',',
                                                                })}</div>
                                                        </div>
                                                    </> : <></>
                                            }
                                            <div className="flex justify-center mt-20">
                                                <button
                                                    className="btn btn-wide flex bg-lapak border-none 2xl:w-full text-white hover:bg-lapak hover:text-white hover:translate-y-2 2xl:font-semibold 2xl:text-xl"
                                                    onClick={payToWin}
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
                </>
            }
          

        </Layout>
    )
}

export default Payment