// import axios from "axios";
// import { useEffect, useState } from "react";
// import InfiniteScroll from "react-infinite-scroll-component"
// import Layout from "../components/Layout";
// import { DataType } from "../utils/types/DataType";

// const NotifikasiCoba = () => {
//     const [data, setData] = useState<string[]>([]);

//     useEffect(() => {
//       let currentOffset = 0;

//       const loadData = () => {
//         axios
//           .get(`https://lapakumkm.mindd.site/products`)
//           .then(({ data }) => {
//             const datas = data.data.slice(currentOffset, currentOffset + 10)
//               .map((p: any) => p.product_name);
//             setData((i) => [...i, ...datas]);
//             currentOffset += 10;
//           });
//       };

//       const handleScroll = (e: any) => {
//         console.log(e.target.documentElement.scrollHeight)
//         console.log(e.target.documentElement.scrollTop)
//         const scrollHeight = e.target.documentElement.scrollHeight;
//         const currentHeight = Math.ceil(
//           e.target.documentElement.scrollTop + window.innerHeight
//         );
//         if (currentHeight + 1 >= scrollHeight) {
//           loadData();
//         }
//       };

//       loadData();
//       window.addEventListener("scroll", handleScroll);

//       return () => {
//         window.removeEventListener("scroll", handleScroll);
//       };
//     }, []);

//     data.map((i) => console.log(i))

//     return (
//       <div
//         className="flex
//     flex-col items-center
//     justify-center min-h-screen py-2
//     bg-gray-900 text-gray-200"
//       >
//         <div className="flex flex-col text-4xl font-bold items-center justify-center w-full px-20 text-center">
//           {data.map((p, i) => {
//             return (
//               <div
//                 key={i}
//                 className="border w-80 h-40 flex justify-around place-items-center"
//               >
//                 <div>{i + 1}.</div>
//                 <div>{p}</div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     );
//   }

//   const [data, setData] = useState<DataType[]>([])
//   const [hasMore, setHasMore] = useState<boolean>(true)
//   const [loading, setLoading] = useState<boolean>(false)
//   const [tambah, setTambah] = useState<number>(10);

//   useEffect(() => {
//     fetchData()
//   }, [])

//   function fetchData() {
//     setLoading(true)
//     axios
//       .get(`https://lapakumkm.mindd.site/products`)
//       .then((res) => {
//         const { data } = res.data
//         setData(data)
//       })
//       .then((err) => {

//       })
//       .finally(() => setLoading(false));
//   }

//   const moreData = () => {
//     if (tambah <= data.length) {

//       // setTambah(tambah + 5)
//       // setData(data.concat(Array.from({ length: 20 })))
//     }
//   }

//   console.log(data)

//   return (
//     <div>
//       <h1>COba</h1>
//       <InfiniteScroll
//         dataLength={data.length}
//         next={moreData}
//         hasMore={hasMore}
//         loader={".....Loading more"}
//         endMessage={"...finish"}
//       >
//         {data.map((item, index) => (
//           <p key={item.id} className="text-[28px] border border-blue-400 mx-56 py-14 space-y-20 "> <span>{index + 1}</span> Data infinite{item.product_name}</p>
//         ))}
//       </InfiniteScroll>
//     </div>
//   )
// }

// export default NotifikasiCoba




//   //   return (
//   //     <div>
//   //       <h1>test</h1>
//   //       <button onClick={() => notifyMe()}>Notify me!</button>

//   //     </div>
//   //   )
// import * as ToastPrimitive from "@radix-ui/react-toast";
// import { clsx } from "clsx";
// import React from "react";

// type ToastProps = {};

// const NotifikasiCoba = (props: ToastProps) => {
//   const [open, setOpen] = React.useState(false);
  
//   const { Notification } = window;

//   function createNotification(title: any, options:any) {
//     // cek apakah browser mendukung notifikasi
//     if (!("Notification" in window)) {
//       console.log("Browser Anda tidak mendukung notifikasi desktop");
//       return;
//     }
  
//     // meminta izin untuk menampilkan notifikasi jika belum diizinkan
//     if (Notification.permission !== "granted") {
//       Notification.requestPermission().then(function (permission) {
//         if (permission === "granted") {
//           new Notification(title, options);
//         }
//       });
//     } else {
//       // tampilkan notifikasi
//       new Notification(title, options);
//     }
//   }
//   function handleClick() {
//     createNotification("Hai!", {
//       body: "Ini adalah pesan notifikasi"
//     });
//   }
  
//   return (
//     <ToastPrimitive.Provider swipeDirection={isMd ? "right" : "down"}>
//       <button
//         onClick={handleClick}
//       >
//         Click
//       </button>
//       <ToastPrimitive.Root
//         open={open}
//         onOpenChange={setOpen}
//         className={clsx(
//           "z-50 fixed bottom-4 inset-x-4 w-auto md:top-4 md:right-4 md:left-auto md:bottom-auto md:w-full md:max-w-sm shadow-lg rounded-lg",
//           "bg-white dark:bg-gray-800",
//           "radix-state-open:animate-toast-slide-in-bottom md:radix-state-open:animate-toast-slide-in-right",
//           "radix-state-closed:animate-toast-hide",
//           "radix-swipe-direction-right:radix-swipe-end:animate-toast-swipe-out-x",
//           "radix-swipe-direction-right:translate-x-radix-toast-swipe-move-x",
//           "radix-swipe-direction-down:radix-swipe-end:animate-toast-swipe-out-y",
//           "radix-swipe-direction-down:translate-y-radix-toast-swipe-move-y",
//           "radix-swipe-cancel:translate-x-0 radix-swipe-cancel:duration-200 radix-swipe-cancel:ease-[ease]",
//           "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
//         )}
//       >
//         <div className="flex">
//           <div className="w-0 flex-1 flex items-center pl-5 py-4">
//             <div className="w-full radix">
//               <ToastPrimitive.Title className="text-sm font-medium text-gray-900 dark:text-gray-100">
//                 Pull Request Review
//               </ToastPrimitive.Title>
//               <ToastPrimitive.Description className="mt-1 text-sm text-gray-700 dark:text-gray-400">
//                 Someone requested your review on{" "}
//                 <span className="font-medium">repository/branch</span>
//               </ToastPrimitive.Description>
//             </div>
//           </div>
//           <div className="flex">
//             <div className="flex flex-col px-3 py-2 space-y-1">
//               <div className="h-0 flex-1 flex">
//                 <ToastPrimitive.Action
//                   altText="view now"
//                   className="w-full border border-transparent rounded-lg px-3 py-2 flex items-center justify-center text-sm font-medium text-lapak dark:text-purple-500 hover:bg-gray-50 dark:hover:bg-gray-900 focus:z-10 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     window.open("https://github.com");
//                   }}
//                 >
//                   Lihat Product
//                 </ToastPrimitive.Action>
//               </div>
//               <div className="h-0 flex-1 flex">
//                 <ToastPrimitive.Close className="w-full border border-transparent rounded-lg px-3 py-2 flex items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-900 focus:z-10 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
//                   Biarkan
//                 </ToastPrimitive.Close>
//               </div>
//             </div>
//           </div>
//         </div>
//       </ToastPrimitive.Root>

//       <ToastPrimitive.Viewport />
//     </ToastPrimitive.Provider>
//   );
// };

// export default NotifikasiCoba ;