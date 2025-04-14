import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeroDiscover from "../sections/discover/HeroDiscover";
import AllService from "../sections/discover/AllService";
import { getPrevPath } from "../hook/useHistory";

function Discover() {
  const location = useLocation();

  useEffect(() => {
    const previousRoute = getPrevPath();
    if (previousRoute == "/") {
      window.location.reload();
    }
  }, []);

  return (
    <div className="">
      <HeroDiscover />
      <AllService />
    </div>
  );
}

export default Discover;
