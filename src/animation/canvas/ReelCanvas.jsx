import React, { useState, useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

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
    const tex = new THREE.TextureLoader().load(
      "https://ik.imagekit.io/x5xessyka/digicots/public/reel-cover.png"
    );
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(1, 1 / (dimensions.width / dimensions.height));
    return tex;
  }, []); // Empty dependency array since texture is static

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
    () => `
    varying vec2 vUv;
    uniform sampler2D uTexture;

    void main() {
      vec2 adjustedUv = vUv;
      gl_FragColor = texture2D(uTexture, adjustedUv);
    }
  `,
    []
  );

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uWaveAmplitude: { value: 0 },
      uTexture: { value: texture },
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
      .to(position.current, { z: 7.2, duration: 8 }, "a")
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
        videoElementRef.current.src = "https://ik.imagekit.io/x5xessyka/digicots/public/showreels.mp4";
        videoElementRef.current.play()
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

  return (
    <div className="relative min-h-[150vh] w-full">
      <div className="sticky top-0" style={{ width: "100vw", height: "100vh" }}>
        <Canvas
          className="homeCanvas"
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
            className="reel-text flex items-center gap-3 font-inter font-bold text-white cursor-pointer"
          >
            <span>PLAY</span>
            <img src="reelplay.png" />
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
              onClick={handleCloseReel}
              className="absolute top-8 right-8 text-white text-2xl font-bold bg-zinc-800/[.5] rounded-full w-10 h-10 flex items-center justify-center cursor-pointer z-20"
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
                <img src="reelplay.png" />
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
