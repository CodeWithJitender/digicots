import React, { useRef, useState, useMemo, useCallback } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

// Memoized Card component to prevent unnecessary re-renders
const Card = React.memo(({ angle, radius, height, cardWidth, texture, setHovered }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const position = useMemo(() => [
    Math.sin(angle) * radius, 
    0, 
    Math.cos(angle) * radius
  ], [angle, radius]);

  const handlePointerOver = useCallback((e) => {
    e.stopPropagation();
    setHovered(true);
    setIsHovered(true);
  }, [setHovered]);

  const handlePointerOut = useCallback(() => {
    setHovered(false);
    setIsHovered(false);
  }, [setHovered]);

  return (
    <mesh
      position={position}
      rotation={[0, angle, 0]}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <planeGeometry args={[cardWidth, height]} />
      <meshBasicMaterial 
        map={texture} 
        side={THREE.DoubleSide} 
        transparent={true} 
      />
    </mesh>
  );
});

// Scene component with cylinder arrangement
const CylinderSceneContent = () => {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Responsive dimensions with memoization and window resize handling
  const { numCards, radius, height, fov } = useMemo(() => ({
    numCards: 15,
    radius: window.innerWidth > 643 ? 30 : 15,
    height: window.innerWidth > 643 ? 15 : 10,
    fov: window.innerWidth > 643 ? 40 : 60,
  }), []);

  // Preload textures once with error handling
  const textures = useLoader(THREE.TextureLoader, [
    "./slide-1.png",
    "./slide-2.png",
  ], undefined, (error) => {
    console.error("Error loading textures:", error);
  });

  // Calculate card width
  const cardWidth = useMemo(() => {
    const circumference = 2 * Math.PI * radius;
    return circumference / numCards;
  }, [radius, numCards]);

  // Rotation animation with optimized frame handling
  useFrame((state, delta) => {
    if (groupRef.current && !hovered) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  // Generate cards with memoization
  const cards = useMemo(() => {
    return Array.from({ length: numCards }, (_, i) => {
      const angle = (i / numCards) * Math.PI * 2;
      const textureIndex = i % 2 === 0 ? 0 : 1;
      return (
        <Card
          key={i}
          angle={angle}
          radius={radius}
          height={height}
          cardWidth={cardWidth}
          texture={textures[textureIndex]}
          setHovered={setHovered}
        />
      );
    });
  }, [numCards, radius, height, cardWidth, textures]);

  return <group ref={groupRef}>{cards}</group>;
};

// Main component with responsive handling
const CylinderScene = () => {
  const cameraConfig = useMemo(() => ({
    position: [0, 0, 0],
    fov: 30
  }), []);

  const dpr = useMemo(() => Math.min(2, window.devicePixelRatio), []);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Canvas
        camera={cameraConfig}
        dpr={dpr}
        gl={{ antialias: true }}
      >
        <CylinderSceneContent />
      </Canvas>
    </div>
  );
};

export default React.memo(CylinderScene);