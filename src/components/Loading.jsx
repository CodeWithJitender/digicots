import React, { useState, useEffect, useRef, useMemo, useContext } from "react";
import { useLocation } from "react-router-dom";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";




export const LoadingContext = React.createContext();


function Model({ modelPath, loadingVal }) {
  const gltf = useLoader(GLTFLoader, modelPath);
  const modelRef = useRef();

  const scene = useMemo(() => {
    const clonedScene = gltf.scene.clone(true);
    clonedScene.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material = child.material.clone();
        child.material.envMapIntensity = 0.5;
        child.material.shininess = 30;
        child.material.roughness = 0.5;
        child.material.metalness = 0.1;
        child.material.emissive = child.material.emissive || new THREE.Color(0x000000);
        child.material.emissiveIntensity = 0.1;
        child.material.needsUpdate = true;
      }
    });
    return clonedScene;
  }, [gltf]);

  useFrame((_, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * (loadingVal >= 100 ? 1 : loadingVal * 0.2);
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      position={[0, window.innerWidth > 640 ? 0.05 : 0.2, 0]}
    />
  );
}

const Loading = () => {
  const { loadingContext } = useContext(LoadingContext);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const modelPath =
    "https://digicots.com/images/Digitcots_3d.gltf";

 useEffect(() => {
  setProgress(0);
  setIsLoading(true);
  let animationFrame;
  const start = performance.now();
  const duration = 3000;
  console.log(loadingContext.loading);
  
  const animateProgress = (time) => {
    const elapsed = time - start;
    const newProgress = Math.min((elapsed / duration) * 90, 90); // Stop at 90%
    setProgress(newProgress);

    if (newProgress < 90) {
      animationFrame = requestAnimationFrame(animateProgress);
    } else {
      // Now wait for loadingContext.loading to become false
      const waitForContext = setInterval(() => {
        if (!loadingContext.loading) {
          clearInterval(waitForContext);
          console.log("Loading complete");
          setProgress(100); // Final jump to 100
          setTimeout(() => {
            setIsLoading(false);
          }, 500); // slight delay for final animation
        }
      }, 100); // check every 100ms
    }
  };

  animationFrame = requestAnimationFrame(animateProgress);

  return () => {
    cancelAnimationFrame(animationFrame);
  };
}, [location.pathname, loadingContext]);


  const containerVariants = {
    initial: { opacity: 1, scale: 1 },
    exit: {
      opacity: 0,
      scale: 1.4,
      filter: "blur(10px)",
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="loading-screen"
          className="h-screen overflow-hidden fixed z-[1000000] w-full bg-[#171717]"
          variants={containerVariants}
          initial="initial"
          exit="exit"
        >
          <div className="h-full w-full">
            <Canvas
              className="bg-[#171717]"
              key="Loading-canvas"
              camera={{
                position: [0, 0, window.innerWidth > 640 ? 5 : 9],
                fov: 10,
              }}
              dpr={[1, 1.5]}
              style={{
                width: "100%",
                height: "100vh",
                background: "transparent",
                position: "absolute",
                top: 0,
              }}
              shadows={false}
              gl={{
                alpha: true,
                antialias: true,
                powerPreference: "high-performance",
                premultipliedAlpha: false,
                precision: "mediump",
              }}
            >
              <ambientLight intensity={0.8} color="#FFA500" />
              <directionalLight position={[5, 5, 5]} intensity={0.6} color="#FFA500" />
              <Model loadingVal={progress} modelPath={modelPath} />
            </Canvas>
          </div>

          <div className="absolute bottom-10 w-full px-4">
            <div className="relative w-full mx-auto">
              <div className="h-[1px] bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#ED510C] transition-all duration-100 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span
                className="absolute flex items-center justify-end top-[-1.5rem] md:top-[-2rem] text-white text-sm md:text-xl font-medium transition-all duration-100 ease-out"
                style={{ width: `${progress}%` }}
              >
                {Math.round(progress)}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loading;
