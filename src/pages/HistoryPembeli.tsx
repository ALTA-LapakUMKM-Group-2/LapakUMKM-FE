import Layout from "../components/Layout"
import Navbar from "../components/Navbar"

import Kaos from "../assets/kaos.png"
import Kaos1 from "../assets/profile.jpg"
import CustomButton from "../components/CustomButton"
import { useState } from "react"
import Modal from "../components/Modal"
import CustomInput from "../components/CutomInput"

const HistoryPembeli = () => {

  const [showFeedback, setShowFeedback] = useState<boolean>(false)
  const [modalFeedback, setModalFeedback] = useState<string>("modal")

  const modalfeedback = () => {
    setModalFeedback("modal-open")
  }

  return (
    <Layout>
      <Navbar />
      <div className="w-full h-full px-8 md:px-28 lg:px-52 mb-28">
        <h1 className="mt-12 mb-14 text-[24px] font-semibold">History Pembelian</h1>

        <div className="mt-5 md:w-11/12 lg:w-8/12 px-8 py-4 bg-white shadow-[2px_2px_8px_0px_rgba(0,0,0,0.4)]">
          <p className="border-b-2 pb-2">Toko Arif Muhammad</p>
          <div className="flex flex-col md:flex-row lg:flex-row gap-5 mt-4">
            <img src={Kaos} alt="produk.jpg" className="h-64 md:h-40 lg:h-44 " />
            <div className="space-y-1">
              <p>Kaos Lengan Pendek</p>
              <p>Ukuran : L</p>
              <p><span>Rp. 125.000</span> x 2</p>
              <p>Total : Rp. 250.000</p>
              <p>Status : Sukses</p>

              <div className="flex flex-col-reverse md:flex-row-reverse lg:flex-row-reverse">
                <div className="mt-5 md:mt-0 lg:mt-0 md:ml-20 lg:ml-28">
                  <CustomButton
                    id="btn-ulasan"
                    label="Ulasan"
                    onClick={() => modalfeedback()}
                  />
                </div>

                <div className="rating">
                  <input type="radio" name="rating-0" className="mask mask-star-2 bg-yellow-400" />
                  <input type="radio" name="rating-0" className="mask mask-star-2 bg-yellow-400" />
                  <input type="radio" name="rating-0" className="mask mask-star-2 bg-yellow-400" />
                  <input type="radio" name="rating-0" className="mask mask-star-2 bg-yellow-400" defaultChecked />
                  <input type="radio" name="rating-0" className="mask mask-star-2 bg-yellow-400" />
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="mt-5 md:w-11/12 lg:w-8/12 px-8 py-4 bg-white shadow-[2px_2px_8px_0px_rgba(0,0,0,0.4)]">
          <p className="border-b-2 pb-2">Toko Arif Muhammad</p>
          <div className="flex flex-col md:flex-row lg:flex-row gap-5 mt-4">
            <img src={Kaos} alt="produk.jpg" className="h-64 md:h-40 lg:h-44 " />
            <div className="space-y-1">
              <p>Kaos Lengan Pendek</p>
              <p>Ukuran : L</p>
              <p><span>Rp. 125.000</span> x 2</p>
              <p>Total : Rp. 250.000</p>
              <p>Status : Sukses</p>
              <div className="flex flex-col-reverse md:flex-row-reverse lg:flex-row-reverse">
                <div className="mt-5 md:mt-0 lg:mt-0 md:ml-20 lg:ml-28">
                  <CustomButton
                    id="btn-ulasan"
                    label="Ulasan"
                  />
                </div>

                <div className="rating">
                  <input type="radio" name="rating-1" className="mask mask-star-2 bg-yellow-400" />
                  <input type="radio" name="rating-1" className="mask mask-star-2 bg-yellow-400" />
                  <input type="radio" name="rating-1" className="mask mask-star-2 bg-yellow-400" />
                  <input type="radio" name="rating-1" className="mask mask-star-2 bg-yellow-400" defaultChecked />
                  <input type="radio" name="rating-1" className="mask mask-star-2 bg-yellow-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="open-modalEdit" className={`modal ${modalFeedback}`}>
        <div className="modal-box max-w-full shadow-xl md:w-6/12 lg:w-4/12">
          <div
            id="btn-closeModal1"
            onClick={() => setModalFeedback("modal")}
            className="rounded-full w-7 text-center absolute right-4 top-3 text-[20px] font-bold text-zinc-800 hover:cursor-pointer hover:bg-lapak hover:text-zinc-100"
          >
            ✕
          </div>
          <div className="bg-white">
            <p className="text-[18px] font-semibold text-zinc-800">Ulasan anda :</p>
            <textarea
              id="input-ulasan"
              name="Feedback"
              placeholder="Masukkan ulasan anda disini"
              typeof="text"
              className="border-2 w-11/12 border-zinc-300 rounded-lg p-2 mt-2"
            />

            <p className="text-[18px] mb-2 font-semibold text-zinc-800 mt-5">Berikan penilaian anda </p>
            <div className="rating">
              <input type="radio" name="rating-1" className="mask mask-star-2 bg-yellow-400" />
              <input type="radio" name="rating-1" className="mask mask-star-2 bg-yellow-400" />
              <input type="radio" name="rating-1" className="mask mask-star-2 bg-yellow-400" />
              <input type="radio" name="rating-1" className="mask mask-star-2 bg-yellow-400" defaultChecked />
              <input type="radio" name="rating-1" className="mask mask-star-2 bg-yellow-400" />
            </div>

            <div className="mt-8 pr-8">
              <CustomButton
                id="btn-feedback"
                label="Tambahkan Ulasan"
              />
            </div>
          </div>
        </div>
      </div>

      {/* <Modal
        isOpen={showFeedback}
        isClose={() => setShowFeedback(false)}
        title="TEst"
        size="w-4/12"
      >
        <div className="bg-white">
          <p className="text-[18px] font-semibold text-zinc-800">Ulasan anda :</p>
          <textarea
            id="input-ulasan"
            name="Feedback"
            placeholder="Masukkan ulasan anda disini"
            typeof="text"
            className="border-2 border-zinc-300 rounded-lg p-2 mt-2"
          />

          <p className="text-[18px] font-semibold text-zinc-800 mt-5">Berikan penilaian anda </p>
        </div>
      </Modal> */}

    </Layout>
  )

}

export default HistoryPembeli