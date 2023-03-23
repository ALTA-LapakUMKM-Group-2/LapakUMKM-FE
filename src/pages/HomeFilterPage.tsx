import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Layout from '../components/Layout'
import FotoProfile from '../assets/photo_2023-03-16_20-34-20.jpg'
import ProdukCard from '../components/ProdukCard'
import { Rating } from '@smastrom/react-rating';
import { IoIosArrowDropdown } from 'react-icons/io'
import { IoIosArrowDropup } from 'react-icons/io'
import CustomInput from '../components/CutomInput'
import CurrencyInput from 'react-currency-input-field';
import CustomButton from '../components/CustomButton'
import ChatModal from '../components/ChatModal'

    interface FormValues {
    minprice: number;
    maxprice: number;
    kategori: string;
    minrating: number;
    }
    const initialFormValues: FormValues = {
        minprice: 0,
        maxprice: 0,
        kategori: '',
        minrating: 0
    };
const HomeFilter = () => {

    const [showFilter, setShowFilter] = useState(false);
    const [showChat, setShowChat] = useState(false)
    const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormValues(initialFormValues);
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
        <Layout>
            <Navbar
            name='Paisalll'
            email='faizaltriasaa@gmail.com'
            imgUser={FotoProfile}
            />
            <ChatModal
            img={FotoProfile}
            isOpen={showChat}
            isClose={()=> setShowChat(false)}
            >
                <div className="chat chat-start">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img src={FotoProfile} />
                        </div>
                    </div>
                    <div className="chat-header">
                        Obi-Wan Kenobi
                    </div>
                    <div className="chat-bubble">You were the Chosen One! Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia sequi assumenda eveniet accusantium tempora dolore dolorum fugiat doloremque rerum possimus commodi ipsam illum, dolor laborum harum voluptatibus unde maiores voluptates.</div>
                    </div>
                    <div className="chat chat-end">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img src={FotoProfile} />
                        </div>
                    </div>
                    <div className="chat-header">
                        Anakin
                    </div>
                    <div className="chat-bubble bg-lapak">I hate you! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam voluptatem architecto deleniti error nisi quam eveniet tenetur veniam, ab ducimus eaque soluta numquam consequatur unde nostrum qui magnam alias commodi!</div>
                </div>
            </ChatModal>
            <div className="flex w-11/12">
                <div className="flex mt-10 ml-auto">
                    <div className="w-96 h-fit bg-white border rounded-xl shadow-xl flex flex-col ">
                        <div className="flex flex-col transition-all duration-300">
                            <button className='btn w-20' onClick={()=> setShowChat(true)}>Cek Chat</button>
                            <div className="flex flex-row justify-between border-b-2 mx-3 mt-2">
                                <p className='my-auto text-xl font-semibold'>Filter</p>
                                    <label className="swap swap-rotate">
                                        <input type="checkbox" />
                                        <IoIosArrowDropup onClick={()=> setShowFilter(true)}  className="swap-on fill-current w-8 h-8"/>
                                        <IoIosArrowDropdown onClick={()=> setShowFilter(false)} className="swap-off fill-current w-8 h-8"/>
                                    </label>
                            </div>
                            <div className={`mx-2 text-lapak font-semibold w-80 ${ showFilter ? 'block' : 'hidden' }`}>
                                <div className="px-4 py-3 text-sm text-gray-900"> 
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div className='w-full'>
                                            <label className="text-zinc-800 text-[18px] font-semibold" htmlFor='kategori'>
                                                Kategori
                                            </label>
                                            <select className=" border-2 mt-2 border-lapak input input-success w-full max-w-full rounded-lg bg-zinc-100 px-4 font-normal text-zinc-800 placeholder-slate-400 disabled:bg-slate-400 text-[16px]"
                                            defaultValue={''}
                                            id='kategori'
                                            name='kategori'
                                            value={formValues.kategori}
                                            onChange={handleSelectChange}
                                            >
                                                <option value={'kaos'}>Kaos</option>
                                                <option value={'sepatu'}>Sepatu</option>
                                                <option value={'celana'}>Celana</option>
                                                <option value={'sembako'}>Sembako</option>
                                                <option value={'sendal'}>Sendal</option>
                                                <option value={'tas'}>Tas</option>
                                            </select>
                                        </div>
                                        <div className="w-full">
                                            <label className="text-zinc-800 text-[18px] font-semibold" htmlFor="minprice">Minimum Price</label>
                                                <CurrencyInput
                                                    className='input border-2 mt-2 border-lapak input input-success w-full max-w-full rounded-lg bg-zinc-100 px-4 font-normal text-zinc-800 placeholder-slate-400 disabled:bg-slate-400 text-[16px]'
                                                    id="minprice"
                                                    name="minprice"
                                                    prefix='Rp. '
                                                    decimalSeparator=','
                                                    groupSeparator='.'
                                                    placeholder="Rp. "
                                                    defaultValue={formValues.minprice}
                                                    decimalsLimit={2}
                                                    onValueChange={(value, name) => setFormValues({ ...formValues, minprice: value ? parseInt(value) : 0 })}
                                                />
                                        </div>
                                        <div className="">
                                            <label className="text-zinc-800 text-[18px] font-semibold" htmlFor="maxprice">Maximum Price</label>
                                                <CurrencyInput
                                                    className='input border-2 mt-2 border-lapak input input-success w-full max-w-full rounded-lg bg-zinc-100 px-4 font-normal text-zinc-800 placeholder-slate-400 disabled:bg-slate-400 text-[16px]'
                                                    id="maxprice"
                                                    name="maxprice"
                                                    prefix='Rp. '
                                                    decimalSeparator=','
                                                    groupSeparator='.'
                                                    placeholder="Rp. "
                                                    defaultValue={formValues.maxprice}
                                                    decimalsLimit={2}
                                                    onValueChange={(value, name) => setFormValues({ ...formValues, maxprice: value ? parseInt(value) : 0 })}
                                                />
                                        </div>
                                        <div className="">
                                            <label className="text-zinc-800 text-[18px] font-semibold" htmlFor="minrating" id='minrating'>Maximum Price</label>
                                            <Rating
                                                itemStyles={customStyles}
                                                isRequired
                                                style={{ maxWidth: 200 }}
                                                value={formValues.minrating}
                                                // visibleLabelId="minrating"
                                                onChange={(selectedValue: any) =>
                                                setFormValues((prevData) => ({ ...prevData, minrating: selectedValue }))
                                                }
                                            />
                                        </div>
                                        <CustomButton
                                        id='submit'
                                        name='submit'
                                        label='submit'
                                        onClick={()=> console.log(formValues)}
                                        />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="my-4 gap-y-5 gap-x-2 grid grid-cols-5 mx-auto mt-10">
                    <ProdukCard
                    produkName='Apple Watch Series 7 GPS, Alumunium Case, starligth sport'
                    location='jakarta'
                    sell={2}
                    id={1}
                    key={1}
                    image={'https://sellercenter.unkl-ns.com/gallery/items/604/img_604_i55_3_1667709495.jpg'}
                    rating={4}
                    price={125000}
                    />
                    <ProdukCard
                    produkName='Apple Watch Series 7 GPS, Alumunium Case, starligth sport'
                    location='jakarta'
                    id={1}
                    sell={2}
                    key={2}
                    image={'data:image/jpeg;base64,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'}
                    rating={5}
                    price={125000}
                    />
                    <ProdukCard
                    produkName='Apple Watch Series 7 GPS, Alumunium Case, starligth sport'
                    location='jakarta'
                    id={1}
                    sell={2}
                    key={3}
                    image={'https://sellercenter.unkl-ns.com/gallery/items/604/img_604_i55_3_1667709495.jpg'}
                    rating={5}
                    price={125000}
                    />
                    <ProdukCard
                    produkName='Apple Watch Series 7 GPS, Alumunium Case, starligth sport'
                    location='jakarta'
                    id={1}
                    sell={2}
                    key={4}
                    image={'https://sellercenter.unkl-ns.com/gallery/items/604/img_604_i55_3_1667709495.jpg'}
                    rating={3}
                    price={125000}
                    />
                    <ProdukCard
                    produkName='Apple Watch Series 7 GPS, Alumunium Case, starligth sport'
                    location='jakarta'
                    id={1}
                    sell={2}
                    key={5}
                    image={'https://sellercenter.unkl-ns.com/gallery/items/604/img_604_i55_3_1667709495.jpg'}
                    rating={3}
                    price={125000}
                    />
                    <ProdukCard
                    produkName='Apple Watch Series 7 GPS, Alumunium Case, starligth sport'
                    location='jakarta'
                    sell={2}
                    id={1}
                    key={6}
                    image={'https://sellercenter.unkl-ns.com/gallery/items/604/img_604_i55_3_1667709495.jpg'}
                    rating={3}
                    price={125000}
                    />
                </div>
            </div>
        </Layout>
    )
}

export default HomeFilter