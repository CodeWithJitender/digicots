import React from "react";

const WolfCard = ({
  step,
  heading,
  pera,
  list,
  quoat,
  bgColor,
  textColor,
  img,
  className,
  style,
  ref,
  onClick,
}) => {
  return (
    <div
      onClick={onclick}
      ref={ref}
      style={style}
      className={` ${className} px-4 py-[.8vh] h-[75vh] md:h-[70vh] rounded-2xl flex flex-col items-center bg-[#2A2A2A] text-white shadow-lg border-8 border-[#FFFFFF4D] w-full`}
    >
      {/* Image Section */}
      <div className="max-w-[150px]">
        <img src={img} alt="Wolf" className="max-w" />
      </div>

      {/* Text Content */}
      <div className="md:ml-6 mt-4 md:mt-0">
        {/* <p className="font-inter md:text-[.95vw] text-xs  text-black font-bold uppercase">
          {step}
        </p> */}
        <h3 className="font-inter md:text-[1.4vw] text-sm font-bold">
          {heading}
        </h3>
        <p className="font-inter mt-1 font-semibold md:text-[.95vw] text-xs ">
          {pera}
        </p>
        <ul className="font-inter mt-2 list-disc list-inside md:text-[.95vw] text-xs ">
          {list.map((item, index) => (
            // <li key={index}><span>{item}</span></li>
            <div key={index} className="flex gap-2">
              <i class="fas fa-circle mt-2 md:text-[8px]"></i> {item}
            </div>
          ))}
        </ul>
        <p className="mt-3 font-semibold italic md:text-[.95vw] text-xs ">{quoat}</p>
      </div>
    </div>
  );
};

export default WolfCard;
