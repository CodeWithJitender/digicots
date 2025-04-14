import React, { useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import HeroHeading from "../sections/our-work/HeroHeading";
import BrandingGrid from "../sections/our-work/BrandingGrid";

function OurWork() {
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef(null);
  const touchStartY = useRef(0);
  const hasScrolled = useRef(false);

  // Debounced resize handler
  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.innerWidth < 600);
    };

    // Initial check
    checkWidth();

    // Debounce the resize handler
    const debouncedCheckWidth = debounce(checkWidth, 200);
    window.addEventListener("resize", debouncedCheckWidth);

    return () => window.removeEventListener("resize", debouncedCheckWidth);
  }, []);

  // Video and scroll effects
  useEffect(() => {
    const video = videoRef.current;

    const handleScrollAfterVideoStart = () => {
      if (hasScrolled.current) return;
      
      setTimeout(() => {
        window.scrollTo({
          top: window.innerHeight,
          behavior: "smooth",
        });
        hasScrolled.current = true;
      }, 500);
    };

    const initVideo = async () => {
      try {
        if (video) {
          video.playbackRate = 0.7;
          await video.play();
          handleScrollAfterVideoStart();
        }
      } catch (error) {
        console.error("Video playback failed:", error);
        handleScrollAfterVideoStart();
      }
    };

    // Set initial scroll position immediately
    window.scrollTo({
      top: window.innerHeight,
      behavior: "instant",
    });

    initVideo();

    // Touch handling for mobile
    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY.current - touchY;

      if (deltaY > 0 && window.scrollY <= window.innerHeight) {
        e.preventDefault();
        window.scrollTo({
          top: window.innerHeight,
          behavior: "instant",
        });
      }
    };

    // Desktop scroll blocking
    const handleWheel = (e) => {
      if (window.scrollY <= window.innerHeight && e.deltaY < 0) {
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

    // Add event listeners
    if (isMobile) {
      document.addEventListener("touchstart", handleTouchStart, { passive: false });
      document.addEventListener("touchmove", handleTouchMove, { passive: false });
    } else {
      window.addEventListener("wheel", handleWheel, { passive: false });
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
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
          ref={videoRef}
          className="h-full w-full object-cover"
          id="our-work-video"
          src="./1.mp4"
          autoPlay
          // muted
          playsInline
          // loop // Added loop if needed
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

// Helper function for debouncing
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default React.memo(OurWork);
