import React, { useState, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Showreel from "../../sections/home/Showreel";
import showreel from "../../assets/showreels.mp4"; // Adjust path as needed
import { useGSAP } from "@gsap/react";
import { OptionController } from "three/examples/jsm/libs/lil-gui.module.min.js";

gsap.registerPlugin(ScrollTrigger);

const WavePlane = () => {
  const meshRef = useRef();
  const materialRef = useRef();
  const amplitude = useRef({ value: 0 });
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });


  
  function mapWidth(width, inMin = 390, inMax = 1536, outMin = 3, outMax = 16) {
    return ((width - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
  }

  // Example Usage
  const width = dimensions.width; // Change this value to test
  const mappedValueX = mapWidth(width ,370, 1536, 4, 16);





  const x = useRef({ value: mappedValueX });
  const y = useRef({ value: -7.5 });
  const z = useRef({ value: -3 });
  const opacityRef = useRef(0); // Local ref to track opacity changes

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    //   console.log(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const texture = new THREE.TextureLoader().load("./reel-cover.png");

  const vertexShader = `
    varying vec2 vUv;
    uniform float uTime;
    uniform float uWaveAmplitude;
    
    void main() {
      vUv = uv;
      
      vec3 pos = position;
      float wave = sin(pos.x + uTime) * uWaveAmplitude;
      wave += cos(pos.y + uTime) * uWaveAmplitude;
      pos.z = wave;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;
    uniform sampler2D uTexture;
    
    void main() {
      gl_FragColor = texture2D(uTexture, vUv);
    }
  `;

  const uniforms = {
    uTime: { value: 0 },
    uWaveAmplitude: { value: 0 },
    uTexture: { value: texture },
  };

  useFrame((state) => {
    if (materialRef.current) {
      //   console.log(amplitude.current.value);
      // materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      //   console.log(materialRef.current.uniforms.uTime.value)
      // Directly update the uniform value from our ref
      materialRef.current.uniforms.uWaveAmplitude.value =
        amplitude.current.value;

      // Update the position of the mesh
      meshRef.current.position.x = x.current.value;
      meshRef.current.position.y = y.current.value;
      meshRef.current.position.z = z.current.value;
    }
  });

  const getScrollPercentage = () => {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    return Math.min(scrollY / viewportHeight, 1); // Max 100% (1)
  };

  useGSAP(() => {
    const initialProgress = getScrollPercentage(); // Get initial scroll progress

    const tl = gsap.timeline({
      scrollTrigger: {
        scrub: 1,
        trigger: ".homeCanvas",
        start: "top 0",
        end: "top -50%",
        // markers: true,
        snap: true,
      },
    });

    tl.to(amplitude.current, { value: 0.3, ease: "power1.inOut" }, "a")
      .to(
        materialRef.current.uniforms.uTime,
        { value: "+=10", ease: "power1.inOut", duration: 10 },
        "a"
      )
      .to(
        [x.current, y.current],
        { value: 0, ease: "power1.inOut", duration: 6 },
        "a"
      )
      .to(z.current, { value: 7, ease: "power1.inOut", duration: 8 }, "a")
      .to(
        materialRef.current.uniforms.uTime,
        { value: "+=15", ease: "power1.inOut", duration: 10 },
        "b"
      )
      .to(
        amplitude.current,
        { value: 0, ease: "power1.inOut", duration: 5 },
        "b"
      );

    //   console.log(initialProgress)

    // tl.progress(initialProgress); // Set initial animation progress based on scroll

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [meshRef.current, materialRef.current]);

  return (
    <mesh
      ref={meshRef}
      position={[x.current.value, y.current.value, z.current.value]}
    >
      <planeGeometry
        args={[dimensions.width / 200, dimensions.height / 200, 32, 32]}
      />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

const Scene = () => {
  //   useEffect(() => {
  //     console.log("Opacity updated:", opacity);
  //   }, [opacity]); // Debugging to check when opacity updates

  return (
    <div className="relative min-h-[150vh] w-full bg-black">
      <div className="sticky top-0" style={{ width: "100vw", height: "100vh" }}>
        <Canvas
          className="homeCanvas"
          camera={{ position: [0, 0, 10], fov: 75 }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <WavePlane />
        </Canvas>
      </div>
    </div>
  );
};

export default Scene;
