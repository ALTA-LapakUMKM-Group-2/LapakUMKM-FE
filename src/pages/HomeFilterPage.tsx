import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import Layout from '../components/Layout'
import FotoProfile from '../assets/photo_2023-03-16_20-34-20.jpg'
import ProdukCard from '../components/ProdukCard'
import { Rating } from '@smastrom/react-rating';
import { IoIosArrowDropdown } from 'react-icons/io'
import { IoIosArrowDropup } from 'react-icons/io'
import CustomInput from '../components/CutomInput'
import CurrencyInput from 'react-currency-input-field';
import CustomButton from '../components/CustomButton'
import ChatModal from '../components/ChatModal'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useLocation } from 'react-router-dom'
import Loading from '../components/Loading'
import Search from '../components/Search'
import Swal from 'sweetalert2/dist/sweetalert2.all.js';
import sowwy from '../assets/photo_2023-03-16_20-34-20.jpg'
import { gsap } from 'gsap'
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
    interface FormValues {
    minprice: number | any
    maxprice: number | any
    kategori: number | any;
    minrating: number | any
    }
    const initialFormValues: FormValues = {
        minprice: 0,
        maxprice: 0,
        kategori: 0,
        minrating: 0
    };
const HomeFilter = () => {

    const [showFilter, setShowFilter] = useState(false);
    const [products, setProducts] = useState<any>([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const location = useLocation()
    const [cookie, setCookie] = useCookies(["token"])
    const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
    const [categoryId, setCategoryId] = useState(location.state.id)
    
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleToggle = () => {
        setShowFilter(!showFilter);
    }

    const handleAnimation = () => {
        const dropdown = dropdownRef.current;

        if (showFilter) {
            gsap.fromTo(dropdown, { height: 0, display: 'none' }, { duration: 0.5, height: 450, display: 'block' });
        } else {
            gsap.to(dropdown, { duration: 0.5, height: 0, display: 'none' });
        }
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormValues(initialFormValues);
        fetchProduct(formValues.minprice, formValues.maxprice, formValues.minrating, formValues.kategori)
    }

    const StarDrawing = (
        <path d="M11.0748 3.25583C11.4141 2.42845 12.5859 2.42845 12.9252 3.25583L14.6493 7.45955C14.793 7.80979 15.1221 8.04889 15.4995 8.07727L20.0303 8.41798C20.922 8.48504 21.2841 9.59942 20.6021 10.1778L17.1369 13.1166C16.8482 13.3614 16.7225 13.7483 16.8122 14.1161L17.8882 18.5304C18.1 19.3992 17.152 20.0879 16.3912 19.618L12.5255 17.2305C12.2034 17.0316 11.7966 17.0316 11.4745 17.2305L7.60881 19.618C6.84796 20.0879 5.90001 19.3992 6.1118 18.5304L7.18785 14.1161C7.2775 13.7483 7.1518 13.3614 6.86309 13.1166L3.3979 10.1778C2.71588 9.59942 3.07796 8.48504 3.96971 8.41798L8.50046 8.07727C8.87794 8.04889 9.20704 7.80979 9.35068 7.45955L11.0748 3.25583Z" stroke="#fdd231" strokeWidth="1" ></path>
    );

    const customStyles = {
        itemShapes: StarDrawing,
        activeFillColor: '#FDD231',
        inactiveFillColor: '#ffffff',

    };
    const [defaultValue, setDefaultValue] = useState('')
    const productEndpoint = 'https://lapakumkm.mindd.site/products?'
    
    const filter = `price_min=${formValues.minprice}&price_max=${formValues.maxprice}&rating=${formValues.minrating}&category_id=${formValues.kategori ? formValues.kategori : categoryId}`
    const fetchProduct = async (minPrice: any, maxPrice:any, rating: any, categori_id:any) => {
        setLoading(true)
        try {
            const res = await axios.get(`${productEndpoint}price_min=${minPrice}&price_max=${maxPrice}&rating=${rating}&category_id=${categori_id}`,
            { headers:{ Authorization: `Bearer ${cookie.token}`}
            })
            console.log("products",res.data.data)
            setProducts(res.data.data)
            setCategoryId('')
            
            
        } catch (error) {
    
        }
        setLoading(false)
    }
    
    useEffect(() => {
        if(formValues){
            fetchProduct(formValues.minprice, formValues.maxprice, formValues.minrating, formValues.kategori ? formValues.kategori : categoryId)
        }
    }, [])



    const categoryEndpoint = 'https://lapakumkm.mindd.site/categories'
    const [category,setCategory] =useState<any>([''])
    const fetchCategory = async () => {
        try {
            const res = await axios.get(categoryEndpoint,{
                headers:{
                Authorization: `Bearer ${cookie.token}`
                }
            })
            setCategory(res.data.data)
            if(res.data.data === null){
                Swal.fire({
                    title: 'Maaf!',
                    text: 'Barang yang anda cari mungkin belum tersedia',
                    imageUrl: `${sowwy}`,
                    confirmButtonText: "Oke",
                    confirmButtonColor: "#31CFB9",
                    reverseButtons: true,
                    imageWidth: 400,
                    imageHeight: 200,
                    imageAlt: 'Custom image',
                }).then((willReFetch)=>{
                    if (willReFetch.isConfirmed) {
                        setFormValues({
                            minprice: 0,
                            maxprice: 0,
                            minrating: 0,
                            kategori: ''
                        })
                        fetchProduct('', '', '', '')
                    }
                })
            }
        } catch (error) {
    
        }
    }
    
    useEffect(() => {
        fetchCategory()
    }, [])
console.log('test kategori', category);
const imgUrl = 'https://storage.googleapis.com/images_lapak_umkm/product/'
    return (
        <Layout>
            <Navbar
            children={<Search onSearch={(e) => setSearch(e.target.value)} />}
            />
            {
                    loading ? 
                    <Loading /> 
                    :
            <div className="flex flex-col lg:flex-row w-11/12">
                <div className="flex mt-10 mx-auto lg:ml-auto">
                    <div className="w-80 h-fit bg-white border rounded-xl shadow-xl flex flex-col dark:bg-slate-800 dark:border-lapak">
                        <div className="flex flex-col">
                            <div className="flex flex-row justify-between border-b-2 mx-3 mt-2 pb-2 dark:text-white dark:border-lapak">
                                <p className='my-auto text-xl font-semibold'>Filter</p>
                                    <label className="swap swap-rotate">
                                        <input type="checkbox" />
                                        <IoIosArrowDropup onClick={()=> {setShowFilter(false), handleAnimation()}}  className="swap-on fill-current w-8 h-8"/>
                                        <IoIosArrowDropdown onClick={()=> {setShowFilter(true), handleAnimation()}} className="swap-off fill-current w-8 h-8"/>
                                    </label>
                            </div>
                            <div ref={dropdownRef} className={`text-lapak font-semibold ${showFilter? 'open' : ''}`}>
                                <div className="px-4 py-3 text-sm text-gray-900 "> 
                                    <form onSubmit={handleSubmit} className={`space-y-5 ${showFilter? 'open' : ''}`} >
                                        <div className='w-full'>
                                            <label className="text-zinc-800 text-[18px] font-semibold dark:text-white" htmlFor='kategori'>
                                                Kategori
                                            </label>
                                            <select className="border-2 mt-2 input w-full max-w-full  border-gray-400 focus-visible:border-transparent dark:border-gray-700 dark:bg-slate-800 rounded-lg
                      focus:outline-none focus-visible:ring focus-visible:ring-lapak focus-visible:ring-opacity-75
                      bg-zinc-100 px-4 font-normal text-zinc-800 dark:text-white placeholder-white disabled:bg-slate-400 text-[16px]"
                                            defaultValue={''}
                                            id='kategori'
                                            name='kategori'
                                            value={formValues.kategori}
                                            onChange={handleSelectChange}
                                            >
                                                <option value={''}>Semua Kategori</option>
                                            { 
                                                category?.map((item: any, i:number)=> {
                                                    return (
                                                        <option className='' value={item.id}>{item.category}</option>
                                                    )
                                                })  
                                            }
                                            </select>
                                        </div>
                                        <div className="w-full">
                                            <label className="text-zinc-800 text-[18px] font-semibold dark:text-white" htmlFor="minprice">Harga Minimal</label>
                                                <CurrencyInput
                                                    className='border-2 mt-2 input w-full max-w-full  border-gray-400 focus-visible:border-transparent dark:border-gray-700 dark:bg-slate-800 rounded-lg
                      focus:outline-none focus-visible:ring focus-visible:ring-lapak focus-visible:ring-opacity-75
                      bg-zinc-100 px-4 font-normal text-zinc-800 dark:text-white placeholder-white disabled:bg-slate-400 text-[16px]'
                                                    id="minprice"
                                                    name="minprice"
                                                    prefix='Rp. '
                                                    decimalSeparator=','
                                                    groupSeparator='.'
                                                    placeholder="Rp. "
                                                    defaultValue={formValues.minprice}
                                                    decimalsLimit={2}
                                                    onValueChange={(value, name) => setFormValues({ ...formValues, minprice: value ? parseInt(value) : 0 })}
                                                />
                                        </div>
                                        <div className="">
                                            <label className="text-zinc-800 text-[18px] font-semibold dark:text-white" htmlFor="maxprice">Harga Maksimal</label>
                                                <CurrencyInput
                                                    className='border-2 mt-2 input w-full max-w-full  border-gray-400 focus-visible:border-transparent dark:border-gray-700 dark:bg-slate-800 rounded-lg
                      focus:outline-none focus-visible:ring focus-visible:ring-lapak focus-visible:ring-opacity-75
                      bg-zinc-100 px-4 font-normal text-zinc-800 dark:text-white placeholder-white disabled:bg-slate-400 text-[16px]'
                                                    id="maxprice"
                                                    name="maxprice"
                                                    prefix='Rp. '
                                                    decimalSeparator=','
                                                    groupSeparator='.'
                                                    placeholder="Rp. "
                                                    defaultValue={formValues.maxprice}
                                                    decimalsLimit={2}
                                                    onValueChange={(value, name) => setFormValues({ ...formValues, maxprice: value ? parseInt(value) : 0 })}
                                                />
                                        </div>
                                        <div className="">
                                            <label className="text-zinc-800 text-[18px] font-semibold dark:text-white" htmlFor="minrating" id='minrating'>Minimal Ratings</label>
                                            <Rating
                                                itemStyles={customStyles}
                                                isRequired
                                                style={{ maxWidth: 200 }}
                                                value={formValues.minrating}
                                                // visibleLabelId="minrating"
                                                onChange={(selectedValue: any) =>
                                                setFormValues((prevData) => ({ ...prevData, minrating: selectedValue }))
                                                }
                                            />
                                        </div>
                                        <CustomButton
                                        id='submit'
                                        name='submit'
                                        label='submit'
                                        onClick={()=> console.log(formValues)}
                                        />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="my-4 gap-y-5 gap-x-5 grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mx-auto mt-10">
                            {products?.filter((item: any) => {
                                return search.toLocaleLowerCase() === "" ?
                                item : item.product_name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
                            }).map((item: any, index:number) => {
                                // console.log('test', item);
                                return (
                                    <ProdukCard
                                        size={item.size}
                                        key={index}
                                        produkName={item.product_name}
                                        location={item.user.address}
                                        sell={item.stock_sold}
                                        id={item.id}
                                        image={item.product_image ? item.product_image[0].image : 'https://sellercenter.unkl-ns.com/gallery/items/604/img_604_i55_3_1667709495.jpg'}
                                        rating={item.rating}
                                        price={item.price}
                                    />
                                )
                            })}
                </div>
            </div>
                    }
        </Layout>
    )
}

export default HomeFilter