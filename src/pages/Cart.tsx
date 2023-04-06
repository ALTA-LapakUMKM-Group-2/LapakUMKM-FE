import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import Navbar from '../components/Navbar'
import FotoProfile from '../assets/profile.jpg'
import { formatValue } from 'react-currency-input-field'
import CustomButton from '../components/CustomButton'
import CartCard from '../components/CartCard'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { useNavigate } from 'react-router'
import Swal from 'sweetalert2/dist/sweetalert2.all.js';
import Loading from '../components/Loading'
import Search from '../components/Search'
import Default from "../assets/default.jpg"
import noimg from "../assets/download.png"
import { Products } from '../utils/types/DataType'

interface CartData {
    products?: Products
}

const Cart: React.FC<CartData> = ({ products }) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<any>([])
    const [cookies, setCookies, removeCookies] = useCookies(['token'])
    const [selectedItems, setSelectedItems] = useState<Products[]>([]);
    const [price, setPrice] = useState<number>(0)
    const [count, setCount] = useState<number>()
    const [cart, setNewCart] = useState<Products[]>([])
    const navigate = useNavigate()


    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, product: Products) => {
        const isChecked = e.target.checked;
        setSelectedItems((prevState) => {
            const updatedItems = isChecked
                ? [...prevState, product]
                : prevState.filter((selectedItem) => selectedItem.id !== product.id);
            return updatedItems;
        });
    };

    const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            setSelectedItems(cart);
        } else {
            setSelectedItems([]);
        }
    };

    const handleIncrement = (i: Products) => {
        let _cart = cart.map((item) => {
            if (item.id === i.id) {
                item.product_pcs++;
            }
            return item;
        });
        setNewCart(_cart);
    };

    const handleDecrement = (i: Products) => {
        let _cart = cart.map((item) => {
            if (item.id === i.id) {
                if (item.product_pcs === 1) {
                    return item;
                } else {
                    item.product_pcs--;
                }
            }
            return item;
        });
        setNewCart(_cart);
    };

    const TotalCart = () => {
        let Total = 0
        selectedItems.map((i) => {
            Total += i.product_price * i.product_pcs
        })
        setPrice(Total)
    }

    useEffect(() => {
        TotalCart()
    }, [TotalCart])


    const getProfile = async () => {
        setLoading(true)
        try {
            const res = await axios.get('https://lapakumkm.mindd.site/users', {
                headers: {
                    Authorization: `Bearer ${cookies.token}`
                }
            })
            setData(res.data.data)
        } catch (error) {
        }
        setLoading(false)
    }

    useEffect(() => {
        getProfile()
    }, [])

    const handleDelete = async (id: number) => {
        Swal.fire({
            icon: "warning",
            title: "Anda yakin Ingin menghapus Barang ini?",
            confirmButtonText: "Saya Yakin",
            confirmButtonColor: "#31CFB9",
            reverseButtons: true,
            showCancelButton: true,
            cancelButtonText: "Cancel",
            cancelButtonColor: "#db1f1f"
        }).then((willDelete) => {
            if (willDelete.isConfirmed) {
                setLoading(true)
                axios.delete(`${cartEndPoint}/${id}`, {
                    headers: {
                        Authorization: `Bearer ${cookies.token}`
                    }
                })
                    .then((response) => {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            text: response.data.message,
                            iconColor: '#31CFB9',
                            showConfirmButton: false,
                            timer: 2000,
                        })
                        fetchDataCart()
                    })
                    .catch((error) => {

                        Swal.fire({
                            icon: "error",
                            title: error.message,
                            text: "gagal",
                            showConfirmButton: false,
                            showCancelButton: false,
                            timer: 1500,
                        })
                    }).finally(() => setLoading(false))
            }
        })
    }

    const cartEndPoint = 'https://lapakumkm.mindd.site/carts'
    const fetchDataCart = async () => {
        try {
            const response = await axios.get(cartEndPoint, {
                headers: {
                    Authorization: `Bearer ${cookies.token}`
                }
            });
            const data = response.data.data
            setNewCart(data);
            setCount(data.product_pcs)
        } catch (error) {
        } finally {
        }
    };

    useEffect(() => {
        fetchDataCart()
    }, [])


    const cartKosong = () => {
        if (cart.length === 0) {
            Swal.fire({
                icon: "warning",
                title: "Cart Kosong",
                text: "Cart Kosong",
                confirmButtonText: "Isi Keranjang",
                confirmButtonColor: "#31CFB9",
            }).then((go) => {
                if (go) {
                    navigate('/')
                }
            })
        } else if (selectedItems.length === 0)
            Swal.fire({
                icon: "warning",
                title: "Cart belom di ceklis",
            })

    }

    return (
        <Layout>
            {loading ?
                <Loading /> :
                <>
                    <Navbar
                        imgUser={data.photo_profile ? data.photo_profile : FotoProfile}
                        name={data.full_name}
                        email={data.email}
                        children={<Search />}
                    />
                    <div className="flex flex-col lg:flex-row mx-auto md:space-x-5 space-y-5 relative justify-center box-content border border-white shadow-xl mt-20 w-[320px] md:w-[650px] lg:w-[800px] 2xl:w-[1000px] bg-white py-2 md:py-10 px-2 rounded-xl dark:bg-slate-800 dark:border-lapak dark:shadow-lg dark:shadow-slate-600">
                        <div className="flex ">
                            <div className="block md:w-[600px] lg:w-[500px] 2xl:w-[600px] mx-auto space-y-5 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-slate-800 dark:border-lapak dark:shadow-lg dark:shadow-slate-600">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Keranjang</h5>

                                {cart.length === 0 ?
                                    <>
                                        <p className='text-[20px] text-center underline-offset-8 underline decoration-zinc-400 dark:decoration-slate-50 py-20 text-zinc-600 font-semibold dark:text-zinc-50'> Keranjang anda masih kosong </p>
                                        <button className="btn btn-primary mx-auto bg-lapak hover:bg-lapak hover:translate-x-2  border-none" onClick={() => navigate('/')}>Beli Product? </button>
                                    </>
                                    :
                                    <div className="flex flex-col dark:text-white">
                                        <thead>
                                            <tr>
                                                <th>
                                                    <label>
                                                        <input
                                                            type="checkbox"
                                                            className="checkbox checkbox-accent "
                                                            id='checkcart'
                                                            checked={selectedItems.length === cart.length}
                                                            onChange={handleCheckAll}
                                                        />
                                                    </label>
                                                </th>
                                                <th>
                                                    <div className="ml-10">
                                                        Pilih Semua
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cart.map((item: any) => (
                                                <tr>
                                                    <th>
                                                        <label>
                                                            <input
                                                                type="checkbox"
                                                                className="checkbox checkbox-accent"
                                                                id='checkcart'
                                                                checked={selectedItems.some((selectedItem) => selectedItem.id === item.id)}
                                                                onChange={(e) => handleCheckboxChange(e, item)}
                                                            />
                                                        </label>
                                                    </th>
                                                    <th>
                                                        <div className="ml-5">
                                                            <CartCard
                                                                key={item.id}
                                                                id={"keranjang"}
                                                                img={item.photo_profile ? item.photo_profile : Default}
                                                                sellerName={item.lapak_name}
                                                                produkName={item.product_name}
                                                                produkimg={item.product_image == "" ? noimg : item.product_image}
                                                                counts={item.product_pcs}
                                                                price={item.product_price}
                                                                onCheck={handleCheckAll}
                                                                handleDelete={() => handleDelete(item.id)}
                                                                totalPrice={item.product_price * item.product_pcs}
                                                                handleDecrement={() => handleDecrement(item)}
                                                                handleIncrement={() => handleIncrement(item)}
                                                            />
                                                        </div>
                                                    </th>

                                                </tr>

                                            ))}
                                        </tbody>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="flex h-40 md:w-40 2xl:w-80 sticky-top mb-2">
                            <div className="block w-96 p-6 bg-white border border-gray-200 rounded-xl shadow hover:bg-gray-100 dark:bg-slate-800 dark:border-lapak">
                                <div className="flex justify-between border-b-2 dark:border-lapak 2xl:text-lg">
                                    <h5 className="mb-2 font-bold 2xl:text-md tracking-tight text-gray-900 dark:text-white">Total Harga</h5>
                                    <h5 className="mb-2 2xl:text-md font-bold tracking-tight text-gray-900 dark:text-white"> {formatValue({
                                        value: JSON.stringify(price),
                                        groupSeparator: '.',
                                        decimalSeparator: ',',
                                        prefix: 'Rp. ',
                                    })}</h5>
                                </div>
                                <div className="my-5 mx-auto w-40">
                                    <CustomButton
                                        id='submit'
                                        label='Beli'
                                        onClick={() => cart.length === 0 || selectedItems.length === 0 ? cartKosong() : navigate(`/payment/${data.full_name}`, {
                                            state: {
                                                forPayment: selectedItems,
                                                totalPrice: price
                                            }
                                        })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </Layout>
    )
}

export default Cart