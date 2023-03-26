import React, { FC } from 'react'
import { MdStarRate } from 'react-icons/md'
import Default from "../assets/default.jpg"

interface Props {
    rating: number
    image: any
    comment: string
    name: any
}

const CardFeedback: FC<Props> = ({ rating, image, comment, name }) => {
    return (
        <div className='p-2 mb-4 border-b-2 border-zinc-400'>
            <div className="float-left w-12 h-12 mr-4 overflow-hidden rounded-full flex justify-center" >
                <img src={image} alt="profil.svg" />
            </div>

            <div className='flex justify-between text-zinc-800 items-center py-3'>
                <h1 className='text-lg font-bold'>{name}</h1>
                <div className='flex items-center'>
                    <MdStarRate className='text-yellow-400 mr-1' size={30} />
                    <h2 className='text-lg font-bold'>{rating}</h2>
                </div>
            </div>


            <p className='text-gray-700 my-5'>{comment}</p>
        </div>
    )
}

export default CardFeedback