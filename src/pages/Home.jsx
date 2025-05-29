import React, { Suspense, useContext, useEffect, useState } from "react";
import Insights from "../sections/home/Insights";
import OurJourney from "../sections/home/OurJourney";
import Faq from "../sections/home/Faq";
import Testimonials from "../sections/home/Testimonials";
import HomeHeroCanvas from "../animation/canvas/HomeHeroCanvas";
import Loading, { LoadingContext } from "../components/Loading";
import HowItWorks from "../sections/home/HowItWorks";
import ContentSlider from "../sections/home/ContentSlider";
import OurWork from "../sections/home/OurWork";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Helmet } from "react-helmet";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function Home() {
  const { loadingContext } = useContext(LoadingContext);

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

  const [componentLoaded, setComponentLoaded] = useState({
    homeHero: false,
    howItWorks: false,
    contentSlider: false,
    ourWork: false,
    insights: false,
    ourJourney: false,
    testimonials: false,
    faq: false,
  });

  useEffect(() => {
    if (
      componentLoaded.homeHero &&
      componentLoaded.howItWorks &&
      componentLoaded.contentSlider &&
      componentLoaded.ourWork &&
      componentLoaded.insights &&
      componentLoaded.ourJourney &&
      componentLoaded.testimonials &&
      componentLoaded.faq
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
      <img src="" alt="" />
      <div className="main contain-paint">
        <Suspense fallback={<Loading />}>
          <HomeHeroCanvas setComponentLoaded={setComponentLoaded} />
        </Suspense>
        <HowItWorks setComponentLoaded={setComponentLoaded} />
        <ContentSlider setComponentLoaded={setComponentLoaded} />
        <OurWork setComponentLoaded={setComponentLoaded} />
        <Insights setComponentLoaded={setComponentLoaded} />
        <OurJourney setComponentLoaded={setComponentLoaded} />
        <Testimonials setComponentLoaded={setComponentLoaded} />
        <Faq setComponentLoaded={setComponentLoaded} />
      </div>
    </div>
  );
}

export default Home;
