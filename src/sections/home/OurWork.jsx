import React from "react";
import MainHeading from "../../components/MainHeading";
import CylindricalSlider from "../../components/OurWorkSlider";
import VideoLikeCanvasAnimation from "../../animation/canvas/AutoPlayCanvasAnimation";
import CylinderScene from "../../animation/canvas/CylinderScene";

function OurWork() {
  return (
    <section className="our-work w-full h-screen bg-black relative">
        {/* <CylindricalSlider /> */}
        <CylinderScene />
        {/* <video src="FINAL SIDE_ANIMATION.mp4" className="absolute bottom-0 z-[99] " autoPlay loop muted /> */}
        {/* <VideoLikeCanvasAnimation imgPath={"./our_work_frame/"} /> */}

        {/* <VideoLikeCanvasAnimation imgPath={"./our_work_frame/"} frameCount={41} /> */}


    </section>
  );
}

export default OurWork;
