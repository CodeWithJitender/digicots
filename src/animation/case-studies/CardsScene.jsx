import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useDrag } from "react-use-gesture";
import * as THREE from "three";
import gsap from "gsap";
import CaseStudy from "../../sections/case-studies/CaseStudy";

const textures = [
  "case-study-1.png",
  "case-study-2.png",
  "case-study-3.png",
  "case-study-1.png",
  "case-study-2.png",
  "case-study-3.png",
  "case-study-1.png",
  "case-study-2.png",
  "case-study-3.png",
  "case-study-1.png",
  "case-study-2.png",
  "case-study-3.png",
  "case-study-1.png",
  "case-study-2.png",
  "case-study-3.png",
  "case-study-1.png",
  "case-study-2.png",
  "case-study-3.png",
  "case-study-1.png",
  "case-study-2.png",
  "case-study-3.png",
  "case-study-1.png",
  "case-study-2.png",
  "case-study-3.png",
  "case-study-1.png",
  "case-study-2.png",
  "case-study-3.png",
  "case-study-1.png",
  "case-study-2.png",
  "case-study-3.png",
];

const textureLoader = new THREE.TextureLoader();
const loadedTextures = textures.map((src) => textureLoader.load(src));

const cardCount = textures.length;
const radius = 15; // Radius of the circle

const vertexShader1 = `
  varying vec2 vUv;
  uniform float uTime;

  void main() {
    vUv = uv;
    vec3 pos = position;
    pos.xyz += sin(pos.y * .8 + uTime * 5.) * 0.05;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader1 = `
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uOpacity;

  void main() {
    // Sample the texture
    vec4 texColor = texture2D(uTexture, vUv);

    // Fresnel effect for edge shine
    vec3 viewDir = vec3(0.0, 0.0, 1.0); // Assume the view direction is along the Z-axis
    vec3 normal = vec3(0.0, 0.0, 1.0); // Assume the surface normal is along the Z-axis
    float fresnel = pow(1.0 - dot(normal, viewDir), 3.0); // Increase the power for a sharper edge effect

    // Specular highlight for a bright white shine
    vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0)); // Light direction
    float specular = pow(max(dot(reflect(-lightDir, normal), viewDir), 0.0), 64.0); // Increase the specular power for a sharper highlight

    // Combine the effects with a whitish shine
    vec3 whitishShine = vec3(1.0, 1.0, 1.0) * (fresnel * 0.8 + specular * 1.2); // Whitish color for the shine
    vec3 shinyColor = texColor.rgb + whitishShine;

    // Time-based shimmer for dynamic effect
    float shimmer = sin(uTime * 7.0 + vUv.y * 2.0) * 0.1;
    shinyColor += shimmer;

    // Apply opacity
    texColor.rgb = shinyColor;
    texColor.a *= uOpacity;

    // Output the final color
    gl_FragColor = texColor;
  }
