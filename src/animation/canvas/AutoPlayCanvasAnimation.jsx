import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const VideoLikeCanvasAnimation = ({ imgPath, height = "100vh", fps = 24 }) => {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const progressRef = useRef({ value: 0 });
  const animationRef = useRef(null);
  const frameCount = 41; // Fixed to your 40 frames requirement

  // Generate image paths
  const generateImagePaths = () => {
    const startFrame = 40;
    const endFrame = 80;

    return Array.from(
      { length: endFrame - startFrame + 1 }, // +1 to include both endpoints
      (_, i) => `${imgPath}${String(startFrame + i).padStart(4, "0")}.png`
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


  const render = (progress) => {
  const canvas = canvasRef.current;
  if (!canvas || imagesRef.current.length === 0) return;

  // Calculate frame index
  const frameIndex = Math.floor(progress * frameCount) % frameCount;
  const img = imagesRef.current[frameIndex];
  if (!img) return;

  // Get device pixel ratio
  const dpr = Math.min(window.devicePixelRatio,2);
  
  // Set canvas size accounting for DPR
  const displayWidth = Math.floor(canvas.clientWidth * dpr);
  const displayHeight = Math.floor(canvas.clientHeight * dpr);
  
  // Only resize if needed
  if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
    canvas.width = displayWidth;
    canvas.height = displayHeight;
  }

  const context = canvas.getContext("2d", {
    willReadFrequently: false,
    alpha: true
  });

  // Calculate aspect-ratio preserving dimensions
  const canvasRatio = canvas.width / canvas.height;
  const imgRatio = img.width / img.height;
  
  let width, height, x, y;
  
  if (imgRatio > canvasRatio) {
    // Image is wider than canvas (relative to height)
    width = canvas.width;
    height = width / imgRatio;
    x = 0;
    y = (canvas.height - height) / 2;
  } else {
    // Image is taller than canvas (relative to width)
    height = canvas.height;
    width = height * imgRatio;
    x = (canvas.width - width) / 2;
    y = 0;
  }

  // High-quality rendering settings
  context.save();
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.globalCompositeOperation = "source-over";
  context.globalAlpha = 1.0;
  context.filter = "none";

  // Clear canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Draw image with high quality
  context.drawImage(
    img,
    0, 0, img.width, img.height,  // source dimensions
    x, y, width, height           // destination dimensions
  );

  context.restore();
};

  // GSAP-powered animation loop
  const startAnimation = () => {
    const duration = frameCount / fps; // Exactly the time needed for 40 frames at given fps

    animationRef.current = gsap.to(progressRef.current, {
      value: 1,
      duration: duration,
      ease: "none", // 'none' is better than 'linear' for frame-perfect animation
      repeat: -1,
      onUpdate: () => render(progressRef.current.value),
      // Reset progress on each repeat for perfect loop
      onRepeat: () => {
        progressRef.current.value = 0;
      },
    });
  };

  // Setup canvas and animations
  const setupCanvas = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render(progressRef.current.value);
    };
    window.addEventListener("resize", handleResize);

    // Load images and start animation
    try {
      imagesRef.current = await preloadImages(generateImagePaths());
      render(0);
      startAnimation();
    } catch (error) {
      console.error("Error loading images:", error);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      animationRef.current?.kill();
    };
  };

  useEffect(() => {
    setupCanvas();
    return () => {
      animationRef.current?.kill();
    };
  }, []);

  return (
    <div className={`relative z-[10] h-[100vh] w-full`}>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 h-screen w-full"
        style={{ imageRendering: "crisp-edges" }}
      />
    </div>
  );
};

export default VideoLikeCanvasAnimation;
