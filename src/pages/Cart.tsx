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
import Swal from 'sweetalert2'
import Loading from '../components/Loading'

interface Product {
    selected: unknown
    id: number
    lapak_address: string
    lapak_name: string
    product_id: number
    product_name: string
    product_pcs: number
    product_price: number
    user_id: number
    total_price: number
}
interface CartData {
    products?: Product
}

interface CartItem {
    id: number
    product_price: number
    lapak_name: string
    product_pcs: number
}

const Cart: React.FC<CartData> = ({ products }) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<any>([])
    const [cookies, setCookies, removeCookies] = useCookies(['token'])
    const [checked, setChecked] = useState(false);
    const [selectedItems, setSelectedItems] = useState<Product[]>([]);
    const [newCart, setnewCart] = useState<Product[]>([]);
    const [price, setPrice] = useState<number>(0)
    const [count, setCount] = useState<number>()
    const [cart, setNewCart] = useState<Product[]>([])
    const [totalPrice, setTotalPrice] = useState<number>(price)
    const navigate = useNavigate()

    
    
    console.log("test tokped",selectedItems);
    
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, product: Product) => {
        const isChecked = e.target.checked;
        setSelectedItems((prevState) => {
            const updatedItems = isChecked
                ? [...prevState, product]
                : prevState.filter((selectedItem) => selectedItem.id !== product.id);
            return updatedItems;
        });
    };
    console.log("total price", price);
    
    const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            setSelectedItems(cart);
        } else {
            setSelectedItems([]);
        }
    };
    const handleIncrement = (i: CartItem) => {
        let _cart = cart.map((item) => {
            if (item.id === i.id) {
                item.product_pcs++;
            }
        return item;
        });        
        setnewCart(_cart);
    };

    const handleDecrement = (i: CartItem) => {
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
    setnewCart(_cart);
    };
    
        
        
    
    const TotalCart2 = () => {
        let Total = 0
        selectedItems.map((i) => {
            Total += i.product_price * i.product_pcs
        })
        setPrice(Total)
    }

    useEffect(() => {
        TotalCart2()
    }, [TotalCart2])

    console.log('cektotal', totalPrice);

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
                axios.delete(`${cartEndPoint}/${id}`,{
                    headers:{
                    Authorization: `Bearer ${cookies.token}`
                    }
                })
                .then((response)=>{
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
                .catch((error)=> {
                    console.log(error)
                    Swal.fire({
                    icon: "error",
                    title: error.message,
                    text: "gagal",
                    showConfirmButton: false,
                    showCancelButton: false,
                    timer: 1500,
                    })
                }).finally(()=> setLoading(false))
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
            setCount(response.data.data.product_pcs)
        } catch (error) {
            console.log(error);
        } finally {

        }
    };

    useEffect(() => {
        fetchDataCart()
    }, [])
    console.log("Cart", cart);
    
    const imgURL = "https://storage.googleapis.com/images_lapak_umkm/product/"
    return (
        <Layout>
            { loading ? 
            <Loading/> : 
            <>
            <Navbar
                imgUser={data.photo_profile ? data.photo_profile : FotoProfile}
                name={data.full_name}
                email={data.email}
            />
            <div className="flex flex-row mx-auto space-x-20 relative justify-center box-content border shadow-xl mt-20 w-[1200px] bg-white p-10">
                <div className="flex ">
                    <div className="block w-sm space-y-5 p-6 w-[700px] bg-white border border-gray-200 rounded-lg shadow">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Keranjang</h5>
                        <div className="flex flex-col">
                            <thead>
                                <tr>
                                    <th>
                                        <label>
                                            <input
                                                type="checkbox"
                                                className="checkbox"
                                                id='checkcart'
                                                checked={selectedItems.length === cart.length}
                                                onChange={handleCheckAll}
                                            />
                                        </label>
                                    </th>
                                    <th>
                                        <div className="ml-40">
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
                                                    className="checkbox"
                                                    id='checkcart'
                                                    checked={selectedItems.some((selectedItem) => selectedItem.id === item.id)}
                                                    onChange={(e) => handleCheckboxChange(e, item)}
                                                />
                                            </label>
                                        </th>
                                        <th>
                                            <CartCard
                                                key={item.id}
                                                id={"keranjang"}
                                                img={FotoProfile}
                                                sellerName={item.lapak_name}
                                                produkName={item.product_name}
                                                produkimg={item.product_image}
                                                counts={ item.product_pcs}
                                                price={item.product_price}
                                                onCheck={handleCheckAll}
                                                // handleDelete={()=> handleDelete(item.id)}
                                                totalPrice={item.product_price * item.product_pcs}
                                                handleDecrement={() => handleDecrement(item)}
                                                handleIncrement={() => handleIncrement(item)}
                                            />
                                        </th>

                                    </tr>

                                ))}
                            </tbody>
                        </div>
                    </div>
                </div>
                <div className="flex mr-auto h-40 sticky-top">
                    <div className="block w-96 p-6 bg-white border border-gray-200 rounded-xl shadow hover:bg-gray-100">
                        <div className="flex justify-between border-b-2">
                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">Total Harga</h5>
                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900"> {formatValue({
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
                                onClick={()=> navigate(`/payment/${data.full_name}`, {
                                    state:{
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