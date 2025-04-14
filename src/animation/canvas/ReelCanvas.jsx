import React, { useState, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Showreel from "../../sections/home/Showreel";

gsap.registerPlugin(ScrollTrigger);

const WavePlane = ({ opacity, setOpacity }) => {
  const meshRef = useRef();
  const materialRef = useRef();
  const amplitude = useRef({ value: 0 });

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const texture = new THREE.TextureLoader().load("https://ik.imagekit.io/x5xessyka/digicots/public/reel-cover.png");
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  const aspect = dimensions.width / dimensions.height;
  texture.repeat.set(1, 1 / aspect);

  const mapWidth = (
    width,
    inMin = 390,
    inMax = 1536,
    outMin = 3,
    outMax = 16
  ) => {
    return ((width - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
  };

  const mappedValueX = mapWidth(dimensions.width, 370, 1536, 4, 16);
  const x = useRef({ value: mappedValueX });
  const y = useRef({ value: -7.5 });
  const z = useRef({ value: -3 });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
      const newAspect = window.innerWidth / window.innerHeight;
      texture.repeat.set(1, 1 / newAspect);
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
      vec2 adjustedUv = vUv;
      gl_FragColor = texture2D(uTexture, adjustedUv);
    }
  `;

  const uniforms = {
    uTime: { value: 0 },
    uWaveAmplitude: { value: 0 },
    uTexture: { value: texture },
  };

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uWaveAmplitude.value =
        amplitude.current.value;
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
      .to(
        materialRef.current.uniforms.uTime,
        { value: "+=10", duration: 10 },
        "a"
      )
      .to([x.current, y.current], { value: 0, duration: 6 }, "a")
      .to(z.current, { value: 8, duration: 8 }, "a")
      .to(
        materialRef.current.uniforms.uTime,
        { value: "+=5", duration: 10 },
        "b"
      )
      .to(
        amplitude.current,
        {
          value: 0,
          duration: 10,
          onStart() {
            gsap.to(amplitude.current, { value: 0, duration: 1 });
          },
        },
        "b"
      );
    // tl.to(
    //   // opacity,
    //   {
    //     // opacity: 1,
    //     onStart: () => {
    //     },
    //   }
    // );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

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
  const [opacity, setOpacity] = useState(0.9); // Use state instead of ref
  const reelContainerRef = useRef(null);
  const playReelText = useRef(null);
  const reelVideoRef = useRef(null);
  const videoElementRef = useRef(null);
  const replayRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: reelContainerRef.current,
        start: "top -50", // Start when .homeCanvas top hits viewport top
        end: "top -51%", // End when .homeCanvas bottom hits viewport top
        scrub: 1,
        // markers: true, // Keep for debugging, remove in production
        onUpdate: (self) => {
          // setOpacity(self.progress); // Update state with progress (0 to 1)
        },
      },
    });
    tl.from(reelContainerRef.current, {
      opacity: 0,
    }).from(playReelText.current, {
      y: 10,
      scale: 1.2,
      filter: "blur(10px)",
      opacity: 0,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []); // No dependencies needed

  const handlePlayReel = () => {
    gsap.to(reelVideoRef.current, {
      opacity: 1,
      display: "initial",
      onComplete() {
        videoElementRef.current.play();
      },
    });
  };
  const handleCloseReel = () => {
    gsap.to(reelVideoRef.current, {
      opacity: 0,
      display: "none",
      onComplete() {
        if (videoElementRef.current) {
          videoElementRef.current.pause();
          videoElementRef.current.currentTime = 0; // Reset video
        }
      },
    });
  };

  const handleVideoEnd = () => {
    gsap.to(videoElementRef.current, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        videoElementRef.current.style.display = "none";
      },
    });

    gsap.to(replayRef.current, {
      opacity: 1,
      duration: 0.5,
      onStart: () => {
        replayRef.current.style.display = "flex";
      },
    });
  };

  const handleReplayClick = () => {
        if (videoElementRef.current) {
          videoElementRef.current.currentTime = 0;
          videoElementRef.current.play();
        }
  
        gsap.to(replayRef.current, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            replayRef.current.style.display = "none";
          },
        });
  
        gsap.to([reelVideoRef.current, videoElementRef.current], {
          opacity: 1,
          duration: 0.5,
          onStart: () => {
            reelVideoRef.current.style.display = "block";
            videoElementRef.current.style.display = "block";
          },
        });
      };

  useEffect(() => {
    if (videoElementRef.current) {
      videoElementRef.current.addEventListener("ended", handleVideoEnd);
    }
    if (replayRef.current) {
      replayRef.current.addEventListener("click", handleReplayClick);
    }
  }, [videoElementRef.current,replayRef.current]);

  return (
    <div className="relative min-h-[150vh] w-full">
      <div className="sticky top-0" style={{ width: "100vw", height: "100vh" }}>
        <Canvas
          className="homeCanvas"
          camera={{ position: [0, 0, 10], fov: 75 }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <WavePlane setOpacity={setOpacity} opacity={opacity} />
          <WebGLCleanup />
        </Canvas>

        {/* <Showreel opacity={opacity} /> */}

        <div
          ref={reelContainerRef}
          className="h-screen w-full absolute top-0 flex z-[2] items-center justify-center"
        >
          <div
            ref={playReelText}
            style={{ fontSize: "clamp(30px, 5vw, 150px)" }}
            onClick={handlePlayReel}
            className="reel-text flex items-center gap-3 font-inter font-bold text-white cursor-pointer"
          >
            <span>PLAY</span>
            <img src="reelplay.png" alt="" />
            <span>REEL</span>
          </div>

          <div
            ref={reelVideoRef}
            className="reel-video hidden opacity-0 h-full w-full absolute top-0 z-[2]"
          >
            <video
              src="https://ik.imagekit.io/x5xessyka/digicots/public/showreels.mp4"
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
            />
            <div className="h-full w-full backdrop-blur-2xl absolute top-0 bg-zinc-800/[.1]" />
            <video
              ref={videoElementRef}
              src="https://ik.imagekit.io/x5xessyka/digicots/public/showreels.mp4"
              className="w-full h-full object-cover absolute top-0"
              controls
            />
            <button
              // ref={closeButtonRef}
              onClick={handleCloseReel}
              className="absolute top-20 right-20 text-white text-2xl font-bold bg-zinc-800/[.5] rounded-full w-10 h-10 flex items-center justify-center cursor-pointer z-20"
            >
              &times;
            </button>

            <div
        ref={replayRef}
        style={{ background: "transparent", opacity: 0, display: "none" }}
        className="replay absolute top-0 left-0 w-full h-full flex justify-center items-center bg-cover bg-center z-10"
      >
        <div
          style={{ fontSize: "clamp(30px, 5vw, 150px)" }}
          className="replay-text flex items-center gap-3 font-inter font-bold text-white cursor-pointer"
        >
          <span>REPLAY</span>
          <img src="reelplay.png" alt="" />
          <span>REEL</span>
        </div>
      </div>

          </div>
        </div>

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
