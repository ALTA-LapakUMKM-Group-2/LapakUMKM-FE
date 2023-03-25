import React from 'react'
import { formatValue } from 'react-currency-input-field'

interface CartProps{
    id: string
    sellerName: string
    img: string
    produkName: string
    produkimg: string
    counts: number
    price: number
    onCheck: React.ChangeEventHandler
    children?: React.ReactNode
    totalPrice: number
    handleIncrement: React.MouseEventHandler
    handleDecrement: React.MouseEventHandler
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
    handleDecrement
}) => {

    // const [count, setCount] = React.useState(counts)
    
    

    // const handleIncrement = () => {
    //     setCount(count + 1)
    // }
    // const handleDecrement = () => {
    //     if(count > 1){
    //         setCount(count - 1)
    //     } 
    // }

    return (
        <div id={id} className="grid gap-y-3 relative items-center bg-white border-y-2 border-gray-200 rounded-lg  p-4 md:flex-row md:max-w-xl">
            <div className="flex space-x-5">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img src={img} />
                    </div>
            </div>
                <h5 className="text-xl font-bold tracking-tight text-gray-900 ">{sellerName}</h5>
            </div>
            <div className="flex flex-row">
                <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" 
                src={produkimg} alt=""/>
                <div className="flex flex-col p-4 leading-normal w-60">
                    <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 ">{produkName}</h5>
                    <p className="font-normal text-gray-700 ">{counts} pcs</p>
                    <p className="font-semibold text-gray-700 ">
                        {formatValue({
                        value: JSON.stringify(price),
                        groupSeparator: '.',
                        decimalSeparator: ',',
                        prefix: 'Rp. ',
                        })}
                    </p>
                    <p className="font-semibold text-gray-700 ">
                        {"Total : "} {counts > 1 ? formatValue({
                        value: JSON.stringify(totalPrice),
                        groupSeparator: '.',
                        decimalSeparator: ',',
                        prefix: 'Rp. ',
                        }) : totalPrice }
                    </p>
                </div>
                    <div className="flex mt-40">
                        <button onClick={handleDecrement} className='btn btn-xs bg-gray-100 text-black border-none hover:bg-gray-100 text-2xl mb-3 mr-5 ml-2'>-</button>
                        <h1 className=''>{counts}</h1>
                        <button onClick={handleIncrement} className='btn btn-xs bg-gray-100 text-black border-none hover:bg-gray-100 text-2xl mb-3 ml-5 mr-2'>+</button>
                    </div>
                </div>
            </div>
    )
}

export default CartCard