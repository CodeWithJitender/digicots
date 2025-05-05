import React, { Suspense, useEffect } from "react";
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
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function Home() {
  useEffect(() => {
    // Reset scroll position to top on mount
    window.scrollTo(0, 0);

    // Debug: Log scroll position after mount
    console.log("Home mounted, scroll position:", window.scrollY);

    // Create a GSAP context to scope animations/ScrollTriggers to this component
    const ctx = gsap.context(() => {
      // Note: If Home itself doesn't create ScrollTriggers, this context will capture those created by child components
      // Child components like HomeHeroCanvas, HowItWorks, etc., should create their ScrollTriggers within their own useEffect
    }, document.querySelector(".main.contain-paint")); // Scope to the Home component's main container

    // Refresh ScrollTrigger to ensure proper initialization
    ScrollTrigger.refresh();

    // Cleanup on unmount
    return () => {
      // Revert the GSAP context to kill only ScrollTriggers/animations created within this component
      console.log("Cleaning up Home component ScrollTriggers");
      ctx.revert(); // This kills all ScrollTriggers and animations scoped to this context
    };
  }, []); // Empty dependency array ensures this runs only on mount/unmount

  return (
    <div>
      <div className="main contain-paint">
        <Suspense fallback={<Loading />}>
          <HomeHeroCanvas />
        </Suspense>
        <HowItWorks />
        <ContentSlider />
        <OurWork />
        <Insights />
        <OurJourney />
        <Testimonials />
        <Faq />
      </div>
    </div>
  );
}

export default Home;