import React, { Suspense, useEffect, useState } from "react";
import Hero from "../sections/home/Hero";
import homeHero from "../assets/home-hero.png";
import HowItWorks from "../sections/home/HowItWorks";
import Solutions from "../sections/home/Solutions";
import OurWork from "../sections/home/OurWork";
import Insights from "../sections/home/Insights";
import OurJourney from "../sections/home/OurJourney";
import Header from "../components/Header";
import Faq from "../sections/home/Faq";
import KeywordsSection from "../sections/home/KeywordsSection";
import Testimonials from "../sections/home/Testimonials";
import ReelCanvas from "../animation/canvas/ReelCanvas";
import HomeHeroCanvas from "../animation/canvas/HomeHeroCanvas";
import Loading from "../components/Loading";
import ContentSlider from "../sections/home/ContentSlider";

function Home() {
  useEffect(() => {
    // Optional scroll or other side-effect cleanups
    return () => {
      // Clean up all ScrollTriggers on unmount (failsafe)
      if (window?.ScrollTrigger?.getAll) {
        window.ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      }
    };
  }, []);

  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoadingComplete(true);
  };

  return (
    <div>
      {/* {isLoadingComplete ? ( */}
        {/* <Home /> */}
      {/* ) : ( */}
        {/* <Loading onLoadingComplete={handleLoadingComplete} > */}
        {/* <Loading /> */}
          <div className="main contain-paint ">
            <Suspense fallback={null}>
              <HomeHeroCanvas />
            </Suspense>

            <HowItWorks />
            <ContentSlider />
            <OurWork />
            <Insights />
            {/* <KeywordsSection /> */}
            <OurJourney />
            <Testimonials />
            <Faq />
          </div>
        {/* </Loading> */}
        {/* </Loading> */}
      {/* )} */}
    </div>
  );
}

export default Home;
