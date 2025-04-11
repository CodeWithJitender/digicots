import React, { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReelCanvas from "./ReelCanvas";

gsap.registerPlugin(ScrollTrigger);

function HomeHeroCanvas() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const screen2TextRef = useRef(null);
  const frameCount = 180;
  const images = useRef([]);

  // Preload images once
  useEffect(() => {
    const imageElements = [];
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = `./hero_section/H${i.toString().padStart(3, "0")}.avif`;
      imageElements.push(img);
    }
    images.current = imageElements;

    return () => {
      // Optional cleanup if needed
      images.current = [];
    };
  }, []);

  // Set canvas dimensions based on first image
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const firstImage = images.current[0];

    const setCanvasSize = () => {
      if (firstImage && context) {
        canvas.width = firstImage.naturalWidth;
        canvas.height = firstImage.naturalHeight;
        context.drawImage(firstImage, 0, 0, canvas.width, canvas.height);
      }
    };

    if (firstImage) {
      if (firstImage.complete) {
        setCanvasSize();
      } else {
        firstImage.onload = setCanvasSize;
      }
    }

    return () => {
      if (firstImage) {
        firstImage.onload = null;
      }
    };
  }, []);

  useGSAP(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    const updateFrame = (frameIndex) => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      const img = images.current[Math.floor(frameIndex)];
      if (img?.complete) {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    };

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 0",
        end: "top -400%",
        scrub: 1,
        // pin: true,
        // markers: true,
      },
    });

    const animationObject = { frame: 0 };
    timeline.to(animationObject, {
      frame: frameCount - 1,
      ease: "none",
      snap: "frame",
      onUpdate: () => updateFrame(animationObject.frame),
    }, "start");

    timeline.to(screen2TextRef.current, {
      opacity: 1,
      bottom: "0%",
      duration: 1,
    }, "start");

    const moveY = gsap.to(containerRef.current, {
      y: "40%",
      duration: 20,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top -402%",
        end: "top -500%",
        scrub: 1,
      },
    });

    return () => {
      timeline.scrollTrigger?.kill();
      moveY.scrollTrigger?.kill();
      timeline.kill();
      moveY.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section className="hero-main min-h-[500vh] bg-black">
      <div
        ref={containerRef}
        className="h-screen sticky top-0 w-full overflow-hidden"
      >
        <canvas
          ref={canvasRef}
          className="h-full w-full"
          style={{ objectFit: "cover" }}
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

      {/* Extra space for scroll */}
      <div style={{ height: "200vh" }} />
    </section>
  );
}

export default HomeHeroCanvas;
