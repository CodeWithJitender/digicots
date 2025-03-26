import React, { useRef } from "react";
import TextAnimation1 from "../../animation/text/TextAnimation1";
import TextAnimation2 from "../../animation/text/TextAnimation2";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

function HeroHeading() {
  const headingRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger)
  useGSAP(()=>{
    gsap.to(headingRef.current,{
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top -5%",
        end: "top -10%",
        scrub: 2,
      },
      scale:0.7,
      y:"8%",
      opacity:.5,
      ease:"power1.inOut",
    })
  },[])
  return (
      <div
    ref={headingRef}
     className="text-center sticky top-0 h-screen flex items-center justify-center">
      <div className="container-xxl">
        <h1 className="sm:text-6xl overflow-hidden md:text-8xl text-5xl lg:text-9xl font-black text-white font-inter">
          <TextAnimation1 animeStart="100" duration={2}>OUR WORK</TextAnimation1>
        </h1>
        <p className="text-white">
          <TextAnimation2 animeStart="100" duration={1.3}>
            We specialize in personalized and conversational marketing, crafting
            tailored experiences for every business.
          </TextAnimation2>
        </p>
      </div>
    </div>
  );
}

export default HeroHeading;
