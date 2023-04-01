import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

import { Chat } from "../utils/types/DataType";

import { HiOutlineXMark } from 'react-icons/hi2'
import { FaRegPaperPlane } from 'react-icons/fa'
import Loading from "./Loading";

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
};

const ChatModal: React.FC<ChatModalProps> = ({ Room, product_id, isOpen, isClose, img, children, size, titleStyle, Recipient_id }) => {
    const [cookie, setCookie] = useCookies(["token", "id", "roomID"])
    const [loading, setLoading] = useState<boolean>(false)

    const [chat, setChat] = useState<string>("")
    const [roomID, setRoomID] = useState<string>("")
    const [newChat, setNewChat] = useState<Chat[]>([])

    const onChat = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true)
        e.preventDefault();
        const body = {
            text: chat,
            recipient_id: 1
        }
        axios
            .post(`https://lapakumkm.mindd.site/chats`, body, {
                headers: {
                    Authorization: `Bearer ${cookie.token}`
                }
            })
            .then((res) => {
                const cekID = res.data.data.room_id
                // console.log("cek ID", cekID)
                // console.log(typeof cekID)
                if (cekID) {
                    setRoomID(cekID)
                }
            })
            .catch((err) => {
                console.log(err.response.data.message)
            })
            .finally(() => fetchDataChat(roomID))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        if (roomID || Room) {
            fetchDataChat(roomID || Room)
        }
    }, [roomID, Room])


    function fetchDataChat(room_id: any) {
        setLoading(true)
        console.log("room ID ceked 2:", room_id)
        axios
            .get(`https://lapakumkm.mindd.site/rooms/R13/chats`, {
                headers: {
                    Authorization: `Bearer ${cookie.token}`
                }
            })
            .then((res) => {
                // console.log("data chat :", res.data.data)
                setNewChat(res.data.data)
            })
            .catch((err) => { })
            .finally(() => setLoading(false))
    }

    newChat.map((item) =>
        (console.log("data chat :", item))
    )

    // newChat
    //     .filter(chat => chat.recipient_id === 3)
    //     .map(i => (
    //         console.log("data chat 2 :", i)
    //     ))

    return (
        < div
            className={`transition-opacity ${isOpen ? "fixed opacity-100" : "opacity-0 hidden"
                } bottom-10 right-10 h-3/6 flex items-center justify-center z-50`
            }
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
                {loading ? <Loading /> :
                    <div className="flex flex-col mb-20">
                        {newChat.map((i) => (
                            <div className={`${i.sender_id === parseInt(cookie.id) ? "chat chat-end" : "chat chat-start"}`}>
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                        <img src={i.recipient.photo_profile} alt="profile" />
                                    </div>
                                </div>
                                <div className="chat-header">
                                    {i.recipient.full_name}
                                </div>
                                <div className={`chat-bubble  ${i.sender_id === parseInt(cookie.id) ? "bg-lapak" : ""}`}>{i.text}</div>
                            </div>
                        ))}
                    </div>
                }
                <div className="absolute bottom-0 bg-gray-200 w-full h-20 overflow-auto">
                    <form onSubmit={(e) => onChat(e)}>
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