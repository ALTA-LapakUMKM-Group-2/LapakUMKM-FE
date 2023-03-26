import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Layout from '../components/Layout'
import FotoProfile from '../assets/photo_2023-03-16_20-34-20.jpg'
import ProdukCard from '../components/ProdukCard'
import { Rating } from '@smastrom/react-rating';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Loading from '../components/Loading'
import Loading2 from '../components/Loading2'
import Search from '../components/Search'

const Home = () => {

    const navigate = useNavigate()
    const [kategori, setKategori] = useState('')
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')

    const getAllList = async () => {
        setLoading(true)
        try {
            const res = await axios.get('https://lapakumkm.mindd.site/products')
            setData(res.data.data)


        } catch (error) {

        }
        setLoading(false)
    }

    useEffect(() => {
        getAllList()
    }, [])


    const [category, setCategory] = useState<any>([])
    const categoryEndpoint = 'https://lapakumkm.mindd.site/categories'

    const fetchCategory = async () => {
        try {
            const res = await axios.get(categoryEndpoint,{
                headers:{
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJleHAiOjE2Nzk5MTc2MjN9.K8lerhsq124A_-y4Lf8gNAPIJtLe9xRUMLKjN_tWIZA`
                }
            })
            setCategory(res.data.data)
        } catch (error) {
    
        }
    }
    
    useEffect(() => {
        fetchCategory()
    }, [])
   console.log('categoryyyy', category);
   
   console.log('data', data);
   const imgUrl = 'https://storage.googleapis.com/images_lapak_umkm/product/'
    return (
        <Layout>
            <Navbar
                children={<Search onSearch={(e) => setSearch(e.target.value)} />}
            />
            <div className="flex flex-col w-11/12 mx-auto items-center">
                <div className="mt-10 mx-auto w-3/6">
                    <p className='dark:text-white'>Kategori</p>
                    <div className="flex w-full space-x-10 relative overflow-x-auto">
                        {category.map((item:any, index:any) => {
                            console.log("item test", item);
                            
                            return(
                                <button key={index} id={item.id} className="btn w-32 bg-white text-slate-800 border-gray-200 shadow hover:bg-lapak hover:border-none"
                                onClick={() => navigate(`/home/${item.category}`, {
                                    state: {
                                        id: item.id
                                    }
                                })}>{item.category}</button>
                                )
                            })        
                        } 
                    </div>
                </div>
                <div className="my-4 gap-y-5 gap-x-5 grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 mx-auto mt-10">

                    {
                        loading ? <Loading /> :

                            data?.filter((item: any) => {
                                return search.toLocaleLowerCase() === "" ?
                                item : item.product_name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
                            }).map((item: any, index) => {
                                // console.log('test', item);
                                
                                return (
                                    <ProdukCard
                                        size={item.size}
                                        key={index}
                                        produkName={item.product_name}
                                        location='jakarta'
                                        sell={item.stock_sold}
                                        id={item.id}
                                        image={item.product_image ? item.product_image[0].image : item.product_image}
                                        rating={4}
                                        price={item.price}
                                    />
                                )
                            })
                    }

  
                </div>
            </div>
        </Layout>
    )
}

export default Home