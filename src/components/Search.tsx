import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

const Search = () => {
    return (
        <form>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <AiOutlineSearch className='w-5 h-5 text-gray-900' />
                </div>
                <input type="search" className="block input-accent w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50" placeholder="Search Produk" required />
                <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-lapak hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-4 py-2">Search</button>
            </div>
        </form>
    )
}

export default Search