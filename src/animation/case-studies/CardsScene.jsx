import React, { useCallback, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useDrag } from "react-use-gesture";
import * as THREE from "three";
import gsap from "gsap";
import CaseStudy from "../../sections/case-studies/CaseStudy";
import { useGSAP } from "@gsap/react";

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

const Card1 = ({ position, rotation, texture, cardRef, onClick }) => {
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
  const materialRef = useRef();

  return (
    <mesh
      onClick={() => {
        onClick();
        // console.log(geometryRef.current)
        // handleClick()
      }}
      position={position}
      rotation={rotation}
      ref={cardRef}
    >
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
        // transparent={true} // Enable transparency
      />
    </mesh>
  );
};

const Card2 = ({ position, rotation, texture, cardRef }) => {
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

const StackedGroup = ({ setIsLoading }) => {
  const cardRefs = useRef([]);

  useEffect(() => {
    if (cardRefs.current) {
      cardRefs.current.reverse().forEach((cardRef, index) => {
        if (cardRef?.position) {
          gsap.to(cardRef.position, {
            x: 9,
            y: index % 2 == 0 ? 0 : 20,
            duration: 1.5,
            delay: index * 0.1 + 0.01,
            onStart: () => {
              gsap.to(cardRef.material.uniforms.uTime, {
                value: "20",
                duration: 2,
                onStart: () => {
                  setTimeout(() => {
                    if (index === cardRefs.current.length - 1) {
                      setIsLoading(false); // Update isLoading state
                    }
                  }, 300);
                },
              });
            },
          });
        }
      });
    }
  }, [cardRefs.current, setIsLoading]);

  return (
    <group
      position={window.innerWidth > 600 ? [0, -1, -3] : [0, -1.4, -10]}
      rotation={[-0.5, 0, 1.2]}
    >
      {loadedTextures.slice(0, 30).map((texture, i) => (
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

const RotatingGroup = ({ canvas, setSelectedIndex, bgRef }) => {
  const groupRef = useRef();
  const dragState = useRef(0);
  const isDragging = useRef(false);
  const isAnimating = useRef(false);
  const scrollVelocity = useRef(0);
  const cardsRef = useRef([]);
  const touchStartY = useRef(0); // For touch tracking

  // Memoize the onClick handler
  const cardSpacing = 0.2042429411506563;
  const referenceIndex = 7;
  const initialPosition = 0.1;

  const handleCardClick = useCallback(
    (clickedIndex) => (event) => {
      if (!groupRef.current) return;

      const currentPosition = groupRef.current.rotation.z;
      const expectedPosition =
        initialPosition + (clickedIndex - referenceIndex) * cardSpacing;

      gsap.to(groupRef.current.rotation, {
        z: -(expectedPosition % clickedIndex) + cardSpacing,
        duration: 0.5,
        ease: "power4.out",
      });

      if (cardsRef.current[clickedIndex]) {
        gsap.to(cardsRef.current[clickedIndex].scale, {
          x: -7,
          y: 7,
          z: 7,
          duration: 1,
          delay: 0.5,
          ease: "back.inOut(.8)",
          onComplete() {
            setSelectedIndex(clickedIndex % 3);
            gsap.to(cardsRef.current[clickedIndex].scale, {
              x: 1,
              y: 1,
              z: 1,
              delay: 0.5,
              duration: 0.8,
              ease: "power4.out",
            });
          },
        });
      }
    },
    [setSelectedIndex]
  );

  useEffect(() => {
    const isMobile = window.innerWidth < 600;

    if (groupRef.current) {
      groupRef.current.children.forEach((mesh) => {
        mesh.scale.set(1.2, 1.2, 1.2);
        if (mesh.material.uniforms.uOpacity) {
          gsap.to(mesh.material.uniforms.uOpacity, {
            value: 1,
            duration: 2,
          });
        }
        gsap.to(mesh.scale, {
          x: 1,
          y: 1,
          z: 1,
          delay: 4.5,
          duration: 1,
          ease: "back.out",
        });
      });

      const tl = gsap.timeline();
      tl.to(
        groupRef.current.rotation,
        { z: -10, duration: 2, ease: "back.inOut(1.7)" },
        "a"
      )
        .to(
          groupRef.current.position,
          { y: -15, duration: 4, ease: "power4.inOut" },
          "a"
        )
        .to(
          groupRef.current.rotation,
          { z: 0.1, delay: 1, duration: 4, ease: "power2.inOut" },
          "a"
        );
    }

    // Shared animation logic for both wheel and touch
    const animateScroll = (delta) => {
      const newVelocity = delta * 0.0002; // Same multiplier as wheel
      gsap.to(scrollVelocity, {
        current: newVelocity,
        duration: 1,
        ease: "power4.out",
      });

      if (groupRef.current) {
        groupRef.current.children.forEach((mesh) => {
          isAnimating.current = true;
          if (mesh.material.uniforms.uTime) {
            gsap.to(mesh.material.uniforms.uTime, {
              value: "+=.3",
              duration: 0.5,
              onComplete: () => {
                gsap.to(mesh.material.uniforms.uTime, { value: "0" });
              },
            });
          }
        });
      }

      if (bgRef.current) {
        const targetX = Math.min(
          Math.max(scrollVelocity.current * 200, -200),
          200
        );
        gsap.to(bgRef.current.position, {
          x: -targetX,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(bgRef.current.position, {
              x: 0,
              duration: 1,
              ease: "power2.inOut",
            });
          },
        });
        gsap.to(bgRef.current.rotation, {
          z: targetX * 0.03,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(bgRef.current.rotation, {
              z: 0,
              duration: 1,
              ease: "power2.inOut",
            });
          },
        });
      }
    };

    // Wheel event for desktop
    const handleWheel = (event) => {
      animateScroll(event.deltaY);
    };

    // Touch events for mobile
    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY.current - touchY; // Positive = scroll up, Negative = scroll down
      animateScroll(deltaY * 0.5); // Multiply to match wheel sensitivity
      touchStartY.current = touchY; // Update start position for smooth dragging
    };

    // Add event listeners based on device
    if (isMobile) {
      window.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
    } else {
      window.addEventListener("wheel", handleWheel, { passive: true });
    }

    // Cleanup
    return () => {
      if (isMobile) {
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("touchmove", handleTouchMove);
      } else {
        window.removeEventListener("wheel", handleWheel);
      }
    };
  }, [bgRef]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.z += scrollVelocity.current;
    }
    if (bgRef.current) {
      bgRef.current.position.x += scrollVelocity.current;
      bgRef.current.rotation.z += scrollVelocity.current;
    }
    scrollVelocity.current *= 0.99;
  });

  return (
    <group
      position={window.innerWidth > 600 ? [0, -10, 0.5] : [0, -15, -12]}
      ref={groupRef}
    >
      {loadedTextures.map((texture, i) => {
        const angle = (i / cardCount) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const rotation = [0, 0, angle + Math.PI / 2];
        return (
          <Card1
            onClick={handleCardClick(i)}
            key={i}
            position={[x, y, 0]}
            texture={texture}
            rotation={rotation}
            cardRef={(el) => (cardsRef.current[i] = el)}
          />
        );
      })}
    </group>
  );
};

// Slide Component (unchanged as it doesn't use wheel events)
const Slide = ({ index, onClose, setSelectedIndex }) => {
  const slides = [
    {
      image: ["case-study-1.png", "case-study-1.png", "case-study-1.png"],
      title: [
        "Product: With Long Heading",
        "Product: With Long Heading",
        "Product: With Long Heading",
      ],
      text: [
        " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem distinctio qui, natus enim maiores minus veritatis maxime sint vero labore culpa sunt unde minima similique, laboriosam nam vitae ipsa delectus iusto perspiciatis suscipit! Nam quisquam fuga cupiditate temporibus. Nulla laboriosam error voluptas perspiciatis fuga sit officia ipsum quibusdam consectetur provident consequuntur nemo tempore repellendus consequatur aspernatur amet exercitationem harum debitis quae doloremque, maxime velit dolorem eaque. Sequi porro nam vero iusto corporis repellat culpa nemo illum rem voluptatem voluptas, saepe aut laborum eius? Inventore vitae mollitia tenetur ipsam dolor excepturi esse suscipit voluptates ab animi, numquam magnam maiores qui assumenda. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem distinctio qui, natus enim maiores minus veritatis maxime sint vero labore culpa sunt unde minima similique, laboriosam nam vitae ipsa delectus iusto perspiciatis suscipit! Nam quisquam fuga cupiditate temporibus. Nulla laboriosam error voluptas perspiciatis fuga sit officia ipsum quibusdam consectetur provident consequuntur nemo tempore repellendus consequatur aspernatur amet exercitationem harum debitis quae doloremque, maxime velit dolorem eaque. Sequi porro nam vero iusto corporis repellat culpa nemo illum rem voluptatem voluptas, saepe aut laborum eius? Inventore vitae mollitia tenetur ipsam dolor excepturi esse suscipit voluptates ab animi, numquam magnam maiores qui assumenda.",
        " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem distinctio qui, natus enim maiores minus veritatis maxime sint vero labore culpa sunt unde minima similique, laboriosam nam vitae ipsa delectus iusto perspiciatis suscipit! Nam quisquam fuga cupiditate temporibus. Nulla laboriosam error voluptas perspiciatis fuga sit officia ipsum quibusdam consectetur provident consequuntur nemo tempore repellendus consequatur aspernatur amet exercitationem harum debitis quae doloremque, maxime velit dolorem eaque. Sequi porro nam vero iusto corporis repellat culpa nemo illum rem voluptatem voluptas, saepe aut laborum eius? Inventore vitae mollitia tenetur ipsam dolor excepturi esse suscipit voluptates ab animi, numquam magnam maiores qui assumenda. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem distinctio qui, natus enim maiores minus veritatis maxime sint vero labore culpa sunt unde minima similique, laboriosam nam vitae ipsa delectus iusto perspiciatis suscipit! Nam quisquam fuga cupiditate temporibus. Nulla laboriosam error voluptas perspiciatis fuga sit officia ipsum quibusdam consectetur provident consequuntur nemo tempore repellendus consequatur aspernatur amet exercitationem harum debitis quae doloremque, maxime velit dolorem eaque. Sequi porro nam vero iusto corporis repellat culpa nemo illum rem voluptatem voluptas, saepe aut laborum eius? Inventore vitae mollitia tenetur ipsam dolor excepturi esse suscipit voluptates ab animi, numquam magnam maiores qui assumenda.",
        " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem distinctio qui, natus enim maiores minus veritatis maxime sint vero labore culpa sunt unde minima similique, laboriosam nam vitae ipsa delectus iusto perspiciatis suscipit! Nam quisquam fuga cupiditate temporibus. Nulla laboriosam error voluptas perspiciatis fuga sit officia ipsum quibusdam consectetur provident consequuntur nemo tempore repellendus consequatur aspernatur amet exercitationem harum debitis quae doloremque, maxime velit dolorem eaque. Sequi porro nam vero iusto corporis repellat culpa nemo illum rem voluptatem voluptas, saepe aut laborum eius? Inventore vitae mollitia tenetur ipsam dolor excepturi esse suscipit voluptates ab animi, numquam magnam maiores qui assumenda. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem distinctio qui, natus enim maiores minus veritatis maxime sint vero labore culpa sunt unde minima similique, laboriosam nam vitae ipsa delectus iusto perspiciatis suscipit! Nam quisquam fuga cupiditate temporibus. Nulla laboriosam error voluptas perspiciatis fuga sit officia ipsum quibusdam consectetur provident consequuntur nemo tempore repellendus consequatur aspernatur amet exercitationem harum debitis quae doloremque, maxime velit dolorem eaque. Sequi porro nam vero iusto corporis repellat culpa nemo illum rem voluptatem voluptas, saepe aut laborum eius? Inventore vitae mollitia tenetur ipsam dolor excepturi esse suscipit voluptates ab animi, numquam magnam maiores qui assumenda.",
      ],
      tags: ["Design", "Web-Dev", "Product"],
    },
    {
      image: ["case-study-2.png", "case-study-2.png", "case-study-2.png"],
      title: [
        "Product: With Long Heading",
        "Product: With Long Heading",
        "Product: With Long Heading",
      ],
      text: [
        " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem distinctio qui, natus enim maiores minus veritatis maxime sint vero labore culpa sunt unde minima similique, laboriosam nam vitae ipsa delectus iusto perspiciatis suscipit! Nam quisquam fuga cupiditate temporibus. Nulla laboriosam error voluptas perspiciatis fuga sit officia ipsum quibusdam consectetur provident consequuntur nemo tempore repellendus consequatur aspernatur amet exercitationem harum debitis quae doloremque, maxime velit dolorem eaque. Sequi porro nam vero iusto corporis repellat culpa nemo illum rem voluptatem voluptas, saepe aut laborum eius? Inventore vitae mollitia tenetur ipsam dolor excepturi esse suscipit voluptates ab animi, numquam magnam maiores qui assumenda. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem distinctio qui, natus enim maiores minus veritatis maxime sint vero labore culpa sunt unde minima similique, laboriosam nam vitae ipsa delectus iusto perspiciatis suscipit! Nam quisquam fuga cupiditate temporibus. Nulla laboriosam error voluptas perspiciatis fuga sit officia ipsum quibusdam consectetur provident consequuntur nemo tempore repellendus consequatur aspernatur amet exercitationem harum debitis quae doloremque, maxime velit dolorem eaque. Sequi porro nam vero iusto corporis repellat culpa nemo illum rem voluptatem voluptas, saepe aut laborum eius? Inventore vitae mollitia tenetur ipsam dolor excepturi esse suscipit voluptates ab animi, numquam magnam maiores qui assumenda.",
        " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem distinctio qui, natus enim maiores minus veritatis maxime sint vero labore culpa sunt unde minima similique, laboriosam nam vitae ipsa delectus iusto perspiciatis suscipit! Nam quisquam fuga cupiditate temporibus. Nulla laboriosam error voluptas perspiciatis fuga sit officia ipsum quibusdam consectetur provident consequuntur nemo tempore repellendus consequatur aspernatur amet exercitationem harum debitis quae doloremque, maxime velit dolorem eaque. Sequi porro nam vero iusto corporis repellat culpa nemo illum rem voluptatem voluptas, saepe aut laborum eius? Inventore vitae mollitia tenetur ipsam dolor excepturi esse suscipit voluptates ab animi, numquam magnam maiores qui assumenda. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem distinctio qui, natus enim maiores minus veritatis maxime sint vero labore culpa sunt unde minima similique, laboriosam nam vitae ipsa delectus iusto perspiciatis suscipit! Nam quisquam fuga cupiditate temporibus. Nulla laboriosam error voluptas perspiciatis fuga sit officia ipsum quibusdam consectetur provident consequuntur nemo tempore repellendus consequatur aspernatur amet exercitationem harum debitis quae doloremque, maxime velit dolorem eaque. Sequi porro nam vero iusto corporis repellat culpa nemo illum rem voluptatem voluptas, saepe aut laborum eius? Inventore vitae mollitia tenetur ipsam dolor excepturi esse suscipit voluptates ab animi, numquam magnam maiores qui assumenda.",
        " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem distinctio qui, natus enim maiores minus veritatis maxime sint vero labore culpa sunt unde minima similique, laboriosam nam vitae ipsa delectus iusto perspiciatis suscipit! Nam quisquam fuga cupiditate temporibus. Nulla laboriosam error voluptas perspiciatis fuga sit officia ipsum quibusdam consectetur provident consequuntur nemo tempore repellendus consequatur aspernatur amet exercitationem harum debitis quae doloremque, maxime velit dolorem eaque. Sequi porro nam vero iusto corporis repellat culpa nemo illum rem voluptatem voluptas, saepe aut laborum eius? Inventore vitae mollitia tenetur ipsam dolor excepturi esse suscipit voluptates ab animi, numquam magnam maiores qui assumenda. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem distinctio qui, natus enim maiores minus veritatis maxime sint vero labore culpa sunt unde minima similique, laboriosam nam vitae ipsa delectus iusto perspiciatis suscipit! Nam quisquam fuga cupiditate temporibus. Nulla laboriosam error voluptas perspiciatis fuga sit officia ipsum quibusdam consectetur provident consequuntur nemo tempore repellendus consequatur aspernatur amet exercitationem harum debitis quae doloremque, maxime velit dolorem eaque. Sequi porro nam vero iusto corporis repellat culpa nemo illum rem voluptatem voluptas, saepe aut laborum eius? Inventore vitae mollitia tenetur ipsam dolor excepturi esse suscipit voluptates ab animi, numquam magnam maiores qui assumenda.",
      ],
      tags: ["Design", "Web-Dev", "Product"],
    },
    {
      image: ["case-study-3.png", "case-study-3.png", "case-study-3.png"],
      title: [
        "Product: With Long Heading",
        "Product: With Long Heading",
        "Product: With Long Heading",
      ],
      text: [
        " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem distinctio qui, natus enim maiores minus veritatis maxime sint vero labore culpa sunt unde minima similique, laboriosam nam vitae ipsa delectus iusto perspiciatis suscipit! Nam quisquam fuga cupiditate temporibus. Nulla laboriosam error voluptas perspiciatis fuga sit officia ipsum quibusdam consectetur provident consequuntur nemo tempore repellendus consequatur aspernatur amet exercitationem harum debitis quae doloremque, maxime velit dolorem eaque. Sequi porro nam vero iusto corporis repellat culpa nemo illum rem voluptatem voluptas, saepe aut laborum eius? Inventore vitae mollitia tenetur ipsam dolor excepturi esse suscipit voluptates ab animi, numquam magnam maiores qui assumenda. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem distinctio qui, natus enim maiores minus veritatis maxime sint vero labore culpa sunt unde minima similique, laboriosam nam vitae ipsa delectus iusto perspiciatis suscipit! Nam quisquam fuga cupiditate temporibus. Nulla laboriosam error voluptas perspiciatis fuga sit officia ipsum quibusdam consectetur provident consequuntur nemo tempore repellendus consequatur aspernatur amet exercitationem harum debitis quae doloremque, maxime velit dolorem eaque. Sequi porro nam vero iusto corporis repellat culpa nemo illum rem voluptatem voluptas, saepe aut laborum eius? Inventore vitae mollitia tenetur ipsam dolor excepturi esse suscipit voluptates ab animi, numquam magnam maiores qui assumenda.",
        " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem distinctio qui, natus enim maiores minus veritatis maxime sint vero labore culpa sunt unde minima similique, laboriosam nam vitae ipsa delectus iusto perspiciatis suscipit! Nam quisquam fuga cupiditate temporibus. Nulla laboriosam error voluptas perspiciatis fuga sit officia ipsum quibusdam consectetur provident consequuntur nemo tempore repellendus consequatur aspernatur amet exercitationem harum debitis quae doloremque, maxime velit dolorem eaque. Sequi porro nam vero iusto corporis repellat culpa nemo illum rem voluptatem voluptas, saepe aut laborum eius? Inventore vitae mollitia tenetur ipsam dolor excepturi esse suscipit voluptates ab animi, numquam magnam maiores qui assumenda. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem distinctio qui, natus enim maiores minus veritatis maxime sint vero labore culpa sunt unde minima similique, laboriosam nam vitae ipsa delectus iusto perspiciatis suscipit! Nam quisquam fuga cupiditate temporibus. Nulla laboriosam error voluptas perspiciatis fuga sit officia ipsum quibusdam consectetur provident consequuntur nemo tempore repellendus consequatur aspernatur amet exercitationem harum debitis quae doloremque, maxime velit dolorem eaque. Sequi porro nam vero iusto corporis repellat culpa nemo illum rem voluptatem voluptas, saepe aut laborum eius? Inventore vitae mollitia tenetur ipsam dolor excepturi esse suscipit voluptates ab animi, numquam magnam maiores qui assumenda.",
        " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem distinctio qui, natus enim maiores minus veritatis maxime sint vero labore culpa sunt unde minima similique, laboriosam nam vitae ipsa delectus iusto perspiciatis suscipit! Nam quisquam fuga cupiditate temporibus. Nulla laboriosam error voluptas perspiciatis fuga sit officia ipsum quibusdam consectetur provident consequuntur nemo tempore repellendus consequatur aspernatur amet exercitationem harum debitis quae doloremque, maxime velit dolorem eaque. Sequi porro nam vero iusto corporis repellat culpa nemo illum rem voluptatem voluptas, saepe aut laborum eius? Inventore vitae mollitia tenetur ipsam dolor excepturi esse suscipit voluptates ab animi, numquam magnam maiores qui assumenda. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem distinctio qui, natus enim maiores minus veritatis maxime sint vero labore culpa sunt unde minima similique, laboriosam nam vitae ipsa delectus iusto perspiciatis suscipit! Nam quisquam fuga cupiditate temporibus. Nulla laboriosam error voluptas perspiciatis fuga sit officia ipsum quibusdam consectetur provident consequuntur nemo tempore repellendus consequatur aspernatur amet exercitationem harum debitis quae doloremque, maxime velit dolorem eaque. Sequi porro nam vero iusto corporis repellat culpa nemo illum rem voluptatem voluptas, saepe aut laborum eius? Inventore vitae mollitia tenetur ipsam dolor excepturi esse suscipit voluptates ab animi, numquam magnam maiores qui assumenda.",
      ],
      tags: ["Design", "Web-Dev", "Product"],
    },
  ];

  const selectedCase = slides[index];
  const selectedContainerRef = useRef(null);

  useGSAP(() => {
    gsap.from(selectedContainerRef.current, {
      opacity: 0,
      scale: 1.2,
      duration: 1,
      ease: "back.inOut(.5)",
    });
  }, [index, onClose]);

  return selectedCase ? (
    <div
      ref={selectedContainerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <CaseStudy
        slide={selectedCase}
        onClose={onClose}
        index={index}
        setSelectedIndex={setSelectedIndex}
      />
    </div>
  ) : null;
};

// Bg Component (unchanged as it doesn't use wheel events directly)
const Bg = ({ bgRef }) => {
  const numCards = 300;
  const cardsRef = useRef([]);

  useGSAP(() => {
    cardsRef.current.forEach((card, index) => {
      if (!card || !card.position) return;

      card.position.set(
        (Math.random() - 0.5) * 20,
        ((Math.random() - 100) * index) % 60,
        Math.random() * (30 - 13) - 30
      );

      card.velocity = new THREE.Vector3(0, Math.random() * 0.005 + 0.01);

      if (loadedTextures?.length) {
        card.material.map = loadedTextures[index % loadedTextures.length];
        card.material.needsUpdate = true;
      }
    });

    const targetX = 50;
    gsap.from(bgRef.current.position, {
      x: -targetX * 3,
      z: targetX,
      duration: 3,
      delay: 1,
      ease: "power2.out",
    });
    gsap.from(bgRef.current.rotation, {
      z: -targetX,
      duration: 3,
      delay: 1,
      ease: "power2.out",
    });
  }, [bgRef]);

  useFrame(() => {
    cardsRef.current.forEach((card) => {
      if (!card || !card.position || !card.velocity) return;

      card.position.add(card.velocity);

      if (card.position.y > 10) {
        card.position.y = Math.random() - 10;
        card.position.x = (Math.random() - 0.5) * 20;
        card.position.z = Math.random() * (30 - 13) - 30;
      }
    });
  });

  return (
    <group ref={bgRef}>
      {Array.from({ length: numCards }).map((_, i) => (
        <mesh key={i} ref={(el) => (cardsRef.current[i] = el || null)}>
          <planeGeometry args={[0.3, 0.3]} />
          <meshBasicMaterial transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  );
};

const Scene = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const bgRef = useRef([]); // Shared reference for Bg cards
  const canvasRef = useRef(null); // Shared reference for Bg cards

  return (
    <>
      {selectedIndex == -1 ? (
        <Canvas
          ref={canvasRef}
          className="h-screen w-full bg-black"
          style={{ background: "transparent" }}
          camera={{ position: [0, 0, 10], fov: 25 }}
        >
          <ambientLight intensity={0.5} />
          {isLoading ? (
            <StackedGroup setIsLoading={setIsLoading} />
          ) : (
            <>
              <RotatingGroup
                canvas={canvasRef.current}
                setSelectedIndex={setSelectedIndex}
                bgRef={bgRef}
              />
              <Bg bgRef={bgRef} />
            </>
          )}
        </Canvas>
      ) : (
        <Slide index={selectedIndex} setSelectedIndex={setSelectedIndex} />
      )}
    </>
  );
};

export default Scene;
