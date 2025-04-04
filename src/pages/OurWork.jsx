import React, { useEffect } from "react";
import Header from "../components/Header";
import HeroHeading from "../sections/our-work/HeroHeading";
import BrandingGrid from "../sections/our-work/BrandingGrid";

function OurWork() {
  useEffect(() => {
    // Automatically scroll to 100vh when the video starts
    const handleScrollAfterVideoStart = () => {
      setTimeout(() => {
        window.scrollTo({
          top: window.innerHeight,
          behavior: "smooth",
        });
      }, 500);
    };

    // Prevent scrolling above 100vh
    const preventScrollUp = () => {
      if (window.scrollY < window.innerHeight) {
        window.scrollTo({
          top: window.innerHeight,
          behavior: "instant",
        });
      }
    };

    const video = document.querySelector("#our-work-video");

    if (video) {
      video.play().then(() => {
        handleScrollAfterVideoStart();
      });

      video.playbackRate = .7

      video.addEventListener("loadedmetadata", handleScrollAfterVideoStart);
    }

    // Block user input scroll (wheel, touchmove, keyboard)
    const blockScroll = (e) => {
      if (window.scrollY < window.innerHeight) {
        e.preventDefault();
      }
    };

    // **CSS Trick**: Add an invisible div to stop scrolling above 100vh
    const stopScrollDiv = document.createElement("div");
    stopScrollDiv.style.position = "fixed";
    stopScrollDiv.style.top = "0";
    stopScrollDiv.style.left = "0";
    stopScrollDiv.style.width = "100%";
    stopScrollDiv.style.height = "100vh";
    stopScrollDiv.style.overflow = "hidden";
    stopScrollDiv.style.pointerEvents = "none";
    document.body.appendChild(stopScrollDiv);

    window.addEventListener("scroll", preventScrollUp);
    window.addEventListener("wheel", blockScroll, { passive: false });
    window.addEventListener("touchmove", blockScroll, { passive: false });
    window.addEventListener("keydown", (e) => {
      if (["ArrowUp", "PageUp", "Home"].includes(e.key) && window.scrollY < window.innerHeight) {
        e.preventDefault();
      }
    });

    return () => {
      if (video) {
        video.removeEventListener("loadedmetadata", handleScrollAfterVideoStart);
      }
      window.removeEventListener("scroll", preventScrollUp);
      window.removeEventListener("wheel", blockScroll);
      window.removeEventListener("touchmove", blockScroll);
      window.removeEventListener("keydown", blockScroll);
      document.body.removeChild(stopScrollDiv); // Clean up the fake div
    };
  }, []);

  return (
    <>
      {/* Full-screen video */}
      <div className="h-screen bg-black sticky top-0 w-full">
        <video className="h-full w-full object-cover" id="our-work-video" src="./1.mp4" autoPlay muted />
      </div>

      {/* Content that user can scroll */}
      <div className="overflow-x-hidden" >
        <HeroHeading />
        <BrandingGrid />
      </div>
    </>
  );
}

export default OurWork;
