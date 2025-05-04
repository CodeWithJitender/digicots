import React, { useRef, useState } from "react";
import TextAnimation1 from "../../animation/text/TextAnimation1";
import TextAnimation2 from "../../animation/text/TextAnimation2";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

function HeroHeading() {
  const headingRef = useRef(null);
  let [isLoaded,setIsLoaded] = useState(false);
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
      // delay:2,
      y:"8%",
      opacity:.5,
      ease:"power1.inOut",
    })
  },[])


  return (
      <div
    ref={headingRef}
     className="text-center sticky top-0 h-screen flex items-center justify-center">
      {
        !isLoaded ? (<div className="container-xxl">
          <h1 className="sm:text-6xl overflow-hidden md:text-[6vw] text-[10vw] lg:text-[7vw] font-black text-white font-inter uppercase audiowide-regular">
            <TextAnimation1 animeStart="70" duration={2}>Things We Do</TextAnimation1>
          </h1>
          <p className="text-white raleway">
            <TextAnimation2 animeStart="70" duration={1.3}>
              We specialize in personalized and conversational marketing, crafting
              tailored experiences for every business.
            </TextAnimation2>
          </p>
        </div>) : ("")
      }
    </div>
  );
}

export default HeroHeading;
