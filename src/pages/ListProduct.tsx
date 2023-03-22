import { useState } from "react"

import CustomButton from "../components/CustomButton"
import Layout from "../components/Layout"
import Navbar from "../components/Navbar"

import Kaos from "../assets/kaos.png"

import { AiFillStar } from "react-icons/ai"

const ListProduct = () => {

  const [price, setPrice] = useState<number>(250000)

  return (
    <Layout>
      <Navbar />
      <div className="w-full h-screen mb-48">
        <p className="text-center mt-5 font-medium text-[28px] tracking-widest">Laporan Minggu Ini</p>
        <div className="mt-10 flex flex-col md:flex-row lg:flex-row items-center justify-center gap-5 md:gap-16 lg:gap-20">
          <div className="bg-white rounded-lg w-80 py-6 text-center shadow-[2px_4px_4px_0px_rgba(0,0,0,0.5)]">
            <p className="text-[24px] font-medium">Barang paling laris</p>
            <p className="mt-6">Kaos Lengan Pendek Nyaman</p>
            <p>Total Penjualan : Rp 2.000.000</p>
          </div>

          <div className="bg-white py-8 rounded-lg w-80 text-center shadow-[2px_4px_4px_0px_rgba(0,0,0,0.5)]">
            <p className="text-[24px] font-medium">Barang paling laris</p>
            <p className="text-[24px] font-medium mt-5  ">Rp 12.000.000</p>
          </div>
        </div>

        <div className="flex flex-col mt-16 mx-4 md:mx-16 lg:mx-20">
          <p className="text-[20px] font-semibold text-zinc-800">Toko Arif Muhammad</p>

          <div className="w-52 md:w-52 lg:w-56 mt-5 ml-auto">
            <CustomButton
              id="btn-tambah produk"
              label="Tambah Produk"
            />
          </div>

          <div className="relative overflow-x-auto mt-8">
            <table className="w-full text-left text-gray-500 ">
              <thead className="text-[16px] text-zinc-800 font-semibold bg-white">
                <tr className="border-b-2">
                  <th scope="col" className="px-4 py-3">
                    NO
                  </th>
                  <th scope="col" className="px-6 py-3 text-start">
                    NAMA PRODUK
                  </th>
                  <th scope="col" className="px-4 py-3">
                    HARGA
                  </th>
                  <th scope="col" className="text-center px-2 py-3">
                    STOK BARANG
                  </th>
                  <th scope="col" className="text-center px-2 py-3">
                    PENJUALAN
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody className="text-[15px]">
                <tr className="bg-white border-b ">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    1
                  </th>

                  <td className="px-8 py-4">
                    <img src={Kaos} alt="produk.jpg" className="float-left w-20 mr-2" />
                    <p>Kaos Lengan Pendek</p>
                    <p className="flex items-end gap-1"><AiFillStar className="text-yellow-400" size={24} /> 4.5</p>
                  </td>

                  <td className="px-4 py-4">
                    Rp {price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
                  </td>

                  <td className="py-4 text-center">
                    1
                  </td>

                  <td className="py-4 text-center">
                    1
                  </td>

                  <td className="flex flex-col gap-2 px-6 py-16 md:py-14 lg:py-4">
                    <CustomButton
                      id="btn-perbarui"
                      label="Perbarui"
                      className="rounded-xl bg-lapak px-2 md:px-2 lg:px-0 py-1 text-[18px] font-semibold capitalize text-zinc-50 hover:bg-sky-500"
                    />

                    <CustomButton
                      id="btn-hapus"
                      label="Hapus"
                      className="rounded-xl bg-red-500 py-1 text-[18px] font-semibold capitalize text-zinc-50 hover:bg-orange-500"
                    />
                  </td>
                </tr>
                <tr className="bg-white border-b ">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    2
                  </th>

                  <td className="px-8 py-4">
                    <img src={Kaos} alt="produk.jpg" className="float-left w-20 mr-2" />
                    <p>Kaos Lengan Pendek</p>
                    <p className="flex items-end gap-1"><AiFillStar className="text-yellow-400" size={24} /> 4.5</p>
                  </td>

                  <td className="px-4 py-4">
                    Rp {price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
                  </td>

                  <td className="py-4 text-center">
                    1
                  </td>

                  <td className="py-4 text-center">
                    1
                  </td>

                  <td className="flex flex-col gap-2 px-6 py-16 md:py-14 lg:py-4">
                    <CustomButton
                      id="btn-perbarui"
                      label="Perbarui"
                      className="rounded-xl bg-lapak px-2 md:px-2 lg:px-0 py-1 text-[18px] font-semibold capitalize text-zinc-50 hover:bg-sky-500"
                    />

                    <CustomButton
                      id="btn-hapus"
                      label="Hapus"
                      className="rounded-xl bg-red-500 py-1 text-[18px] font-semibold capitalize text-zinc-50 hover:bg-orange-500"
                    />
                  </td>
                </tr>


              </tbody>
            </table>
          </div>
        </div>
      </div>


    </Layout >
  )

}

export default ListProduct