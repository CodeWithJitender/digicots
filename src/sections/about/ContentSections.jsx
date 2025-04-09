import React from "react";
import { Link } from "react-router-dom";

function ContentSections() {
  const data = {
    heading: "Content Production",
    p: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    link: "/content-production",
    img: "content-production.png",
    thumbnail: "content-production.png",
    tag: [
      "Product Photography",
      "Corporate Videos",
      "eCommerce Photography ",
      "Explainer Videos",
      "Reel Production & Showreels",
      "Product Photography",
    ],
  };
  return (
    <div className="solution-box relative">
        <div className="heading-cot absolute w-full h-full flex lg:items-center justify-center text-center z-[-1]">
            <h1  className="text-stroke text-transparent max-w-[900px] text-6xl  md:text-8xl lg:text-9xl font-black uppercase mt-32 lg:mt-0">{data.heading}</h1>
        </div>
      {/* <div className="max-w-[1600px] py-28 m-auto px-10">
        <div className="solution-content grid md:grid-cols-3">
          <div className="solution-main bg-[#202020] rounded-[24px] p-8 row-start-2 md:row-start-1">
            <h2 className="font-inter font-black text-white text-6xl mb-3">
              {data.heading}
            </h2>
            <p className="font-inter text-white my-4">{data.p}</p>
            <Link to={`${data.link}`} className="text-white">
              Explore More{" "}
              <i class="far fa-arrow-right rotate-[-45deg] text-[#ED510C]"></i>
            </Link>
            <div className="flex flex-wrap gap-4 mt-4 md:hidden">
            {data.tag.map((text, index) => (
              <button className="border-2 border-[#ED510C] text-[#ED510C] px-4 py-2 rounded-[20px] font-inter font-bold">
                <Link>
                  {text}
                  <i class="far fa-arrow-right rotate-[-45deg] text-[#ED510C] ms-2"></i>
                </Link>
              </button>
            ))}
            </div>
          </div>
          <div className="solution-img flex items-center justify-center row-start-1 md:row-start-2">
            <img src={data.img} className="w-full" alt="" />
          </div>
          <div className="solution-tag bg-[#202020] rounded-[24px] p-8 hidden md:block row-start-3">
            <div className="flex flex-wrap gap-4">
            {data.tag.map((text, index) => (
              <button className="border-2 border-[#ED510C] text-[#ED510C] px-4 py-2 rounded-[20px] font-inter font-bold">
                <Link>
                  {text}
                  <i class="far fa-arrow-right rotate-[-45deg] text-[#ED510C] ms-2"></i>
                </Link>
              </button>
            ))}
            </div>
          </div>
        </div>
      </div> */}
      <div className="max-w-[1600px] py-28 m-auto px-5 md:px-10">
  <div className="solution-content grid lg:grid-cols-3 grid-rows-[auto_auto_auto] md:grid-rows-1 gap-6">
    
    {/* solution-main: on mobile it's row 2, on md+ it's col 1 */}
    <div className="solution-main bg-[#202020] rounded-[24px] p-6 lg:p-8 row-start-2 md:row-start-auto md:col-start-1">
      <h2  style={{ fontSize: "clamp(32px, 5vw, 60px)" }} className="font-inter font-black text-white  mb-3">
        {data.heading}
      </h2>
      <p className="font-inter text-white my-4">{data.p}</p>
      <Link to={data.link} className="text-white">
        Explore More{" "}
        <i className="far fa-arrow-right rotate-[-45deg] text-[#ED510C]"></i>
      </Link>
      {/* Tags for mobile only */}
      <div className="flex flex-wrap gap-4 mt-4 lg:hidden">
        {data.tag.map((text, index) => (
          <button key={index} className="border-2 border-[#ED510C] text-[#ED510C] px-4 py-2 rounded-[20px] font-inter font-bold">
            <Link>
              {text}
              <i className="far fa-arrow-right rotate-[-45deg] text-[#ED510C] ms-2"></i>
            </Link>
          </button>
        ))}
      </div>
    </div>

    {/* solution-img: on mobile it's row 1, on md+ it's col 2 */}
    <div className="solution-img flex items-center justify-center row-start-1 lg:row-start-auto lg:col-start-2">
      <img src={data.img} className="w-full max-w-[500px]" alt="" />
    </div>

    {/* solution-tag: only on md+, in col 3 */}
    <div className="solution-tag bg-[#202020] rounded-[24px] p-6 lg:p-8 hidden lg:block md:col-start-3">
      <div className="flex flex-wrap gap-4">
        {data.tag.map((text, index) => (
          <button key={index} className="border-2 border-[#ED510C] text-[#ED510C] px-4 py-2 rounded-[20px] font-inter font-bold">
            <Link>
              {text}
              <i className="far fa-arrow-right rotate-[-45deg] text-[#ED510C] ms-2"></i>
            </Link>
          </button>
        ))}
      </div>
    </div>

  </div>
</div>

    </div>
  );
}

export default ContentSections;
