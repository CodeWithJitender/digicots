import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const VideoLikeCanvasAnimation = ({
  imgPath,
  height = "100vh",
  fps = 20,
  startFrame = 40,
  endFrame = 80,
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const frameCount = endFrame - startFrame + 1;
  const progressRef = useRef(0);
  const lastFrameIndexRef = useRef(-1); // Track last drawn frame to avoid redundant draws

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let ctx = canvas.getContext("2d", { alpha: true });
    const dpr = Math.min(window.devicePixelRatio, 2);
    let images = [];
    let animationId;

    // Set canvas size
    const setCanvasSize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    // Load images
    const loadImages = async () => {
      const imagePromises = [];
      for (let i = startFrame; i <= endFrame; i++) {
        const frameNumber = String(i).padStart(4, "0");
        const img = new Image();
        img.src = `${imgPath}${frameNumber}.png`;
        imagePromises.push(
          new Promise((resolve) => {
            img.onload = () => resolve(img);
            img.onerror = () => resolve(null);
          })
        );
      }
      return await Promise.all(imagePromises);
    };

    // Draw frame with optimization
    const drawFrame = (frameIndex) => {
      if (!images[frameIndex] || frameIndex === lastFrameIndexRef.current) return;

      lastFrameIndexRef.current = frameIndex;
      const img = images[frameIndex];
      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;

      let width, height, x, y;
      if (imgRatio > canvasRatio) {
        height = canvas.height;
        width = height * imgRatio;
        x = (canvas.width - width) / 2;
        y = 0;
      } else {
        width = canvas.width;
        height = width / imgRatio;
        x = 0;
        y = (canvas.height - height) / 2;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, x, y, width, height);
    };

    // Animation loop
    const animate = () => {
      const frameIndex = Math.floor(progressRef.current * frameCount) % frameCount;
      drawFrame(frameIndex);
      animationId = requestAnimationFrame(animate);
    };

    // Initialize
    const init = async () => {
      setCanvasSize();
      images = await loadImages();
      images = images.filter((img) => img !== null);

      if (images.length === 0) {
        console.error("No images loaded");
        return;
      }

      setIsReady(true);

      // GSAP animation
      gsap.to(progressRef, {
        value: 1,
        duration: frameCount / fps,
        ease: "none",
        repeat: -1,
        onUpdate: function () {
          progressRef.current = this.progress();
        },
      });

      animationId = requestAnimationFrame(animate);
    };

    init();

    // Handle resize with debounce
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setCanvasSize();
        const frameIndex = Math.floor(progressRef.current * frameCount) % frameCount;
        drawFrame(frameIndex);
      }, 50); // Reduced to 50ms for better responsiveness
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      gsap.killTweensOf(progressRef);
    };
  }, [imgPath, fps, startFrame, endFrame, frameCount]);

  return (
    <div
      ref={containerRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{ height }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          backgroundColor: isReady ? "transparent" : "#f0f0f0",
        }}
      />
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center">
          Loading animation frames...
        </div>
      )}
    </div>
  );
};

export default VideoLikeCanvasAnimation;