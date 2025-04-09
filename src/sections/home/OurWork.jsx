import React from "react";
import MainHeading from "../../components/MainHeading";
import CylindricalSlider from "../../components/OurWorkSlider";
import VideoLikeCanvasAnimation from "../../animation/canvas/AutoPlayCanvasAnimation";
import CylinderScene from "../../animation/canvas/CylinderScene";

function OurWork() {
  return (
    <section className="our-work w-full h-screen bg-black relative">
        {/* <CylindricalSlider /> */}
        {/* <VideoLikeCanvasAnimation imgPath={"./our_work_frame/"} /> */}

        <CylinderScene />
        <VideoLikeCanvasAnimation imgPath={"./our_work_frame/"} />

    </section>
  );
}

export default OurWork;
