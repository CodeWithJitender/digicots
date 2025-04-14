import React, { useRef, useState, useMemo, useCallback, useEffect } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
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

// Card Component
const Card = React.memo(
  ({ angle, radius, height, cardWidth, texture, setHovered, index, setHoveredCard, setMousePos }) => {
    const meshRef = useRef();
    const [isHovered, setIsHovered] = useState(false);
    const { camera, size } = useThree();

    const position = useMemo(
      () => [Math.sin(angle) * radius, 0, Math.cos(angle) * radius],
      [angle, radius]
    );

    const handlePointerOver = useCallback(
      (e) => {
        e.stopPropagation();
        setHovered(true);
        setIsHovered(true);
        setHoveredCard(index);
      },
      [setHovered, index, setHoveredCard]
    );

    const handlePointerOut = useCallback(() => {
      setHovered(false);
      setIsHovered(false);
      setHoveredCard(null);
    }, [setHovered, setHoveredCard]);

    const handlePointerMove = useCallback(
      (e) => {
        if (!meshRef.current) return;

        // Get 3D position of the card
        const vector = new THREE.Vector3();
        meshRef.current.getWorldPosition(vector);

        // Project to 2D screen coordinates
        vector.project(camera);

        // Convert to screen pixels
        const x = (vector.x * 0.5 + 0.5) * size.width;
        const y = (-vector.y * 0.5 + 0.5) * size.height;

        // Approximate card bounds in 2D
        const bounds = {
          left: x - (cardWidth * size.width) / (2 * radius),
          right: x + (cardWidth * size.width) / (2 * radius),
          top: y - (height * size.height) / (2 * radius),
          bottom: y + (height * size.height) / (2 * radius),
        };

        // Get mouse position
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Clamp to card bounds
        const clampedX = Math.max(bounds.left, Math.min(bounds.right, mouseX));
        const clampedY = Math.max(bounds.top, Math.min(bounds.bottom, mouseY));

        setMousePos({ x: clampedX, y: clampedY });
      },
      [camera, size, cardWidth, height, radius, setMousePos]
    );

    return (
      <mesh
        ref={meshRef}
        position={position}
        rotation={[0, angle, 0]}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onPointerMove={handlePointerMove}
      >
        <planeGeometry args={[cardWidth, height]} />
        <meshBasicMaterial map={texture} side={THREE.DoubleSide} transparent />
      </mesh>
    );
  }
);

// Scene Content
const CylinderSceneContent = ({setMousePos,setHoveredCard}) => {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  const { numCards, radius, height } = useResponsiveSettings();

  const textures = useLoader(THREE.TextureLoader, ["./slide-1.png", "./slide-2.png"]);

  
  const cardWidth = useMemo(() => {
    const circumference = 2 * Math.PI * radius;
    return circumference / numCards;
  }, [radius, numCards]);

  useFrame((_, delta) => {
    if (groupRef.current && !hovered) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  const cards = useMemo(
    () =>
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
            index={i}
            setHoveredCard={setHoveredCard}
            setMousePos={setMousePos}
          />
        );
      }),
    [numCards, radius, height, cardWidth, textures]
  );

  return <group ref={groupRef}>{cards}</group>;
};

// Main Component
const CylinderScene = () => {
  const dpr = useMemo(() => Math.min(2, window.devicePixelRatio), []);
  const checkoutRef = useRef();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const cameraConfig = useMemo(() => ({
    position: [0, 0, 0],
    fov: 30,
  }), []);

  // Update checkout div position
  useEffect(() => {
    const checkout = checkoutRef.current;
    if (checkout) {
      checkout.style.left = `${mousePos.x - 125}px`; // Center (250px width / 2)
      checkout.style.top = `${mousePos.y - 20}px`; // Offset above mouse
      checkout.style.opacity = hoveredCard !== null ? 1 : 0;
    }
  }, [mousePos, hoveredCard]);

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <Canvas camera={cameraConfig} dpr={dpr} gl={{ antialias: true }}>
        <CylinderSceneContent
          setHoveredCard={setHoveredCard}
          setMousePos={setMousePos}
        />
      </Canvas>
      <div
        ref={checkoutRef}
        className="absolute min-w-[250px] z-10 uppercase bg-white rounded-full py-2 px-4 pointer-events-none transition-opacity duration-300 shadow-lg font-semibold text-center"
        style={{ opacity: 0 }}
      >
        click to check out
      </div>
    </div>
  );
};

export default React.memo(CylinderScene);
