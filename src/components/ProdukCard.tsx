import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import { useNavigate } from 'react-router';
import { Rating } from '@smastrom/react-rating';

interface ListingProps {
    id: number;
    produkName: string;
    location: string;
    rating: number;
    price: number;
    image: string;
    edit?: boolean
    toDelete?: boolean
    handleEdit?: React.MouseEventHandler
    handleDelete?: React.MouseEventHandler
    name?: string
    handlename?: boolean
}


const ProdukCard: React.FC<ListingProps> = ({
    id,
    location,
    produkName,
    rating,
    price,
    image,
    edit,
    handleDelete,
    handleEdit,
    toDelete,
    name,
    handlename
}) => {

    const navigate = useNavigate()

    const StarDrawing = (
        <path d="M11.0748 3.25583C11.4141 2.42845 12.5859 2.42845 12.9252 3.25583L14.6493 7.45955C14.793 7.80979 15.1221 8.04889 15.4995 8.07727L20.0303 8.41798C20.922 8.48504 21.2841 9.59942 20.6021 10.1778L17.1369 13.1166C16.8482 13.3614 16.7225 13.7483 16.8122 14.1161L17.8882 18.5304C18.1 19.3992 17.152 20.0879 16.3912 19.618L12.5255 17.2305C12.2034 17.0316 11.7966 17.0316 11.4745 17.2305L7.60881 19.618C6.84796 20.0879 5.90001 19.3992 6.1118 18.5304L7.18785 14.1161C7.2775 13.7483 7.1518 13.3614 6.86309 13.1166L3.3979 10.1778C2.71588 9.59942 3.07796 8.48504 3.96971 8.41798L8.50046 8.07727C8.87794 8.04889 9.20704 7.80979 9.35068 7.45955L11.0748 3.25583Z" stroke="#fdd231" stroke-width="1" ></path>
    );

    const customStyles = {
        itemShapes: StarDrawing,
        activeFillColor: '#fdd231',
        inactiveFillColor: '#0b3c95',

    };


    return (

        
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <img className="p-8 rounded-t-lg" src={image} alt="product image" />
            </a>
            <div className="px-5 pb-5">
                <a href="#">
                    <h5 className="text-l font-semibold tracking-tight text-gray-900 dark:text-white">Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport</h5>
                </a>
                <div className="rating h-10">
                    <Rating
                        value={rating}                        
                        style={{ maxWidth: 20 }}
                        itemStyles={customStyles}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900 dark:text-white">Rp. {price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}</span>
                    <a href="#" className="text-white bg-lapak hover:bg-sky-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">See Product</a>
                </div>
            </div>
        </div>

        // <div className='flex relative justify-center w-full mx-auto'>
        //     <button onClick={() => navigate(`/stays/${id}`)} className="card w-full bg shadow-xl p-0">
        //         <figure>
        //             <img 
        //             className='object-cover w-screen h-60' 
        //             src={image}
        //             onError={({ currentTarget }) => {
        //                 currentTarget.onerror = null;
        //                 currentTarget.src="https://www.nj.com/resizer/QgEkPOPu3r2bkqGAf7DjtCH7sJM=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/HK5EHPHYX5CR7BS2E5TGVHZBGE.JPG";
        //             }}
        //             />
        //         </figure>
        //         <div className="card-body p-0 py-5 mx-5">
        //             <h2 className="card-title text-lg justify-between w-full">
        //                 {location}
        //                 <div className="badge badge-accent"><AiFillStar />{rating}</div>
        //             </h2>
        //             <p className='font-light text-start'>{name}</p>
        //             <p className='font-light text-start'>Rp. {price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")} / night</p>
        //         </div>
        //     </button>

        //     <div className={`flex flex-col font-semibold ${edit ? "absolute bottom-5 right-3" : "hidden"}`}>
        //         <p className='text-accent hover:cursor-pointer' onClick={handleEdit}>
        //             edit
        //         </p>
        //         <p className='text-warning hover:cursor-pointer' onClick={handleDelete}>
        //             delete
        //         </p>
        //     </div>
        // </div>
    )
}

export default ProdukCard