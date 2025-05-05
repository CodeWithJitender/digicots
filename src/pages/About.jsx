import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../sections/about/Hero";
import HowWeWork from "../sections/about/HowWeWork";
import WhyChooseUs from "../sections/about/WhyChooseUs";
import OurVision from "../sections/about/OurVision";

function About() {
  const location = useLocation();

  useEffect(() => {
    // Reset scroll position to top on mount
    window.scrollTo(0, 0);

    // Monitor navigation events
    const handlePopState = () => {
      console.log("Navigated to:", window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <div>
      <Hero />
      <HowWeWork />
      <WhyChooseUs />
      <OurVision />
    </div>
  );
}

export default About;