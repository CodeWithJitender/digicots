import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import HeroHeading from "../sections/our-work/HeroHeading";
import BrandingGrid from "../sections/our-work/BrandingGrid";

function OurWork() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if the device is mobile
    const checkWidth = () => {
      setIsMobile(window.innerWidth < 600);
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);

    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  useEffect(() => {
    const video = document.querySelector("#our-work-video");

    // Auto-scroll to 100vh after video starts
    const handleScrollAfterVideoStart = () => {
      setTimeout(() => {
        window.scrollTo({
          top: window.innerHeight,
          behavior: "smooth",
        });
      }, 500); // Delay to allow video to start
    };

    if (video) {
      video.play().then(() => {
        handleScrollAfterVideoStart();
      }).catch((error) => {
        console.error("Video playback failed:", error);
        // Fallback: Scroll even if video fails to play
        handleScrollAfterVideoStart();
      });
      video.playbackRate = 0.7;
      video.addEventListener("loadedmetadata", handleScrollAfterVideoStart);
    }

    // Set initial scroll position to 100vh immediately
    window.scrollTo({
      top: window.innerHeight,
      behavior: "instant",
    });

    // Touch handling for mobile
    let touchStartY = 0;

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY; // Positive = scroll up, Negative = scroll down

      // Prevent scrolling up past 100vh
      if (deltaY > 0 && window.scrollY <= window.innerHeight) {
        e.preventDefault();
        window.scrollTo({
          top: window.innerHeight,
          behavior: "instant",
        });
      }
      // Allow scrolling down naturally (no action needed)
    };

    // Desktop scroll blocking
    const handleWheel = (e) => {
      if (window.scrollY <= window.innerHeight && e.deltaY < 0) { // Scroll up
        e.preventDefault();
        window.scrollTo({
          top: window.innerHeight,
          behavior: "instant",
        });
      }
    };

    const handleKeyDown = (e) => {
      if (
        ["ArrowUp", "PageUp", "Home"].includes(e.key) &&
        window.scrollY < window.innerHeight
      ) {
        e.preventDefault();
        window.scrollTo({
          top: window.innerHeight,
          behavior: "instant",
        });
      }
    };

    // Add event listeners based on device
    if (isMobile) {
      document.addEventListener("touchstart", handleTouchStart, { passive: true });
      document.addEventListener("touchmove", handleTouchMove, { passive: true });
    } else {
      window.addEventListener("wheel", handleWheel, { passive: false });
      window.addEventListener("keydown", handleKeyDown);
    }

    // Cleanup
    return () => {
      if (video) {
        video.removeEventListener("loadedmetadata", handleScrollAfterVideoStart);
      }
      if (isMobile) {
        document.removeEventListener("touchstart", handleTouchStart);
        document.removeEventListener("touchmove", handleTouchMove);
      } else {
        window.removeEventListener("wheel", handleWheel);
        window.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [isMobile]);

  return (
    <>
      {/* Full-screen video */}
      <div className="h-screen bg-black sticky top-0 w-full overflow-hidden">
        <video
          className="h-full w-full object-cover"
          id="our-work-video"
          src="./1.mp4"
          autoPlay
          muted
          playsInline // Ensures proper playback on mobile
        />
      </div>

      {/* Content below video */}
      <div className="w-full min-h-screen overflow-y-auto">
        <HeroHeading />
        <BrandingGrid />
      </div>
    </>
  );
}

export default OurWork;