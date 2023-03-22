import { useState } from "react"
import CustomButton from "../components/CustomButton"
import Layout from "../components/Layout"
import Navbar from "../components/Navbar"

const ListProduct = () => {

  const [price, setPrice] = useState<number>(250000)

  return (
    <Layout>
      <Navbar />
      <div className="w-full h-screen">
        <p className="text-center mt-5 font-medium text-[28px] tracking-widest">Laporan Minggu Ini</p>
        <div className="mt-10 flex justify-center gap-20">
          <div className="bg-white rounded-lg w-80 py-6 text-center shadow-[2px_4px_4px_0px_rgba(0,0,0,0.5)]">
            <p className="text-[24px] font-medium">Barang paling laris</p>
            <p className="mt-6">Kaos Lengan Pendek Nyaman</p>
            <p>Total Penjualan : Rp 2.000.000</p>
          </div>

          <div className="bg-white py-6 rounded-lg w-80 text-center shadow-[2px_4px_4px_0px_rgba(0,0,0,0.5)]">
            <p className="text-[24px] font-medium">Barang paling laris</p>
            <p className="text-[24px] font-medium mt-5  ">Rp 12.000.000</p>
          </div>
        </div>

        <div className="flex flex-col mt-16 mx-20">
          <p className="text-[20px] font-semibold text-zinc-800">Toko Arif Muhammad</p>

          <div className="w-56 mt-5 ml-auto">
            <CustomButton
              id="btn-tambah produk"
              label="Tambah Produk"
            />
          </div>

          <div className="relative overflow-x-auto mt-8">
            <table className="w-full text-left text-gray-500 ">
              <thead className="text-[16px] text-zinc-800 font-semibold bg-white">
                <tr>
                  <th scope="col" className="px-2 py-3">
                    NO
                  </th>
                  <th scope="col" className="px-6 py-3">
                    NAMA PRODUK
                  </th>
                  <th scope="col" className="px-6 py-3">
                    HARGA
                  </th>
                  <th scope="col" className="px-6 py-3">
                    STOK BARANG
                  </th>
                  <th scope="col" className="px-6 py-3">
                    PENJUALAN
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody className="text-[14px]">
                <tr className="bg-white border-b ">
                  <th scope="row" className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    1
                  </th>
                  <td className="px-6 py-4">
                    Kaos Lengan Pendek
                  </td>
                  <td className="px-6 py-4">
                    {/* Rp {price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")} */}
                    {/* {"Total: "}
                        {formatValue({
                          value: JSON.stringify(totalPrice),
                          groupSeparator: '.',
                          decimalSeparator: ',',
                          prefix: 'Rp. ',
                        })} */}
                  </td>
                  <td className="px-6 py-4">
                    1
                  </td>
                  <td className="px-6 py-4">
                    1
                  </td>
                  <td className="px-6 py-4">

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