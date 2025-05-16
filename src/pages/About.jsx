import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../sections/about/Hero";
import HowWeWork from "../sections/about/HowWeWork";
import WhyChooseUs from "../sections/about/WhyChooseUs";
import OurVision from "../sections/about/OurVision";
import { Helmet } from "react-helmet";
import { ScrollTrigger } from "gsap/all";
import { LoadingContext } from "../components/Loading";

function About() {
  const location = useLocation();
  useEffect(()=>{
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 0); // thoda delay zaruri hota hai
  
    return () => clearTimeout(timeout);
  },[])

  const { loadingContext } = useContext(LoadingContext);

  const [componentLoaded, setComponentLoaded] = useState({
    hero:false,
    howWeWork: false,
    whyChooseUs: false,
    ourVision: false,
  });

  useEffect(() => {
    if (
      componentLoaded.hero &&
      componentLoaded.howWeWork &&
      componentLoaded.whyChooseUs &&
      componentLoaded.ourVision
    ) {
      setTimeout(() => {
        // All components have loaded
        console.log("All components have loaded");
        loadingContext.setIsLoading(false); // Set loading to false
        console.log(loadingContext);
      }, 500);
    }
    console.log(componentLoaded);
    console.log(loadingContext);
  }, [componentLoaded, loadingContext]);


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
      <Hero setComponentLoaded={setComponentLoaded} />
      <HowWeWork setComponentLoaded={setComponentLoaded} />
      <WhyChooseUs setComponentLoaded={setComponentLoaded} />
      <OurVision setComponentLoaded={setComponentLoaded} />
    </div>
  );
}

export default About;