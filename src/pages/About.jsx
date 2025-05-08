import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../sections/about/Hero";
import HowWeWork from "../sections/about/HowWeWork";
import WhyChooseUs from "../sections/about/WhyChooseUs";
import OurVision from "../sections/about/OurVision";

function About() {
  const location = useLocation();
  useEffect(()=>{
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 0); // thoda delay zaruri hota hai
  
    return () => clearTimeout(timeout);
  },[])

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