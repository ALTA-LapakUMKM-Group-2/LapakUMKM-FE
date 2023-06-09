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
import { getDark } from "./utils/redux/reducer/reducer";
import { useState, useEffect, useMemo } from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';
import LupaPassword from "./pages/LupaPassword";


function App() {
  const dispatch = useDispatch();
  const [cookie, setCookie] = useCookies(["token"]);
  const checkToken = cookie.token;

  const handleToggleTheme = () => {
    dispatch(getDark(true))
    console.log(dispatch(getDark(true)))
  }

  return (
    <>
      <GoogleOAuthProvider clientId={`${import.meta.env.VITE_CLIENT_ID}`}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/detail/:id" element={checkToken ? <Detail /> : <Login/>} />
            <Route path="/payment/:name" element={checkToken ? <Payment /> : <Login/>} />
            <Route path="/cart" element={checkToken ? <Cart /> : <Login/>} />
            <Route path="/home" element={<Home />} />
            <Route path="/home/:kategori" element={<HomeFilter />} />
            <Route path="/profile" element={checkToken ? <Profile /> : <Login/>}/>
            <Route path="/listproduct/:nama_toko" element={checkToken ? <ListProduct /> : <Login/>} />
            <Route path="/historypembeli" element={checkToken ? <HistoryPembeli /> : <Login/>} />
            <Route path="/toko/:name" element={checkToken ?  <Toko /> : <Login/> } />
            <Route path="/new-password" element={<LupaPassword />} />
          </Routes >
        </BrowserRouter >
      </GoogleOAuthProvider>
    </>
  )
}

export default App