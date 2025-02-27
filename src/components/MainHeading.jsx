import React from "react";
import TextAnimation from "../animation/text/TextAnimation";

function MainHeading({ heading, pera, cl, tColor,animeStart="50%" }) {
  return (
    <div className="">
      <div className={`main-heading max-w-3xl m-auto ${cl}`}>
        <TextAnimation animeStart={animeStart}>
          <h2
            className={`${tColor} font-bold font-inter mb-4`}
            style={{ fontSize: "clamp(20px, 20vw, 48px)" }}
          >
            {heading ? heading : " "}
          </h2>
        </TextAnimation>
        <TextAnimation animeStart={animeStart}>
          <p className={`text-[14px] ${tColor} font-normal font-inter`}>
            {pera ? pera : " "}
          </p>
        </TextAnimation>
      </div>
    </div>
  );
}

export default MainHeading;
