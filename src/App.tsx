import { BrowserRouter,  Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import HomeFilter from "./pages/HomeFilterPage";


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/home/:kategori" element={<HomeFilter/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
