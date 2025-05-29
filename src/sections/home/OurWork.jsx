import React, { useEffect, useState } from "react";
import MainHeading from "../../components/MainHeading";
import CylindricalSlider from "../../components/OurWorkSlider";
import AutoPlayCanvasAnimation from "../../animation/canvas/AutoPlayCanvasAnimation";

function OurWork({ setComponentLoaded }) {
  const [videoSrc, setVideoSrc] = useState(
    "platform.webm"
  );
  // const [videoSrc, setVideoSrc] = useState("./side_walk/Final_side.mov");

  let [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setComponentLoaded((prev) => ({ ...prev, ourWork: true }));
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
    if (isSafari) {
      alert("Safari detected. Please use Chrome for the best experience.");
    }
  }, []);

  console.log(isSafari);

  return (
    <section className="our-work w-full md:h-screen h-[63vh] bg-black relative z-[4]">
      <CylindricalSlider />
      <div className="w-[200vw] sm:w-screen pointer-events-none absolute bottom-0 z-[99] -translate-x-1/2 left-1/2 ">
        {isSafari ? (
          <>
            <AutoPlayCanvasAnimation imgPath={"./side_walk/frames/SIDE ANIM"} startFrame={0} endFrame={599} />
          </>
        ) : (
          <>
            <video
              src={videoSrc}
              className="w-full h-auto"
              autoPlay
              loop
              muted
              playsInline
            />
          </>
        )}
      </div>
    </section>
  );
}

export default OurWork;
