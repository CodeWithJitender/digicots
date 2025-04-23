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
      className={` ${className} px-4 py-12 h-[85vh] md:h-[70vh] rounded-xl shadow-lg flex flex-col items-center ${bgColor} ${textColor} w-full`}
    >
      {/* Image Section */}
      <div className="max-w-[200px]">
        <img src={img} alt="Wolf" className="max-w" />
      </div>

      {/* Text Content */}
      <div className="md:ml-6 mt-4 md:mt-0">
        <p className="font-inter text-sm text-black font-bold uppercase">
          {step}
        </p>
        <h3 className="font-inter text-2xl font-bold">
          {heading.split("(")[0]}
          <br />
          {"(" + heading.split("(")[1]}
        </h3>
        <p className="font-inter mt-1 font-semibold text-sm">{pera}</p>
        <ul className="font-inter mt-2 list-disc list-inside text-sm">
        {list.map((item, index) => (
                          // <li key={index}><span>{item}</span></li>
                          <div key={index} className="flex gap-2"><i class="fas fa-circle mt-2 text-[8px]"></i> {item}</div>
                        ))}
        </ul>
        <p className="mt-3 font-semibold italic">{quoat}</p>
      </div>
    </div>
  );
};

export default WolfCard;
