import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import React, { useRef } from 'react'

const TextAnimation1 = ({ children, className = "", animeStart = "50" , animeEnd="40", duration=1 }) => {
  const parentRef = useRef(null);
  const letterRefs = useRef([]); // Har letter ka reference store karega

  gsap.registerPlugin(ScrollTrigger);
  console.log(Number(animeEnd))

  useGSAP(() => {
    if (!letterRefs.current.length) return; // Ensure letters exist

    gsap.from(letterRefs.current, {
      y: -10,
      transformOrigin:"top",
      scaleY: 0,
      duration: duration,
      stagger: duration/10, // Har letter thoda delay se animate hoga
      scrollTrigger: {
        trigger: parentRef.current,
        start: `top ${animeStart}%`,
        // end: `top ${animeEnd}%`,
        // scrub:true
      },
    });
  }, [letterRefs.current]);

  // Children text ko split kar ke har letter ko span me wrap karna
  const wrappedText = children
    .toString()
    .split("")
    .map((letter, index) => (
      <span
        key={index}
        ref={(el) => (letterRefs.current[index] = el)}
        className="inline-block"
      >
        {letter === " " ? "\u00A0" : letter} {/* Space ko non-breaking space se replace kiya */}
      </span>
    ));

  return (
    <span ref={parentRef} className={`${className} w-full `}>
      <span>{wrappedText}</span> {/* Spaces retain rakhne ke liye */}
    </span>
  );
};

export default TextAnimation1;
