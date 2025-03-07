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
    // Initialize Lenis with smoother settings
    lenis.current = new Lenis({
      duration: 1.2, // Smooth scroll duration
      easing: (t) => 1 - Math.pow(1 - t, 3), // Premium cubic easing
      smooth: true,
      smoothTouch: false, // Disable smooth touch scroll for better control
      direction: "vertical",
      gestureDirection: "vertical",
      touchMultiplier: 2, // More control on touch scroll
      infinite: false, // Set to true if you want infinite scrolling
    });

    // Optimized animation frame loop
    function raf(time) {
      lenis.current.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Sync GSAP with Lenis (if using GSAP)
    gsap.ticker.add((time) => {
      lenis.current.raf(time * 1000);
    });

    // Cleanup
    return () => lenis.current.destroy();
  }, []);

  // Debugging Scroll Position (Optional)
  // lenis.on("scroll", ({ scroll }) => console.log(scroll));

  return (
    <>
    <LenisContext.Provider value={lenis.current}>

      <Router>
      <Header/>
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