`;

const vertexShader2 = `
  varying vec2 vUv;
  uniform float uTime;
  void main() {
    vUv = uv;
    vec3 pos = position;
    pos.xyz += sin(pos.y + uTime*1.) * 0.2;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader2 = `
  varying vec2 vUv;
  uniform sampler2D uTexture;
  void main() {
    vec4 texColor = texture2D(uTexture, vUv);
    gl_FragColor = texColor;
  }
`;

const Card1 = ({ position, rotation, texture, cardRef, onClick }) => {
  const materialRef = useRef();

  return (
    <mesh onClick={onClick} position={position} rotation={rotation} ref={cardRef}>
      <planeGeometry args={[2, 2.5, 1, 1]} /> {/* Reduced segments to 1, 1 */}
      <shaderMaterial
        ref={materialRef}
        uniforms={{
          uTexture: { value: texture },
          uTime: { value: 0 },
          uOpacity: { value: 0 }, // Start with opacity 0
        }}
        vertexShader={vertexShader1}
        fragmentShader={fragmentShader1}
        transparent={true} // Enable transparency
      />
    </mesh>
  );
};

const Card2 = ({ position, rotation, texture, cardRef }) => {
  return (
    <mesh position={position} rotation={rotation} ref={cardRef}>
      <planeGeometry args={[2, 3, 80, 80]} /> {/* Reduced segments to 1, 1 */}
      <shaderMaterial
        uniforms={{
          uTexture: { value: texture },
          uTime: { value: 0 },
        }}
        vertexShader={vertexShader2}
        fragmentShader={fragmentShader2}
      />
    </mesh>
  );
};

const RotatingGroup = ({ setSelectedIndex }) => {
  const groupRef = useRef();
  const dragState = useRef(0);
  const isDragging = useRef(false);
  const isAnimating = useRef(false);

  // Fade in and scale animation when it mounts
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.children.forEach((mesh) => {
        // Set initial scale to 1.5
        mesh.scale.set(1.5, 1.5, 1.5);

        // Animate opacity and scale
        if (mesh.material.uniforms.uOpacity) {
          gsap.to(mesh.material.uniforms.uOpacity, {
            value: 1, // Fade in to opacity 1
            duration: 2, // Duration of the fade-in animation
          });
        }

        // Animate scale from 1.5 to 1
        gsap.to(mesh.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 2, // Duration of the scale animation
          ease: "power2.out", // Smooth easing
        });
      });

      // Animate position and rotation
      const tl = gsap.timeline();
      tl.to(
        groupRef.current.rotation,
        {
          z: 3, // Rotate to z: 3
          duration: 4, // Duration of the rotation animation
          ease: "back.inOut(1.7)",
        },
        "a"
      )
        .to(
          groupRef.current.position,
          {
            y: -15, // Move to y: -15
            duration: 4, // Duration of the position animation
            ease: "power4.inOut",
          },
          "a"
        )
        .to(
          groupRef.current.rotation,
          {
            z: 3.3, // Rotate to z: 3.3
            duration: 4, // Duration of the rotation animation
            ease: "power2.inOut",
          },
          "a"
        );
    }
  }, []);

  useFrame(() => {
    groupRef.current.rotation.z -= dragState.current * 0.0009;
    dragState.current *= 0.99; // Smooth deceleration
  });

  const bind = useDrag(
    ({ movement: [mx], down }) => {
      dragState.current = down ? mx * 0.02 : dragState.current;
      if (down && !isDragging.current && !isAnimating.current) {
        groupRef.current.children.forEach((mesh) => {
          isAnimating.current = true;
          if (mesh.material.uniforms.uTime) {
            gsap.to(mesh.material.uniforms.uTime, {
              value: "+=1",
            });
          }
        });
        isDragging.current = true;
      }
      if (!down) {
        groupRef.current.children.forEach((mesh) => {
          isAnimating.current = false;
          if (mesh.material.uniforms.uTime) {
            gsap.to(mesh.material.uniforms.uTime, {
              value: "0",
            });
          }
        });
        isDragging.current = false;
      }
    },
    { target: window }
  ); // Enable drag anywhere on the canvas

  return (
    <group position={[0, -10, 0]} ref={groupRef} {...bind()}>
      {loadedTextures.map((texture, i) => {
        const angle = (i / cardCount) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const rotation = [0, 0, angle + Math.PI / 2];
        return (
          <Card1
            // onClick={() => setSelectedIndex(i % 3)} // Set selected index
            key={i}
            position={[x, y, 0]}
            texture={texture}
            rotation={rotation}
          />
        );
      })}
    </group>
  );
};

const StackedGroup = ({ setIsLoading }) => {
  const cardRefs = useRef([]);

  useEffect(() => {
    if (cardRefs.current) {
      cardRefs.current.reverse().forEach((cardRef, index) => {
        if (cardRef?.position) {
          gsap.to(cardRef.position, {
            x: 9,
            y: index % 2 == 0 ? 0 : 10,
            duration: 2,
            delay: index * 0.2 + 0.1,
            onStart: () => {
              gsap.to(cardRef.material.uniforms.uTime, {
                value: "20",
                duration: 2,
                onComplete: () => {
                  if (index === cardRefs.current.length - 1) {
                    setIsLoading(false); // Update isLoading state
                  }
                },
              });
            },
          });
        }
      });
    }
  }, [cardRefs.current, setIsLoading]);

  return (
    <group position={[0, 0, -3]} rotation={[-0.4, 0, 1]}>
      {loadedTextures.slice(0, 10).map((texture, i) => (
        <Card2
          key={i}
          position={[i * 0.02, i * 0.01, i * 0.01]}
          texture={texture}
          rotation={[-0.5, 0.5, 0]}
          cardRef={(el) => (cardRefs.current[i] = el)}
        />
      ))}
    </group>
  );
};

const Slide = ({ index }) => {
  const slides = [
    {
      image: "case-study-1.png",
      title: "Product: With Long Heading",
      text: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      ],
      tags: ["Design", "Web-Dev", "Product"],
    },
    {
      image: "case-study-2.png",
      title: "Product: With Long Heading",
      text: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      ],
      tags: ["Design", "Web-Dev", "Product"],
    },
    {
      image: "case-study-3.png",
      title: "Product: With Long Heading",
      text: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      ],
      tags: ["Design", "Web-Dev", "Product"],
    },
  ];

  const [selectedCase, setSelectedCase] = useState(null);

  useEffect(() => {
    if (index >= 0 && index < slides.length) {
      setSelectedCase(slides[index]);
    }
  }, [index]);

  return selectedCase ? (
    <CaseStudy slide={selectedCase} onClose={() => setSelectedCase(null)} />
  ) : null;
};
const Scene = () => {
  const [isLoading, setIsLoading] = useState(true); // Use state for isLoading
  const [selectedIndex, setSelectedIndex] = useState(-1); // Use state for selectedIndex

  return (
    <>
      <Canvas
        className="h-screen w-full bg-black"
        camera={{ position: [0, 0, 10], fov: 25 }}
      >
        <ambientLight intensity={0.5} />
        {isLoading ? (
          <StackedGroup setIsLoading={setIsLoading} />
        ) : (
          <RotatingGroup setSelectedIndex={setSelectedIndex} />
        )}
      </Canvas>
      {selectedIndex !== -1 && <Slide index={selectedIndex} />}
    </>
  );
};

export default Scene;