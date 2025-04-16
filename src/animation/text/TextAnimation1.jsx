import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import React, { useRef, useEffect } from 'react'

// Register plugins once outside the component
gsap.registerPlugin(ScrollTrigger);

const TextAnimation1 = ({ 
  children, 
  className = "", 
  animeStart = "50", 
  animeEnd = "40", 
  duration = 2 
}) => {
  const parentRef = useRef(null);
  const animationRef = useRef(null);

  useGSAP(() => {
    // Cleanup previous animation if it exists
    if (animationRef.current) {
      animationRef.current.kill();
      animationRef.current.scrollTrigger?.kill();
    }

    // Create new animation
    animationRef.current = gsap.from(parentRef.current, {
      y: "120%",
      transformOrigin: "bottom",
      scaleX: 0.8,
      duration: duration,
      ease: "expoScale(0.5,7,none)",
      scrollTrigger: {
        trigger: parentRef.current,
        start: `top ${animeStart}%`,
        // Uncomment if needed:
        // end: `top ${animeEnd}%`,
        // scrub: true,
        // markers: true
      },
    });

    return () => {
      // Cleanup animation when it unmounts
      if (animationRef.current) {
        animationRef.current.kill();
        animationRef.current.scrollTrigger?.kill();
      }
    };
  }, [animeStart, animeEnd, duration]);

  return (
    <span className='overflow-hidden inline-block'>
      <span 
        ref={parentRef} 
        className={`${className} inline-block w-full`}
      >
        {children}
      </span>
    </span>
  );
};

export default React.memo(TextAnimation1);