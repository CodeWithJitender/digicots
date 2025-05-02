import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  Suspense,
} from "react";
import { useLocation } from "react-router-dom";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";


// Loading Context with Progress Tracking
export const LoadingContext = createContext({
  registerComponent: () => {},
  unregisterComponent: () => {},
  updateProgress: () => {},
  isPageLoaded: false,
  totalProgress:0
});

export const LoadingProvider = ({ children }) => {
  const [loadingComponents, setLoadingComponents] = useState(new Map());
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [totalProgress, setTotalProgress] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);
  const location = useLocation();
  const timeoutRef = useRef(null); // Ref to track timeout

  // Reset loading state on page navigation
  useEffect(() => {
    setLoadingComponents(new Map());
    setIsPageLoaded(false);
    setTotalProgress(0);
    setAnimationComplete(false);
    clearTimeout(timeoutRef.current); // Clear any existing timeout
    console.log("location changed")
  }, [location.pathname]);

  const registerComponent = useCallback((componentId) => {
    setLoadingComponents((prev) => {
      const newMap = new Map(prev);
      newMap.set(componentId, 0); // Initialize progress at 0%
      return newMap;
    });
  }, []);

  const unregisterComponent = useCallback(
    (componentId) => {
      setLoadingComponents((prev) => {
        const newMap = new Map(prev);
        newMap.delete(componentId);
        if (newMap.size === 0) {
          // Ensure minimum 3-second animation if no progress updates
          const minAnimationTime = 3000; // 3 seconds
          const delay = animationComplete ? 0 : minAnimationTime;
          clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => {
            setAnimationComplete(true);
            setIsPageLoaded(true);
          }, delay);
        }
        return newMap;
      });
    },
    [animationComplete]
  );

  const updateProgress = useCallback((componentId, progress) => {
    setLoadingComponents((prev) => {
      const newMap = new Map(prev);
      newMap.set(componentId, Math.min(progress, 100)); // Cap progress at 100
      const total = Array.from(newMap.values()).reduce((sum, p) => sum + p, 0);
      const avgProgress = newMap.size > 0 ? total / newMap.size : 100;
      setTotalProgress(Math.min(avgProgress, 100));
      // Mark animation as complete if progress reaches 100
      if (avgProgress >= 100) {
        setAnimationComplete(true);
      }
      return newMap;
    });
  }, []);

  return (
    <LoadingContext.Provider
      value={{
        registerComponent,
        unregisterComponent,
        updateProgress,
        isPageLoaded,
        totalProgress,
        setTotalProgress
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

// Higher-Order Component to handle component loading with progress
export const withLoading = (WrappedComponent, loadResources) => {
  return (props) => {
    const {
      registerComponent,
      unregisterComponent,
      updateProgress,
      isPageLoaded,
    } = useContext(LoadingContext);
    const [isComponentLoaded, setIsComponentLoaded] = useState(false);
    const componentId = useRef(
      `${WrappedComponent.name}-${Math.random().toString(36).slice(2)}`
    ).current;
    const hasResponded = useRef(false); // Track if component has provided progress
    const timeoutRef = useRef(null); // Timeout for no response

    useEffect(() => {
      registerComponent(componentId);

      // Set a 3-second timeout for no response
      timeoutRef.current = setTimeout(() => {
        if (!hasResponded.current) {
          setIsComponentLoaded(true);
          updateProgress(componentId, 100);
        }
      }, 3000);

      const load = async () => {
        try {
          await loadResources((progress) => {
            hasResponded.current = true; // Mark as responded
            updateProgress(componentId, progress);
          });
          setIsComponentLoaded(true);
          updateProgress(componentId, 100);
        } catch (error) {
          console.error(
            `Failed to load resources for ${WrappedComponent.name}:`,
            error
          );
          updateProgress(componentId, 100);
          setIsComponentLoaded(true); // Allow rendering on error
        }
      };

      load();

      return () => {
        clearTimeout(timeoutRef.current); // Cleanup timeout
        unregisterComponent(componentId);
      };
    }, [componentId, registerComponent, unregisterComponent, updateProgress]);

    // Render component only after both loading and animation are complete
    if (!isComponentLoaded || !isPageLoaded) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

// Camera Controls Component
export const CameraControls = () => {
  const { camera, gl } = useThree();
  const controlsRef = useRef();

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.enableRotate = true;
    controls.zoomSpeed = 0.6;
    controls.panSpeed = 0.5;
    controls.rotateSpeed = 0.4;
    controls.minDistance = 2;
    controls.maxDistance = 10;

    controlsRef.current = controls;

    return () => controls.dispose();
  }, [camera, gl]);

  useFrame(() => controlsRef.current?.update());

  return null;
};

// Model Component
function Model({ modelPath, loadingVal }) {
  const gltf = useLoader(GLTFLoader, modelPath);

  useEffect(() => {
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.material = child.material.clone();
        child.material.envMapIntensity = 0.5;
        child.material.needsUpdate = true;

        if (!child.material.emissive) {
          child.material.emissive = new THREE.Color(0x000000);
          child.material.emissiveIntensity = 0.1;
        }

        child.material.shininess = 30;
        child.material.roughness = 0.5;
        child.material.metalness = 0.1;
      }
    });
  }, [gltf]);

  const modelRef = useRef();
  const { mouse } = useThree();

  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y +=
        delta * (loadingVal >= 100 ? 1 : loadingVal * 0.2); // Faster rotation at 100%
    }
  });

  return (
    <primitive
      position={[0, window.innerWidth > 640 ? 0.05 : 0.2, 0]}
      object={gltf.scene}
      ref={modelRef}
    />
  );
}

