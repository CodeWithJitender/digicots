import React from "react";
import TextAnimation1 from "../animation/text/TextAnimation1";
import TextAnimation2 from "../animation/text/TextAnimation2";

function MainHeading({ heading, pera, cl, tColor,animeStart="50", animeEnd="60" }) {
  return (
    <div className="">
      <div className={`main-heading max-w-3xl m-auto ${cl}`}>
          <h2
            className={`${tColor} font-bold overflow-hidden font-inter mb-4`}
            style={{ fontSize:  window.innerWidth > 600 ? "clamp(20px, 20vw, 48px)" : "clamp(16px, 6vw, 32px)" }}
          >
        <TextAnimation1 animeStart={animeStart} animeEnd={animeEnd}>
            {heading ? heading : " "}
        </TextAnimation1>
          </h2>
          {pera && (
            <p className={`md:text-[14px] text-[12px] ${tColor} overflow-hidden font-normal font-inter`}>
            <TextAnimation1 animeStart={animeStart}>
                {pera ? pera : " "}
            </TextAnimation1>
              </p>
          )}
      </div>
    </div>
  );
}

export default MainHeading;
