import React from "react";
import TextAnimation1 from "../animation/text/TextAnimation1";
import TextAnimation2 from "../animation/text/TextAnimation2";

function MainHeading({ heading, pera, cl, tColor,animeStart="50", animeEnd="60" }) {
  return (
    <div className="">
      <div className={`main-heading max-w-3xl m-auto ${cl}`}>
          <h2
            className={`${tColor} font-bold font-inter mb-4`}
            style={{ fontSize: "clamp(20px, 20vw, 48px)" }}
          >
        <TextAnimation1 animeStart={animeStart} animeEnd={animeEnd}>
            {heading ? heading : " "}
        </TextAnimation1>
          </h2>
          {pera && (
            <p className={`text-[14px] ${tColor} font-normal font-inter`}>
            <TextAnimation2 animeStart={animeStart}>
                {pera ? pera : " "}
            </TextAnimation2>
              </p>
          )}
      </div>
    </div>
  );
}

export default MainHeading;
