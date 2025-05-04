import React, { useEffect, Suspense } from "react";
import Header from "../components/Header";
import HeroHeading from "../sections/our-work/HeroHeading";
import BrandingGrid from "../sections/our-work/BrandingGrid";
import HowItWorksCanvas from "../animation/canvas/HowItsWorkCanvas";
import Loading from "../components/Loading";
import { withLoading } from "../components/Loading"; // Adjust path as needed

function OurWork() {
  useEffect(() => {
    // Reset scroll position to top on mount
    window.scrollTo(0, 0);

    // Debug: Log scroll position and component mount
    console.log("OurWork mounted, scroll position:", window.scrollY);
    console.log("Current route:", window.location.pathname);

    // Debug: Monitor navigation events
    const handlePopState = () => {
      console.log("Navigation occurred to:", window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);

    // Optional scroll or other side-effect cleanups
    return () => {
      console.log("OurWork unmounting");
      window.removeEventListener("popstate", handlePopState);

      // Clean up all ScrollTriggers on unmount (failsafe)
      if (window?.ScrollTrigger?.getAll) {
        const triggers = window.ScrollTrigger.getAll();
        console.log("Cleaning up ScrollTriggers:", triggers.length);
        triggers.forEach((trigger) => trigger.kill());
      }
    };
  }, []);

  return (
    <>
      {/* Content below video */}
      <div className="w-full min-h-screen overflow-y-auto overflow-x-hidden">
        <div className="fixed top-0 left-0 w-full h-screen pointer-events-none">
          <Suspense fallback={<Loading />}>
            <HowItWorksCanvas />
          </Suspense>
        </div>

        <HeroHeading />
        <BrandingGrid />
      </div>
    </>
  );
}

// Resource Loading for OurWork
const loadOurWorkResources = async (reportProgress) => {
  // Placeholder for BrandingGrid images or other resources
  const loadBrandingResources = async () => {
    return new Promise((resolve) => {
      // Simulate loading of images or assets for BrandingGrid (0–50%)
      // Replace with actual image loading logic if BrandingGrid uses specific assets
      const img = new Image();
      img.src = "/placeholder-branding-image.png"; // Replace with actual image path
      img.onload = () => {
        console.log("Branding image loaded");
        reportProgress(50);
        resolve(true);
      };
      img.onerror = (error) => {
        console.warn("Failed to load branding image:", error);
        reportProgress(50);
        resolve(false);
      };
    });
  };

  // Placeholder for other section resources (HowItWorksCanvas, HeroHeading, etc.)
  const loadOtherResources = async () => {
    return new Promise((resolve) => {
      // Simulate instant or lightweight loading (50–100%)
      // Replace with actual resource loading logic if needed (e.g., canvas assets)
      setTimeout(() => {
        console.log("Other resources loaded");
        reportProgress(100);
        resolve(true);
      }, 100); // Minimal delay for smooth progress transition
    });
  };

  try {
    // Debug: Log start of resource loading
    console.log("Starting loadOurWorkResources");
    // Load branding resources (0–50%)
    await loadBrandingResources();
    // Load other resources (50–100%)
    await loadOtherResources();
    console.log("loadOurWorkResources completed");
  } catch (error) {
    // Log any unexpected errors during resource loading
    console.error("Error in loadOurWorkResources:", error);
    // Ensure progress reaches 100% even on error
    reportProgress(100);
  }
};

// Wrap OurWork with withLoading and memoize
export default withLoading(React.memo(OurWork), loadOurWorkResources);