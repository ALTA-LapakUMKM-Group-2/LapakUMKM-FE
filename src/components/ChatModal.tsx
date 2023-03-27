import React, { useState } from "react";

import { HiOutlineXMark } from 'react-icons/hi2'
import { FaRegPaperPlane } from 'react-icons/fa'

type ChatModalProps = {
    isOpen: boolean;
    isClose: React.MouseEventHandler;
    children?: React.ReactNode;
    size?: string
    titleStyle?: string
    img: string
};

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, isClose, img, children, size, titleStyle }) => {
    return (
        <div
            className={`transition-opacity ${isOpen ? "fixed opacity-100" : "opacity-0 hidden"
                } bottom-10 right-10 h-3/6 flex items-center justify-center z-50`}
        >
            <div className={`w-96 h-full block bg-white rounded-lg overflow-auto dark:bg-sl`}>
                <div className="flex justify-between border-b-2 sticky p-3 bg-white top-0 z-40 ">
                    <div className="flex top-0 justify-center items-center mb-2">
                        <div className="avatar">
                            <div className="w-12 rounded-full">
                                <img src={img} />
                            </div>
                        </div>
                        <h1 className={`text-xl font-semibold ${titleStyle}`}>
                            Toko27
                        </h1>
                    </div>
                    <a onClick={isClose} className="text-grey-900 text-4xl hover:text-accent cursor-pointer">
                        <HiOutlineXMark />
                    </a>
                </div>
                <div className="flex flex-col mb-20">
                    {children}
                </div>
                <div className="absolute bottom-0 bg-gray-200 w-full h-20 overflow-auto">
                    <form>
                        <div className="relative mx-5 pt-2">
                            <input type="search" className="block input-accent w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50" placeholder="Tulis Pesan . . . " required/>
                            <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-lapak hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"><FaRegPaperPlane/></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChatModal;