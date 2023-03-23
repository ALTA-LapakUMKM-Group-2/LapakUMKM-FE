import { BrowserRouter,  Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Detail from "./pages/Detail";
import Payment from "./pages/Payment";
import Profile from "./pages/Profile";
import HomeFilter from "./pages/HomeFilterPage";
import Toko from "./pages/Toko";



function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home/>}/>
          <Route path="/detail/:id" element={<Detail/>}/>
          <Route path="/payment" element={<Payment/>} />
          <Route path="/home" element={<Home/>}/>       
          <Route path="/home/:kategori" element={<HomeFilter/>}/>       
          <Route path="/profile" element={<Profile/>} />
          <Route path="/toko" element={<Toko />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
