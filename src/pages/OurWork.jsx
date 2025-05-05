import React, { useEffect, Suspense } from "react";
import Header from "../components/Header";
import HeroHeading from "../sections/our-work/HeroHeading";
import BrandingGrid from "../sections/our-work/BrandingGrid";
import HowItWorksCanvas from "../animation/canvas/HowItsWorkCanvas";
import Loading from "../components/Loading";
// import { withLoading } from "../components/Loading"; // Adjust path as needed

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


// Wrap OurWork with withLoading and memoize
// export default withLoading(React.memo(OurWork), loadOurWorkResources);
export default OurWork;