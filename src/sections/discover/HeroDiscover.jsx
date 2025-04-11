import React, { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function HeroDiscover() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const screen1TextRef = useRef(null);
  const screen2TextRef = useRef(null);
  const images = useRef([]);
  const frameCount = 181;

  // Load and store images
  useEffect(() => {
    let isMounted = true;

    const loadImages = () => {
      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = `/moon_frame/M${i.toString().padStart(3, "0")}.avif`;
        images.current[i] = img;
      }
    };

    loadImages();

    return () => {
      isMounted = false;
      images.current = [];
    };
  }, []);

  // Set canvas size once the image is ready
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    const setCanvasSize = () => {
      const firstImage = images.current[0];
      if (firstImage?.complete && canvas && context) {
        canvas.width = firstImage.naturalWidth;
        canvas.height = firstImage.naturalHeight;
        context.drawImage(firstImage, 0, 0, canvas.width, canvas.height);
      }
    };

    if (images.current[0]) {
      images.current[0].onload = setCanvasSize;
      if (images.current[0].complete) {
        setCanvasSize();
      }
    }

    return () => {
      // Optional: clear canvas
      if (context && canvas) {
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
  }, []);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");

      if (!canvas || !context) return;

      const renderFrame = (frameIndex) => {
        const img = images.current[Math.floor(frameIndex)];
        if (img?.complete) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 0",
          end: "top -200%",
          scrub: 1,
        },
      });

      tl.to(
        { frame: 0 },
        {
          frame: frameCount - 1,
          ease: "none",
          onUpdate: function () {
            renderFrame(this.targets()[0].frame);
          },
        },
        "start"
      ).to(
        screen1TextRef.current,
        { opacity: 0.5, bottom: "100%" },
        "start"
      ).to(
        screen2TextRef.current,
        {
          opacity: 1,
          bottom: "10%",
          duration: 0.5,
        },
        "start"
      );
    }, containerRef);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      ctx.revert();
    };
  }, []);

  return (
    <section className="hero-discover bg-amber-50">
      <div
        ref={containerRef}
        className="h-screen bg-red-100 fixed top-0 w-full overflow-hidden"
      >
        <canvas
          ref={canvasRef}
          className="h-full w-full"
          style={{ objectFit: "cover" }}
        />
        <div className="hero-container h-screen w-full absolute top-0 text-center">
          <div
            ref={screen1TextRef}
            className="hero-text w-full absolute bottom-0 px-4"
          >
            <h1 className="font-bold text-inter text-5xl sm:text-7xl lg:text-9xl text-zinc-800 text-center mb-20 md:mb-40">
              DIGICOTS
            </h1>
            <p className="text-inter text-lg text-center text-white mb-5">
              SCROLL TO KNOW HOWL CAN WE HELP YOU?
            </p>
            <img src="arrow-down.png" alt="" className="w-16 m-auto mb-5" />
          </div>

          <div
            ref={screen2TextRef}
            className="service-text flex flex-col md:flex-row justify-between items-end absolute opacity-0 bottom-[-50%] w-full py-10 md:p-5 px-10 text-center md:text-start gap-5"
          >
            <h1 className="m-auto max-w-[500px] font-black text-4xl md:text-6xl text-white">
              Let's Discover Our Services
            </h1>
            <h3 className="m-auto max-w-[350px] font-semibold text-xl md:text-4xl md:text-right text-white">
              We are happy to see you here
            </h3>
          </div>
        </div>
      </div>
      <div style={{ height: "200vh" }} />
    </section>
  );
}

export default HeroDiscover;
