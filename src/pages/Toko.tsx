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
    const location = useLocation()
    const [data, setData] = useState([])
    const [getUserToko, setGetUserToko] = useState('')
    const [tokoName, setTokoName] = useState('')
    const [address, setAddress] = useState('')
    const [foto, setFoto] = useState('')
    const [fullName, setFullName] = useState('')
    const [cookie, setCookie] = useCookies(['token'])
    const [userId, setUserId] = useState(location.state.id)
    const [roomID, setRoomID] = useState<string>("")
    const [senderID, setSenderID] = useState<number>(0)
    const [recipientID, setRecipientID] = useState<number>(0)

    const getPrudukToko = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`https://lapakumkm.mindd.site/products?user_id=${userId}`)
            const { address, full_name, photo_profile, shop_name } = res.data.data[0].user
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
            <Navbar />
            {loading ? <Loading /> :
                <>
                    {/* chat */}
                    <ChatModal
                        img={foto}
                        isOpen={showChat}
                        isClose={() => setShowChat(false)}
                        Room={roomID}
                        Recipient_id={recipientID}
                        userID={userId}
                        tokoName={tokoName}

                    />
                {/* end Chat */}
    
  
       
            {/* Detail toko */}
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
                        <button className='btn btn-ghost bg-lapak rounded-xl items-center justify-center hover:bg-lapak text-white' onClick={() => handleShowChat()}>
                            <span className='mr-4 '>Chat penjual </span><BsChatText size={20} />
                        </button>
                    </div>
                </div>

            {/* Product Toko */}
                <div className='mt-10'>
                    <div className='flex flex-col items-center gap-5 justify-center'>
                        <h1 className='text-4xl font-semibold ml-1 dark:text-white mb-5'>Produk Penjual</h1>
                        <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5">
                            {
                                data?.map((item: any, i: number) => {

                                    return (
                                        <ProdukCard
                                            produkName={item.product_name}
                                            location={item.user.address}
                                            sell={item.stock_sold}
                                            id={item.id}
                                            key={i}
                                            image={item.product_image ? item.product_image[0].image : 'https://sellercenter.unkl-ns.com/gallery/items/604/img_604_i55_3_1667709495.jpg'}
                                            rating={item.rating ? Number(item.rating.toFixed(1)) : 0}
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

        </Layout >
    )
}

export default Toko