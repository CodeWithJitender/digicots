import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import ScrollableCanvasAnimationMP4 from "./components/animations/ScrollableCanvasAnimationMP4";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const lenisRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  // Initialize Lenis and sync with ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    // Sync GSAP ScrollTrigger with Lenis
    lenis.on("scroll", ScrollTrigger.update);

    // Define proxy for ScrollTrigger
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        return arguments.length ? lenis.scrollTo(value) : lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    // RAF loop for Lenis
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    lenisRef.current = lenis;
    setIsMounted(true); // Mark component as mounted

    return () => {
      lenis.destroy();
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    isMounted && (
      <div className="main w-full bg-zinc-800">
        <ScrollableCanvasAnimationMP4
          imgPath={"./short/VID_Sequence."}
          frameCount={200}
          height={"300vh"}
        />

        <div className="h-screen w-full ">heyy</div>

        <ScrollableCanvasAnimationMP4
          imgPath={"./short/VID_Sequence."}
          frameCount={200}
          height={"300vh"}
        />
      </div>
    )
  );
};

export default App;
