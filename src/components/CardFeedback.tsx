import React, { FC } from 'react'
import { MdStarRate } from 'react-icons/md'

interface Props {
    rating: number
    image: string
    comment: string
    name: string
}

const CardFeedback: FC<Props> = ({ rating, image, comment, name }) => {
    return (
        <div className='bg-white shadow-md rounded-lg p-6 w-full'>
            <div className='flex items-center'>
                <img src={image} className='w-20 h-20 rounded-full mr-4' />
                <div>
                    <h1 className='text-lg font-bold'>{name}</h1>
                    <div className='flex items-center'>
                        <span className='text-yellow-500 mr-1'><MdStarRate size={25} /></span>
                        <h2 className='text-lg font-bold'>{rating}</h2>
                    </div>
                </div>
            </div>
            <p className='text-gray-700 mt-8'>{comment}</p>
        </div>
    )
}

export default CardFeedback