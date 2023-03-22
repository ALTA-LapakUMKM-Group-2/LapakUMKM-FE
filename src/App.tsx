import { BrowserRouter, Routes, Route } from "react-router-dom";

import ListProduct from "./pages/ListProduct";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Home from "./pages/Home";


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/listproduct" element={<ListProduct />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
