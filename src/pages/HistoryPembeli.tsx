import { formatValue } from "react-currency-input-field"
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"
import axios from "axios"

import { Rating } from "@smastrom/react-rating"
import '@smastrom/react-rating/style.css'

import withReactContent from "sweetalert2-react-content"
import Swal from 'sweetalert2/dist/sweetalert2.all.js';
import { HistoryType, DataType } from "../utils/types/DataType"

import CustomButton from "../components/CustomButton"
import CardHistory from "../components/CardHistory"
import CustomInput from "../components/CutomInput"
import Loading from "../components/Loading"
import Layout from "../components/Layout"
import Navbar from "../components/Navbar"
import Modal from "../components/Modal"

interface FormValues {
  rating: number;
}
const initialFormValues: FormValues = {
  rating: 0,
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
  const [value, setValue] = useState<FormValues>(initialFormValues)
  const [feedback, setFeedback] = useState<string>("")
  const [history, setHistory] = useState<HistoryType[]>([])
  const [detailHistory, setDetailHistory] = useState<HistoryType[]>([])
  const [FeedbackData, setFeedbackData] = useState<HistoryType[]>([])
  const [product, setProduct] = useState<DataType[]>([])
  const [productId, setProductId] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [disable, setDisable] = useState<boolean>(true)
  const [showProduk, setShowProduk] = useState<boolean>(false)

  useEffect(() => {
    dataTransaksi()
  }, [])

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
    setShowProduk(true)
    setLoading(true)
    axios
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

        const productIds = res.data.data.map((id: any) => id.product_id)
        if (productIds) {
          dataProdukId(productIds)
        }
      })
      .catch((err) => {
        console.log(err.response.data)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    productId ? dataProdukId(productId) : ""
  }, [])

  async function dataProdukId(productId: any[]) {
    setLoading(true)
    const combine: any = []
    productId.forEach((id) => {
      axios
        .get(`https://lapakumkm.mindd.site/products/${id}`)
        .then((res) => {
          combine.push(res.data.data)
          setProduct(combine)
        })
        .catch((err) => {
          console.log(err.response.data.message)
        })
        .finally(() => setLoading(false))
    })
  }
  console.log('test product ke 705', product);
  console.log('test detail history 999', detailHistory);

  const [combineProduk, setCombineProduk] = useState<HistoryType[]>([])

  useEffect(() => {
    if (product) {
      const cekDetail = detailHistory.map((item: any) => {
        const combine4: any = product.find((i: any) => i.id === item.product_id)
        if (combine4) {
          const data = {
            product_image: combine4.product_image[0].image,
            shop_name: combine4.user.shop_name,
            size: combine4.size
          }
          return {
            ...item,
            ...data
          }
        }
      })
      console.log('cek terakhir sebelom puasa', cekDetail);
      setCombineProduk(cekDetail)
    }
  }, [product, detailHistory]);

  useEffect(() => {
    dataFeedback()
  }, [])

  function dataFeedback() {
    setLoading(true)
    axios
      .get(`https://lapakumkm.mindd.site/feedbacks`, {
        headers: {
          Authorization: `Bearer ${cookie.token}`
        }
      })
      .then((res) => {
        setFeedbackData(res.data.data)
      })
      .catch((err) => {
        console.log(err.response.data)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (value.rating !== 0) {
      setDisable(false);
    } else {
      setDisable(true)
    }
  }, [value.rating, feedback])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const body = {
      rating: value.rating,
      feedback
    };

    axios
      .post(`https://virtserver.swaggerhub.com/UMARUUUN11_1/ALTA-LapakUMKM/1.0.0/feedbacks`, body)
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
      .finally(() => setLoading(false))
  }

  const handleBayar = (payment_link: string) => {
    window.open(payment_link, "_blank")
  }

  return (
    <Layout>
      {loading ? <Loading /> :
        <>
          <Navbar />
          <div className="px-8 md:px-28 lg:px-52 2xl:px-80 mb-28">
            <h1 className="mt-12 mb-14 text-[20px] md:text-[22px] lg:text-[24px] 2xl:text-[30px] font-semibold dark:text-white">History Pembelian</h1>

            {history ?
              history.map((item, index) => (
                <div className="mb-10 rounded-lg shadow-[2px_4px_8px_0px_rgba(0,0,0,0.3)] bg-white w-[35vw] p-5 text-zinc-800 text-[20px] ">
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

                  <div className="flex mt-10 w-9/12 ml-auto ">
                    <div className='ml-auto'>
                      <CustomButton
                        id="btn-balas"
                        label='Bayar sekarang'
                        type='submit'
                        onClick={() => handleBayar(item.payment_link)}
                      />
                    </div>

                    <div className='ml-auto'>
                      <CustomButton
                        id="btn-bayar"
                        label='Detail transaksi'
                        onClick={() => dataTransaksiId(item.id)}
                        className="rounded-xl bg-white border border-lapak w-full max-w-full px-6 py-2 text-[15px] md:text-[15px] lg:text-[14px] 2xl:text-[18px] font-semibold capitalize tracking-wider text-lapak hover:bg-lapak hover:text-zinc-50 disabled:cursor-not-allowed disabled:bg-zinc-400 "
                      />
                    </div>
                  </div>
                </div>
              ))
              :
              <p className="text-zinc-700 text-[22px] mt-20 font-semibold dark:text-zinc-50 underline-offset-8 underline decoration-zinc-400 dark:decoration-slate-50">Anda Belum memiliki riwayat pembelian</p>}
          </div>

          <Modal isOpen={showProduk} size='w-[40vw]' isClose={() => setShowProduk(false)} title="Detail Transaki" >
            <form className="p-5">
              {combineProduk.map((item) => (
                <CardHistory
                  id={item.id}
                  produkImg={item.product_image}
                  sellerName={item.shop_name}
                  produkName={item.product.product_name}
                  size={item.size}
                  price={50000}
                  totalPrice={item.product.price}
                  status="Done"
                  quantity={item.total_product}
                  rating={item.rating}
                  handleFeedback={() => setShowFeedback(true)}
                />
              ))}
            </form>
          </Modal>

          <Modal isOpen={showFeedback} size='w-96' isClose={() => setShowFeedback(false)} title="Review" >
            <form onSubmit={(e) => handleSubmit(e)}>
              <p className="text-[18px] font-semibold text-zinc-800 border-t-2 border-zinc-600 pt-4 ">Ulasan anda :</p>
              <textarea
                id="input-ulasan"
                name="Feedback"
                placeholder="Masukkan ulasan anda disini"
                typeof="text"
                className="border-2 w-11/12 border-zinc-300 rounded-lg p-2 mt-2"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />

              <p className="text-[18px] font-semibold text-zinc-800 mt-4">Penilaian anda :</p>
              <div className="rating">
                <Rating
                  itemStyles={customStyles}
                  isRequired
                  style={{ maxWidth: 120 }}
                  value={value.rating}
                  onChange={(selectedValue: any) => setValue((data) => ({ ...data, rating: selectedValue }))}
                />
              </div>

              <div className="mt-4 px-2">
                <CustomButton
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