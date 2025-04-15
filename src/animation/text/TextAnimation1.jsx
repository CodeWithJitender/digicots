import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import React, { useRef } from 'react'

const TextAnimation1 = ({ children, className = "", animeStart = "50" , animeEnd="40", duration=2 }) => {
  console.log(animeStart,children);
  const parentRef = useRef(null);
  const letterRefs = useRef([]); // Har letter ka reference store karega

  gsap.registerPlugin(ScrollTrigger);
  // console.log(Number(animeEnd))

  useGSAP(() => {
    // if (!letterRefs.current.length) return; // Ensure letters exist

    // gsap.from(letterRefs.current, {
    //   y: -10,
    //   transformOrigin:"bottom",
    //   scaleY: 0,
    //   duration: duration,
    //   stagger: duration/10, // Har letter thoda delay se animate hoga
    //   scrollTrigger: {
    //     trigger: parentRef.current,
    //     start: `top ${animeStart}%`,
    //     // end: `top ${animeEnd}%`,
    //     // scrub:true
    //   },
    // });

    gsap.from(parentRef.current,{
      y: "120%",
      transformOrigin:"bottom",
      scaleX: .8,
      duration: duration,
      ease: "expoScale(0.5,7,none)",
      scrollTrigger: {
        trigger: parentRef.current,
        start: `top ${animeStart}%`,
        // end: `top ${animeEnd}%`,
        // scrub:true,
        // // // markers:true
      },
    })
  }, []);

  // // Children text ko split kar ke har letter ko span me wrap karna
  // const wrappedText = children
  //   .toString()
  //   .split("")
  //   .map((letter, index) => (
  //     <span
  //       key={index}
  //       ref={(el) => (letterRefs.current[index] = el)}
  //       className="inline-block"
  //     >
  //       {letter === " " ? "\u00A0" : letter} {/* Space ko non-breaking space se replace kiya */}
  //     </span>
  //   ));

  return (
    <span className='overflow-hidden'>
      <span ref={parentRef} className={`${className} inline-block w-full `}>
      {children}
    </span>
    </span>
  );
};

export default TextAnimation1;
