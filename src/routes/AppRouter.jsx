import React, { useEffect, useState } from "react";          // added useState
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import LetsTalk from "../pages/LetsTalk";
import CaseStudie from "../pages/CaseStudie";
import OurWork from "../pages/OurWork";
import Discover from "../pages/Discover";
import Insights from "../pages/Insights";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollHandler from "../scroll/ScrollHandler";
import { setPrevPath } from "../hook/useHistory";
import Loading from "../components/Loading";
import ThankYou from "../pages/ThankYou";
import Test from "../pages/Test";
import ThankyouPopUp from "../components/ThankyouPopUp";

const AppContent = () => {
  const location = useLocation();
  const [popActive, setPopActive] = useState(false);


  useEffect(() => {
    setPrevPath(location.pathname); // store current route as previous
  }, [location]);

  return (
    <>
      {/* <Loading /> */}
      <ScrollHandler />
      {!["/loading"].includes(location.pathname) && <Header location={location} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/loading" element={<Loading />} /> */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<LetsTalk />} />
        <Route path="/case-study" element={<CaseStudie />} />
        <Route path="/things-we-do" element={<OurWork />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/insights" element={<Insights />} />
        {/* <Route path="/thankyou" element={<ThankYou />} /> */}
        {/* <Route path="/test" element={<Test />} /> */}
      </Routes>

      {/* Only show footer on pages other than /case-study and /contact */}
      {!["/case-study", "/contact" ,"/loading"].includes(location.pathname) && <Footer popActive={popActive} setPopActive={setPopActive} />}

      {/* your main content here */}
      <ThankyouPopUp
        popActive={popActive}
        onClose={() => setPopActive(false)}
      />
    </>
  );
};

export default AppContent;
