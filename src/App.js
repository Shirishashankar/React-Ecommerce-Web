import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import { useDispatch } from "react-redux";
import { fetchCardsData } from "./store/productSlice";
import Cards from "./components/Cards";
import Footer from "./components/footer/Footer";
import AddProduct from "./components/addProduct/AddProduct";
import CardsDetails from "./components/CardsDetails";
import CarouselDemo from "./components/carousel";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCardsData());
  }, [dispatch]);

  const location = useLocation();
  const isCakePage = location.pathname === '/addproducts';
  const isCardDetailsPage = location.pathname === '/productdetail';

  return (
    <div className="App">
      <ToastContainer />
      <Header />
      {!isCakePage && !isCardDetailsPage  && <CarouselDemo />}
        <Routes>
          <Route path="/" element={<Cards />} />
          <Route path="/addproducts" element={<AddProduct />} />
          {/* here we not redirect with id query i simply manage this by product slice reducer  */}
          <Route path="/productdetail" element={<CardsDetails />} />
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
