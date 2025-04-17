import React from "react";
import { Link } from "react-router-dom";
import TextAnimation1 from "../animation/text/TextAnimation1";

function BlogHeading({ heading, linkText, link }) {
  return (
    <div className="pt-10 md:py-12 px-6">
      <div className="blog-heading flex flex-col md:flex-row justify-between items-center gap-4">
        {(() => {
          const words = heading.split(" "); // Split into words
          const midIndex = Math.ceil(words.length / 2); // Find the middle word index
          const part1 = words.slice(0, midIndex).join(" "); // First half
          const part2 = words.slice(midIndex).join(" "); // Second half

          return (
            <>
              <div className="flex flex-col">
                <h3 className="font-bold md:h-[3vw] h-[8vw] overflow-hidden text-[5vw] text-center md:text-start md:text-[2vw] text-white max-w-80 flex flex-wrap">
                  <div className="w-full md:w-auto">
                    <TextAnimation1 animeStart="60">{part1}</TextAnimation1>
                  </div>
                </h3>
                <h3 className="font-bold md:h-[3vw] h-[8vw] overflow-hidden text-[5vw] text-center md:text-start md:text-[2vw] text-white max-w-80 flex flex-wrap">
                  <div className="w-full md:w-auto">
                    <TextAnimation1 animeStart="68">{part2}</TextAnimation1>
                  </div>
                </h3>
              </div>
            </>
          );
        })()}

        {/* <Link
          to=""
          className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold flex items-center"
        >
          {linkText} <i className="far fa-arrow-right rotate-[-45deg] ms-3"></i>
        </Link> */}
      </div>
    </div>
  );
}

export default BlogHeading;
