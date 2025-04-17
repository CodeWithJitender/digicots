import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useRef } from "react";

function KeywordsSection() {

  const marqueeRef = useRef([]); // Array of refs
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
    <div ref={parentRef} className="relative z-[2] h-[10vh] top-[5vh] gap-4 overflow-hidden">
      <div ref={marqueeRef}>
        <div className="h-[5vh] absolute top-0  overflow-hidden">
          <div className="whitespace-nowrap animate-marquee flex items-center gap-6 text-black font-bold md:text-6xl pb-10">
            <span>Insatiable</span>
            <span className="text-[#DF782B]">•</span>
            <span>Unbreakable</span>
            <span className="text-[#DF782B]">•</span>
            <span>Instinctive</span>
            <span className="text-[#DF782B]">•</span>
            <span>Hunger</span>
            {/* Duplicate for smooth loop */}
            <span>Allegiance</span>
            <span className="text-[#DF782B]">•</span>
            <span>Mastery</span>
            <span className="text-[#DF782B]">•</span>
            
            <span>Insatiable</span>
            <span className="text-[#DF782B]">•</span>
            <span>Unbreakable</span>
            {/* Duplicate for smooth loop */}
            <span>Instinctive</span>
            <span className="text-[#DF782B]">•</span>
            <span>Hunger</span>
            <span className="text-[#DF782B]">•</span>
            <span>Allegiance</span>
            <span className="text-[#DF782B]">•</span>
            <span>Mastery</span>
            {/* Duplicate for smooth loop */}
            <span>Insatiable</span>
            <span className="text-[#DF782B]">•</span>
            <span>Unbreakable</span>
            <span className="text-[#DF782B]">•</span>
            <span>Instinctive</span>
            <span className="text-[#DF782B]">•</span>
            <span>Hunger</span>
          </div>
        </div>
        <div className="h-[5vh] absolute top-[5vh]  overflow-hidden">
          <div className="relative top-[-100%] whitespace-nowrap animate-marquee flex items-center gap-6 text-[#fff] font-bold md:text-6xl pb-10">
            <span>Insatiable</span>
            <span className="text-[#fff]">•</span>
            <span>Unbreakable</span>
            <span className="text-[#fff]">•</span>
            <span>Instinctive</span>
            <span className="text-[#fff]">•</span>
            <span>Hunger</span>
            {/* Duplicate for smooth loop */}
            <span>Allegiance</span>
            <span className="text-[#fff]">•</span>
            <span>	   Mastery</span>
            <span className="text-[#fff]">•</span>
            <span>Insatiable</span>
            <span className="text-[#fff]">•</span>
            <span>Unbreakable</span>
            {/* Duplicate for smooth loop */}
            <span>Instinctive</span>
            <span className="text-[#fff]">•</span>
            <span>Hunger</span>
            <span className="text-[#fff]">•</span>
            <span>Allegiance</span>
            <span className="text-[#fff]">•</span>
            <span>Mastery</span>
            {/* Duplicate for smooth loop */}
            <span>Insatiable</span>
            <span className="text-[#fff]">•</span>
            <span>Unbreakable</span>
            <span className="text-[#fff]">•</span>
            <span>Instinctive</span>
            <span className="text-[#fff]">•</span>
            <span>Mastery</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KeywordsSection;
