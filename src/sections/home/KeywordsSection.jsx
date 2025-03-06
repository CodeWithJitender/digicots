import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useRef } from "react";

function KeywordsSection() {

  const marqueeRef = useRef(null); // Array of refs
  const parentRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: parentRef.current,
        start: "top 100%",
        end: "top 0%",
        scrub: 1,
      },
    });

    tl.to(marqueeRef.current,{
      x: "-30%",
      duration: 1,
      ease: "linear",
    })
    
  }, []);

  return (
    <div ref={parentRef} className=" bg-white py-4 overflow-hidden">
      <div ref={marqueeRef} className="whitespace-nowrap animate-marquee flex items-center gap-6 text-black font-bold md:text-6xl pb-10">
        <span>Creativity</span>
        <span className="text-[#DF782B]">•</span>
        <span>Authenticity</span>
        <span className="text-[#DF782B]">•</span>
        <span>Growth</span>
        <span className="text-[#DF782B]">•</span>
        <span>Emotion</span>
        {/* Duplicate for smooth loop */}
        <span>Creativity</span>
        <span className="text-[#DF782B]">•</span>
        <span>Authenticity</span>
        <span className="text-[#DF782B]">•</span>
        <span>Growth</span>
        <span className="text-[#DF782B]">•</span>
        <span>Emotion</span>
        {/* Duplicate for smooth loop */}
        <span>Creativity</span>
        <span className="text-[#DF782B]">•</span>
        <span>Authenticity</span>
        <span className="text-[#DF782B]">•</span>
        <span>Growth</span>
        <span className="text-[#DF782B]">•</span>
        <span>Emotion</span>
        {/* Duplicate for smooth loop */}
        <span>Creativity</span>
        <span className="text-[#DF782B]">•</span>
        <span>Authenticity</span>
        <span className="text-[#DF782B]">•</span>
        <span>Growth</span>
        <span className="text-[#DF782B]">•</span>
        <span>Emotion</span>
      </div>
    </div>
  );
}

export default KeywordsSection;
