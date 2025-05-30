import React, { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReelCanvas from "./ReelCanvas";
import { useLocation } from "react-router-dom";

// Register plugin
gsap.registerPlugin(ScrollTrigger);

const HowItWorksCanvas = ({ setComponentLoaded = () => {} }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const screen2TextRef = useRef(null);
  const frameCount = 122; 
  const images = useRef([]);
  const isHome = useLocation().pathname === "/";
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [startLoading, setStartLoading] = useState(false);

  // Lazy-load images when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStartLoading(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Preload images after lazy trigger
  useEffect(() => {
    if (!startLoading) return;

    const loadImages = async () => {
      const imageElements = [];
      for (let i = 160; i < 285; i++) {
        const img = new Image();
        // img.src = `https://digicots.com/images/FRONT/${i.toString().padStart(4, "0")}.avif`;
        img.src = `/front-frame/frame_${i.toString().padStart(5, "0")}.webp`;
        imageElements.push(img);
      }

      const promises = imageElements.map(
        (img) =>
          new Promise((resolve) => {
            img.onload = () => resolve(img);
            img.onerror = () => resolve(null);
          })
      );

      const loadedImages = await Promise.all(promises);
      images.current = loadedImages.filter(Boolean);
      setImagesLoaded(true);
      setComponentLoaded((prev) => ({ ...prev, heroCanvas: true }));
    };

    loadImages();

    return () => {
      images.current = [];
    };
  }, [startLoading]);

  // Canvas initialization
  useEffect(() => {
    if (!imagesLoaded) return;

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
  }, [imagesLoaded]);

  // Scroll-based animation
  useGSAP(() => {
    if (!imagesLoaded) return;

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
        scrub: 0.1,
      },
    });

    const animationObject = { frame: 0 };
    timeline.to(animationObject, {
      frame: frameCount - 1,
      ease: "none",
      snap: "frame",
      onUpdate: () => updateFrame(animationObject.frame),
    });

    let moveY;
    if (isHome) {
      moveY = gsap.to(containerRef.current, {
        y: "40%",
        duration: 20,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top -302%",
          end: "top -400%",
          scrub: 0.2,
        },
      });
    }

    return () => {
      timeline.scrollTrigger?.kill();
      if (isHome) moveY?.scrollTrigger?.kill();
      timeline.kill();
      moveY?.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [isHome, imagesLoaded]);

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
      <div style={{ height: "200vh" }} />
    </section>
  );
};

export default HowItWorksCanvas;
