import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

import { Chat } from "../utils/types/DataType";

import { HiOutlineXMark } from 'react-icons/hi2'
import { FaRegPaperPlane } from 'react-icons/fa'
import Loading from "./Loading";

import Default from "../assets/default.jpg"

type ChatModalProps = {
    isOpen: boolean;
    isClose: React.MouseEventHandler;
    children?: React.ReactNode;
    size?: string
    titleStyle?: string
    img: string
    product_id?: number
    Recipient_id?: number
    Room?: string
    RoomsChat?: any[]
    role?: string
    userID?: number
    tokoName?: string
};

const ChatModal: React.FC<ChatModalProps> = ({ userID, role, RoomsChat, Room, product_id, isOpen, isClose, img, tokoName, children, size, titleStyle, Recipient_id }) => {
    const [cookie, setCookie] = useCookies(["token", "id", "roomID", "full_name", "photo_profile"])
    const [loading, setLoading] = useState<boolean>(false)

    const [chat, setChat] = useState<string>("")
    const [roomID, setRoomID] = useState<string>("")
    const [newChat, setNewChat] = useState<Chat[]>([])
    const [senderID, setSenderID] = useState<number>(0)
    const [chats, setChats] = useState<Chat[]>([])

    const onNewChat = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true)
        e.preventDefault();
        const body = {
            text: chat,
            recipient_id: Number(userID)
        }
        await axios
            .post(`https://lapakumkm.mindd.site/chats`, body, {
                headers: {
                    Authorization: `Bearer ${cookie.token}`
                }
            })
            .then((res) => {
                setRoomID(res.data.data.room_id)
            })
            .catch((err) => {

            })
            .finally(() => fetchDataChat(roomID))
            .finally(() => setLoading(false))
    }

    const onChat = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true)
        e.preventDefault();
        const body = {
            text: chat,
            recipient_id: senderID
        }
        await axios
            .post(`https://lapakumkm.mindd.site/chats`, body, {
                headers: {
                    Authorization: `Bearer ${cookie.token}`
                }
            })
            .then((res) => {
                setRoomID(res.data.data.room_id)
            })
            .catch((err) => {

            })
            .finally(() => fetchDataChat(roomID))
            .finally(() => setLoading(false))
    }

    const handleChat = async (room_id: string, user_id: number) => {
        const Id = room_id
        if (Id) {
            setRoomID(Id)
            setSenderID(user_id)
        }
    }

    useEffect(() => {
        if (roomID || Room) {
            fetchDataChat(roomID || Room)
        }
    }, [roomID, Room])

    const [getRecepient, setGetRecepient] = useState<any>('')
    function fetchDataChat(room_id: any) {
        setLoading(true)
        axios
            .get(`https://lapakumkm.mindd.site/rooms/${room_id}/chats`, {
                headers: {
                    Authorization: `Bearer ${cookie.token}`
                }
            })
            .then((res) => {
                setNewChat(res.data.data)
            })
            .catch((err) => { })
            .finally(() => setLoading(false))
    }

    return (
        < div
            className={`transition-opacity ${isOpen ? "fixed opacity-100" : "opacity-0 hidden"
                } 2xl:bottom-10 lg:bottom-10 bottom-0 2xl:right-10 lg:right-10 right-0 2xl:h-3/6 lg:h-3/6 h-full overflow-auto flex 2xl:flex-row lg:flex-row flex-col items-center justify-center z-50`
            }
        >
            {RoomsChat && role === "seller" ?
                <div className="2xl:w-80 lg:w-80 w-full 2xl:py-3 lg:py-3 py-0 px-4 2xl:h-full lg:h-full h-72 block bg-white dark:bg-slate-400 border-r-2 rounded-tl-lg rounded-bl-lg border-zinc-300 dark:border-zinc-100 overflow-auto ">
                    <p className="text-[24px] font-semibold text-zinc-800 2xl: sticky top-0 z-50 bg-white">Chat</p>
                    <div >
                        {RoomsChat.map((data: Chat, index) => (
                            <>
                                <div key={index} className="flex items-center">
                                    <div className="float-left w-10 h-10 mr-2 overflow-hidden rounded-full flex justify-center hover:cursor-pointer" >
                                        <img src={data.photo_profile ? data.photo_profile : Default} />
                                    </div>

                                    <p onClick={() => handleChat(data.room_id, data.user_id)} className='text-gray-700 my-5 text-[18px] capitalize dark:text-white hover:cursor-pointer dark:hover:text-zinc-500'>{data.full_name}</p>
                                </div>
                            </>
                        ))}
                    </div>
                </div>
                : null}

            <div className={`w-96 h-full block bg-white dark:bg-slate-400 rounded-tr-lg rounded-br-lg overflow-auto dark:bg-sl`}>
                <div className="flex justify-between border-b-2 sticky p-3 bg-white top-0 z-40 ">
                    <div className="flex top-0 justify-center items-center mb-2">
                        <div className="avatar">
                            <div className="w-12 rounded-full">
                                <img src={img} />
                            </div>
                        </div>
                        <h1 className={`text-xl font-semibold ${titleStyle}`}>
                            {tokoName}
                        </h1>
                    </div>
                    <a onClick={isClose} className="text-grey-900 text-4xl hover:text-accent cursor-pointer">
                        <HiOutlineXMark />
                    </a>
                </div>

                <div className="flex flex-col mb-20">
                    {newChat.filter(i => i.text !== "") ? newChat.filter(i => i.text !== "").map((i, index) => (
                        <div key={index} className={`${i.sender_id === parseInt(cookie.id) ? "chat chat-end" : "chat chat-start"}`}>
                            <div className="chat-image avatar">
                                <div className="w-10 rounded-full">
                                    <img src={i.sender_id === parseInt(cookie.id) ? i.sender.photo_profile : i.sender.photo_profile} alt="profile" />
                                </div>
                            </div>
                            <div className="chat-header">
                                {i.sender_id === parseInt(cookie.id) ? i.sender.full_name : i.sender.full_name}
                            </div>
                            <div className={`chat-bubble  ${i.sender_id === parseInt(cookie.id) ? "bg-lapak" : ""}`}>{i.text}</div>
                        </div>
                    )) : <p>Belum ada Obrolan</p>}
                </div>
                <div className="absolute bottom-0 bg-gray-200 dark:bg-slate-400 w-96 h-20 overflow-auto">
                    <form onSubmit={(e) => role === "seller" ? onChat(e) : onNewChat(e)}>
                        <div className="relative mx-5 pt-2">
                            <input onChange={(e) => setChat(e.target.value)} type="search" className="block input-accent w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50" placeholder="Tulis Pesan . . . " required />

                            <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-lapak hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"><FaRegPaperPlane /></button>
                        </div>
                    </form>
                </div>
            </div>

        </div >
    );
};

export default ChatModal;