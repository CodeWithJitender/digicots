import React from "react";
import MainHeading from "../../components/MainHeading";
import CylindricalSlider from "../../components/OurWorkSlider";
import VideoLikeCanvasAnimation from "../../animation/canvas/AutoPlayCanvasAnimation";
import CylinderScene from "../../animation/canvas/CylinderScene";

function OurWork() {
  return (
    <section className="our-work w-full md:h-screen h-[63vh] bg-black relative z-[3]">
        <CylindricalSlider />
        <div className="w-[200vw] sm:w-screen pointer-events-none absolute bottom-0 z-[99] -translate-x-1/2 left-1/2 ">
        <video src="./side_walk/side.webm" className=" w-[100%] h-auto " autoPlay loop muted />
        </div>
    </section>
  );
}

export default OurWork;
