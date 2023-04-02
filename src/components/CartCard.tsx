import React from 'react'
import { formatValue } from 'react-currency-input-field'
import {HiTrash} from 'react-icons/hi'

interface CartProps {
    id: string
    sellerName: string
    img: string
    produkName: string
    produkimg: string
    counts: number
    price: number
    onCheck?: React.ChangeEventHandler
    children?: React.ReactNode
    totalPrice: number
    handleIncrement: React.MouseEventHandler
    handleDecrement: React.MouseEventHandler
    handleDelete: React.MouseEventHandler
}

const CartCard: React.FC<CartProps> = ({
    id,
    sellerName,
    img,
    produkimg,
    produkName,
    price,
    onCheck,
    counts,
    children,
    totalPrice,
    handleIncrement,
    handleDecrement,
    handleDelete
}) => {
    const imgUrl = 'https://storage.googleapis.com/images_lapak_umkm/product/'
    return (
        <div id={id} className="grid gap-y-3 relative items-center bg-white border-y-2 border-gray-200 rounded-lg w-54 lg:w-[80] p-4 dark:bg-slate-800 dark:border-lapak">
            <div className="flex space-x-5">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img src={img} />
                    </div>
                </div>
                <h5 className="lg:text-xl font-bold tracking-tight text-gray-900 dark:text-white">{sellerName}</h5>
            </div>
            <div className="flex flex-col lg:flex-row">
                <img className="object-cover md:w-full md:h-24 lg:w-32 lg:h-40 rounded-t-lg md:rounded-none md:rounded-l-lg "
                    src={produkimg} alt={produkimg} />

                <div className="flex flex-col px-4 leading-normal md:w-72 lg:w-80 justify-start dark:text-white gap-1">
                    <h5 className="mb-2 text-lg font-semibold tracking-tight text-gray-900 text-start dark:text-white">{produkName}</h5>
                    <p className="font-normal text-gray-700 text-start dark:text-white">{counts} pcs</p>
                    <p className="font-semibold text-gray-700 text-start dark:text-white">
                        {formatValue({
                            value: JSON.stringify(price),
                            groupSeparator: '.',
                            decimalSeparator: ',',
                            prefix: 'Rp. ',
                        })} /pcs
                    </p>
                    <p className="font-semibold text-gray-700 text-start dark:text-white">
                        {"Total : "} {counts ? formatValue({
                            value: JSON.stringify(totalPrice),
                            groupSeparator: '.',
                            decimalSeparator: ',',
                            prefix: 'Rp. ',
                        }) : totalPrice}
                    </p>
                    <div className="flex items-end justify-end mt-5">
                        <button className="btn btn-xs btn-outline btn-error mb-3" onClick={handleDelete}><HiTrash/></button>
                        <div className="flex">
                            <button onClick={handleDecrement} className='btn btn-xs bg-gray-100 text-black border-none hover:bg-gray-100 text-lg mb-3 ml-2 mr-5 dark:bg-slate-500 dark:text-white'>-</button>
                            <h1 className=''>{counts}</h1>
                            <button onClick={handleIncrement} className='btn btn-xs bg-gray-100 text-black border-none hover:bg-gray-100 text-lg mb-3 ml-5 mr-2 dark:bg-slate-500 dark:text-white'>+</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartCard