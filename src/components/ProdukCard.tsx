import { formatValue } from 'react-currency-input-field'
import { useNavigate } from 'react-router-dom';
import React from 'react';
import '@smastrom/react-rating/style.css'
import { Rating } from '@smastrom/react-rating';
import { TbShoppingCartPlus } from 'react-icons/tb'
import { MdLocationOn } from 'react-icons/md'
import { AiFillStar } from 'react-icons/ai';
import { useCookies } from 'react-cookie';
import Swal from 'sweetalert2';

interface ListingProps {
    id: number;
    produkName: string;
    location: string;
    rating: number;
    price: number;
    image: string;
    sell?: number
    edit?: boolean
    toDelete?: boolean
    handleEdit?: React.MouseEventHandler
    handleDelete?: React.MouseEventHandler
    name?: string
    handlename?: boolean
    size?: string
}


const ProdukCard: React.FC<ListingProps> = ({
    id,
    location,
    produkName,
    rating,
    price,
    image,
    sell,
    size
}) => {
    const [cookie, setCookie] = useCookies(['token'])
    const navigate = useNavigate()

    const onClick = () => {
        if(!cookie.token){
            Swal.fire({
                icon: "warning",
                title: "Anda Belum Login",
                text: "Silahkan Login terlebih dahulu",
                confirmButtonText: "Login",
                confirmButtonColor: "#31CFB9",
                cancelButtonText: "Cancel",
                cancelButtonColor: "#FF6E40",
                showCancelButton:true,
            }).then((go) => {
                if(go.isConfirmed)
                navigate('/login')
            })
      
        } else {
            navigate(`/detail/${id}`)
        }
    }

    const StarDrawing = (
        <path d="M11.0748 3.25583C11.4141 2.42845 12.5859 2.42845 12.9252 3.25583L14.6493 7.45955C14.793 7.80979 15.1221 8.04889 15.4995 8.07727L20.0303 8.41798C20.922 8.48504 21.2841 9.59942 20.6021 10.1778L17.1369 13.1166C16.8482 13.3614 16.7225 13.7483 16.8122 14.1161L17.8882 18.5304C18.1 19.3992 17.152 20.0879 16.3912 19.618L12.5255 17.2305C12.2034 17.0316 11.7966 17.0316 11.4745 17.2305L7.60881 19.618C6.84796 20.0879 5.90001 19.3992 6.1118 18.5304L7.18785 14.1161C7.2775 13.7483 7.1518 13.3614 6.86309 13.1166L3.3979 10.1778C2.71588 9.59942 3.07796 8.48504 3.96971 8.41798L8.50046 8.07727C8.87794 8.04889 9.20704 7.80979 9.35068 7.45955L11.0748 3.25583Z" stroke="#fdd231" strokeWidth="1" ></path>
    );

    const customStyles = {
        itemShapes: StarDrawing,
        activeFillColor: '#FDD231',
        inactiveFillColor: '#ffffff',

    };

    return (
        

        <div className="w-60 h-full max-w-sm bg-white border border-gray rounded-lg shadow-lg dark:bg-slate-600 dark:border-4 dark:border-lapak ">
            <a onClick={onClick}>
                <img className="p-4 rounded-t-lg cover w-screen h-72 hover:cursor-pointer" src={ image} alt="product image " />
            </a>
            <div className="px-5 pb-5 flex flex-col space-y-1 gap-2 dark:text-white">
                <a href="#">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white mb-2 " style={{ height: '3rem', lineHeight: '1.5rem', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical' }}>{produkName}</h5>
                    <h5 className="text-l font-medium tracking-tight text-gray-900 dark:text-white mt-5">Ukuran : <span className='ml-1'>{size }</span> </h5>
                </a>
                <h5 className="text-l font-semibold tracking-tight text-gray-900 flex dark:text-white truncate text-ellipsis "><MdLocationOn className=' w-6 h-6 mr-2 dark:text-lapak ' />{location}</h5>
                <div className="rating ">
                    <Rating
                        value={rating}
                        style={{ maxWidth: 100 }}
                        itemStyles={customStyles}
                        readOnly
                        className='dark:text-lapak'
                    />
                    <span className="bg-teal-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ml-3 dark:text-black ">{rating}</span>
                </div>
                <p className=''>Terjual {sell}</p>
                <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white ">{formatValue({
                        prefix: 'Rp. ',
                        value: JSON.stringify(price),
                        groupSeparator: '.',
                        decimalSeparator: ',',
                    })}</span>
                    <button className="btn btn-sm bg-lapak border-none hover:bg-sky-500 focus:ring-4 focus:outline-none focus:ring-blue-300" onClick={onClick} ><TbShoppingCartPlus /></button>
                </div>
            </div>
        </div>
    )
}

export default ProdukCard