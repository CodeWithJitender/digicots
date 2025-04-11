import React, { useEffect, useRef, useState, useCallback } from "react";

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
  const lastFrameIndexRef = useRef(-1);
  const intervalRef = useRef(null);
  const imagesRef = useRef([]);
  const isVisibleRef = useRef(true);
  const progressRef = useRef(0);

  // Memoized frame calculation
  const getFrameIndex = useCallback(
    (progress) => Math.floor(progress * frameCount) % frameCount,
    [frameCount]
  );

  // Optimized draw function
  const drawFrame = useCallback(
    (frameIndex) => {
      const canvas = canvasRef.current;
      if (!canvas || frameIndex === lastFrameIndexRef.current) return;

      const ctx = canvas.getContext("2d", { alpha: true, willReadFrequently: true });
      const img = imagesRef.current[frameIndex];
      if (!img) return;

      lastFrameIndexRef.current = frameIndex;

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
    },
    []
  );

  // Set canvas size with DPR consideration
  const setCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = Math.min(window.devicePixelRatio, 1.5);
    const width = container.clientWidth;
    const height = container.clientHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
  }, []);

  // Load images progressively
  const loadImages = useCallback(async () => {
    const images = [];
    for (let i = startFrame; i <= endFrame; i++) {
      const frameNumber = String(i).padStart(4, "0");
      const img = new Image();
      img.src = `${imgPath}${frameNumber}.png`;

      await new Promise((resolve) => {
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
      });

      if (img) images[i - startFrame] = img;
    }
    return images;
  }, [imgPath, startFrame, endFrame]);

  const animationFrameRef = useRef(null);


  // Animation update function for setInterval
  const updateAnimation = useCallback(() => {
    if (!isVisibleRef.current) return;
  
    const frameDuration = 1000 / fps;
    const now = performance.now();
    const elapsed = now - (updateAnimation.lastFrameTime || 0);
  
    if (elapsed >= frameDuration) {
      updateAnimation.lastFrameTime = now;
  
      progressRef.current = (progressRef.current + 1 / frameCount) % 1;
      const frameIndex = getFrameIndex(progressRef.current);
      drawFrame(frameIndex);
    }
  
    animationFrameRef.current = requestAnimationFrame(updateAnimation);
  }, [drawFrame, getFrameIndex, fps, frameCount]);
  updateAnimation.lastFrameTime = 0;


  
  // Handle resize with debouncing
  const handleResize = useCallback(() => {
    let resizeTimeout;
    return () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setCanvasSize();
        const frameIndex = getFrameIndex(progressRef.current);
        drawFrame(frameIndex);
      }, 100);
    };
  }, [drawFrame, getFrameIndex, setCanvasSize])();

  // Setup Intersection Observer
  const setupIntersectionObserver = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (!isVisibleRef.current && animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        } else if (isVisibleRef.current && !animationFrameRef.current && isReady) {
          updateAnimation.lastFrameTime = performance.now();
          animationFrameRef.current = requestAnimationFrame(updateAnimation);
        }
        
      },
      { threshold: 0 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [isReady, updateAnimation, fps]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let cleanupObserver;
    const init = async () => {
      setCanvasSize();
      const loadedImages = await loadImages();

      if (loadedImages.length === 0) {
        console.error("No images loaded");
        return;
      }

      imagesRef.current = loadedImages;
      setIsReady(true);

      cleanupObserver = setupIntersectionObserver();
      if (isVisibleRef.current) {
        updateAnimation.lastFrameTime = performance.now();
        animationFrameRef.current = requestAnimationFrame(updateAnimation);
      }
      
    };

    init();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (cleanupObserver) cleanupObserver();
      imagesRef.current = [];
      progressRef.current = 0;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [fps, handleResize, loadImages, setCanvasSize, setupIntersectionObserver, updateAnimation]);

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

export default React.memo(VideoLikeCanvasAnimation);