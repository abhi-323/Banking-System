import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};
export default App;
