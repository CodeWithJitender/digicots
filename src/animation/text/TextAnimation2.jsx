import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React, { useRef } from 'react';

const TextAnimation2 = ({ children, className = "", animeStart = "50", animeEnd = "40", duration = 0.5, scrub=false,stagger=20 }) => {
  const parentRef = useRef(null);
  const letterRefs = useRef([]); // Har letter ka reference store karega

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    if (!letterRefs.current.length) return; // Ensure letters exist

    gsap.from(letterRefs.current, {
      opacity: 0.3,
      // filter: "blur(10px)",
      duration: duration,
      stagger: duration / stagger, // Har letter thoda delay se animate hoga
      scrollTrigger: {
        trigger: parentRef.current,
        start: `top ${animeStart}%`,
        end: `top ${animeEnd}%`,
        scrub
      },
    });
  }, [letterRefs.current]);

  // Children text ko words mein split karna aur har word ke letters ko animate karna
  const wrappedText = children
    .toString()
    .split(" ") // Words mein split karo
    .map((word, wordIndex) => (
      <span key={wordIndex} className="inline-block whitespace-nowrap">
        {word.split("").map((letter, letterIndex) => {
          const uniqueIndex = wordIndex * 100 + letterIndex; // Unique index for each letter
          return (
            <span
              key={uniqueIndex}
              ref={(el) => (letterRefs.current[uniqueIndex] = el)}
              className="inline-block"
            >
              {letter}
            </span>
          );
        })}
        {/* Word ke baad space add karna */}
        <span className="inline-block">&nbsp;</span>
      </span>
    ));

  return (
    <div ref={parentRef} className={`${className} w-full`}>
      <div>{wrappedText}</div>
    </div>
  );
};

export default TextAnimation2;