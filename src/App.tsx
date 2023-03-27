import { BrowserRouter, Routes, Route, RouterProvider } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";

import HistoryPembeli from "./pages/HistoryPembeli";
import HomeFilter from "./pages/HomeFilterPage";
import ListProduct from "./pages/ListProduct";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Toko from "./pages/Toko";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import Detail from "./pages/Detail";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NotifikasiCoba from "./pages/NotifikasiCoba";

import { getDark } from "./utils/redux/reducer/reducer";
import { useState, useEffect, useMemo } from "react";


function App() {
  const dispatch = useDispatch();
  const [cookie, setCookie] = useCookies(["token"]);
  const checkToken = cookie.token;

  const handleToggleTheme = () => {
    dispatch(getDark(true))
    console.log("cek")
    console.log(dispatch(getDark(true)))
  }

  return (
    <>

      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={checkToken ? <Home /> : <Login />} /> */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home/:kategori" element={<HomeFilter />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/listproduct/:nama_toko" element={<ListProduct />} />
          <Route path="/historypembeli" element={<HistoryPembeli />} />
          <Route path="/toko/:id" element={<Toko />} />
          <Route path="/notif" element={<NotifikasiCoba />} />
          {/* <Route path="/auth/sso-response-callback" element={<GoogleAuth/>}/> */}
        </Routes >
      </BrowserRouter >
    </>
  )
}

export default App
