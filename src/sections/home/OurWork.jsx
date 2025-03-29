import React from "react";
import MainHeading from "../../components/MainHeading";
import CylindricalSlider from "../../components/OurWorkSlider";
import VideoLikeCanvasAnimation from "../../animation/canvas/AutoPlayCanvasAnimation";

function OurWork() {
  return (
    <section className="our-work w-full bg-black">
        <CylindricalSlider />
        <VideoLikeCanvasAnimation
        
        />
    </section>
  );
}

export default OurWork;
