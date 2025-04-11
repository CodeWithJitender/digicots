import React, { useEffect, useRef, useState, useCallback } from "react";

const VideoLikeCanvasAnimation = ({
  imgPath,
  height = "100vh",
  fps = 24, // Kept at 24 for balance; adjust as needed
  startFrame = 40,
  endFrame = 80,
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const frameCount = endFrame - startFrame + 1; // 41 frames
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

  // Optimized draw function with minimal clearing
  const drawFrame = useCallback(
    (frameIndex) => {
      const canvas = canvasRef.current;
      if (!canvas || frameIndex === lastFrameIndexRef.current) return;

      const ctx = canvas.getContext("2d", { alpha: true, willReadFrequently: true });
      const img = imagesRef.current[frameIndex];
      if (!img) return;

      lastFrameIndexRef.current = frameIndex;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const canvasRatio = canvasWidth / canvasHeight;
      const imgRatio = img.width / img.height;

      let width, height, x, y;
      if (imgRatio > canvasRatio) {
        height = canvasHeight;
        width = height * imgRatio;
        x = (canvasWidth - width) / 2;
        y = 0;
      } else {
        width = canvasWidth;
        height = width / imgRatio;
        x = 0;
        y = (canvasHeight - height) / 2;
      }

      // Only clear the area that will be redrawn (optimization)
      ctx.clearRect(x, y, width, height);
      ctx.drawImage(img, x, y, width, height);
    },
    []
  );

  // Set canvas size with DPR consideration
  const setCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = Math.min(window.devicePixelRatio, 1.0); // Kept at 1.0; try 0.5 if needed
    const width = container.clientWidth;
    const height = container.clientHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
  }, []);

  // Load images efficiently with Promise.all
  const loadImages = useCallback(async () => {
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
    const images = await Promise.all(imagePromises);
    return images.filter(Boolean); // Remove nulls from failed loads
  }, [imgPath, startFrame, endFrame]);

  // Animation update function with setInterval
  const updateAnimation = useCallback(() => {
    if (!isVisibleRef.current) return;

    progressRef.current = (progressRef.current + 1 / frameCount) % 1;
    const frameIndex = getFrameIndex(progressRef.current);
    drawFrame(frameIndex);
  }, [drawFrame, getFrameIndex, frameCount]);

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
        if (!isVisibleRef.current && intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        } else if (isVisibleRef.current && !intervalRef.current && isReady) {
          intervalRef.current = setInterval(updateAnimation, 1);
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
        intervalRef.current = setInterval(updateAnimation, 1);
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
    };
  }, [fps, handleResize, loadImages, setCanvasSize, setupIntersectionObserver, updateAnimation]);

  return (
    <div
      ref={containerRef}
      className="absolute bottom-0 z-[99999] left-0 w-full h-full pointer-events-none"
      style={{ height, willChange: "transform" }} // Added for scroll optimization
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full relative z-[99999]"
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