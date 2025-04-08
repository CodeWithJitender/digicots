import React, { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function HeroDiscover() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const screen1TextRef = useRef(null);
  const screen2TextRef = useRef(null);
  const frameCount = 181; // Total frames from 000 to 180
  const images = useRef([]); // Store loaded images

  // Preload all images
  useEffect(() => {
    const loadImages = () => {
      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = `./moon_frame/NewSEQUNCE${i.toString().padStart(3, "0")}.png`;
        images.current[i] = img;
      }
    };
    loadImages();
  }, []);

  // Set canvas size once the first image loads
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const setCanvasSize = () => {
      if (images.current[0] && images.current[0].complete) {
        canvas.width = images.current[0].naturalWidth;
        canvas.height = images.current[0].naturalHeight;
        // Draw the first frame immediately
        context.drawImage(images.current[0], 0, 0, canvas.width, canvas.height);
      }
    };

    if (images.current[0]) {
      images.current[0].onload = setCanvasSize;
      // If the image is already loaded (cached), trigger manually
      if (images.current[0].complete) setCanvasSize();
    }
  }, []);

  useGSAP(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Animation function to draw frames
    const updateFrame = (frameIndex) => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      const img = images.current[Math.floor(frameIndex)]; // Keep Math.floor for now
      if (img && img.complete) {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    };

    // GSAP ScrollTrigger animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 0",    // Start when top of container hits top of viewport
        end: `top -200%`, // Scroll distance proportional to frame count (adjustable)
        scrub: 1,          // Reduced scrub for tighter scroll control
        // pin: true,           // Re-enabled pinning for sticky effect
        // markers: true,       // Debugging markers (remove in production)
      },
    });

    tl.to(
      { frame: 0 }, // Object to animate
      {
        frame: frameCount - 1, // Animate from frame 0 to 180
        ease: "none",          // Linear easing for smooth frame change
        snap: "frame",         // Snap to nearest integer for cleaner frame steps
        onUpdate: function () {
          updateFrame(this.targets()[0].frame); // Update canvas on each frame change
        },
      },
      "a"
    )
    .to(
      screen1TextRef.current,
      {
        opacity: 0.5,
        bottom: "100%",
      },
      "a"
    )
    .to(
      screen2TextRef.current,
      {
        opacity: 1,
        bottom: "10%",
        duration: 0.5,
      },
      "a"
    );
  }, []);

  return (
    <section className="hero-discover bg-amber-50 ">
      <div
        ref={containerRef}
        className="h-screen bg-red-100 fixed top-0 w-full"
        style={{
          overflow: "hidden", // Prevent overflow issues
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            objectFit: "cover", // Maintain aspect ratio and quality
          }}
          className="h-full w-full"
        />

        <div className="hero-container h-screen w-full absolute top-0 text-center">
          <div
            ref={screen1TextRef}
            className="hero-text w-full absolute bottom-0 px-4"
          >
            <h1 className="font-bold text-inter text-5xl sm:text-7xl lg:text-9xl text-zinc-800 text-center mb-20 md:mb-40">
              DIGICOTS
            </h1>
            <p className="text-inter text-lg text-center text-white mb-5">
              SCROLL TO KNOW HOWL CAN WE HELP YOU?
            </p>
            <img src="arrow-down.png" alt="" className="w-16 m-auto mb-5" />
          </div>

          <div
            ref={screen2TextRef}
            className="service-text flex flex-col md:flex-row justify-between items-end absolute opacity-0 bottom-[-50%] w-full py-10 md:p-5 px-10 text-center md:text-start gap-5"
          >
            <h1 className="m-auto max-w-[500px] font-black text-4xl md:text-6xl text-white">
              Let's Discover Our Services
            </h1>
            <h3 className="m-auto max-w-[350px] font-semibold text-2xl md:text-4xl text-right text-white">
              We are happy to see you here
            </h3>
          </div>
        </div>
      </div>
      {/* Extra space for scrolling */}
      <div style={{ height: "200vh" }} />
    </section>
  );
}

export default HeroDiscover;