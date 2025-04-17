import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";
import TextAnimation1 from "../../animation/text/TextAnimation1";
import TextAnimation2 from "../../animation/text/TextAnimation2";
import gsap from "gsap";

function Hero() {
  const imgRef = useRef(null);
  useGSAP(() => {
    gsap.from(imgRef.current, {
      duration: 2,
      // scale:0,
      opacity: 0,
      ease: "power4.inOut",
    });
  }, [imgRef.current]);

  return (
    <section className="relative bg-black text-white px-8  flex flex-col md:flex-row items-center justify-between">
      <div className="container-xxl">
        <div className="grid lg:grid-cols-[40fr_60fr] items-center">
          {/* Left side - Logo and Animation */}
          <div className="">
            <img
              ref={imgRef}
              src="https://ik.imagekit.io/8mbzq2hdl/digicots/logo.gif?updatedAt=1744631774976"
              alt="Logo"
              className="w-full animate-pulse"
            />
          </div>

          {/* Right side - Text Content */}
          <div className="">
            <h2 className="text-4xl md:text-8xl font-bold mb-6">
              <TextAnimation1>Who We Are?</TextAnimation1>
            </h2>
            <p className="text-lg md:text-sm text-zinc-400 ">
              <TextAnimation2 animeStart="80" duration={0.2}>
                We’re not just any other marketing agency – we’re the alpha
                pack. We are Digicots – fierce, relentless, unapologetically
                bold. Our instinctive mastery, data-driven approach and uncaged
                creativity are what makes us prey on nothing but excellence!
              </TextAnimation2>
            </p>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2  px-6  rounded-full text-black font-medium">
            <img src="https://ik.imagekit.io/8mbzq2hdl/digicots/scroll.png?updatedAt=1744631739204" className="max-w-80" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
