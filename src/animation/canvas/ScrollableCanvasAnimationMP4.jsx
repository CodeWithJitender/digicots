import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const ScrollableCanvasAnimationMP4 = ({ imgPath, frameCount,height="200vh" }) => {
  const canvasRef = useRef(null);

  // Generate image paths
  const generateImagePaths = (frameCount) => {
    return Array.from(
      { length: frameCount },
      (_, i) => `${imgPath}${String(i + 1).padStart(4, "0")}.png`
    );
  };

  // Preload images
  const preloadImages = (imagePaths) => {
    return Promise.all(
      imagePaths.map(
        (path) =>
          new Promise((resolve, reject) => {
            const img = new Image();
            img.src = path;
            img.onload = () => resolve(img);
            img.onerror = (err) => reject(err);
          })
      )
    );
  };

  // Setup canvas and animations
  const setupCanvas = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");

    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };
    window.addEventListener("resize", handleResize);

    // Load images
    const images = await preloadImages(generateImagePaths(frameCount));
    const imageSeq = { frame: 0 };

    // Render function
    const render = () => {
      const img = images[imageSeq.frame];
      if (!img) return;

      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      const centerShiftX = (canvas.width - img.width * ratio) / 2;
      const centerShiftY = (canvas.height - img.height * ratio) / 2;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        centerShiftX,
        centerShiftY,
        img.width * ratio,
        img.height * ratio
      );
    };

    // GSAP timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: canvas,
        start: "top top",
        end: `top -${frameCount}%`,
        scrub: 0.5,
        scroller: "body", // Use body as scroller (synced with Lenis)
        onUpdate: render,
      },
    });

    tl.to(imageSeq, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
    });

    // Initial render
    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      tl.kill();
    };
  };

  // Initialize canvas after mount
  useEffect(() => {
    setupCanvas();
  }, []);

  return (
    <div className={`relative h-[${height}] min-h-[200vh] w-full bg-red-300`}>
      <canvas
        ref={canvasRef}
        className="sticky top-0 h-screen w-full bg-zinc-800/[.5]"
      ></canvas>
    </div>
  );
};

export default ScrollableCanvasAnimationMP4;
