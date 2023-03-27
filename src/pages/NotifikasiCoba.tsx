import axios from "axios";
import { useEffect, useState } from "react";

const NotifikasiCoba = () => {
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    let currentOffset = 0;

    const loadData = () => {
      axios
        .get(`https://lapakumkm.mindd.site/products`)
        .then(({ data }) => {
          const datas = data.data.slice(currentOffset, currentOffset + 10)
            .map((p: any) => p.product_name);
          setData((i) => [...i, ...datas]);
          currentOffset += 10;
        });
    };

    const handleScroll = (e: any) => {
      console.log(e.target.documentElement.scrollHeight)
      console.log(e.target.documentElement.scrollTop)
      const scrollHeight = e.target.documentElement.scrollHeight;
      const currentHeight = Math.ceil(
        e.target.documentElement.scrollTop + window.innerHeight
      );
      if (currentHeight + 1 >= scrollHeight) {
        loadData();
      }
    };

    loadData();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  data.map((i) => console.log(i))

  return (
    <div
      className="flex
  flex-col items-center
  justify-center min-h-screen py-2
  bg-gray-900 text-gray-200"
    >
      <div className="flex flex-col text-4xl font-bold items-center justify-center w-full px-20 text-center">
        {data.map((p, i) => {
          return (
            <div
              key={i}
              className="border w-80 h-40 flex justify-around place-items-center"
            >
              <div>{i + 1}.</div>
              <div>{p}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default NotifikasiCoba


//   const { Notification } = window;

  //   function notifyMe() {
  //     if (!("Notification" in window)) {
  //       // Check if the browser supports notifications
  //       alert("This browser does not support desktop notification");
  //     }

  //     if (Notification && Notification.permission !== "granted") {
  //       Notification.requestPermission();
  //     }
  //     if (Notification && Notification.permission === "granted") {
  //       //callback api notifikasi

  //       new Notification("Hi there!");
  //     }
  //   }


  //   return (
  //     <div>
  //       <h1>test</h1>
  //       <button onClick={() => notifyMe()}>Notify me!</button>

  //     </div>
  //   )