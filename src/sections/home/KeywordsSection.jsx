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
      className="relative z-[4] md:h-[60px] md:top-[30px] h-[40px] top-[20px] gap-4 overflow-hidden"
    >
      <div ref={marqueeRef}>
        <div className="md:h-[60px] absolute top-0  h-[40px]  overflow-hidden">
          <div className="whitespace-nowrap animate-marquee flex items-center gap-6 text-black font-bold text-2xl md:text-5xl pb-10">
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
        <div className="md:h-[60px] absolute md:top-[30px] h-[40px] top-[20px] z-[2]  overflow-hidden">
          <div className="relative top-[-50%]  whitespace-nowrap animate-marquee flex items-center gap-6 text-[#fff] font-bold text-2xl md:text-5xl pb-10">
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
