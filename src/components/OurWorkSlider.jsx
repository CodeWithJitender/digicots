import React, { useRef, useEffect } from "react";
import MainHeading from "./MainHeading";
import gsap from "gsap";

const images = Array(15).fill(null).map((_, i) => 
  i % 2 === 0 ? "slide-1.png" : "slide-2.png"
);


const CylindricalSlider = () => {
  console.log(window.innerWidth)
  const checkoutRef = useRef(null);
  const sliderRef = useRef(null);
  const isInsideItem = useRef(false); // Track if mouse is inside an item
  useEffect(() => {
    if (!checkoutRef.current) return;

    const checkout = checkoutRef.current;
    const moveX = gsap.quickTo(checkout, "x", { duration: 0.2 ,onUpdate:()=>{
      if (!isInsideItem.current) {
        scaleTween.play();
    } else {
        scaleTween.reverse();
    }
    } });
    const moveY = gsap.quickTo(checkout, "top", { duration: 0.2,onUpdate:()=>{
      if (!isInsideItem.current) {
        scaleTween.play();
    } else {
        scaleTween.reverse();
    }
    } });
    const fade = gsap.quickTo(checkout, "opacity", { duration: 0.1, delay: 10 });

    let scaleTween = gsap.to(checkout, { scale: .3, duration: 0.1, paused: true });

    const handleMouseMove = (event) => {
        if (!sliderRef.current) return;
        const sliderRect = sliderRef.current.getBoundingClientRect();

        if(isInsideItem.current){
          moveX(event.clientX);
          moveY(event.clientY - sliderRect.top);
        }

        fade(isInsideItem.current ? 1 : 0);
        
        
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
}, []);


  return (
    <div ref={sliderRef} className="banner overflow-hidden w-full relative">
      <div className="relative z-10">
        <MainHeading
          heading="OUR WORK"
          pera="We specialize in personalized and conversational marketing, crafting tailored experiences for every business."
          cl="text-center pt-10"
          tColor="text-white"
        />
      </div>
      <div
        ref={checkoutRef}
        className="checkout absolute opacity-0 min-w-[250px] z-10 uppercase bg-white rounded-full py-2 px-4 pointer-events-none"
      >
        click to check out
      </div>
      <div className="slider relative" style={{ "--quantity": images.length }}>
        {images.map((src, i) => (
          <div
            key={i}
            className="item relative group"
            style={{ "--position": i + 1 }}
            onMouseEnter={() => (isInsideItem.current = true)}
            onMouseLeave={() => (isInsideItem.current = false)}
          >
            <img src={src} alt={`Slide ${i + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CylindricalSlider;
