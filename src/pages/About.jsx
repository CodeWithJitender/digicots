import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../sections/about/Hero";
import HowWeWork from "../sections/about/HowWeWork";
import WhyChooseUs from "../sections/about/WhyChooseUs";
import OurVision from "../sections/about/OurVision";
import { Helmet } from "react-helmet";

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
      <Helmet>
        <title>About Us | Your Company Name</title>
        <meta
          name="description"
          content="Learn more about our company, our mission, and our values."
        />
        <meta name="keywords" content="about us, company, mission, values" />
        <meta name="author" content="Your Name" />
        <link rel="canonical" href="https://www.yourwebsite.com/about" />
      </Helmet>
      <Hero />
      <HowWeWork />
      <WhyChooseUs />
      <OurVision />
    </div>
  );
}

export default About;