import React, { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReelCanvas from "./ReelCanvas"; // Import ReelCanvas component

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function HomeHeroCanvas() {
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
        img.src = `./hero_section/UNREAL ENGINE ${i
          .toString()
          .padStart(3, "0")}.png`;
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
        start: "top 0", // Start when top of container hits top of viewport
        end: `top -400%`, // Scroll distance proportional to frame count (adjustable)
        scrub: 1, // Reduced scrub for tighter scroll control
        // pin: true,           // Re-enabled pinning for sticky effect
        // markers: true,       // Debugging markers (remove in production)
      },
    });

    tl.to(
      { frame: 0 }, // Object to animate
      {
        frame: frameCount - 1, // Animate from frame 0 to 180
        ease: "none", // Linear easing for smooth frame change
        snap: "frame", // Snap to nearest integer for cleaner frame steps
        onUpdate: function () {
          updateFrame(this.targets()[0].frame); // Update canvas on each frame change
        },
      },
      "a"
    ).to(
      screen2TextRef.current,
      {
        opacity: 1,
        bottom: "0%",
        duration: 1,
        onStart : ()=>{
        }
    }
    ,"a"
    )
    gsap.to(containerRef.current,{
        y:"30%",
        duration: 10,
        ease: "linear",
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top -402%", // Start when top of container hits top of viewport
            end: `top -500%`, // Scroll distance proportional to frame count (adjustable)
            scrub: 1, // Reduced scrub for tighter scroll control
            // pin: true,           // Re-enabled pinning for sticky effect
            // markers: true,       // Debugging markers (remove in production)
        },
    })
  }, []);

  return (
    <section className="hero-main min-h-[500vh] bg-black ">
      <div
        ref={containerRef}
        className="h-screen sticky top-0 w-full"
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
            ref={screen2TextRef}
            className="service-text absolute bottom-[-300%] w-full"
          >
            <ReelCanvas />
          </div>
        </div>
      </div>
      {/* Extra space for scrolling */}
      <div style={{ height: "200vh" }} />
    </section>
  );
}

export default HomeHeroCanvas;
