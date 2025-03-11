import React, { useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import CaseStudie from "./pages/CaseStudie"; // Renamed for consistency
import Discover from "./pages/Discover";
import OurWork from "./pages/OurWork";
import Insights from "./pages/Insights";
import LetsTalk from "./pages/LetsTalk"; // Ensure this exists
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { createContext, useContext } from "react";
import Header from "./components/Header";
const LenisContext = createContext(null);
export const useLenis = () => useContext(LenisContext);

function App() {
  const lenis = useRef(null);

  useEffect(() => {
    lenis.current = new Lenis({
      duration: 8, // Increase duration for slower effect
      easing: (t) => 1 - Math.pow(1 - t, 5), // Even smoother easing
      smooth: true,
      smoothTouch: true, // Enable smooth scrolling on touch
      direction: "vertical",
      gestureDirection: "vertical",
      wheelMultiplier: 0.5, // Reduce speed of scroll when using mouse wheel
      touchMultiplier: 0.3, // Reduce touch scroll speed
      infinite: false,
    });
  
    function raf(time) {
      lenis.current.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  
    // Sync GSAP with Lenis (if using GSAP)
    gsap.ticker.add((time) => {
      lenis.current.raf(time * 1000);
    });
  
    return () => lenis.current.destroy();
  }, []);
  
  
  // Debugging Scroll Position (Optional)
  // lenis.on("scroll", ({ scroll }) => console.log(scroll));

  return (
    <>
    <LenisContext.Provider value={lenis.current}>

      <Router>
      {/* <Header/> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<LetsTalk />} />
          <Route path="/case-study" element={<CaseStudie />} />{" "}
          {/* Corrected path */}
          <Route path="/our-work" element={<OurWork />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/insights" element={<Insights />} />
        </Routes>
      </Router>
    </LenisContext.Provider>
    </>
  );
}

export default App;
