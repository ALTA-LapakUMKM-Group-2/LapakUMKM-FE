import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import Navbar from '../components/Navbar'
import { MdOutlineLocationOn } from 'react-icons/md'
import FotoProfile from '../assets/photo_2023-03-16_20-34-20.jpg'
import { BsChatText } from 'react-icons/bs'
import ProdukCard from '../components/ProdukCard'
import ChatModal from '../components/ChatModal'
import axios from 'axios'
import Loading from '../components/Loading'
import { useLocation, useParams } from 'react-router-dom'
import Default from "../assets/default.jpg"
import { useCookies } from 'react-cookie'

const Toko = () => {
    const [showChat, setShowChat] = useState(false)
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    const location = useLocation()
    const [data, setData] = useState([])
    const [getUserToko, setGetUserToko] = useState('')
    const [tokoName, setTokoName] = useState('')
    const [address, setAddress] = useState('')
    const [foto, setFoto] = useState('')
    const [fullName, setFullName] = useState('')
    const [userToko , ] = useState()
    const [cookie, setCookie] =useCookies(['token'])
    const [userId, setUserId] = useState(location.state.id)

    const getPrudukToko = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`https://lapakumkm.mindd.site/products?user_id=${userId}`)
            const {address, full_name , photo_profile, shop_name} = res.data.data[0].user
            setTokoName(shop_name)
            setAddress(address)
            setFoto(photo_profile)
            setFullName(fullName)
            setData(res.data.data)
            setGetUserToko(res.data.data[0].user_id)
        } catch (error) {

        }
        setLoading(false)
    }
    useEffect(() => {
        getPrudukToko()
    }, [])

    const chatToko = async() => {
        try {
            const res = await axios.post('https://lapakumkm.mindd.site/chats' , getUserToko, {
                headers: {
                    Authorization: `Bearer ${cookie.token}`
                }
            })
            if(res.data){
                console.log('test chat');
                
            }
        } catch (error) {
            
        }
    }



    console.log('cek foto', foto);
    
    console.log('test data toko', data);
    console.log('ambil data toko', getUserToko);
    const imgUrl = 'https://storage.googleapis.com/images_lapak_umkm/product/' + foto

    console.log(imgUrl);
    
    return (
        <Layout>
            <Navbar />
            {loading ? <Loading /> :
                <>
                    {/* chat */}
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
                    {/*test card  */}
                    {/* from-green-300 via-blue-500 to-purple-600 */}
                    {/*  */}
                    {/*  */}
                    <div className='flex flex-col mx-auto'>
                        <div className='flex flex-col rounded-md bg-white dark:border-lapak dark:border-4 border-b-8 border-lapak mt-5 mb-5 p-10 max-w-fit w-full 2xl:min-w-[500px]  mx-auto shadow-lg dark:bg-slate-600  '>
                            <div className='flex w-fit gap-5 '>
                                <img src={foto ? foto : Default} className='w-32 rounded-full' />
                                <div className=' text-lg'>
                                    <h1 className='mb-5 2xl:text-2xl dark:text-white font-bold text-xl'>{tokoName}</h1>
                                    <h1 className='flex items-center gap-2 dark:text-white font-semibold'><MdOutlineLocationOn className='flex items-center' /> <span className='flex items-center'>{address}</span></h1>
                                </div>
                            </div>
                            <div className='flex justify-center mt-7 '>
                                <button className='btn btn-ghost bg-lapak rounded-xl items-center justify-center hover:bg-lapak text-white' onClick={() => setShowChat(true)}>
                                    <span className='mr-4 '>Chat penjual </span><BsChatText size={20} />
                                </button>
                            </div>
                        </div>


                        <div className='mt-10'>
                           <div className='flex flex-col items-center gap-5 justify-center'>
                            <h1 className='text-4xl font-semibold ml-1 dark:text-white mb-5'>Produk Penjual</h1>
                           <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5">
                                {
                                    data?.map((item: any, i: number) => {
                                      
                                        return (
                                            <ProdukCard
                                                produkName={item.product_name}
                                                location='jakarta'
                                                sell={item.stock_sold}
                                                id={i}
                                                key={i}
                                                image={item.product_image ? item.product_image[0].image : 'https://sellercenter.unkl-ns.com/gallery/items/604/img_604_i55_3_1667709495.jpg'}
                                                rating={4}
                                                price={item.price}
                                            />
                                        )
                                    })

                                }

                            </div>
                           </div>
                        </div>
                    </div>
                </>
            }

        </Layout>
    )
}

export default Toko