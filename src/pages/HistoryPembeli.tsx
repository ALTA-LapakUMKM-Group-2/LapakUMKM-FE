import React, { useState, useEffect } from "react"

import { Rating } from "@smastrom/react-rating"
import '@smastrom/react-rating/style.css'

import withReactContent from "sweetalert2-react-content"
import Swal from "sweetalert2"

import CustomButton from "../components/CustomButton"
import FeedbackCard from "../components/FeedbackCard"
import CustomInput from "../components/CutomInput"
import Loading from "../components/Loading"
import Layout from "../components/Layout"
import Navbar from "../components/Navbar"
import Modal from "../components/Modal"

import Kaos from "../assets/kaos.png"
import { string } from "prop-types"
import axios from "axios"

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
  const [showFeedback, setShowFeedback] = useState<boolean>(false)
  const [value, setValue] = useState<FormValues>(initialFormValues)
  const [feedback, setFeedback] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [disable, setDisable] = useState<boolean>(true)

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

  return (
    <Layout>
      {loading ? <Loading /> :
        <>
          <Navbar />
          <div className="px-8 md:px-28 lg:px-52 2xl:px-80 mb-28">
            <h1 className="mt-12 mb-14 text-[20px] md:text-[22px] lg:text-[24px] 2xl:text-[30px] font-semibold dark:text-white">History Pembelian</h1>

            <FeedbackCard
              id={1}
              produkImg={Kaos}
              sellerName="Toko@7"
              produkName='Baju Jelek'
              size={'L'}
              price={50000}
              status="Done"
              rating={4}
              quantity={2}
              handleFeedback={() => setShowFeedback(true)}
            />

            <FeedbackCard
              id={1}
              produkImg={Kaos}
              sellerName="Toko@7"
              produkName='Baju Jelek'
              size={'L'}
              price={35000}
              status="Pending"
              rating={0}
              quantity={2}
              handleFeedback={() => setShowFeedback(true)}
            />
          </div>

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