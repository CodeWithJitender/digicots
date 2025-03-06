import { Link } from "react-router-dom";

export default function CaseStudy({ slide, onClose }) {
  return (
    <div className="fixed inset-0  bg-opacity-60 flex h-[100vh]  z-[1000]">
      <div className="bg-[#EBEBEB]  w-full  overflow-hidden grid grid-cols-[40%_60%] relative">
        <div className="h-dvh flex flex-col justify-between p-6">
        <div className="">
            <div className="flex justify-between  mb-10">
            <img src="logo-black.png" className="max-w-[200px]" alt="" />
            <button
              onClick={onClose}
              className=" text-xl text-gray-600 hover:text-black cursor-pointer"
            >
              <img src="cross.png" className="max-w-[40px]" alt="" />
            </button>
          </div>
              <h2 className="text-5xl font-bold text-[#242424] mb-10">
                {slide.title}
              </h2>
              {slide.text.map((text, index) => (
                <p className=" text-gray-600 mb-3">{text}</p>
              ))}
            </div>
            <div className="">
            <div className="flex gap-3">
            {slide.tags.map((text, index) => (
                <button className="bg-[#ED510C] text-white px-4 py-2 rounded-[20px] font-inter font-bold">{text}</button>
              ))}
            </div>
            <div className="h-0.5 bg-[#CECECE] my-5"></div>
            <div className="next flex justify-between">
                <p className="font-medium text-sm  font-inter">Another Project Name here </p>
                {/* <Link>Next Project</Link> */}
                <Link to={''} className="flex gap-1 items-center font-medium text-sm text-[#6F6F6F] font-inter">
                <span>Next Project</span>
                <i class="fas fa-arrow-right"></i>
                </Link>
            </div>
            </div>
        </div>
        <div className="">
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
