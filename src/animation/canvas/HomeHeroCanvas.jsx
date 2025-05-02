import React, { useRef, useEffect, useState, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReelCanvas from "./ReelCanvas";

gsap.registerPlugin(ScrollTrigger);

const HomeHeroCanvas = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const screen2TextRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const frameCount = 180;
  const images = useRef([]);
  const animationRefs = useRef({ timeline: null, moveY: null });

  // Preload images and handle loading state
  useEffect(() => {
    let isMounted = true;

    const loadImages = async () => {
      const loaders = [];
      const imageElements = [];

      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        const loader = new Promise((resolve) => {
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
          img.src = `https://ik.imagekit.io/x5xessyka/digicots/hero_section/H${i
            .toString()
            .padStart(3, "0")}.avif`;
        });
        imageElements.push(img);
        loaders.push(loader);
      }

      await Promise.all(loaders);
      if (isMounted) {
        images.current = imageElements;
        setIsLoading(false);
      }
    };

    loadImages();

    return () => {
      isMounted = false;
      images.current = [];
    };
  }, [frameCount]);

  // Canvas setup
  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const firstImage = images.current[0];

    if (!canvas || !context || !firstImage) return;

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
      firstImage.onload = null;
      context.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      return setupCanvas();
    }
  }, [isLoading, setupCanvas]);

  // Animation setup
  useGSAP(
    () => {
      if (isLoading) return;

      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");

      if (!canvas || !context) return;

      const updateFrame = (frameIndex) => {
        const img = images.current[Math.floor(frameIndex)];
        if (img?.complete) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
      };

      // Clean up existing animations
      animationRefs.current.timeline?.kill();
      animationRefs.current.moveY?.kill();

      // Create timeline
      animationRefs.current.timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 0",
          end: "top -350%",
          scrub: 0.2,
          onRefresh: (self) =>
            self.progress &&
            self.progress > 0 &&
            self.progress < 1 &&
            self.animation.progress(self.progress),
        },
      });

      animationRefs.current.timeline.to(
        { frame: 0 },
        {
          frame: frameCount - 1,
          ease: "none",
          snap: "frame",
          onUpdate: function () {
            updateFrame(this.targets()[0].frame);
          },
        },
        "start"
      );

      animationRefs.current.timeline.to(
        screen2TextRef.current,
        {
          opacity: 1,
          bottom: "0%",
          duration: 1,
        },
        "start"
      );

      // MoveY animation
      animationRefs.current.moveY = gsap.to(containerRef.current, {
        y: "40%",
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top -302%",
          end: "top -400%",
          scrub: 1,
        },
      });

      return () => {
        animationRefs.current.timeline?.kill();
        animationRefs.current.moveY?.kill();
      };
    },
    { dependencies: [isLoading] }
  );

  // Component unmount cleanup
  useEffect(() => {
    return () => {
      animationRefs.current.timeline?.kill();
      animationRefs.current.moveY?.kill();
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="hero-main min-h-[400vh] bg-black">
      <div ref={containerRef} className="h-screen sticky top-0 w-full overflow-hidden">
        <canvas ref={canvasRef} className="h-full w-full" style={{ objectFit: "cover" }} />
        <div className="hero-container h-screen w-full absolute top-0 text-center">
          <div ref={screen2TextRef} className="service-text absolute bottom-[-300%] w-full">
            <ReelCanvas />
          </div>
        </div>
      </div>
      <div style={{ height: "200vh" }} />
    </section>
  );
};

export default HomeHeroCanvas;