import React, { useState } from 'react'
import Layout from '../components/Layout'
import Navbar from '../components/Navbar'
import FotoProfile from '../assets/profile.jpg'
import { formatValue } from 'react-currency-input-field'
import CustomButton from '../components/CustomButton'
import CartCard from '../components/CartCard'

const Cart = () => {

    const [price, setPrice] = useState<number>(0)
    const [totalPrice, setTotalPrice] = useState<number>(price)
    const [count, setCount] = useState(1)
    const [checked, setChecked] = useState(false);

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
        const newPrice = allCheckboxesChecked ? price + productPrice : price - productPrice;
        setPrice(newPrice);
        setChecked(allCheckboxesChecked);
    };

    


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
            imgUser={FotoProfile}
            name='paisalll'
            email='faizaltriasaa@gmail.com'
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
                                <tr>
                                    <th>
                                        <label>
                                            <input 
                                            type="checkbox" 
                                            className="checkbox"
                                            onChange={(e:any) => handleCheck(e, price)}
                                            />
                                        </label>
                                    </th>
                                    <th>
                                        <CartCard
                                        key={'1'}
                                        id='1'
                                        img={FotoProfile}
                                        sellerName="Toko27"
                                        produkName='Topi Jelek'
                                        produkimg='https://sellercenter.unkl-ns.com/gallery/items/604/img_604_i55_3_1667709495.jpg'
                                        counts={4}
                                        price={25000}
                                        onCheck={(e:any) => handleCheck(e, totalPrice)}
                                        />
                                    </th>
                                </tr>
                                <tr>
                                    <th>
                                        <label>
                                            <input 
                                            type="checkbox" 
                                            className="checkbox"
                                            onChange={handleCheck}
                                            />
                                        </label>
                                    </th>
                                    <th>
                                        <CartCard
                                        key={'1'}
                                        id='1'
                                        img={FotoProfile}
                                        sellerName="Toko27"
                                        produkName='Sepatu Jelek'
                                        produkimg='data:image/jpeg;base64,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'
                                        counts={2}
                                        price={25000}
                                        onCheck={(e:any) => handleCheck(e, totalPrice)}
                                        />
                                    </th>
                                </tr>
                                <tr>
                                    <th>
                                        <label>
                                            <input 
                                            type="checkbox" 
                                            className="checkbox"
                                            onChange={handleCheck}
                                            />
                                        </label>
                                    </th>
                                    <th>
                                        <CartCard
                                        key={'1'}
                                        id='1'
                                        img={FotoProfile}
                                        sellerName="Toko27"
                                        produkName='Sepatu Jelek'
                                        produkimg='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-kf9DTB6-Ib-HGeza1DdvYixqfQRih9B6IA&usqp=CAU'
                                        counts={1}
                                        price={25000}
                                        onCheck={(e:any) => handleCheck(e, totalPrice)}
                                        />
                                    </th>
                                </tr>
                            </tbody>
                            </div>
                            {/* <CartCard
                            key={'1'}
                            id='1'
                            img={FotoProfile}
                            sellerName="Toko27"
                            produkName='Sepatu Jelek'
                            produkimg='data:image/jpeg;base64,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'
                            counts={2}
                            price={25000}
                            />
                            <CartCard
                            key={'1'}
                            id='1'
                            img={FotoProfile}
                            sellerName="Toko27"
                            produkName='Sepatu Jelek'
                            produkimg='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-kf9DTB6-Ib-HGeza1DdvYixqfQRih9B6IA&usqp=CAU'
                            counts={1}
                            price={25000}
                            /> */}
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