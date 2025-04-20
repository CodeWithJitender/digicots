import React, { useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import HeroHeading from "../sections/our-work/HeroHeading";
import BrandingGrid from "../sections/our-work/BrandingGrid";
import HowItWorksCanvas from "../animation/canvas/HowItsWorkCanvas";

function OurWork() {
  return (
    <>
      {/* Content below video */}
      <div className="w-full min-h-screen overflow-y-auto">
        <div className="fixed top-0 left-0 w-full h-screen pointer-events-none">
          <HowItWorksCanvas />
        </div>

        <HeroHeading />
        <BrandingGrid />
      </div>
    </>
  );
}

export default React.memo(OurWork);
