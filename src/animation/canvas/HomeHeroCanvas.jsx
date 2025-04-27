import React, { useRef, useEffect, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReelCanvas from "./ReelCanvas";

gsap.registerPlugin(ScrollTrigger);

const HomeHeroCanvas = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const screen2TextRef = useRef(null);
  const frameCount = 180;
  const images = useRef([]);
  const animationRefs = useRef({
    timeline: null,
    moveY: null,
    imageLoaders: []
  });

  // Image preloading with cleanup
  useEffect(() => {
    const loadImages = () => {
      const imageElements = [];
      const loaders = [];
      
      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        const loader = new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve; // Handle errors gracefully
        });
        
        img.src = `https://ik.imagekit.io/x5xessyka/digicots/hero_section/H${i.toString().padStart(3, "0")}.avif`;
        imageElements.push(img);
        loaders.push(loader);
      }
      
      images.current = imageElements;
      animationRefs.current.imageLoaders = loaders;
    };

    loadImages();

    return () => {
      // Cleanup image references and loaders
      images.current = [];
      animationRefs.current.imageLoaders = [];
    };
  }, [frameCount]);

  // Canvas setup with cleanup
  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const firstImage = images.current[0];

    if (!firstImage || !context) return;

    const handleResize = () => {
      if (firstImage.complete) {
        canvas.width = firstImage.naturalWidth;
        canvas.height = firstImage.naturalHeight;
        context.drawImage(firstImage, 0, 0, canvas.width, canvas.height);
      }
    };

    if (firstImage.complete) {
      handleResize();
    } else {
      firstImage.onload = handleResize;
    }

    return () => {
      if (firstImage) {
        firstImage.onload = null;
      }
      // Clear canvas
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
  }, []);

  useEffect(() => {
    return setupCanvas();
  }, [setupCanvas]);

  // Animation setup with comprehensive cleanup
  useGSAP(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) return;

    const updateFrame = (frameIndex) => {
      if (!context || !images.current) return;
      
      context.clearRect(0, 0, canvas.width, canvas.height);
      const img = images.current[Math.floor(frameIndex)];
      if (img?.complete) {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    };

    // Kill existing animations before creating new ones
    if (animationRefs.current.timeline) {
      animationRefs.current.timeline.kill();
      animationRefs.current.timeline.scrollTrigger?.kill();
    }
    if (animationRefs.current.moveY) {
      animationRefs.current.moveY.kill();
      animationRefs.current.moveY.scrollTrigger?.kill();
    }

    // Create new timeline
    animationRefs.current.timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 0",
        end: "top -350%",
        scrub: .2,
        onRefresh: self => self.progress && self.progress > 0 && self.progress < 1 && self.animation.progress(self.progress),
      },
    });

    const animationObject = { frame: 0 };
    animationRefs.current.timeline.to(animationObject, {
      frame: frameCount - 1,
      ease: "none",
      snap: "frame",
      onUpdate: () => updateFrame(animationObject.frame),
    }, "start");

    animationRefs.current.timeline.to(screen2TextRef.current, {
      opacity: 1,
      bottom: "0%",
      duration: 1,
    }, "start");

    // Create moveY animation
    animationRefs.current.moveY = gsap.to(containerRef.current, {
      y: "40%",
      duration: 20,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top -302%",
        end: "top -400%",
        scrub: 1,
      },
    });

    return () => {
      // Cleanup function for useGSAP
      if (animationRefs.current.timeline) {
        animationRefs.current.timeline.kill();
        if (animationRefs.current.timeline.scrollTrigger) {
          animationRefs.current.timeline.scrollTrigger.kill();
        }
      }
      if (animationRefs.current.moveY) {
        animationRefs.current.moveY.kill();
        if (animationRefs.current.moveY.scrollTrigger) {
          animationRefs.current.moveY.scrollTrigger.kill();
        }
      }
    };
  }, []);

  // Component unmount cleanup
  useEffect(() => {
    return () => {
      // Kill all animations
      if (animationRefs.current.timeline) {
        animationRefs.current.timeline.kill();
        animationRefs.current.timeline.scrollTrigger?.kill();
      }
      if (animationRefs.current.moveY) {
        animationRefs.current.moveY.kill();
        animationRefs.current.moveY.scrollTrigger?.kill();
      }

      // Clear canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const context = canvas.getContext("2d");
        context?.clearRect(0, 0, canvas.width, canvas.height);
      }

      // Clear ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === containerRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

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
};

export default HomeHeroCanvas;