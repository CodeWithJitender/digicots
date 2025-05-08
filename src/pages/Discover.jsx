import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeroDiscover from "../sections/discover/HeroDiscover";
import AllService from "../sections/discover/AllService";
import { getPrevPath } from "../hook/useHistory";
import { ScrollTrigger } from "gsap/all";
// import { withLoading } from "../components/Loading"; // Adjust path as needed

function Discover() {
  const location = useLocation();

  useEffect(() => {
    const previousRoute = getPrevPath();
    if (previousRoute === "/") {
      // Removed window.location.reload() to prevent resetting LoadingProvider
      // If specific state reset is needed, handle it without a full reload
    }
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 0); // thoda delay zaruri hota hai

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="">
      <HeroDiscover />
      <AllService />
    </div>
  );
}

// Wrap Discover with withLoading
// export default withLoading(Discover, loadDiscoverResources);
export default Discover;