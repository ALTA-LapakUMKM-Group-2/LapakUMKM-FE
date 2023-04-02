import { formatValue } from "react-currency-input-field"
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"
import axios from "axios"
import * as CollapsiblePrimitive  from "@radix-ui/react-collapsible";
import { Rating } from "@smastrom/react-rating"
import '@smastrom/react-rating/style.css'
import { HiChevronDown } from "react-icons/hi";
import withReactContent from "sweetalert2-react-content"
import Swal from 'sweetalert2/dist/sweetalert2.all.js';
import { HistoryType, DataType } from "../utils/types/DataType"
import NotFound from '../assets/download.png'

import CustomButton from "../components/CustomButton"
import CardHistory from "../components/CardHistory"
import CustomInput from "../components/CutomInput"
import Loading from "../components/Loading"
import Layout from "../components/Layout"
import Navbar from "../components/Navbar"
import Modal from "../components/Modal"
import clsx from "clsx"
import TextArea from "../components/TextArea"


interface FormValues {
  comment: string;
  rating: number;
}

const initialFormValues: FormValues = {
  comment: '',
  rating: 0
};

const HistoryPembeli = () => {
  const StarDrawing = (
    <path d="M11.0748 3.25583C11.4141 2.42845 12.5859 2.42845 12.9252 3.25583L14.6493 7.45955C14.793 7.80979 15.1221 8.04889 15.4995 8.07727L20.0303 8.41798C20.922 8.48504 21.2841 9.59942 20.6021 10.1778L17.1369 13.1166C16.8482 13.3614 16.7225 13.7483 16.8122 14.1161L17.8882 18.5304C18.1 19.3992 17.152 20.0879 16.3912 19.618L12.5255 17.2305C12.2034 17.0316 11.7966 17.0316 11.4745 17.2305L7.60881 19.618C6.84796 20.0879 5.90001 19.3992 6.1118 18.5304L7.18785 14.1161C7.2775 13.7483 7.1518 13.3614 6.86309 13.1166L3.3979 10.1778C2.71588 9.59942 3.07796 8.48504 3.96971 8.41798L8.50046 8.07727C8.87794 8.04889 9.20704 7.80979 9.35068 7.45955L11.0748 3.25583Z" stroke="#fdd231" strokeWidth="1" ></path>
  );

  const customStyles = {
    itemShapes: StarDrawing,
    activeFillColor: '#FDD231',
    inactiveFillColor: '#ffffff',
  };

  const MySwal = withReactContent(Swal)
  const navigate = useNavigate()
  const [cookie, setCookie] = useCookies(["token"])
  const [showFeedback, setShowFeedback] = useState<boolean>(false)
  const [showEditFeedback, setShowEditFeedback] = useState<boolean>(false)
  const [value, setValue] = useState<FormValues>(initialFormValues)
  const [feedback, setFeedback] = useState<string>("")
  const [history, setHistory] = useState<HistoryType[]>([])
  const [detailHistory, setDetailHistory] = useState<HistoryType[]>([])
  const [FeedbackData, setFeedbackData] = useState<HistoryType[]>([])
  const [product, setProduct] = useState<DataType[]>([])
  const [productId, setProductId] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingItem, setLoadingItem] = useState<boolean>(false)
  const [disable, setDisable] = useState<boolean>(true)
  const [showProduk, setShowProduk] = useState<boolean>(false)
  const [openItemId, setOpenItemId] = useState(null);
  const [transactionsId, setTransactionsId] = useState<number>()
  const [prodFeedId, setProdFeedId] = useState<number>()
  const [prodTransDetail, setProdTransDetail] = useState<number>()

  function handleItemClick(itemId:any) {
    setOpenItemId((prevOpenItemId) =>
      prevOpenItemId === itemId ? null : itemId
    );
  }
  useEffect(() => {
    dataTransaksi()
  }, [])

  const handleIdClick = (id:any) => {
    setTransactionsId(id.product_transaction_id);
    setProdFeedId(id.product_id)
    setProdTransDetail(id.id)
  }

  useEffect(() => {
    if (transactionsId !== null && prodFeedId !== null) {
      console.log("ini id trans", transactionsId);
      console.log("ini id prod", prodFeedId);
    }
  }, [transactionsId, prodFeedId]);

  function dataTransaksi() {
    setLoading(true)
    axios
      .get(`https://lapakumkm.mindd.site/transactions`, {
        headers: {
          Authorization: `Bearer ${cookie.token}`
        }
      })
      .then((res) => {
        setHistory(res.data.data)
      })
      .catch((err) => {
        console.log(err.response.data)
      })
      .finally(() => setLoading(false))
  }

  const dataTransaksiId = async (id: number) => {
    setLoading(true)
    await axios
      .get(`https://lapakumkm.mindd.site/transactions/${id}/details`, {
        headers: {
          Authorization: `Bearer ${cookie.token}`
        }
      })
      .then((res) => {
        res.data.data.image = ''
        res.data.data.size = ''
        res.data.data.shop_name = ''
        setDetailHistory(res.data.data)
        console.log("ini history coo",res.data.data)
        const productIds = res.data.data.map((id: any) => id.product_id)
        if (productIds) {
          setProductId(productIds)
          dataProdukId(productIds)
        }
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setLoading(false))
  }
  
  useEffect(() => {
    productId ? dataProdukId(productId) : ""
  }, [])
  
  const dataProdukId = async (productId: any[]) => {
    setLoadingItem(true)
    const combine: any = []
    await productId.forEach((id) => {
      axios.get(`https://lapakumkm.mindd.site/products/${id}`)
        .then((res) => {
          combine.push(res.data.data)
          setProduct(combine)
        })
        .catch((err) => {
          console.log(err.response.data.message)
        })
        .finally(() => setLoadingItem(false))
    })
  }



  const [combineProduk, setCombineProduk] = useState<HistoryType[] | any>([])

  useEffect(() => {
    if (product) {
      const cekDetail = detailHistory.map((item: any) => {
        const combine4: any = product.find((i: any) => i.id === item.product_id)
        if (combine4) {
          const data = {
            product_image: combine4.product_image ? combine4.product_image[0].image : NotFound,
            shop_name: combine4.user.shop_name,
            size: combine4.size
          }
          return {
            ...item,
            ...data
          }
        }else{
          return item
        }
      })
      setCombineProduk(cekDetail)
    }
  }, [product, detailHistory]);
  
  
  const feedbackEndpoint = 'https://lapakumkm.mindd.site/feedbacks'
  

  useEffect(() => {
    if (value.rating !== 0) {
      setDisable(false);
    } else {
      setDisable(true)
    }
  }, [value.rating, feedback])

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    setValue(initialFormValues);
    const body = {
      product_id: prodFeedId,
      transaction_id: transactionsId,
      product_transaction_detail_id: prodTransDetail,
      rating: value.rating,
      feedback: value.comment,
    };
    await axios.post(feedbackEndpoint, body,{
        headers:{
          Authorization: `Bearer ${cookie.token}`,
          "Content-Type": 'application/json',
          Accept: 'application/json'
        }
      })
      .then((res) => {
        const { message } = res.data;
        MySwal.fire({
          icon: "success",
          title: message,
          text: "Ulasan berhasil terkirim",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1200,
        })
          setShowFeedback(false)
          dataProdukId(productId)
          dataTransaksi()
          handleOpenCollapsible(null)
      })
      .catch((err) => {
        const { data } = err.response;
        MySwal.fire({
          icon: "error",
          title: data.message,
          text: "Ulasan gagal terkirim",
          showCancelButton: false,
          confirmButtonText: "Berikan ulang",
          confirmButtonColor: "#31CFB9"
        })
      })
    }

    
  const handleBayar = (payment_link: string) => {
    window.open(payment_link, "_blank")
  }
  const [historyDetail, setHistoryDetail] = useState<any>(null);

  const handleOpenCollapsible = (id:any) => {
    const selectedHistory:any = history.find((item) => item.id === id);
    setHistoryDetail(selectedHistory);
  };
  console.log("comcafbcdasdbf", combineProduk);
  
  return (
    <Layout>
      {loading ? <Loading /> :
        <>
          <Navbar />
          <div className="flex flex-col justify-center items-center">
            <h1 className="mt-12 mb-14 text-[20px] md:text-[22px] lg:text-[24px] 2xl:text-[30px] font-semibold dark:text-white">History Pembelian</h1>
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-5">
              {history ? history.map((item)=>{
                return(
                  <CollapsiblePrimitive.Root key={item.id} open={historyDetail?.id === item.id} onOpenChange={() => handleOpenCollapsible(item.id)}>
                    <CollapsiblePrimitive.Trigger
                      className={clsx(
                        "group flex w-72 sm:w-full select-none items-center justify-between rounded-md px-4 py-2 text-left text-sm font-medium",
                        "bg-white text-gray-900 dark:bg-slate-700 dark:text-gray-100 shadow dark:border dark:border-lapak",
                        "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                      )}
                      onClick={() => dataTransaksiId(item.id)}
                    >
                      <div className="mb-1 rounded-lg bg-white text-gray-900 dark:bg-slate-700 dark:text-gray-100 
                      select-none items-center justify-between rounded-md px-4 py-2 text-left text-sm font-medium">
                        <p>{`Total Barang : ${item.total_product}`}</p>
                        <p className=''>Total Belanja :
                          {formatValue({
                            value: JSON.stringify(item.total_payment),
                            groupSeparator: '.',
                            decimalSeparator: ',',
                            prefix: ' Rp. ',
                          })}
                        </p>
                        <p className="capitalize">{`Status Pembayaran : ${item.payment_status}`}</p>

                        <div className="flex mt-2 flex-wrap gap-y-2 sm:gap-4 ">
                          <div className='ml-auto'>
                            <CustomButton
                              id="btn-balas"
                              label='Bayar sekarang'
                              type='submit'
                              className='btn btn-xs rounded-lg border-none bg-lapak text-sm w-36 font-semibold capitalize tracking-wider hover:bg-sky-500 hover:border-none hover:text-zinc-50 disabled:cursor-not-allowed disabled:bg-zinc-400'
                              onClick={()=> {handleBayar(item.payment_link)}}
                            />
                          </div>

                          <div className='ml-auto'>
                            <CustomButton
                              id="btn-bayar"
                              label='Detail transaksi'
                              onClick={() => dataTransaksiId(item.id)}
                              className="btn btn-xs rounded-lg bg-white border border-lapak text-sm w-36 font-semibold capitalize tracking-wider text-lapak hover:bg-lapak hover:border-none hover:text-zinc-50 disabled:cursor-not-allowed disabled:bg-zinc-400 "
                            />
                          </div>
                        </div>
                      </div>
                      <HiChevronDown className="transform duration-300 ease-in-out group-radix-state-open:rotate-90" />
                    </CollapsiblePrimitive.Trigger>
                    <CollapsiblePrimitive.Content className="mt-4 flex flex-col space-y-4 mb-10">
                    {loadingItem ? 
                    <div className={clsx(
                      "group flex w-full select-none items-center justify-between rounded-md px-4 py-2 text-left text-sm font-medium",
                      "bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100",
                      "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                    )}>
                      <Loading/> 
                    </div>
                    :
                      <div className="grid">
                        {combineProduk ? 
                          <>
                          {combineProduk.map((item:any) => (
                            <CardHistory
                              key={item.id}
                              id={item.id}
                              produkImg={item.product_image ? item.product_image : NotFound}
                              sellerName={item.shop_name}
                              produkName={item.product.product_name}
                              size={item.size}
                              price={item.product.price}
                              totalPrice={item.product.price}
                              status="Done"
                              quantity={item.total_product}
                              rating={item.rating}
                              handleEdit={()=> navigate(`/detail/${item.product_id}`)}
                              handleFeedback={() => {setShowFeedback(true), handleIdClick(item)
                              }}
                            />
                          ))}
                          </> : <></> 
                        }
                      </div>
                    }
                    </CollapsiblePrimitive.Content>
                  </CollapsiblePrimitive.Root>
                )
              })
              :
              <>
                <p className="text-zinc-700 text-[22px] mt-20 font-semibold dark:text-zinc-50 underline-offset-8 underline decoration-zinc-400 dark:decoration-slate-50">Anda Belum memiliki riwayat pembelian</p>
              </>
              }
            </div>
          </div>
          <Modal isOpen={showFeedback} size='w-96' isClose={() => setShowFeedback(false)} title="Beri Ulasan" >
            <form onSubmit={handleSubmit} className="w-10/12 mx-auto mt-5">
              <TextArea
                label="Ulasan anda"
                name='comment'
                value={value.comment}
                onChange={handleTextAreaChange}
                placeholder="tulis ulasan anda"
              />
              <label className="text-xs font-medium text-gray-700 dark:text-gray-400 text-[16px] md:text-[16px] lg:text-[16px] 2xl:text-[18px] dark:text-white" htmlFor="minrating" id='minrating'>Beri Rating</label>
              <Rating
                itemStyles={customStyles}
                isRequired
                style={{ maxWidth: 200 }}
                value={value.rating}
                visibleLabelId="rating"
                onChange={(selectedValue: any) => setValue((data) => ({ ...data, rating: selectedValue }))}
              />
              <div className="mt-4 px-2">
                <CustomButton
                  type="submit"
                  id="btn-feedback"
                  label="Tambah Ulasan"
                  loading={disable || loading}
                />
              </div>
            </form>
          </Modal>
        </>
      }

    </Layout>
  )

}

export default HistoryPembeli