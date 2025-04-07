import React, { useEffect, useState, createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import CaseStudie from "./pages/CaseStudie";
import Discover from "./pages/Discover";
import OurWork from "./pages/OurWork";
import Insights from "./pages/Insights";
import LetsTalk from "./pages/LetsTalk";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import Header from "./components/Header";
import ScrollHandler from "./scroll/ScrollHandler";

// Create context and hook
const LenisContext = createContext(null);
export const useLenis = () => useContext(LenisContext);

function App() {
  const [lenis, setLenis] = useState(null); // ✅ changed from useRef to useState

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 4,
      easing: (t) => 1 - Math.pow(1 - t, 5),
      smooth: true,
      smoothTouch: true,
      direction: "vertical",
      gestureDirection: "vertical",
      wheelMultiplier: 0.5,
      touchMultiplier: 0.3,
      infinite: false,
    });

    setLenis(lenisInstance); // ✅ store in state after creation

    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    gsap.ticker.add((time) => {
      lenisInstance.raf(time * 1000);
    });

    return () => lenisInstance.destroy();
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      <Router>
        <ScrollHandler /> {/* ✅ should be inside Router and above Routes */}
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<LetsTalk />} />
          <Route path="/case-study" element={<CaseStudie />} />
          <Route path="/our-work" element={<OurWork />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/insights" element={<Insights />} />
        </Routes>
      </Router>
    </LenisContext.Provider>
  );
}

export default App;
