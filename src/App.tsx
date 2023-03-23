import { BrowserRouter, Routes, Route } from "react-router-dom";

import HistoryPembeli from "./pages/HistoryPembeli";
import HomeFilter from "./pages/HomeFilterPage";
import ListProduct from "./pages/ListProduct";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Payment from "./pages/Payment";
import Detail from "./pages/Detail";
import Login from "./pages/Login";
import Home from "./pages/Home";



function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/home/:kategori" element={<HomeFilter />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/listproduct" element={<ListProduct />} />
          <Route path="/historypembeli" element={<HistoryPembeli />} />

        </Routes >
      </BrowserRouter >
    </>
  )
}

export default App
