import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import HeroDiscover from "../sections/discover/HeroDiscover";
import AllService from "../sections/discover/AllService";
import { getPrevPath } from "../hook/useHistory";
import { ScrollTrigger } from "gsap/all";
import { LoadingContext } from "../components/Loading";
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



  const { loadingContext } = useContext(LoadingContext);
  
    const [componentLoaded, setComponentLoaded] = useState({
      heroDiscover: false,
      allService: false,
    });
  
    useEffect(() => {
      if (
        componentLoaded.heroDiscover &&
        componentLoaded.allService 
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
    <div className="">
      <HeroDiscover setComponentLoaded={setComponentLoaded} />
      <AllService setComponentLoaded={setComponentLoaded} />
    </div>
  );
}

// Wrap Discover with withLoading
// export default withLoading(Discover, loadDiscoverResources);
export default Discover;