// Loading Component
const Loading = () => {
  const { isPageLoaded, totalProgress } = useContext(LoadingContext);
  const modelPath =
    "https://ik.imagekit.io/x5xessyka/digicots/public/3dmodel/Digitcots_3d.gltf";
  const heroRef = useRef(null);
  const [displayProgress, setDisplayProgress] = useState(totalProgress);

  // Smoothly animate progress to 100% when resources are loaded
  useEffect(() => {
    if (totalProgress >= 100 && displayProgress < 100) {
      const interval = setInterval(() => {
        setDisplayProgress((prev) => {
          const next = prev + (100 - prev) * 0.2; // Exponential smoothing
          if (next >= 99.9) {
            clearInterval(interval);
            return 100;
          }
          return next;
        });
      }, 50); // Update every 50ms for smooth animation
      return () => clearInterval(interval);
    } else if (totalProgress < 100) {
      setDisplayProgress(totalProgress);
    }
  }, [totalProgress, displayProgress]);

  // Framer Motion variants for the exit animation
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
    <AnimatePresence>
      {!isPageLoaded && (
        <motion.div
          className="h-screen overflow-hidden fixed z-[1000000] w-full bg-[#171717]"
          variants={containerVariants}
          initial="initial"
          exit="exit"
        >
          <div ref={heroRef} className="h-full w-full">
            <Canvas
              camera={{
                position: [0, 0, window.innerWidth > 640 ? 5 : 9],
                fov: 10,
              }}
              style={{
                width: "100%",
                height: "100vh",
                background: "transparent",
                position: "absolute",
                top: 0,
              }}
              shadows
              gl={{
                alpha: true,
                antialias: true,
                powerPreference: "high-performance",
                premultipliedAlpha: false,
              }}
            >
              <ambientLight intensity={1.2} color="#FFA500" />
              <directionalLight
                position={[5, 5, 5]}
                intensity={0.8}
                color="#FFA500"
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
              />
              <directionalLight
                position={[-5, 5, -5]}
                intensity={0.4}
                color="#ffffff"
              />
              <pointLight
                position={[0, 3, 0]}
                intensity={0.5}
                color="#ffffff"
                distance={10}
                decay={1}
              />
              <Suspense fallback={null}>
                <Model loadingVal={displayProgress} modelPath={modelPath} />
              </Suspense>
            </Canvas>
          </div>

          {/* Loading Bar with Following Text */}
          <div className="absolute bottom-10 w-full px-4">
            <div className="relative w-full mx-auto">
              <div className="h-[1px] bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#ED510C] transition-all duration-300 ease-out"
                  style={{ width: `${displayProgress}%` }}
                />
              </div>
              <span
                className="absolute flex items-center justify-end top-[-1.5rem] md:top-[-2rem] text-white text-sm md:text-xl font-medium transition-all duration-300 ease-out"
                style={{
                  width: `${displayProgress}%`,
                }}
              >
                {Math.round(displayProgress)}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loading;
