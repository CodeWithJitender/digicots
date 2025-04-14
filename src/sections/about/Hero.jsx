import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import TextAnimation1 from "../../animation/text/TextAnimation1";
import TextAnimation2 from "../../animation/text/TextAnimation2";
import { ScrollTrigger } from "gsap/all";

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
    controls.minDistance = 2; // Prevent zooming too close
    controls.maxDistance = 10; // Prevent zooming too far

    controlsRef.current = controls;

    return () => controls.dispose();
  }, [camera, gl]);

  useFrame(() => controlsRef.current?.update());

  return null;
};

function Model({ modelPath }) {
  const gltf = useLoader(GLTFLoader, modelPath);

  // Traverse and enhance all materials in the model
  useEffect(() => {
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        // Enhance material properties
        child.material = child.material.clone();
        child.material.envMapIntensity = 0.5;
        child.material.needsUpdate = true;

        // Standardize materials for consistent appearance
        if (!child.material.emissive) {
          child.material.emissive = new THREE.Color(0x000000);
          child.material.emissiveIntensity = 0.1;
        }

        // Increase specular highlights
        child.material.shininess = 30;
        child.material.roughness = 0.5;
        child.material.metalness = 0.1;
      }
    });
  }, [gltf]);

  const modelRef = useRef();
  const { mouse } = useThree();

  useFrame(() => {
    if (modelRef.current) {
      // Create a vector from mouse position (normalized to -1 to 1 range)
      const target = new THREE.Vector3(mouse.x * 0.3, mouse.y * 0.2, 0.5);

      // Make model look at this point
      modelRef.current.lookAt(target);

      // Optional: Only rotate around Y axis (left/right) if you don't want vertical movement
      // modelRef.current.rotation.x = 0;
      // modelRef.current.rotation.z = 0;
    }
  });

  return (
    <primitive position={[0, window.innerWidth > 640 ? 0.05 : .2  , 0]} object={gltf.scene} ref={modelRef} />
  );
}

const RandomBalls = ({ count = 300 }) => {
  const { mouse, clock } = useThree();
  const groupRef = useRef();
  const startTime = useRef(clock.getElapsedTime()); // Track animation start time

  // Initialize balls with original positions and random movement parameters
  const balls = useRef(
    Array.from({ length: count }).map(() => {
      const speed = 0.2 + Math.random() * 0.3;
      const offset = Math.random() * Math.PI * 2;

      return {
        originalPosition: [
          (() => {
            let offset;
            do {
              offset = (Math.random() - 0.5) * 3;
            } while (offset > -0.01 && offset < 0.01);
            return offset;
          })(),
          (() => {
            let offset;
            do {
              offset = (Math.random() - 0.5) * 2.5;
            } while (offset > -0.01 && offset < 0.01);
            return offset;
          })(),
          (Math.random() - 0.8) * 5,
        ],
        speed,
        offset,
        radiusX: 0.05 + Math.random() * 0.1,
        radiusY: 0.05 + Math.random() * 0.1,
        radiusZ: 0.02 + Math.random() * 0.05,
      };
    })
  );

  const prevMousePosition = useRef(new THREE.Vector2());

  useFrame(() => {
    if (!groupRef.current) return;
    const time = clock.getElapsedTime();
    
    // Calculate animation progress (2-second intro)
    const elapsedTime = time - startTime.current;
    const progress = Math.min(elapsedTime / 2, 1);

    // Handle mouse rotation (original behavior)
    const deltaX = mouse.x - prevMousePosition.current.x;
    const deltaY = mouse.y - prevMousePosition.current.y;
    prevMousePosition.current.set(mouse.x, mouse.y);

    groupRef.current.rotation.y += deltaX * 0.05;
    groupRef.current.rotation.x -= deltaY * 0.05;

    // Add individual ball movement with intro animation
    groupRef.current.children.forEach((ball, index) => {
      const ballData = balls.current[index];
      const t = time * ballData.speed + ballData.offset;

      // Calculate interpolated base position
      const baseX = ballData.originalPosition[0] * progress;
      const baseY = ballData.originalPosition[1] * progress;
      const baseZ = ballData.originalPosition[2] * progress;

      // Apply movement to interpolated position
      ball.position.x = baseX + Math.sin(t) * ballData.radiusX;
      ball.position.y = baseY + Math.cos(t * 0.7) * ballData.radiusY;
      ball.position.z = baseZ + Math.sin(t * 0.5) * ballData.radiusZ;

      // Maintain original depth scaling
      const depthFactor = 1 - (ballData.originalPosition[2] + 5) / 10;
      ball.scale.setScalar(0.7 + depthFactor * 0.1);
    });
  });

  return (
    <group ref={groupRef}>
      {balls.current.map((ball, index) => (
        <mesh
          key={index}
          position={[0, 0, 0]} // Start all balls at origin
          castShadow
          receiveShadow
        >
          <sphereGeometry args={[0.009, 32, 32]} />
          <meshStandardMaterial
            color={new THREE.Color().setHSL(39 / 360, 1, 0.5)}
            roughness={0.3}
            metalness={0.5}
          />
        </mesh>
      ))}
    </group>
  );
};

