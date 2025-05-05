import React, { useCallback, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useDrag } from "react-use-gesture";
import * as THREE from "three";
import gsap from "gsap";
import CaseStudy from "../../sections/case-studies/CaseStudy";
import { useGSAP } from "@gsap/react";
// import {withLoading} from "../../components/Loading";

const textures = [
  "https://ik.imagekit.io/8mbzq2hdl/digicots/case-study-1.png",
  "https://ik.imagekit.io/8mbzq2hdl/digicots/case-study-2.png",
  "https://ik.imagekit.io/8mbzq2hdl/digicots/case-study-3.png",
  "https://ik.imagekit.io/8mbzq2hdl/digicots/case-study-4.png",
  "https://ik.imagekit.io/8mbzq2hdl/digicots/case-study-5.png",
  "https://ik.imagekit.io/8mbzq2hdl/digicots/case-study-1.png",
  "https://ik.imagekit.io/8mbzq2hdl/digicots/case-study-2.png",
  "https://ik.imagekit.io/8mbzq2hdl/digicots/case-study-3.png",
  "https://ik.imagekit.io/8mbzq2hdl/digicots/case-study-4.png",
  "https://ik.imagekit.io/8mbzq2hdl/digicots/case-study-5.png",
  "https://ik.imagekit.io/8mbzq2hdl/digicots/case-study-1.png",
  "https://ik.imagekit.io/8mbzq2hdl/digicots/case-study-2.png",
  "https://ik.imagekit.io/8mbzq2hdl/digicots/case-study-3.png",
  "https://ik.imagekit.io/8mbzq2hdl/digicots/case-study-4.png",
  "https://ik.imagekit.io/8mbzq2hdl/digicots/case-study-5.png",
  "https://ik.imagekit.io/8mbzq2hdl/digicots/case-study-1.png",
  "https://ik.imagekit.io/8mbzq2hdl/digicots/case-study-2.png",
  "https://ik.imagekit.io/8mbzq2hdl/digicots/case-study-3.png",
  "https://ik.imagekit.io/8mbzq2hdl/digicots/case-study-4.png",
  "https://ik.imagekit.io/8mbzq2hdl/digicots/case-study-5.png",
  "https://ik.imagekit.io/8mbzq2hdl/digicots/case-study-1.png",
  "https://ik.imagekit.io/8mbzq2hdl/digicots/case-study-2.png",
  "https://ik.imagekit.io/8mbzq2hdl/digicots/case-study-3.png",
  "https://ik.imagekit.io/8mbzq2hdl/digicots/case-study-4.png",
  "https://ik.imagekit.io/8mbzq2hdl/digicots/case-study-5.png",
  "https://ik.imagekit.io/8mbzq2hdl/digicots/case-study-1.png",
  "https://ik.imagekit.io/8mbzq2hdl/digicots/case-study-2.png",
  "https://ik.imagekit.io/8mbzq2hdl/digicots/case-study-3.png",
  "https://ik.imagekit.io/8mbzq2hdl/digicots/case-study-4.png",
  "https://ik.imagekit.io/8mbzq2hdl/digicots/case-study-5.png",
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

  // Function to create rounded rectangle mask
  float roundedBox(vec2 uv, vec2 size, float radius) {
    vec2 q = abs(uv * size - size * 0.5) - size * 0.5 + radius;
    return 1.0 - smoothstep(0.0, 0.01, length(max(q, 0.0)) - radius);
  }

  void main() {
    // Sample the texture
    vec4 texColor = texture2D(uTexture, vec2(vUv.x, 1.0 - vUv.y));

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

    // Apply rounded corners
    float borderRadius = 0.1; // Adjust border radius here
    vec2 size = vec2(2.2, 2.4); // Plane dimensions
    float alpha = roundedBox(vUv, size, borderRadius);

    // Combine texture color, shine, and rounded alpha
    texColor.rgb = shinyColor;
    texColor.a = texColor.a * uOpacity * alpha;

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
      <planeGeometry args={[2.2, 2.4, 1, 1]} /> {/* Reduced segments to 1, 1 */}
      <shaderMaterial
        ref={materialRef}
        uniforms={{
          uTexture: { value: texture },
          uTime: { value: 0 },
          uOpacity: { value: 0 }, // Start with opacity 0
        }}
        vertexShader={vertexShader1}
        fragmentShader={fragmentShader1}
        transparent={true} // Enable transparency for rounded corners
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
            setSelectedIndex(clickedIndex % 5);
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
      const newVelocity = delta * 0.00004; // Same multiplier as wheel
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
      animateScroll(deltaY * 3); // Multiply to match wheel sensitivity
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
      image: "https://ik.imagekit.io/8mbzq2hdl/digicots/case-study-1.png",
      title: "Apple Marketing Case Study",
      text: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      ],
      section: [
        [
          // { key: "title", value: "Apple Marketing Case Study" },
          { key: "p", value: "Did you know that Apple Inc. started in a garage as Apple Computer, Inc. and has market cap of over $3.5 trillion now? It is inspiring how such simple, small dreams turn into overwhelming realities." },
          { key: "p", value: "In 1976, Steve Jobs, Steve Wozniak & Ronald Wayne founded the trillion-dollar tech behemoth. It has managed to dominate the global market and sold more than 230 million units in 2024! With its sleek designs, state-of-the-art technologies and a loyal consumer cult, Apple has completely transformed the way people talk, work and relax." },
          { key: "p", value: "Apple’s rather minimalistic marketing character perfectly aligns with its brand image and target audience. However, when entering India – a price-conscious market, the challenges were big:" },
          { key: "ul", value: [
            "The Indian consumers needed to be convinced that a higher price translated to real value.",
            "The market was filled with budget-friendly competitors.",
          ] },
          { key: "p", value: "To everyone’s surprise, they managed to capture the majority of the market. Tim Cook, the CEO of Apple even highlighted that India is an extraordinary market; with the company achieving record-sales in the third quarter of the 2023-24 fiscal year." },
        ],
        [
          { key: "title", value: "Understanding the Target Market" },
          { key: "p", value: "Apple leaves no stone unturned when it comes to understanding their target market and catering products and campaigns to them. Since their early days, they have progressively narrowed down the target audience they want each of their products to reach." },
          { key: "p", value: "They have always targeted individuals who are willing to pay more for an innovative product and a quality user experience. The majority of their audiences come from the middle-to-upper classes and are younger to middle-aged. Based mostly in the Americas, Europe or China, these tech-enthusiasts are absolute fans of the Apple Ecosystem. This has been a direct result of Apple’s user-oriented marketing approach, wherein each of their marketing initiatives emphasize on the people using the products; not the products themselves." },
          { key: "p", value: "The global brand recognizability of Apple, aided by its famous bitten-apple logo, has gradually inclined their marketing efforts towards a segmented approach. They consider the nuances and cultural differences in various countries and cater their campaigns to them. This helps them avoid offending consumers and ensure that each campaign is tailored for success." },
        ],
        [
          { key: "title", value: "4P’s – Product. Price. Place. Promotion." },
          { key: "subH", value: "Product" },
          { key: "p", value: "Although Apple's products and marketing are to-the-point, they don’t let their focus go off the innovation radar. They consistently focus on innovating new products and features to craft the ultimate user experience. Innovation is their lifeline – they constantly push boundaries, developing products that redefine entire industries." },
          { key: "p", value: "The company offers a curated selection of products, each of which seamlessly integrate with the popular Apple Ecosystem – a well-knitted network of Apple products and services. This focus on an intertwined product portfolio helps them present a unified brand image." },
          { key: "subH", value: "Price" },
          { key: "p", value: "iPhones, among other Apple products, are a sought-after status symbol around the world. India is a price-conscious market; however, the purchasing power of people, especially in tier-1 & tier-2 cities is steadily increasing." },
          { key: "p", value: "In order to demonstrate exclusivity and a premium brand image, their products are priced on the higher end of the spectrum. The higher price point translates to a badge of honor among consumers, a symbol of their success and the ability to afford the desired Apple experience. It is a well-calculated, high return risk which has helped them carve out an exclusive niche from the Indian market." },
          { key: "subH", value: "Price" },
          { key: "p", value: "Apple ensures that it is very easy for its customers to find their products, both online and offline. Their products are available directly on Apple stores, authorized resellers, the official website or major e-commerce platforms. The convenience to find the products anywhere and everywhere compels people to buy them." },
          { key: "subH", value: "Promotion" },
          { key: "p", value: "With customers engaging with brands through multiple channels, it’s typically not enough to market products and services with just one channel. Apple employs television and print advertising, website advertisements, social media advertisements and more to lure customers. Advertisements often demonstrate unique capabilities of the newest products, creating immense value for consumers and generating more awareness for these offerings. They make sure to never overwhelm their audiences with technical specifications – they rather try to keep it as simple as possible." },
        ],
        [
          { key: "title", value: "Remarkable Campaigns" },
          { key: "subH", value: "The ‘1984’ Commercial" },
          { key: "p", value: "This is the most famous Apple advertisement that ran during Super Bowl XVIII in 1984. It was created to launch the Macintosh Computer and was inspired by the science-fiction fantasy novel, 1984, by George Orwell. It is one of the most iconic and much-admired commercials ever created. It signaled the beginning of a personal computer era led by Apple. It also suggested that the company was bringing something that would change society and the norms of technology." },
        ],
        [
          { key: "title", value: "“Think Different”" },
          { key: "p", value: "Released in 1997, this commercial was filled with black-and-white footage of famous activists, creators, leaders and other icons. Richard Dreyfuss, an actor, is seen reading a poem called “Here’s to the Crazy Ones” in the background. Apple products were often connected to creativity and innovation instead of business and tech. The company chose to make an advertisement that conveyed how creative people are the ones who bring about massive changes, rather than those who follow the standard route. It helped concretize the foundation for Apple’s slogan, “Think Different.”" },
        ],
        [
          { key: "title", value: "Get a Mac" },
          { key: "p", value: "This one ran throughout the mid-2000s with 66 different commercials. Get a Mac came out when the Mac vs PC debate was in full force and Mac sales were declining. It features actors Justin Long and John Hodgman as a Mac & PC respectively. In each commercial, they draw a comparison of each other’s features. Running over four years. The ads helped position Mac over PC for a wide set of reasons and emphasized their focus on simplicity and innovation." },
        ],
        [
          { key: "title", value: "Misunderstood (2013)" },
          { key: "p", value: "This famous advertisement was so memorable and well-executed that it won a Creative Arts Emmy for ‘Outstanding Commercial’. It features a young man visiting his family for Christmas. He seems to be engrossed completely in his iPhone the whole time. However, the commercial eventually reveals a family video he has been filming the whole time. This helped create an emotional connection with customers without focusing on the product." },
        ],
      ],
      tags: ["Design", "Web-Dev", "Product"],
    },
    {
      image: "https://ik.imagekit.io/8mbzq2hdl/digicots/case-study-2.png",
      title: "Tropicana Rebranding Failure Case Study",
      text: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      ],
      section: [
        [
          // { key: "title", value: "Tropicana Rebranding Failure Case Study" },
          { key: "p", value: "Tropicana is a brand specializing in fresh fruit juices. It was established in 1947 by Anthony Talamo Rossi in Bradenton, Florida. He wanted everyone to enjoy the kind of fresh orange juice he had growing up. Fast forward to 1952, and they launched 'Tropicana Pure Premium' which was frozen orange juice concentrate. Then, just a couple years later, they came up with this cool flash pasteurization thing. It keeps the juice tasting really fresh because they heat it up slower but for a bit longer than usual." },
          { key: "p", value: "The brand really took off when they ditched frozen concentrate and went all-in on their unique juice. That's when they became Tropicana Products, Inc. in '57 to show how big they were getting. The founder, Rossi, hung it up in '78 and Beatrice bought them out. PepsiCo grabbed Tropicana in '98, but then in 2021 sold most of it to PAI Partners, keeping a chunk for themselves. Tropicana Products, now part of PepsiCo, is still a huge player in the juice business." },
        ],
        [
          { key: "title", value: "STP – Segmentation. Targeting. Positioning." },
          { key: "p", value: "An STP strategy is very helpful in identifying potential consumers and formulating a unique proposition for them. This ensures that we know who we want to sell to, how we want to sell to them and what will make them buy." },
          { key: "subH", value: "Segmentation" },
          { key: "p", value: "Coca Cola’s audience is divided into segments in order to cater to their specific needs:" },
          { key: "ul", value: [
            "Geographic: Their juices sell all over the globe including United States, Canada, United Kingdom, Ireland, France, Germany, Argentina, Japan and various Latin American & Asian countries.",
            "Demographic: Their audience majorly includes people from all age groups with middle or higher income groups.",
            "Psychographic: The brand majorly leverages the increasingly health-conscious mindset of people.",
            "Behavioral: Tropicana caters to those consumers who look for healthier options and take proactive efforts towards maintaining their health.",
          ] },
          { key: "subH", value: "Targeting" },
          { key: "p", value: "Tropicana goes full-swing on the fact that their juices are “100% Natural”. This has been labeled everywhere including their website, packaging and campaigns. Leveraging the authenticity of their product, they reinforce a positive brand image in front of the health-conscious buyer." },
          { key: "subH", value: "Positioning" },
          { key: "p", value: "Tropicana aims to be the top pick for people who want healthy drinks globally. We're focused on offering a better option than sugary stuff, highlighting how our products are good for your heart and cholesterol." },
          { key: "p", value: "PepsiCo India gave Tropicana a makeover. It used to feel like an international brand, but now they're aiming it at busy millennials who want quick and easy ways to be healthy. They even got Katrina Kaif to be the face of the brand." },
        ],
        [
          { key: "title", value: "The Rebranding – Failing to Understand the Consumer" },
          { key: "p", value: "So, Tropicana tried a sleek new look in 2009, ditching their iconic orange and straw. Big mistake. They ended up losing $20 million in just a month. Talk about a branding blunder. They spent $35 million on marketing, and it still backfired horribly." },
          { key: "p", value: "Tropicana tried a new look for their juice packaging. They swapped out the straw-in-orange pic for a glass of juice on a plain background, tweaked the logo to be more minimalist, and added a tagline about being freshly squeezed. Thing is, even though the juice was still the same, people felt like it wasn't as fresh anymore. Goes to show how just changing the packaging, without touching the actual product, can really mess with how customers see your brand." },
          { key: "p", value: "People missed that the orange was supposed to be the star of the show. Instead, it just looked like a lid, and nobody paid much attention. Because of this, Tropicana's packaging, both the old and the new versions, didn't really connect with the people they were trying to reach." },
          { key: "p", value: "People knew Tropicana for its fresh, pure, and not-from-concentrate orange juice. The packaging redesign showed just a plain glass of juice, which missed the mark on those key features." },
          { key: "p", value: "The logo redesign backfired. Moving the text to the right made it hard to read. Big mistake, since people read left to right. Because of this, the logo and brand name lost focus. It's like having an awesome product but the name is unreadable on the box – no one will notice it." },
          { key: "p", value: "Furthermore, the new packaging tried this cool thing where the glass image stretches across two sides, but it ended up being a bit confusing.  The old box had everything laid out clearly on each side, like the orange in front and people on the side.  The new design didn't really work from the user's point of view; it was tough to get the whole visual." },
        ],
        [
          { key: "title", value: "Key Takeaways" },
          { key: "p", value: "Tropicana's big packaging change didn't go as planned – it actually backfired and hurt the brand. Customers hated the new look so much, Tropicana had to bring back the old one. Sadly, the agency behind the redesign didn't fare well either, eventually shutting down. Definitely a big learning moment for Tropicana and the marketing world in general. Let’s dive into these learnings:" },
          { key: "ul", value: [
            "Rebranding is a solid marketing move that lets brands refresh their image without overhauling everything.  Seriously, though, you've got to do your homework with market research to get a feel for how your audience sees your brand. Although Tropicana did hire Arnell in 2008, it's a classic example of what can happen if you skip the research and strategy.",
            "Stick to your brand's core visual stuff like the logo and colors when you're changing things up. Big changes can mess with your customers. Just make some cool, small updates to what you already have so people still recognize you.",
            "Customer loyalty is all about how people feel about a brand. So, big rebrands, especially changing up the packaging, got to be handled super carefully. You don't want to mess with that emotional bond and accidentally push away loyal customers who dig the current vibe. Seriously, sudden changes can feel like a slap in the face and totally break that trust. Customers might end up feeling like they don't even know the brand anymore. Keeping the customer front and center is key when thinking about any tweaks to the packaging design.",
            "Tropicana tried a new, simpler packaging design with more white space and less pictures. Turns out, customers didn't like it at all. They said it looked like a cheap, store brand and couldn't tell it was Tropicana anymore. Good packaging is supposed to make your product stand out, but this redesign just made Tropicana blend in and lose its special identity.",
            "Good design means getting your message across clearly and simply. The old packaging did this well by labeling it 'no-pulp,' but that important detail got lost on the new design.",
          ] }
        ],
      ],
      tags: ["Design", "Web-Dev", "Product"],
    },
    {
      image: "https://ik.imagekit.io/8mbzq2hdl/digicots/case-study-3.png",
      title: "Oreo Marketing Case Study",
      text: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      ],
      section: [
        [
          // { key: "title", value: "Coca Cola Marketing Case Study" },
          { key: "p", value: "The first glass of Coca Cola was served on May 8, 1886 by Dr John Pemberton as a pharmacist’s elixir. It has now turned into the world’s favorite refreshment drink – a mode of “sharing happiness” as they say." },
          { key: "p", value: "The Coca Cola Company currently averages 1.9 billion servings per day in 200 countries. With a community of over 700,000 employees and over 225 bottling partners, it has turned into a global brand with a market cap of over 273 billion US dollars." },
          { key: "p", value: "The Coca Cola Company had first entered the Indian market in the 1950s when it rapidly gained popularity. Their flagship product ‘Coca-Cola’ became synonymous with the classic red logo in no time. However, due to the Foreign Exchange Regulation Act in 1977, it had to exit the Indian market as it would lose 60% of its stake and the secret formula. Parle seized the opportunity and introduced carbonated beverages like Limca and Thumbs Up filling the vacuum. In 1993, the Coca Cola Company re-entered the Indian market and paved its path to market domination with their exceptional marketing strategy." },
          { key: "p", value: "Let’s take a deep dive into the marketing strategy and understand how Coca Cola became the definition of “Thanda” for Indians and the world’s mode of “sharing happiness”." },
        ],
        [
          { key: "title", value: "Branding Strategy" },
          { key: "p", value: "Coca Cola is one of the rare brands that haven’t changed their classic logo since the beginning. The red color, the font and the classic bottle have been familiar to their consumers’ eyes since over a century now." },
          { key: "p", value: "It also adapted to various geographical and cultural landscapes by changing their branding on bottles to local languages in different countries and cities. This ensured a more personalized experience for its monolingual consumers." },
        ],
        [
          { key: "title", value: "STP – Segmentation. Targeting. Positioning." },
          { key: "p", value: "An STP strategy is very helpful in identifying potential consumers and formulating a unique proposition for them. This ensures that we know who we want to sell to, how we want to sell to them and what will make them buy." },
          { key: "subH", value: "Segmentation" },
          { key: "p", value: "Coca Cola’s audience is divided into segments in order to cater to their specific needs:" },
          { key: "ul", value: [
            "Geographic: The company operates in various countries in both urban and rural areas, making their products, pricing and distribution channels fit to the local preferences.",
            "Demographic: Their audience is demographically vast with ages ranging from 10-40 years, various genders and all possible income levels.",
            "Psychographic: The brand majorly creates an emotional connection with aspirational messages that resonate with different values, lifestyles and personalities. This helps them foster a personal connection with the consumers and maintain a positive brand image.",
            "Behavioral: Closely observing changing preferences and consumer behavior trends, Coca Cola frequently offers a wide range of beverages to cater to different usage rates, readiness to buy and occasions.",
          ] },
          { key: "subH", value: "Targeting" },
          { key: "p", value: "The Coca Cola Company uses a differentiated targeting strategy wherein it deploys different products and marketing strategies for each segment." },
          { key: "p", value: "For instance, it focuses on convenience and diversification for urban consumers. On the contrary, for rural consumers, it focuses on affordability and availability." },
          { key: "p", value: "Another example is where it targets consumers with different behaviors and preferences with products like Minute Maid, Coke Zero and Diet Coke for health-conscious consumers. On the other hand, they target the youth with refreshing beverages like Sprite, Fanta and Coke." },
          { key: "subH", value: "Positioning" },
          { key: "p", value: "The brand positions itself as a go-to drink for refreshment; a mode of “sharing happiness”. Be it a celebration, a get together, a break from work – “Thanda matlab Coca-Cola”." },
        ],
        [
          { key: "title", value: "4P’s – Product. Price. Place. Promotion." },
          { key: "subH", value: "Product" },
          { key: "p", value: "The company constantly innovates and offers a variety of products including carbonated drinks, juices, teas, coffee and water. This helps them cater to consumers with all tastes, budgets and preferences. They stay relevant by regularly rolling out new products to meet the evolving market." },
          { key: "p", value: "For instance, they have partnered with McDonald’s to offer the McFloat – a unique blend of the refreshing soda and the mouth-watering soft serve." },
          { key: "subH", value: "Price" },
          { key: "p", value: "The brand follows a price discrimination strategy wherein it alters the prices of the products based on markets, segments or occasions." },
          { key: "p", value: "For example, it charges higher prices in urban areas as compared to rural areas, lower prices for offerings in larger packs than in smaller packs and spiked pricing on occasions." },
          { key: "p", value: "Moreover, they roll out seasonal promotions and limited-time deals that are intricately formed to drive consumer interest and brand loyalty." },
          { key: "subH", value: "Price" },
          { key: "p", value: "Coca Cola’s distribution strategy is undoubtedly a master stroke – covering every corner, leaving no stone unturned. It uses a combination of direct and indirect channels to make their products available to end users everywhere in the world." },
          { key: "p", value: "The company directly sells to large retailers, wholesalers and distributors around the globe; who further infiltrate the market by reaching out to smaller restaurants, hotels, retailers and vending machines." },
          { key: "p", value: "Additionally, they have an extensive network of independent bottlers who acquire their bottles, package them and sell the final products to consumers." },
          { key: "p", value: "Leveraging the digital era, the company readily uses e-commerce and quick commerce platforms to expand their reach and be readily available to consumers." },
          { key: "subH", value: "Promotion" },
          { key: "p", value: "The Coca Cola Company uses a diverse, yet focused promotional strategy to communicate its brand and products to the masses. It uses personal as well as non-personal communication channels." },
          { key: "p", value: "Personal Marketing Channels" },
          { key: "ul", value: [
            "Social Media",
            "In-Store Promotions",
            "Event Sponsorships",
          ] },
          { key: "p", value: "Non-Personal Marketing Channels" },
          { key: "ul", value: [
            "Television Advertisements",
            "Outdoor Advertising & Print Media",
            "Digital Marketing",
          ] }
        ],
        [
          { key: "title", value: "Remarkable Campaigns" },
          { key: "subH", value: "Santa Illustration in Coca Cola brand colors (1931-1964)" },
          { key: "p", value: "Did you know that the image of Santa Claus initially ranged from big to small? He also wore various colors ranging from green to red, sometimes even brown. This was because he represented different stories from different cultures around the globe. However, nowadays the name Santa Claus resonates with a plump, joyous old man with a long, white beard wearing a red outfit. Well, this illustration was first created by Haddon Sundblom in 1931. The Coca Cola Company began its Christmas advertising in the early 1920s in an effort to boost sales during the slower winter and fall months. The Sundblom illustration was used for over three decades until 1964. By then, the Coca Cola Santa was deeply woven into the Christmas culture crafting the modern-day interpretation of St Nicholas." },
        ],
        [
          { key: "title", value: "“Thanda matlab Coca-Cola” (India)" },
          { key: "p", value: "According to Indian culture, the first question you ask your guests is “What will you take? Thanda ya garam?” (Cold or Hot Drinks) In most cases, if a cold drink is chosen, Coca Cola is served. This is a direct result of Coca Cola’s brand collaboration with the Indian actor, Amir Khan in the early 2000s. They released three different ad films with the same tagline, “Thanda matlab Coca Cola”. Thus, strategically embedding Coca Cola into Indian hospitality rituals. This campaign yielded a 25% rise in rural sales in India. Using local language and slangs, they ensured to create an emotional connection and successfully conveyed that Coca Cola isn’t just any beverage; but a piece of cultural conversation." },
        ],
        [
          { key: "title", value: "“Share a Coke” (2011 Australia)" },
          { key: "p", value: "Initiated in Australia in 2011, the Coca Cola Company took a leap of faith by changing the branding on bottles to common and generic names. They started with 150 monikers in Australia and sold over 250 million personalized bottles and cans in a population of just about 23 million people. This encouraged a personalized and shareable experience amongst the users. According to Marketing Week, around 51% consumers felt an increased positive connection with the brand. This campaign eventually spread out over 80 international markets totaling a sale of over 1.5 billion personalized bottles. The campaign also garnered unprecedented social media engagement with over 100 million social media interactions. This wasn’t just free advertisement for Coca Cola; it fostered an online community of happiness and joy." },
        ],
      ],
      tags: ["Design", "Web-Dev", "Product"],
    },
    {
      image: "https://ik.imagekit.io/8mbzq2hdl/digicots/case-study-4.png",
      title: "Liquid Death Marketing Case Study",
      text: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      ],
      section: [
        [
          // { key: "title", value: "Liquid Death Marketing Case Study" },
          { key: "p", value: "Just imagine a brand that sells bottled water. Cold winds on a mountain; calm, serene oceans; and a bottle of plastic – that is what comes to mind, right?" },
          { key: "p", value: "Ironically, almost 3.5 million people die because of water each year as per a report by United Nations. Well, Mike Cessario, a former Netflix Creative Director, decided to leverage this violent side of the coin to his advantage." },
          { key: "p", value: "The story of Liquid Death was born during Mike’s travels with the Warped Tour in the early 2000s where he saw the show’s sponsor, Monster Energy struggle to maintain relevance. The performing stars were craving refreshment but not in the form of an energy drink; and it would’ve been a waste of dollars of the crowd watched them down bottles of water instead of their product. Monster came up with a master solution – special canned water for the stars to provide the illusion of punk rock drinking Monster. The result? Kids were lead to believe that monster was the coolest beverage to exist." },
          { key: "p", value: "Inspired from the “bottled cool” element, Mike led to create the most outlandish water company to exist – Liquid Death. In 2018, he went on to take a 3D rendering of his can before even producing one real product and created a two-minute commercial on a Facebook page to make it look like a real product. Just four months, later the page had over 80,000 followers and the commercial stacked a mind-blowing 3 million views – all without a real product!" },
        ],
        [
          { key: "title", value: "STP – Segmentation. Targeting. Positioning." },
          { key: "p", value: "An STP strategy is very helpful in identifying potential consumers and formulating a unique proposition for them. This ensures that we know who we want to sell to, how we want to sell to them and what will make them buy." },
          { key: "subH", value: "Segmentation" },
          { key: "ul", value: [
            "Geographic: The canned mountain water sells across over 133,000 stores across the US & UK.",
            "Demographic: Their audience majorly includes millennials and Gen Z populations who appreciate humor, wit and authenticity. The kind of people are often resistant to traditional advertising and hence, Liquid Death’s bold, offbeat marketing approach.",
            "Psychographic: The brand majorly emphasizes on the destructive characteristic of water and the aesthetic of heavy metal; appealing as a cool can of water – because what if the most metal thing that you could imagine was a good, old can of H2O.",
            "Behavioral: Liquid Death capitalized on the young cool kid who doesn’t want to drink at a party but still wants to look cool and not just empty-handed.",
          ] },
          { key: "subH", value: "Targeting" },
          { key: "p", value: "Liquid Death, unlike other water brands, focuses on the destructive power of water. Their tagline – “Murder Your Thirst” not only creates a bold persona for the brand; but also appeals to the market segment they value. They don’t want to come across as a water brand; they strive to come across as a reflection of their target audience – the young, cool kids." },
          { key: "subH", value: "Positioning" },
          { key: "p", value: "The brand positions itself as “the most metal thing you can imagine”. While keeping the cool, bold image consistent; Liquid Death also pours in their effort towards sustainability by using aluminum cans instead of plastic bottles." },
        ],
        [
          { key: "title", value: "Marketing Strategy" },
          { key: "p", value: "Well, this is the most interesting part about Liquid Death. The brand is first and foremost a content creation company; their product was always secondary." },
          { key: "p", value: "In 2019, they raised USD 1.6 million in seed funding from a round led by Science Inc. However, by 2020 they had raised USD 23 million in a Series B round. How did they even scale that fast? It was due to their multi-pronged approach." },
          { key: "p", value: "First, they created a marketing storm. Liquid Death did things backward – they went viral online, particularly on TikTok, before even having a drink to sell. They prioritized building a brand and a community, which paid off big time with views and funding to launch their product. They really clicked with Gen Z by understanding their desire for healthy, eco-friendly, and fun products. This shows the power of putting fans first and exploring multiple revenue streams." },
          { key: "p", value: "Then followed the Country Club because Liquid Death knows that the primal reason for its success is its fanbase. Basically, the Liquid Death Country Club is a membership deal where fans pay a fee to get first dibs on merch and event tickets. It’s a smart move to bring in more cash outside of just selling drinks. Right now, they’ve got around 225,000 members, which shows people are totally into buying into the brand's whole vibe and events. Again, spending loads on the brand, not the product." },
          { key: "p", value: "To top that, Liquid Death, being an internet-famous brand, jumped into the NFT game early. You know, NFTs—those blockchain-based digital things that get valuable because there's only so many of them. They dropped their own set called Murder Head Death Club, 6,666 freaky severed head NFTs, some even doodled by Will Carsola from Adult Swim. Every NFT is basically someone 'taken out' by Liquid Death. Snag one of these and you get cool perks like exclusive merch, discounts, and other Liquid Death goodies." },
          { key: "p", value: "They didn’t stop here. In 2020, Liquid Death really took off, landing in Whole Foods and testing the waters at 200 7-Elevens across the US. They also hit it big on Amazon, becoming the third top-selling sparkling water, which then opened doors to selling at exclusive events. Then, in 2021, they snagged another $15 million in funding from Live Nation, who agreed to sell their drinks exclusively at their venues for a while. That deal, plus others, boosted their revenue up to $45 million in 2021." },
          { key: "p", value: "Liquid Death's hit big not just because of good water, but mostly because of their crazy marketing and branding. They made a really different and rebellious brand, and that's what got people hooked. This cool identity made them super noticeable in a packed market and helped them grow really fast." },
        ],
        [
          { key: "title", value: "Remarkable Campaigns" },
          { key: "subH", value: "Deadliest Stuff on Earth" },
          { key: "p", value: "The Liquid Death launch campaign really nailed it with their brand personality. That one ad with the aspirational vibe, catchy music, surprising stats, and a bit of colorful language from a 'professional actor' is probably the one you remember best. It all leads to this totally over-the-top, funny ending." },
          { key: "p", value: "The ad's quick cuts of actors, action, and stock footage really hold people's attention, which is great since it's tough to keep viewers focused with short attention spans and hard to get started with introductions. There are a few interesting plots going on to keep you hooked. The thing with the actor and their water bottle gets explained in a cool way when we find out why the water is there, and the story totally changes how you think about water. The actor's serious way of talking and the stuff they say make Liquid Death seem like 'something parents won't like, but kids could be into… it's basically just water.'" },
        ],
        [
          { key: "title", value: "Big Game" },
          { key: "p", value: "Liquid Death went with a pretty wild Super Bowl ad in 2022. Think loud rock music, kids going nuts with their tallboys, and the song's whole thing was about 'breaking the law.' It definitely got people talking." },
          { key: "p", value: "A pregnant woman comes in, smiles, and takes a sip from the can, instantly putting viewers at ease. The screen then reads, 'No worries, it's just water.' So, Liquid Death's Super Bowl ad? Genius. They totally played us with the whole underage drinking thing. It was all about that shock factor, right? They knew if they made us think something crazy was happening at first, the big reveal would be way more fun. Basically, they nailed how to grab attention and give people that 'whoa, didn't see that coming' feeling we all secretly love." },
        ],
        [
          { key: "title", value: "Blind Taze Test" },
          { key: "p", value: "Liquid Death definitely sparks opinions, some love it, some don't. Instead of firing back at negative comments on Twitter, they did something totally unexpected. They actually invited the people who wrote those tweets to come on over for a, shall we say, electrifying experience." },
          { key: "p", value: "Participants were connected to a taser and given different unlabeled brands of water to drink. They had to identify the 'worst tasting' water as Liquid Death; if they failed, they would receive an electric shock from the Liquid Death team." },
          { key: "p", value: "Brands struggle to address negative comments online; it's tricky to not look bad or upset their audience. Liquid Death cleverly turned negative feedback into sales. They did a fun, shareable game show thing that answered criticisms and showed off their brand in a cool, different light." },
        ],
      ],
      tags: ["Design", "Web-Dev", "Product"],
    },
    {
      image: "https://ik.imagekit.io/8mbzq2hdl/digicots/case-study-5.png",
      title: "Coca Cola Marketing Case Study",
      text: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      ],
      section: [
        [
          // { key: "title", value: "Oreo Marketing Case Study" },
          { key: "p", value: "Did you know that the number of Oreo cookies made every year could circle the earth over 5 times?" },
          { key: "p", value: "The Oreo cookie was first made by the National Biscuit Company in New York in 1912. People are so in love with the cookie that the street where the first cookie was made is literally named Oreo Way. It is now owned by Mondelez International & Cadbury Milka and served in over a hundred countries." },
          { key: "p", value: "The delicious cookie-crème sandwich was first brought to the Indian market in 2011 by Cadbury India as Cadbury Oreo. By leveraging the well-established brand image of Cadbury (a well-established Indian household brand), Oreo overcame the initial hassles of brand awareness & establishing trust with Indian consumers. In the first year after entering the Indian market, Oreo captured 1% of the total market share in the biscuit segment and holds a 6% market share as of today." },
          { key: "p", value: "Let’s take a deep dive into the marketing strategy and understand how Oreo leveraged the iconic 'Lick. Twist. Dunk. Repeat.' ritual and became 'milk’s favorite cookie'." },
        ],
        [
          { key: "title", value: "Competitive Analysis" },
          { key: "p", value: "While Oreo has carved its own space in the Global & Indian markets, the biscuit segment is highly competitive. Let's understand Oreo’s competition before we get to know how it manages to stand-out." },
          { key: "subH", value: "Global FMCG Sharks:" },
          { key: "p", value: "ITC, an Indian conglomerate, has a diverse product portfolio & strong market presence. It offers various cream biscuits including Sunfeast & Dark Fantasy. Its deep pockets & well-established distribution networks give the upper-hand." },
          { key: "p", value: "Nestle is a global giant that offers familiar brands like KitKat & Milkmaid. It leverages the long-standing brand recognition and focuses on premium offerings." },
          { key: "subH", value: "Key Players in the Indian Market:" },
          { key: "p", value: "Britannia boasts a huge product portfolio, offering well-known brands such as Treat, Milk Bikis & Tiger at premium pricing. Its strong brand recognition helps it maintain a significant market share." },
          { key: "p", value: "Parle is a brand well-engraved in the hearts of Indian consumers, Parle is known for its affordable biscuits available at all touchpoints. It caters to the masses by building a strong sense of value & affordability." },
        ],
        [
          { key: "title", value: "Oreo’s Competitive Edge & Distinctive Strategies" },
          { key: "p", value: "Having a global brand image helps Oreo position itself as a premium, trendy snack choice. It has a deep-rooted focus on using quality ingredients and maintaining a consistent taste. It also leverages brand collaborations with global icons like McDonalds & Cadbury to leap out from the competition. Constant innovation in flavors & limited editions keep the brand in limelight." },
          { key: "p", value: "Oreo ensures to develop a comprehensive understanding of its target audience and, hence, are able to craft bespoke marketing strategies. It keeps up with the playful campaigns which translate to trust & familiarity; and foster an emotional connection with consumers." },
          { key: "p", value: "First, they created a marketing storm. Liquid Death did things backward – they went viral online, particularly on TikTok, before even having a drink to sell. They prioritized building a brand and a community, which paid off big time with views and funding to launch their product. They really clicked with Gen Z by understanding their desire for healthy, eco-friendly, and fun products. This shows the power of putting fans first and exploring multiple revenue streams." },
          { key: "subH", value: "Emotional Storytelling" },
          { key: "p", value: "Oreo never misses a chance to create an emotional connection with its consumers. A prime example of this is the ‘Wonderfilled’ Campaign – a spoof of various fairytales wherein the villains turn good after having an Oreo. This unique approach helped to create a positive impact from a place of fear in children." },
          { key: "subH", value: "Constant Innovation & Limited Editions" },
          { key: "p", value: "Today’s consumer craves change, something new, something exciting – Oreo gets that! They constantly introduce limited edition cookies and new flavors. For instance, the ‘Firework Oreos’ were launched around the Fourth of July creating a buzz and skyrocketing sales. Another example is when Oreo launched the special ‘Game of Thrones’ Edition; allowing fans to explore and relate to the cookies." },
          { key: "subH", value: "Rich Social Media Engagement" },
          { key: "p", value: "Maintaining a strong digital presence and active engagement with the audience is the key to popularity for brands in today’s digital world. Oreo has mastered this art by posting not only promotional content; but content that is also fun, interactive & oftentimes consists of real-time elements. The most popular example of this was during the Super Bowl blackout in 2013. While people were saddened by the darkness; the brand capitalized on the opportunity with a witty tweet: “You can still dunk in the dark.” The post was subtle but the timing was impeccable and thus, the post reaped intense engagement." },
        ],
        [
          { key: "title", value: "4P’s – Product. Price. Place. Promotion." },
          { key: "subH", value: "Product" },
          { key: "p", value: "Being a leading biscuit brand, Oreo has a dominant market presence in various countries. Although it has developed various customized products for specific market segments; its major product is the chocolate sandwich. All iterations of the product aren’t available everywhere." },
          { key: "p", value: "You can find most of the flavors in the US market but only a few flavors are available in newer markets like India. It constantly experiments the Indian market with new flavors. Some recently launched flavors in India include chocolate & red velvet." },
          { key: "subH", value: "Price" },
          { key: "p", value: "The brand focuses on a mid-premium pricing strategy wherein it offers quality products at mid-range. This has definitely helped Oreo to build a large, loyal consumer base. However, it went for a penetration pricing policy in India by starting off with lower prices. These prices went up quickly with the soaring popularity of the cookies." },
          { key: "subH", value: "Place" },
          { key: "p", value: "Initially, Oreo started its operations in Birmingham, United Kingdom. It has now spread out to overseas markets including India, United States, Ireland, Australia, Canada & New Zealand. It actively uses Mondelez International & Cadbury’s distribution channels in order to make its products available at various touchpoints for its consumers. It has a widespread network of manufacturing units across all continents which enables the fulfilment of all consumer preferences." },
          { key: "subH", value: "Promotion" },
          { key: "p", value: "Oreo targets children and youth using creative & innovative television commercials and an interactive, personalized social & direct media strategy. The use of playfulness in marketing campaigns is what has appealed to consumers worldwide. It has successfully brought back the iconic ritual – “Twist. Lick. Dunk. Repeat”; creating a wave of nostalgia and making people think of Oreo whenever milk is served." },
        ],
        [
          { key: "title", value: "Remarkable Campaigns" },
          { key: "subH", value: "Twist. Lick. Dunk. Repeat." },
          { key: "p", value: "Eating an Oreo is way more than just eating a cookie; it’s more of a playful experience to be shared with loved ones. Bringing back the iconic “Twist. Lick. Dunk. Repeat” ritual; the brand gave children a sense of playfulness and adults were taken aback in nostalgia. This helped the brand create a deep-rooted emotional connection with consumers all around the globe. The ritual has become way more than a campaign; it has become an integral part of the brand’s image." },
        ],
        [
          { key: "title", value: "Milk’s Favorite Cookie" },
          { key: "p", value: "When milk demand was constantly falling year-after-year, California's Dairy Processors pooled in $20 million and hired an agency to drive up the demand for milk. After a comprehensive market research, the agency concluded that milk was always consumed with other products where the other product was always the hero. Moreover, milk was one of the things people didn’t like to run out of. Thus, they ran a classic deprivation marketing strategy with the tagline “got milk?” and it hit the jackpot!" },
          { key: "p", value: " When “got milk?” rose to fame, the agency decided to do a co-marketing campaign with various complementary products – Oreo being one of them." },
          { key: "p", value: "They were once together, and then Oreo never let milk get away. A new tagline, “Milk’s Favorite Cookie” was created and it was engraved into consumer’s hearts & souls for eternity; successfully riding on the popularity of milk consumption." },
        ],
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
          className="h-screen w-full"
          // style={{ background: "transparent" }}
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


// export default withLoading(Scene, loadSceneResources);
export default Scene;