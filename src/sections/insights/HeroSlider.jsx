import React from "react";
import ThumbnailSlider from "../../components/ThumbnailSlider";
import TextAnimation1 from "../../animation/text/TextAnimation1.jsx";

function HeroSlider() {
  return (
    <div className="pt-20">
      {/* <h2 className="text-2xl md:text-3xl overflow-hidden pt-40 md:mb-20 max-w-[800px] m-auto text-center text-white font-bold px-2">
        <TextAnimation1 animeStart="80">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod
        </TextAnimation1>
      </h2> */}
      <ThumbnailSlider />
    </div>
  );
}

export default HeroSlider;
