import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import Navbar from '../components/Navbar'
import FotoProfile from '../assets/profile.jpg'
import { formatValue } from 'react-currency-input-field'
import CustomButton from '../components/CustomButton'
import CartCard from '../components/CartCard'
import { useCookies } from 'react-cookie'
import produk from '../dummy/prouct.json'
import axios from 'axios'

const Cart = () => {

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<any>([])
    const [cookies, setCookies,removeCookies] = useCookies(['token'])

    const getProfile = async () => {
        setLoading(true)
        try {
            const res = await axios.get('https://lapakumkm.mindd.site/users', {
                headers: {
                Authorization: `Bearer ${cookies.token}`
                }
            })
            setData(res.data.data)
            console.log(res.data.data)
        } catch (error) {
    
        }
        setLoading(false)
    }
    
    useEffect(() => {
        getProfile()
    }, [])

    const [price, setPrice] = useState<number>(0)
    const [totalPrice, setTotalPrice] = useState<number>(price)
    const [count, setCount] = useState(1)
    const [checked, setChecked] = useState(false);
    const [cart, setCart] = useState([])

    const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(e.target.checked);
        const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
        allCheckboxes.forEach((checkbox) => {
            (checkbox as HTMLInputElement).checked = e.target.checked;
        });
    };

    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>, productPrice: number) => {
        const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
        const allCheckboxesChecked = Array.from(allCheckboxes).every(
            (checkbox) => (checkbox as HTMLInputElement).checked
        );
        const newPrice = allCheckboxesChecked ? price - productPrice : price + productPrice;
        setPrice(newPrice);
        setChecked(allCheckboxesChecked);
    };

    const cartEndPoint = 'https://lapakumkm.mindd.site/carts'

    const fetchDataCart = async () => {
        try {
            const response = await axios.get('https://virtserver.swaggerhub.com/UMARUUUN11_1/ALTA-LapakUMKM/1.0.0/carts',{
                headers: {
                    Authorization: `Bearer ${cookies.token}`
                }
            })
            setCart(response.data.data)
            console.log(response.data.data)
        } catch (error) {
            console.log(error)
        } finally {

        }
    }


    useEffect(() => {
        fetchDataCart()
    }, [])
    

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
            <Navbar
            imgUser={data.photo_profile ? data.photo_profile : FotoProfile }
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
                                        checked={checked}
                                        onChange={handleCheckAll}
                                    />
                                </label>
                                </th>
                                <th>Check All</th>
                            </tr>
                            </thead>
                            <tbody>
                                {cart.map((item:any)=> {
                                    return(
                                        <tr>
                                            <th>
                                                <label>
                                                    <input 
                                                    type="checkbox" 
                                                    className="checkbox"
                                                    onChange={(e:any) => handleCheck(e, item.product_price)}
                                                    />
                                                </label>
                                            </th>
                                                    <th>
                                                <CartCard
                                                key={item.id}
                                                id={item.id}
                                                img={FotoProfile}
                                                sellerName={item.lapak_name}
                                                produkName={item.product_name}
                                                produkimg={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRw37WfMabYiFV2do0nCsvnLfyARz7ePSJwSAOjtqF1w&s'}
                                                counts={item.product_pcs}
                                                price={item.product_price}
                                                onCheck={(e:any) => handleCheck(e, item.product_price)}
                                                />
                                            </th>

                                        </tr>
                                        )
                                    })}
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
                                />
                            </div>
                            
                        </div>
                    </div>
            </div>
        </Layout>
    )
}

export default Cart