import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../pages/Home" 
import About from "../pages/About" 
import LetsTalk from "../pages/LetsTalk" 
import CaseStudie from "../pages/CaseStudie" 
import OurWork from "../pages/OurWork" 
import Discover from "../pages/Discover" 
import Insights from "../pages/Insights" 
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollHandler from "../scroll/ScrollHandler";
import { setPrevPath } from "../hook/useHistory";

const AppContent = () => {
  const location = useLocation();

  useEffect(() => {
    setPrevPath(location.pathname); // store current route as previous
  }, [location]);


  return (
    <>
      <ScrollHandler />
      <Header location={location} />
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<LetsTalk />} />
        <Route path="/case-study" element={<CaseStudie />} />
        <Route path="/our-work" element={<OurWork />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/insights" element={<Insights />} />
      </Routes>
      {!["/case-study", "/contact"].includes(location.pathname) && <Footer />}
    </>
  );
};

export default AppContent;
