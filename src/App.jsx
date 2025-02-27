import React from "react";
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

function App() {
  // Initialize Lenis with smoother settings
  const lenis = new Lenis({
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
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // Optional: Sync GSAP with Lenis (if using GSAP)
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  // Debugging Scroll Position (Optional)
  // lenis.on("scroll", ({ scroll }) => console.log(scroll));

  return (
    <Router>
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
  );
}

export default App;
