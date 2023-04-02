import React from 'react'
import { Rating } from '@smastrom/react-rating'
import { formatValue } from 'react-currency-input-field'
import CustomButton from './CutomInput'
import '@smastrom/react-rating/style.css'

interface FeedbackProps {
    id: any
    sellerName: string
    produkName: string
    produkImg: string
    price: number
    size: any
    quantity: number
    totalPrice?: number
    status: string
    rating: number
    handleFeedback?: React.MouseEventHandler
    handleEdit?: React.MouseEventHandler
}

const CardHistory: React.FC<FeedbackProps> = ({
    id,
    sellerName,
    produkName,
    produkImg,
    price,
    quantity,
    totalPrice,
    size,
    status,
    rating,
    handleFeedback,
    handleEdit
}) => {
    const StarDrawing = (
        <path d="M11.0748 3.25583C11.4141 2.42845 12.5859 2.42845 12.9252 3.25583L14.6493 7.45955C14.793 7.80979 15.1221 8.04889 15.4995 8.07727L20.0303 8.41798C20.922 8.48504 21.2841 9.59942 20.6021 10.1778L17.1369 13.1166C16.8482 13.3614 16.7225 13.7483 16.8122 14.1161L17.8882 18.5304C18.1 19.3992 17.152 20.0879 16.3912 19.618L12.5255 17.2305C12.2034 17.0316 11.7966 17.0316 11.4745 17.2305L7.60881 19.618C6.84796 20.0879 5.90001 19.3992 6.1118 18.5304L7.18785 14.1161C7.2775 13.7483 7.1518 13.3614 6.86309 13.1166L3.3979 10.1778C2.71588 9.59942 3.07796 8.48504 3.96971 8.41798L8.50046 8.07727C8.87794 8.04889 9.20704 7.80979 9.35068 7.45955L11.0748 3.25583Z" stroke="#fdd231" strokeWidth="1" ></path>
    );

    const customStyles = {
        itemShapes: StarDrawing,
        activeFillColor: '#FDD231',
        inactiveFillColor: '#ffffff',
    };
    return (
        <div id={id} className="mt-5 w-60 sm:w-[400px] lg:w-[400px] 2xl:w-[400px] rounded-lg px-8 py-4 bg-white shadow dark:bg-slate-700 dark:border-lapak dark:border">
            <p className="border-b-2 pb-2 font-semibold text-left text-sm font-medium dark:text-white dark:border-lapak">{sellerName}</p>
            <div className="flex flex-col sm:flex-row lg:flex-row gap-5 md:gap-5 lg:gap-5 2xl:gap-8 mt-4">
                <img src={produkImg} alt="produk.jpg" className="w-20 h-28 rounded-l" />
                <div className="space-y-1 w-full">
                    <p className='text-left text-sm font-medium dark:text-white'>{produkName}</p>
                    <p className='text-left text-sm font-medium dark:text-white'>Ukuran : {size}</p>
                    <p className='text-left text-sm font-medium dark:text-white'><span>
                        {formatValue({
                            value: JSON.stringify(price),
                            groupSeparator: '.',
                            decimalSeparator: ',',
                            prefix: 'Rp. ',
                        })}</span> x {quantity}</p>
                    <p className='text-left text-sm font-medium dark:text-white'>Total :
                        {formatValue({
                            value: JSON.stringify(totalPrice),
                            groupSeparator: '.',
                            decimalSeparator: ',',
                            prefix: 'Rp. ',
                        })}
                    </p>
                    <p className='text-left text-sm font-medium dark:text-white'>Status : {status}</p>
                        <div className="rating">
                            <Rating
                                value={rating}
                                style={{ maxWidth: 100 }}
                                itemStyles={customStyles}
                                readOnly
                            />
                        </div>

                    <div className="flex justify-end">
                        <div className="mt-5 md:mt-0 lg:mt-0">
                            <button
                                className={`btn btn-sm ${rating === 0 ? "bg-lapak border-none" : "btn-outline btn-accent"}`}
                                onClick={rating === 0 ? handleFeedback : handleEdit}
                            >
                                {rating === 0 ? "Beri Ulasan" : "Edit Ulasan"}
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardHistory