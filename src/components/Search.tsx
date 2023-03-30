import React, { FC } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

interface Props {
    onSearch?: React.ChangeEventHandler<HTMLInputElement>
}

const Search:FC <Props> = ({onSearch}) => {
    return (
        <form>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <AiOutlineSearch className='w-5 h-5 text-gray-900 dark:text-white' />
                </div>
                <input onChange={onSearch} type="search" className="block input-accent w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-slate-700 dark:border-none dark:placeholder-white dark:text-white" placeholder="Search Produk" required />
            </div>
        </form>
    )
}

export default Search