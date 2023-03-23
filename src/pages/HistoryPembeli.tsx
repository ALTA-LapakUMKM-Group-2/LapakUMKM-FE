import Layout from "../components/Layout"
import Navbar from "../components/Navbar"

import Kaos from "../assets/kaos.png"
import Kaos1 from "../assets/profile.jpg"
import CustomButton from "../components/CustomButton"

const HistoryPembeli = () => {

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

    </Layout>
  )

}

export default HistoryPembeli