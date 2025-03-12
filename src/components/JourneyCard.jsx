import React, { useRef, forwardRef, useEffect } from "react";
import { gsap } from "gsap";

// ⬇️ Wrap component with forwardRef
const JourneyCard = forwardRef(({ head, pera, bg, img, status }, ref) => {
  const contentRef = useRef(null);
  const rectRef = useRef({ width: 100 }); // Default rect values

  useEffect(() => {
    if (ref && ref.current) {
      rectRef.current = ref.current.getBoundingClientRect();
    }
  }, [ref]);


  const handleMouseEnter = () => {
    gsap.to(contentRef.current, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
    });
    
    console.log(ref)
    if (ref?.current) {
      gsap.to(ref.current, {
        width: 3 * rectRef.current.width,
        scaleY: 1.2,
        duration: 0.5,
        ease: "power2.in",
      });
    }
  };

  const handleMouseLeave = () => {
    gsap.to(contentRef.current, {
      opacity: 0,
      scale: 1,
      duration: 0.5,
      ease: "power2.in",
    });

    if (ref?.current) {
      gsap.to(ref.current, {
        width: rectRef.current.width,
        scaleY: 1,
        duration: 0.5,
        ease: "power2.in",
      });
    }
  };

  

  return (
    <div
      ref={ref} // ✅ Correctly pass ref
      className={`jou-card ${status} ${status === "active" ? "z-2" : ""} 
      relative flex-shrink-0 h-[20vw] w-[8vw] overflow-hidden bg-cover bg-center`}
      style={{ backgroundImage: `url(${bg})` }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Inner Content (Hidden Initially) */}
      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col rounded-lg overflow-hidden justify-center items-center opacity-0 scale-100 transition-transform duration-500"
      >
        <img src={img} alt="" className="h-full w-full object-cover" />
        <div className="absolute bottom-2.5 bg-white rounded-2xl mx-2.5 p-3 text-center">
          <h5 className="font-bold mb-3 font-inter">{head}</h5>
          <p>{pera}</p>
        </div>
      </div>
    </div>
  );
});

export default JourneyCard;
