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
  
    // Render function
    const render = (progress) => {
      const canvas = canvasRef.current;
      if (!canvas || imagesRef.current.length === 0) return;
  
      // Calculate frame index with modulo for perfect looping
      const frameIndex = Math.floor(progress * frameCount) % frameCount;
      const context = canvas.getContext("2d");
      const img = imagesRef.current[frameIndex];
  
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
        }
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
      <div className={`relative h-[${height}] w-full`}>
        <canvas
          ref={canvasRef}
          className="fixed top-0 left-0 h-screen w-full"
          style={{ imageRendering: 'crisp-edges' }}
        />
      </div>
    );
  };

export default VideoLikeCanvasAnimation;