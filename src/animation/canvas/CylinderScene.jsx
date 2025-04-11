import React, {
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

// Helper: Get responsive scene settings
const useResponsiveSettings = () => {
  const [settings, setSettings] = useState(() => getSettings());

  useEffect(() => {
    const handleResize = () => setSettings(getSettings());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function getSettings() {
    const isMobile = window.innerWidth <= 643;
    return {
      numCards: 15,
      radius: isMobile ? 15 : 30,
      height: isMobile ? 10 : 15,
      fov: isMobile ? 60 : 40,
    };
  }

  return settings;
};

// ✅ Memoized Card
const Card = React.memo(({ angle, radius, height, cardWidth, texture, setHovered }) => {
  const [isHovered, setIsHovered] = useState(false);

  const position = useMemo(() => [
    Math.sin(angle) * radius,
    0,
    Math.cos(angle) * radius,
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
        transparent
      />
    </mesh>
  );
});

// ✅ Scene Content
const CylinderSceneContent = () => {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  const { numCards, radius, height } = useResponsiveSettings();

  const textures = useLoader(THREE.TextureLoader, [
    "./slide-1.png",
    "./slide-2.png",
  ]);

  const cardWidth = useMemo(() => {
    const circumference = 2 * Math.PI * radius;
    return circumference / numCards;
  }, [radius, numCards]);

  useFrame((_, delta) => {
    if (groupRef.current && !hovered) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  const cards = useMemo(() =>
    Array.from({ length: numCards }, (_, i) => {
      const angle = (i / numCards) * Math.PI * 2;
      const textureIndex = i % 2;
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
    }), [numCards, radius, height, cardWidth, textures]);

  return <group ref={groupRef}>{cards}</group>;
};

// ✅ Main Component
const CylinderScene = () => {
  const dpr = useMemo(() => Math.min(2, window.devicePixelRatio), []);

  const cameraConfig = useMemo(() => ({
    position: [0, 0, 0],
    fov: 30,
  }), []);

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