const Hero = () => {
  const modelPath = "https://ik.imagekit.io/x5xessyka/digicots/public/3dmodel/Digitcots_3d.gltf";
  const heroRef = useRef(null);

  gsap.registerPlugin(ScrollTrigger);
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger:{
        trigger:heroRef.current,
        start: "top 0",
        end: "top -100%",
        // // markers: true,
        scrub:1,
      }
    })
    tl.to(heroRef.current,{
      y:"30%",
      // duration: 1,
    })
  }, [heroRef.current]);

  return (
    <div className="h-screen overflow-hidden w-full bg-[#171717]">
      <div ref={heroRef} className="h-full w-full">
        <HeroText />

        <Canvas
          camera={{ position: [0, 0, window.innerWidth > 640 ? 5 : 9 ], fov: 10 }}
          style={{
            width: "100%",
            height: "100vh",
            background: "transparent", // Changed to transparent
            position: "absolute", // Ensures transparency works properly
            top: 0,
          }}
          shadows
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: "high-performance",
            premultipliedAlpha: false, // Important for proper transparency
          }}
        >
          {/* Improved lighting setup */}
          {/* <color attach="background" args={["#171717"]} /> */}

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
            color="#fffff"
          />

          <pointLight
            position={[0, 3, 0]}
            intensity={0.5}
            color="#ffffff"
            distance={10}
            decay={1}
          />

          <Suspense fallback={null}>
            <Model modelPath={modelPath} />
            {/* <CameraControls /> */}
            <RandomBalls /> {/* Add 30 random balls */}
          </Suspense>
        </Canvas>
        {/* Scroll Indicator */}
        <div className="absolute pointer-events-none bottom-0 left-1/2 transform -translate-x-1/2  px-6  rounded-full text-black font-medium">
          <img src="scroll.png" className="max-w-80" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Hero;

function HeroText() {
  return (
    <section className="relative pointer-events-none h-full text-white px-8  flex flex-col md:flex-row items-center justify-between">
      <div className={window.innerWidth > 640 ? "container-xxl" : ""}>
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-[11.5vw] mt-[45vh] sm:text-[13vw] md:text-[12vw] overflow-hidden text-zinc-950/[.5] sm:mt-[25vh] font-bold mb-6">
            <TextAnimation1 animeStart="1000">WHO WE ARE</TextAnimation1>
          </h2>
          <p className="text-[3vw] sm:text-[1.5vw] md:text-[1.2vw] lg:text-[.9vw] relative z-[2] text-zinc-400 md:w-[80vw] lg:w-[60vw] text-center mt-[-4vh] sm:mt-[-9vw] lg:mt-[-12vh] ">
            <TextAnimation2 animeStart="80" duration={0.5}>
              Digicots is a cutting-edge digital marketing company that
              specializes in helping businesses thrive in the online landscape.
              With a team of innovative strategists and creative thinkers,
              Digicots offers a range of services including SEO, social media
              management, content creation, and pay-per-click advertising. Their
              mission is to empower brands by enhancing their online presence
              and driving targeted traffic to their websites. By leveraging the
              latest technologies and trends, Digicots crafts tailored marketing
              solutions that resonate with audiences and deliver measurable
              results. Partner with Digicots to elevate your brand and achieve
              your digital marketing goals.
            </TextAnimation2>
          </p>
        </div>
      </div>
    </section>
  );
}
