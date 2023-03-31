import React, { FC } from 'react'
import { MdStarRate } from 'react-icons/md'
import Default from "../assets/default.jpg"

interface Props {
    rating: number
    image: any
    comment: string
    name: any
    id?: number
}

const CardFeedback: FC<Props> = ({ rating, image, comment, name, id }) => {
    return (
        <div className='p-2 mb-4 border-b-2 border-zinc-400' key={id}>
            <div className="float-left w-12 h-12 mr-4 overflow-hidden rounded-full flex justify-center" >
                <img src={image} alt="profil.svg" />
            </div>

            <div className='flex justify-between text-zinc-800 items-center py-3'>
                <h1 className='text-lg font-bold dark:text-white'>{name}</h1>
                <div className='flex items-center'>
                    <MdStarRate className='text-yellow-400 mr-1 dark:text-lapak' size={30} />
                    <h2 className='text-lg font-bold dark:text-white'>{rating}</h2>
                </div>
            </div>


            <p className='text-gray-700 my-5 dark:text-white'>{comment}</p>
        </div>
    )
}

export default CardFeedback