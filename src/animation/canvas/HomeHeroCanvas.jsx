import React, { useRef, useEffect, useState, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReelCanvas from "./ReelCanvas";
import { FaRegArrowAltCircleDown } from "react-icons/fa";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

const HomeHeroCanvas = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const screen2TextRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const frameCount = 180;
  const images = useRef([]);
  const animationRefs = useRef({});

  // Preload images
  useEffect(() => {
    let isMounted = true;

    const loadImages = async () => {
      const loaders = Array.from({ length: frameCount }, (_, i) => {
        const img = new Image();
        img.src = `https://ik.imagekit.io/x5xessyka/digicots/hero_section/H${i
          .toString()
          .padStart(3, "0")}.avif`;

        return new Promise((resolve) => {
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
        });
      });

      await Promise.all(loaders);
      if (isMounted) {
        images.current = loaders.map((_, i) => {
          const img = new Image();
          img.src = `https://ik.imagekit.io/x5xessyka/digicots/hero_section/H${i
            .toString()
            .padStart(3, "0")}.avif`;
          return img;
        });
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

    const handleResize = () => {
      if (firstImage.complete) {
        canvas.width = firstImage.naturalWidth;
        canvas.height = firstImage.naturalHeight;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(firstImage, 0, 0, canvas.width, canvas.height);
      }
    };

    if (firstImage.complete) {
      handleResize();
    } else {
      firstImage.onload = handleResize;
    }

    return () => {
      if (firstImage) firstImage.onload = null;
      context.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const cleanup = setupCanvas();
      return cleanup;
    }
  }, [isLoading, setupCanvas]);

  // GSAP animation with ScrollTrigger
  useGSAP(() => {
    // Early return if loading or refs are invalid
    if (isLoading || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) {
      console.warn('Canvas context not available');
      return;
    }

    // Optimize canvas rendering
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Function to render frame
    const renderFrame = (frameIndex) => {
      const img = images.current[Math.floor(frameIndex)];
      if (img?.complete) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    };

    // Create main timeline
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'top -350%',
        scrub: 0.2,
        invalidateOnRefresh: true,
        onRefresh: ({ progress, animation }) => {
          if (progress > 0 && progress < 1) {
            animation.progress(progress);
          }
        },
      },
    });

    // Frame animation
    timeline.to(
      { frame: 0 },
      {
        frame: frameCount - 1,
        ease: 'none',
        snap: 'frame',
        onUpdate: function () {
          renderFrame(this.targets()[0].frame);
        },
      },
      'start'
    );

    // Text animation
    if (screen2TextRef.current) {
      timeline.to(
        screen2TextRef.current,
        {
          opacity: 1,
          bottom: '0%',
          duration: 1,
          ease: 'power2.out',
        },
        'start'
      );
    }

    // Container movement animation
    const moveY = gsap.to(containerRef.current, {
      y: '40%',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top -302%',
        end: 'top -400%',
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    // Store animations for cleanup
    animationRefs.current = {
      timeline,
      moveY,
    };

    // Cleanup
    return () => {
      timeline.kill();
      moveY.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, { dependencies: [isLoading], scope: containerRef });



  const scrollText = useRef(null);

  useGSAP(()=>{
    gsap.to(scrollText.current,{
      opacity:0,
      duration:1,
      ease:"power1.inOut",
      scrollTrigger:{
        trigger:scrollText.current,
        start:"top 80%",
        end:"top 78%",
        scrub:1
      }
    })
  },[scrollText.current])

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
          <div ref={scrollText} className="w-full absolute bottom-8 md:text-[1.6vw] ">
            <h1 className="text-white flex items-center  justify-center ">Scroll To Explore. <MdKeyboardDoubleArrowDown /> </h1>
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