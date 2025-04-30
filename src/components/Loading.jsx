import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

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
      modelRef.current.rotation.y += delta * loadingVal * 0.2;
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

const Loading = () => {
  const modelPath =
    "https://ik.imagekit.io/x5xessyka/digicots/public/3dmodel/Digitcots_3d.gltf";
  const heroRef = useRef(null);
  const loadingVal = useRef(1);
  const [loadingProgress, setLoadingProgress] = useState(loadingVal.current);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          return 100;
        }
        return prev + Math.random() * 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

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
      {!isComplete && (
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
                <Model loadingVal={loadingProgress} modelPath={modelPath} />
              </Suspense>
            </Canvas>
          </div>

          {/* Loading Bar with Following Text */}
          <div className="absolute bottom-10 w-full px-4">
            <div className="relative w-full mx-auto">
              <div className="h-[1px] bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#ED510C] transition-all duration-300 ease-out"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
              <span
                className="absolute flex items-center justify-end top-[-1.5rem] md:top-[-2rem] text-white text-sm md:text-xl font-medium transition-all duration-300 ease-out"
                style={{
                  width: `${loadingProgress}%`,
                }}
              >
                {Math.round(loadingProgress)}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loading;