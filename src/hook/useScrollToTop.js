// hooks/useScrollToTop.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "../App"; // adjust the path if needed

const useScrollToTop = () => {
  const location = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, {
        immediate: true, // optional: set false if you want animated scroll
        duration: 1,
      });
    } else {
      // fallback in case lenis not available yet
      window.scrollTo(0, 0);
    }
  }, [location.pathname,lenis]);
};

export default useScrollToTop;
