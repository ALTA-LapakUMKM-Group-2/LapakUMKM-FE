import axios from "axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component"
import Layout from "../components/Layout";
import { DataType } from "../utils/types/DataType";

const NotifikasiCoba = () => {
  //   const [data, setData] = useState<string[]>([]);

  //   useEffect(() => {
  //     let currentOffset = 0;

  //     const loadData = () => {
  //       axios
  //         .get(`https://lapakumkm.mindd.site/products`)
  //         .then(({ data }) => {
  //           const datas = data.data.slice(currentOffset, currentOffset + 10)
  //             .map((p: any) => p.product_name);
  //           setData((i) => [...i, ...datas]);
  //           currentOffset += 10;
  //         });
  //     };

  //     const handleScroll = (e: any) => {
  //       console.log(e.target.documentElement.scrollHeight)
  //       console.log(e.target.documentElement.scrollTop)
  //       const scrollHeight = e.target.documentElement.scrollHeight;
  //       const currentHeight = Math.ceil(
  //         e.target.documentElement.scrollTop + window.innerHeight
  //       );
  //       if (currentHeight + 1 >= scrollHeight) {
  //         loadData();
  //       }
  //     };

  //     loadData();
  //     window.addEventListener("scroll", handleScroll);

  //     return () => {
  //       window.removeEventListener("scroll", handleScroll);
  //     };
  //   }, []);

  //   data.map((i) => console.log(i))

  //   return (
  //     <div
  //       className="flex
  //   flex-col items-center
  //   justify-center min-h-screen py-2
  //   bg-gray-900 text-gray-200"
  //     >
  //       <div className="flex flex-col text-4xl font-bold items-center justify-center w-full px-20 text-center">
  //         {data.map((p, i) => {
  //           return (
  //             <div
  //               key={i}
  //               className="border w-80 h-40 flex justify-around place-items-center"
  //             >
  //               <div>{i + 1}.</div>
  //               <div>{p}</div>
  //             </div>
  //           );
  //         })}
  //       </div>
  //     </div>
  //   );
  // }

  const [data, setData] = useState<DataType[]>([])
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [tambah, setTambah] = useState<number>(10);

  useEffect(() => {
    fetchData()
  }, [])

  function fetchData() {
    setLoading(true)
    axios
      .get(`https://lapakumkm.mindd.site/products`)
      .then((res) => {
        const { data } = res.data
        setData(data)
      })
      .then((err) => {

      })
      .finally(() => setLoading(false));
  }

  const moreData = () => {
    if (tambah <= data.length) {

      // setTambah(tambah + 5)
      // setData(data.concat(Array.from({ length: 20 })))
    }
  }

  console.log(data)

  return (
    <div>
      <h1>COba</h1>
      <InfiniteScroll
        dataLength={data.length}
        next={moreData}
        hasMore={hasMore}
        loader={".....Loading more"}
        endMessage={"...finish"}
      >
        {data.map((item, index) => (
          <p key={item.id} className="text-[28px] border border-blue-400 mx-56 py-14 space-y-20 "> <span>{index + 1}</span> Data infinite{item.product_name}</p>
        ))}
      </InfiniteScroll>
    </div>
  )
}

export default NotifikasiCoba


// //   const { Notification } = window;

//   //   function notifyMe() {
//   //     if (!("Notification" in window)) {
//   //       // Check if the browser supports notifications
//   //       alert("This browser does not support desktop notification");
//   //     }

//   //     if (Notification && Notification.permission !== "granted") {
//   //       Notification.requestPermission();
//   //     }
//   //     if (Notification && Notification.permission === "granted") {
//   //       //callback api notifikasi

//   //       new Notification("Hi there!");
//   //     }
//   //   }


//   //   return (
//   //     <div>
//   //       <h1>test</h1>
//   //       <button onClick={() => notifyMe()}>Notify me!</button>

//   //     </div>
//   //   )
