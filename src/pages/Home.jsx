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
import { Helmet } from "react-helmet";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function Home() {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    console.log("Home mounted, scroll position:", window.scrollY);

    // GSAP context for scoped animations
    const ctx = gsap.context(() => {
      // Place your GSAP + ScrollTrigger animations here or ensure children use the same context
      ScrollTrigger.refresh(); // Ensure triggers are updated
    }, document.querySelector(".main.contain-paint"));

    return () => {
      console.log("Cleaning up Home component ScrollTriggers");

      // Important: Kill all ScrollTriggers first
      // ScrollTrigger.getAll().forEach(trigger => trigger.kill());

      // Revert GSAP context (cleans up animations and triggers created inside context)
      ctx.revert();
    };
  }, []);

  return (
    <div>
      <div className="main contain-paint">
        <Helmet>
          <title>Digicots | MarCom & Advertising Agency</title>
          <meta
            name="description"
            content="Digicots offers end-to-end IT services including software development, web design, cloud solutions, and tech support—all under one roof. Empower your business with our expert digital solutions."
          />
        </Helmet>
        
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
