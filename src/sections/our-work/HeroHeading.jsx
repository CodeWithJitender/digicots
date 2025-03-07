import React from "react";
import TextAnimation1 from "../../animation/text/TextAnimation1";
import TextAnimation2 from "../../animation/text/TextAnimation2";

function HeroHeading() {
  return (
    <div className="text-center">
      <div className="container-xxl">
        <h1 className="sm:text-6xl md:text-8xl lg:text-9xl font-black text-white font-inter">
          <TextAnimation1>OUR WORK</TextAnimation1>
        </h1>
        <p className="text-white">
          <TextAnimation2>
            We specialize in personalized and conversational marketing, crafting
            tailored experiences for every business.
          </TextAnimation2>
        </p>
      </div>
    </div>
  );
}

export default HeroHeading;
