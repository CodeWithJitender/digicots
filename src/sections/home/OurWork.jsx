import React, { useEffect, useState } from "react";
import MainHeading from "../../components/MainHeading";
import CylindricalSlider from "../../components/OurWorkSlider";

function OurWork() {
  const [videoSrc, setVideoSrc] = useState("./side_walk/side.webm");
  // const [videoSrc, setVideoSrc] = useState("./side_walk/Final_side.mov");

  useEffect(() => {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    console.log(navigator.userAgent)
    if (isSafari) {
      // alert("safari")
      // setVideoSrc("./side_walk/Final_side.mov");
    }
  }, []);

  return (
    <section className="our-work w-full md:h-screen h-[63vh] bg-black relative z-[4]">
      <CylindricalSlider />
      <div className="w-[200vw] sm:w-screen pointer-events-none absolute bottom-0 z-[99] -translate-x-1/2 left-1/2 ">
        <video
          src={videoSrc}
          className="w-full h-auto"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
    </section>
  );
}

export default OurWork;
