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

    tl.to(marqueeRef.current, {
      x: "-30%",
      duration: 1,
      ease: "linear",
    });
  }, []);

  return (
    <div
      ref={parentRef}
      className="relative z-[2] h-[10vh] top-[5vh] gap-4 overflow-hidden"
    >
      <div ref={marqueeRef}>
        <div className="h-[5vh] absolute md:top-0 top-[2.1vh]  overflow-hidden">
          <div className="whitespace-nowrap animate-marquee flex items-center gap-6 text-2xl text-black font-bold md:text-6xl pb-10">
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
        <div className="h-[5vh] absolute md:top-[5vh] top-[5vh] z-[2]  overflow-hidden">
          <div className="relative md:top-[-100%] top-[-60%] whitespace-nowrap animate-marquee flex items-center gap-6 text-2xl text-[#fff] font-bold md:text-6xl pb-10">
            <span>Creativity</span>
            <span className="text-[#fff]">•</span>
            <span>Authenticity</span>
            <span className="text-[#fff]">•</span>
            <span>Growth</span>
            <span className="text-[#fff]">•</span>
            <span>Emotion</span>
            {/* Duplicate for smooth loop */}
            <span>Creativity</span>
            <span className="text-[#fff]">•</span>
            <span>Authenticity</span>
            <span className="text-[#fff]">•</span>
            <span>Growth</span>
            <span className="text-[#fff]">•</span>
            <span>Emotion</span>
            {/* Duplicate for smooth loop */}
            <span>Creativity</span>
            <span className="text-[#fff]">•</span>
            <span>Authenticity</span>
            <span className="text-[#fff]">•</span>
            <span>Growth</span>
            <span className="text-[#fff]">•</span>
            <span>Emotion</span>
            {/* Duplicate for smooth loop */}
            <span>Creativity</span>
            <span className="text-[#fff]">•</span>
            <span>Authenticity</span>
            <span className="text-[#fff]">•</span>
            <span>Growth</span>
            <span className="text-[#fff]">•</span>
            <span>Emotion</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KeywordsSection;
