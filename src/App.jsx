// App.jsx
import React, { useEffect, useState, createContext, useContext } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";

import AppContent from "./routes/AppRouter";
import Loading from "./components/Loading";
import { LoadingContext } from "./components/Loading";

const LenisContext = createContext(null);
export const useLenis = () => useContext(LenisContext);

function App() {
  const [lenis, setLenis] = useState(null);

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

    setLenis(lenisInstance);

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

  const loadingContext = {
    loading: true,
    setIsLoading: (value) => {
      loadingContext.loading = value;
    },
  };


  return (
    <LenisContext.Provider value={lenis}>
      <Router>
        <LoadingContext.Provider value={{ loadingContext }}>
          {/* <Loading /> */}
          <AppContent /> {/* 👈 Now location and routing work correctly */}
        </LoadingContext.Provider>
      </Router>
    </LenisContext.Provider>
  );
}

export default App;
