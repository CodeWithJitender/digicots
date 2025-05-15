import React, { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReelCanvas from "./ReelCanvas";
import { useLocation } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const HowItWorksCanvas = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const screen2TextRef = useRef(null);
  const frameCount = 131;
  const images = useRef([]);
  const isHome = useLocation().pathname === "/";

  // Preload images once
  useEffect(() => {
    const imageElements = [];
    for (let i = 151; i < 285; i++) {
      const img = new Image();
      img.src = `https://ik.imagekit.io/x5xessyka/digicots/front_wolf/output_${i.toString().padStart(4, "0")}.png`;
      imageElements.push(img);
    }
    images.current = imageElements;
    const loadImages = async () => {
      const promises = imageElements.map((img) => {
        return new Promise((resolve) => {
          img.onload = () => resolve(img);
          img.onerror = () => resolve(null);
        });
      });

      const loadedImages = await Promise.all(promises);
      images.current = loadedImages.filter(Boolean);
    };
    loadImages();
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
        end: "top -240%",
        scrub: .1,
        // pin: true,
        // // // markers: true,
      },
    });

    const animationObject = { frame: 0 };
    timeline.to(
      animationObject,
      {
        frame: frameCount - 1,
        ease: "none",
        snap: "frame",
        onUpdate: () => updateFrame(animationObject.frame),
      },
      "start"
    );

    // timeline.to(
    //   screen2TextRef.current,
    //   {
    //     opacity: 1,
    //     bottom: "0%",
    //     duration: 1,
    //   },
    //   "start"
    // );

    let moveY;
    if(isHome){
      moveY = gsap.to(containerRef.current, {
        y: "40%",
        duration: 20,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top -302%",
          end: "top -400%",
          scrub: .2,
        },
      });
    }

    return () => {
      timeline.scrollTrigger?.kill();
      if(isHome) moveY?.scrollTrigger?.kill();
      timeline.kill();
      moveY?.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [isHome]);

  return (
    <section className="hero-main min-h-[400vh] bg-black">
      <div
        ref={containerRef}
        className="h-screen sticky top-0 w-full overflow-hidden"
      >
        <canvas
          ref={canvasRef}
          className="h-full w-full"
          style={{ objectFit: "cover" }}
        />
      </div>
      {/* Extra space for scroll */}
      <div style={{ height: "200vh" }} />
    </section>
  );
};

export default HowItWorksCanvas;
