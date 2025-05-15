import React, { useRef, useEffect, useState, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReelCanvas from "./ReelCanvas";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const HomeHeroCanvas = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const screen2TextRef = useRef(null);
  const scrollText = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const frameCount = 180;
  const images = useRef([]);
  const animationRefs = useRef({});

  // Image preload
  useEffect(() => {
    let isMounted = true;

    const loadImages = async () => {
      const promises = Array.from({ length: frameCount }, (_, i) => {
        const img = new Image();
        img.src = `https://digicots.com/images/HEROSECTION/H${i.toString().padStart(3, "0")}.avif`;
        return new Promise((resolve) => {
          img.onload = () => resolve(img);
          img.onerror = () => resolve(null);
        });
      });

      const loadedImages = await Promise.all(promises);
      if (isMounted) {
        images.current = loadedImages.filter(Boolean);
        setIsLoading(false);
      }
    };

    loadImages();

    return () => {
      isMounted = false;
      images.current.forEach((img) => (img.onload = null));
      images.current = [];
    };
  }, []);

  // Canvas setup
  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const firstImage = images.current[0];
    if (!canvas || !context || !firstImage) return;

    const resizeAndDraw = () => {
      canvas.width = firstImage.naturalWidth;
      canvas.height = firstImage.naturalHeight;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(firstImage, 0, 0, canvas.width, canvas.height);
    };

    if (firstImage.complete) {
      resizeAndDraw();
    } else {
      firstImage.onload = resizeAndDraw;
    }

    return () => {
      if (firstImage) firstImage.onload = null;
      context?.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const cleanup = setupCanvas();
      return cleanup;
    }
  }, [isLoading, setupCanvas]);

  // Main GSAP animation
  useGSAP(
    () => {
      if (!canvasRef.current || !containerRef.current || isLoading) return;

      const ctx = gsap.context(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const renderFrame = (index) => {
          const img = images.current[Math.floor(index)];
          if (img?.complete) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, 0, 0, canvas.width, canvas.height);
          }
        };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "top -350%",
            scrub: 0.2,
            invalidateOnRefresh: true,
          },
        });

        tl.to(
          { frame: 0 },
          {
            frame: frameCount - 1,
            ease: "none",
            snap: "frame",
            onUpdate() {
              renderFrame(this.targets()[0].frame);
            },
          },
          "start"
        );

        if (screen2TextRef.current) {
          tl.to(
            screen2TextRef.current,
            {
              opacity: 1,
              bottom: "0%",
              duration: 1,
              ease: "power2.out",
            },
            "start"
          );
        }

        const moveY = gsap.to(containerRef.current, {
          y: "40%",
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top -302%",
            end: "top -400%",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        animationRefs.current = { tl, moveY };
      }, containerRef);

      return () => {
        ctx.revert(); // ✅ kills all ScrollTriggers/animations inside context
        animationRefs.current = {};
      };
    },
    { dependencies: [isLoading] }
  );

  // Text fade scroll
  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.to(scrollText.current, {
        opacity: 0,
        duration: 1,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: scrollText.current,
          start: "top 80%",
          end: "top 78%",
          scrub: 1,
        },
      });
    }, scrollText);

    return () => ctx.revert();
  });

  return (
    <section className="hero-main min-h-[400vh] bg-black">
      <div
        ref={containerRef}
        className="h-screen sticky top-0 w-full overflow-hidden"
      >
        <canvas
          ref={canvasRef}
          className="h-full w-full"
          style={{ objectFit: "cover" }}
        />
        <div  className="hero-container h-screen w-full absolute top-0 text-center">
          <div ref={scrollText} className="w-full absolute bottom-8 md:text-[1.2vw] ">
            <div className="text-white flex items-center  justify-center w-full flex-col ">
            <p className="text-inter text-lg text-center text-white mb-3 raleway font-semibold">
              SCROLL TO EXPLORE 
            </p>
              {/* <MdKeyboardDoubleArrowDown />  */}
              <img src="https://digicots.com/images/scroll-to-explore.gif" className="max-w-10" alt="" />
              
            </div>
          </div>
          <div
            ref={screen2TextRef}
            className="service-text absolute bottom-[-300%] w-full"
          >
            <ReelCanvas />
          </div>
        </div>
      </div>
      <div style={{ height: "200vh" }} />
    </section>
  );
};

export default HomeHeroCanvas;
