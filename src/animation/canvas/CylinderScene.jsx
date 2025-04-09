import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

// Card component with plane geometry and texture
const Card = ({ angle, radius, height, cardWidth, texture, setHovered }) => {
  const meshRef = useRef();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <mesh
      ref={meshRef}
      position={[Math.sin(angle) * radius, 0, Math.cos(angle) * radius]}
      rotation={[0, angle , 0]} // Face outward
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        setIsHovered(true);
      }}
      onPointerOut={() => {
        setHovered(false);
        setIsHovered(false);
      }}
    >
      <planeGeometry args={[cardWidth, height]} />
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} transparent={true} />
    </mesh>
  );
};

// Scene component with cylinder arrangement
const CylinderSceneContent = () => {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Responsive dimensions with memoization
  const { numCards, radius, height, fov } = useMemo(() => ({
    numCards: 15,
    radius: window.innerWidth > 643 ? 30 : 15,
    height: window.innerWidth > 643 ? 15 : 10,
    fov: window.innerWidth > 643 ? 40 : 60,
  }), []);

  // Preload textures once
  const textures = useLoader(THREE.TextureLoader, [
    "./slide-1.png",
    "./slide-2.png",
  ]);

  // Calculate card width
  const circumference = 2 * Math.PI * radius;
  const cardWidth = circumference / numCards;

  // Rotation animation
  useFrame((state, delta) => {
    if (groupRef.current && !hovered) {
      groupRef.current.rotation.y += delta * .1; // Use delta for smoother, device-independent rotation
    }
  });

  // Generate cards
  const cards = Array.from({ length: numCards }, (_, i) => {
    const angle = (i / numCards) * Math.PI * 2;
    const texture = textures[i % 2 === 0 ? 0 : 1]; // Reuse preloaded textures
    return (
      <Card
        key={i}
        angle={angle}
        radius={radius}
        height={height}
        cardWidth={cardWidth}
        texture={texture}
        setHovered={setHovered}
      />
    );
  });

  return <group ref={groupRef}>{cards}</group>;
};

// Main component
const CylinderScene = () => {
  const fov = window.innerWidth > 643 ? 40 : 60; // FOV calculated once

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Canvas
        camera={{ position: [0, 0, 0], fov:30 }} // Fixed camera position outside cylinder
        dpr={Math.min(2, window.devicePixelRatio)}
        gl={{ antialias: true }}
      >
        {/* <ambientLight intensity={0.7} /> */}
        {/* <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <directionalLight position={[0,   10, 5]} intensity={0.8} castShadow /> */}
        <CylinderSceneContent />
      </Canvas>
    </div>
  );
};

export default CylinderScene;