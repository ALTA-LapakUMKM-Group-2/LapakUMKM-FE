import React, { FC } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

interface Props {
    onSearch?: React.ChangeEventHandler<HTMLInputElement>
}

const Search: FC<Props> = ({ onSearch }) => {
    return (
        // <form>
        //     <div className="relative">
        //         <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        //             <AiOutlineSearch className='w-5 h-5 text-gray-900' />
        //         </div>
        //         <input onChange={onSearch} type="search" className="block input-accent w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50" placeholder="Search Produk" required />
        //         <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-lapak hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Search</button>
        //     </div>
        // </form>
        
        <div className="mx-auto max-w-md">
            <form action="" className="relative mx-auto w-full">
                <input type="search"
                    onChange={onSearch}
                    className="peer cursor-pointer relative z-10 h-12 w-12 rounded-xl 2xl:dark:border-4 border border-black bg-transparent pl-12 outline-none  focus:cursor-text focus:w-full focus:border-black focus:pl-16 focus:pr-4 text-black dark:text-white dark:focus:border-white dark:border-white transition-all" placeholder='Masukkan kata'
                    style={{ transition: "width 0.5s ease-in-out, padding 0.5s ease-in-out" }}
 />
                <svg xmlns="http://www.w3.org/2000/svg" className="absolute  inset-y-0 my-auto 2xl:h-8 2xl:w-14 h-6 2xl:border-r border-transparent stroke-black px-3.5 peer-focus:border-black peer-focus:stroke-black dark:peer-focus:stroke-white dark:peer-focus:border-white dark:stroke-white " fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </form>
        </div>
    )
}

export default Search