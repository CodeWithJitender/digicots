import React, { useRef, useEffect } from "react";
import MainHeading from "./MainHeading";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

const baseImages = [
  "https://i.pinimg.com/736x/9e/23/db/9e23dbbabdc98b20f11220855881709c.jpg",
  "https://i.pinimg.com/736x/6d/8e/21/6d8e21dd8384120858933a8b80f2fca5.jpg",
  "https://i.pinimg.com/736x/23/63/9f/23639fdb2bbff1b157dd4f284e5e0f08.jpg",
  "https://i.pinimg.com/736x/7b/68/ca/7b68cae8ff64417ab3fb2c76c582085b.jpg",
  "https://i.pinimg.com/736x/b0/5e/65/b05e65e027bbc1c590ce4e283666b946.jpg",
  "https://i.pinimg.com/736x/96/67/5c/96675cf170debb7871754fe2c6358289.jpg"
];

const images = Array(2).fill(baseImages).flat();

console.log(images)



const CylindricalSlider = () => {
  console.log(window.innerWidth);
  const checkoutRef = useRef(null);
  const sliderRef = useRef(null);
  const isInsideItem = useRef(false); // Track if mouse is inside an item
  useEffect(() => {
    if (!checkoutRef.current) return;

    const checkout = checkoutRef.current;
    const moveX = gsap.quickTo(checkout, "x", {
      duration: 0.2,
      onUpdate: () => {
        if (!isInsideItem.current) {
          scaleTween.play();
        } else {
          scaleTween.reverse();
        }
      },
    });
    const moveY = gsap.quickTo(checkout, "top", {
      duration: 0.2,
      onUpdate: () => {
        if (!isInsideItem.current) {
          scaleTween.play();
        } else {
          scaleTween.reverse();
        }
      },
    });
    const fade = gsap.quickTo(checkout, "opacity", {
      duration: 0.1,
      delay: 10,
    });

    let scaleTween = gsap.to(checkout, {
      scale: 0.3,
      duration: 0.1,
      paused: true,
    });

    const handleMouseMove = (event) => {
      if (!sliderRef.current) return;
      const sliderRect = sliderRef.current.getBoundingClientRect();

      if (isInsideItem.current) {
        moveX(event.clientX);
        moveY(event.clientY - sliderRect.top);
      }

      fade(isInsideItem.current ? 1 : 0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const navigate = useNavigate()
  const handleClick = (i)=>{
    navigate(`/our-work?i=${i}`)
  }



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
      {window.innerWidth > 600 && (
        <div
          ref={checkoutRef}
          className="checkout absolute pointer-events-none opacity-0 min-w-[250px] z-10 uppercase bg-white rounded-full py-2 px-4"
        >
          click to check out
        </div>
      )}
      <div className="slider relative" style={{ "--quantity": images.length }}>
        {images.map((src, i) => (
          <div
            key={i}
            className="item relative group"
            style={{ "--position": i + 1 }}
            onMouseEnter={() => (isInsideItem.current = true)}
            onMouseLeave={() => (isInsideItem.current = false)}
            onClick={()=>handleClick(i % 6)}
          >
            <img src={src} alt={`Slide ${i + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CylindricalSlider;
