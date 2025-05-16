import React, { useEffect, Suspense, useContext, useState } from "react";
import Header from "../components/Header";
import HeroHeading from "../sections/our-work/HeroHeading";
import BrandingGrid from "../sections/our-work/BrandingGrid";
import HowItWorksCanvas from "../animation/canvas/HowItsWorkCanvas";
import Loading, { LoadingContext } from "../components/Loading";
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

  const { loadingContext } = useContext(LoadingContext);

  const [componentLoaded, setComponentLoaded] = useState({
    heroCanvas: false,
    heroHeading: false,
    brandingGrid: false,
  });

  useEffect(() => {
    if (
      componentLoaded.heroCanvas &&
      componentLoaded.heroHeading &&
      componentLoaded.brandingGrid
    ) {
      setTimeout(() => {
        // All components have loaded
        console.log("All components have loaded");
        loadingContext.setIsLoading(false); // Set loading to false
        console.log(loadingContext);
      }, 500);
    }
    console.log(componentLoaded);
    console.log(loadingContext);
  }, [componentLoaded, loadingContext]);

  return (
    <>
      {/* Content below video */}
      <div className="w-full min-h-screen overflow-y-auto overflow-x-hidden">
        <div className="fixed top-0 left-0 w-full h-screen pointer-events-none">
          <Suspense fallback={<Loading />}>
            <HowItWorksCanvas setComponentLoaded={setComponentLoaded} />
          </Suspense>
        </div>

        <HeroHeading setComponentLoaded={setComponentLoaded} />
        <BrandingGrid setComponentLoaded={setComponentLoaded} />
      </div>
    </>
  );
}

// Wrap OurWork with withLoading and memoize
// export default withLoading(React.memo(OurWork), loadOurWorkResources);
export default OurWork;
