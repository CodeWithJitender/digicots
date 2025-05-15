import React, { useState, useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cover } from "three/src/extras/TextureUtils.js";

gsap.registerPlugin(ScrollTrigger);

// Debounce utility for resize events
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const WavePlane = ({ setOpacity }) => {
  const meshRef = useRef();
  const materialRef = useRef();
  const amplitude = useRef({ value: 0 });
  const position = useRef({ x: 0, y: -7.5, z: -3 });

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const texture = useMemo(() => {
    const video = document.createElement("video");
    video.src = "https://digicots.com/images/showreel/desktop.mp4";
    video.crossOrigin = "anonymous";
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;
  
    // Important: Start playback only after metadata is loaded
    video.addEventListener("loadeddata", () => {
      video.play().catch((err) => {
        console.warn("Video playback failed:", err);
      });
    });
  
    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    videoTexture.format = THREE.RGBFormat;
  
    return videoTexture;
  }, []);
  

  const mapWidth = (
    width,
    inMin = 390,
    inMax = 1536,
    outMin = 3,
    outMax = 16
  ) => {
    return ((width - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
  };

  const mappedValueX =
    window.innerWidth <= 1536
      ? mapWidth(dimensions.width, 370, 1536, 2.5, 16.5)
      : mapWidth(dimensions.width, 1536, 2160, 16.5, 13.5);
  position.current.x = mappedValueX;

  useEffect(() => {
    const handleResize = debounce(() => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
      texture.repeat.set(1, 1 / (window.innerWidth / window.innerHeight));
    }, 100);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [texture]);

  const vertexShader = useMemo(
    () => `
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
  `,
    []
  );

  const fragmentShader = useMemo(
    () =>
      `varying vec2 vUv;
      uniform sampler2D uTexture;
  
      void main() {
        // Basic texture mapping using vUv
        gl_FragColor = texture2D(uTexture, vUv);
      }`,
    []
  );

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uWaveAmplitude: { value: 0 },
      uTexture: { value: texture },
      uTextureAspect: { value: 1.0 }, // Updated after texture loads
      uPlaneAspect: { value: dimensions.width / dimensions.height },
      uBlurAmount: { value: 0.01 },
    }),
    [texture]
  );

  useFrame(() => {
    const material = materialRef.current;
    const mesh = meshRef.current;
    if (material && mesh) {
      material.uniforms.uWaveAmplitude.value = amplitude.current.value;
      mesh.position.set(
        position.current.x,
        position.current.y,
        position.current.z
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
      .to([position.current], { x: 0, y: 0, duration: 6 }, "a")
      .to(position.current, { z: 7, duration: 8 }, "a")
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

    return () => {
      tl.kill();
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    const geometry = meshRef.current?.geometry;
    const material = materialRef.current;

    return () => {
      if (texture) texture.dispose();
      if (geometry) geometry.dispose();
      if (material) material.dispose();
    };
  }, [texture]);

  return (
    <mesh
      ref={meshRef}
      position={[position.current.x, position.current.y, position.current.z]}
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
  const { gl } = useThree();

  useEffect(() => {
    return () => {
      if (gl) {
        const context = gl.getContext();
        const ext = context?.getExtension("WEBGL_lose_context");
        ext?.loseContext();
      }
    };
  }, [gl]);

  return null;
};

const Scene = () => {
  const [opacity, setOpacity] = useState(0.9);
  const reelContainerRef = useRef(null);
  const playReelText = useRef(null);
  const reelVideoRef = useRef(null);
  const videoElementRef = useRef(null);
  const replayRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: reelContainerRef.current,
        start: "top -50",
        end: "top -51%",
        scrub: 1,
      },
    });
    tl.from(reelContainerRef.current, { opacity: 0 }).from(
      playReelText.current,
      {
        y: 10,
        scale: 1.2,
        filter: "blur(10px)",
        opacity: 0,
      }
    );

    return () => {
      tl.kill();
    };
  }, []);

  const handlePlayReel = () => {
    gsap.to(reelVideoRef.current, {
      opacity: 1,
      display: "initial",
      onComplete: () => {
        videoElementRef.current.src =
          "https://digicots.com/images/showreel/desktop.mp4";
        videoElementRef.current.play();
      },
    });
  };

  const handleCloseReel = () => {
    gsap.to(reelVideoRef.current, {
      opacity: 0,
      display: "none",
      onComplete: () => {
        if (videoElementRef.current) {
          videoElementRef.current.pause();
          videoElementRef.current.currentTime = 0;
        }
      },
    });
  };

  const handleVideoEnd = () => {
    gsap.to(videoElementRef.current, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        if (videoElementRef.current)
          videoElementRef.current.style.display = "none";
      },
    });

    gsap.to(replayRef.current, {
      opacity: 1,
      duration: 0.5,
      onStart: () => {
        if (replayRef.current) replayRef.current.style.display = "flex";
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
        if (replayRef.current) replayRef.current.style.display = "none";
      },
    });

    gsap.to([reelVideoRef.current, videoElementRef.current], {
      opacity: 1,
      duration: 0.5,
      onStart: () => {
        if (reelVideoRef.current) reelVideoRef.current.style.display = "block";
        if (videoElementRef.current)
          videoElementRef.current.style.display = "block";
      },
    });
  };

  useEffect(() => {
    const video = videoElementRef.current;
    const replay = replayRef.current;

    if (video) video.addEventListener("ended", handleVideoEnd);
    if (replay) replay.addEventListener("click", handleReplayClick);

    return () => {
      if (video) {
        video.removeEventListener("ended", handleVideoEnd);
        video.pause();
        video.src = "";
      }
      if (replay) replay.removeEventListener("click", handleReplayClick);
    };
  }, []);

  const scrollMoreRef = useRef([]);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollMoreRef.current,
        start: "top 130%",
        end: "top 90%",
        scrub: 1,
        // markers: true,
      },
      ease: "power4.inOut",
    });
    scrollMoreRef.current.forEach((el) => {
      const span = el.querySelector("span");
      tl.fromTo(
        span,
        {
          y: "130%",
          scaleX: 0.7,
        },
        {
          y: "0%",
          scaleX: 1,
        },
        "a"
      );
    });
    return () => {
      tl.kill();
    };
  }, [scrollMoreRef.current]);

  return (
    <div className="relative min-h-[150vh] w-full">
      <div className="sticky top-0" style={{ width: "100vw", height: "100vh" }}>
        <Canvas
          className="homeCanvas blur-[4px] brightness-[.6] relative z-[2]"
          camera={{ position: [0, 0, 10], fov: 75 }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <WavePlane setOpacity={setOpacity} />
          <WebGLCleanup />
        </Canvas>

        <div
          ref={reelContainerRef}
          className="h-screen w-full absolute top-0 flex z-[2] items-center justify-center"
        >
          <div
            ref={playReelText}
            style={{ fontSize: "clamp(30px, 5vw, 150px)" }}
            onClick={handlePlayReel}
            className="reel-text flex items-center gap-3 audiowide-regular font-bold text-white cursor-pointer"
          >
            <span>PLAY</span>
            <img
              src="https://digicots.com/images/play.png"
              className="w-10 md:w-20"
            />
            <span>REEL</span>
          </div>

          <div
            ref={reelVideoRef}
            className="reel-video hidden opacity-0 h-full w-full absolute top-0 z-[2]"
          >
            <video
              src="https://digicots.com/images/showreel/desktop.mp4"
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
            />
            <div className="h-full w-full backdrop-blur-2xl absolute top-0 bg-zinc-800/[.1]" />
            <video
              ref={videoElementRef}
              src="https://digicots.com/images/showreel/desktop.mp4"
              className="w-full h-full md:object-cover absolute top-0"
              controls
            />
            <button
              onClick={handleCloseReel}
              className="absolute top-20 md:top-8 right-8 text-white text-2xl font-bold bg-zinc-800/[.5] rounded-full w-10 h-10 flex items-center justify-center cursor-pointer z-20"
            >
              ×
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
                <img
                  src="https://digicots.com/images/play.png"
                  className="w-10 md:w-20"
                />
                <span>REEL</span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-full w-full absolute top-0 md:ms-20 z-[1]">
          <div className="absolute flex flex-col top-[40%] left-1/2 md:left-[62%] w-[85vw] md:w-[55vw] -translate-x-1/2">
            <div
              ref={(el) => (scrollMoreRef.current[0] = el)}
              className="overflow-hidden md:text-[4vw] text-[6vw] h-[6.7vw] md:h-[4.7vw]  text-sm text-white text-left leading-none "
            >
              <span className="inline-block font-bold audiowide-regular">
                The <span className="text-[#ED510C]">hunt</span>  begins
              </span>
              {/* <span className="inline-block font-bold font-inter">
                The
                <span className="inline-block font-bold  ms-2 me-4 md:ms-3 md:me-7">
                  {" "}
                  hunt{" "}
                </span>
                <span className="inline-block font-bold font-inter">
                  {" "}
                  begins
                </span>
              </span> */}
            </div>
            <div
              ref={(el) => (scrollMoreRef.current[1] = el)}
              className=" overflow-hidden md:text-[4vw] text-[6vw] h-[6.7vw] md:h-[4.7vw]  text-sm text-white text-right leading-none "
            >
              {/* <span className="inline-block font-bold font-inter md:ml-20 ml-[8vw]">
                where the{" "}
              <span className="inline-block font-bold font-mrs-saint-delafield-regular ms-2 me-4 md:ms-3 md:me-7">
                {" "}
                limit{" "}
              </span>
              <span className="inline-block font-bold font-inter"> ends</span>
              </span> */}
              <span className="inline-block font-bold font-inter md:ml-20 ml-[7vw] audiowide-regular">
                where the <span className="text-[#ED510C]"> limit</span> ends
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scene;
