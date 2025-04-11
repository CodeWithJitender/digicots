import React, { useState, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const WavePlane = () => {
  const meshRef = useRef();
  const materialRef = useRef();
  const amplitude = useRef({ value: 0 });

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const texture = new THREE.TextureLoader().load("./reel-cover.png");

  const mapWidth = (width, inMin = 390, inMax = 1536, outMin = 3, outMax = 16) => {
    return ((width - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
  };

  const mappedValueX = mapWidth(dimensions.width, 370, 1536, 4, 16);
  const x = useRef({ value: mappedValueX });
  const y = useRef({ value: -7.5 });
  const z = useRef({ value: -3 });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      materialRef.current.uniforms.uWaveAmplitude.value = amplitude.current.value;
      meshRef.current.position.set(
        x.current.value,
        y.current.value,
        z.current.value
      );
    }
  });

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        scrub: 1,
        trigger: ".homeCanvas",
        start: "top 0",
        end: "top -50%",
      },
    });

    tl.to(amplitude.current, { value: 0.3, ease: "power1.inOut" }, "a")
      .to(materialRef.current.uniforms.uTime, { value: "+=10", duration: 10 }, "a")
      .to([x.current, y.current], { value: 0, duration: 6 }, "a")
      .to(z.current, { value: 7, duration: 8 }, "a")
      .to(materialRef.current.uniforms.uTime, { value: "+=15", duration: 10 }, "b")
      .to(amplitude.current, { value: 0, duration: 5 }, "b");

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <mesh ref={meshRef} position={[x.current.value, y.current.value, z.current.value]}>
      <planeGeometry args={[dimensions.width / 200, dimensions.height / 200, 32, 32]} />
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

const WebGLCleanup = () => {
  const gl = useThree((state) => state.gl);

  useEffect(() => {
    return () => {
      const ext = gl?.getContext()?.getExtension("WEBGL_lose_context");
      ext?.loseContext();
    };
  }, [gl]);

  return null;
};

const Scene = () => {
  return (
    <div className="relative min-h-[150vh] w-full">
      <div className="sticky top-0" style={{ width: "100vw", height: "100vh" }}>
        <Canvas className="homeCanvas" camera={{ position: [0, 0, 10], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <WavePlane />
          <WebGLCleanup />
        </Canvas>

        <div className="h-full w-full absolute top-0">
          <div className="absolute bottom-5 left-7 text-sm text-white text-left leading-none">
            While you imagined creativity, <br /> We established authenticity!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scene;
