import gsap from "gsap";
import { useRef } from "react";
import { Link } from "react-router-dom";

export default function CaseStudy({ slide, index, onClose, setSelectedIndex }) {
  const isAnimating = useRef(false);
  const caseStudyRef = useRef(null);


  return (
    <div
      ref={caseStudyRef}
      className="fixed inset-0 bg-opacity-60 bg-black flex h-[100vh] z-[1000] overflow-y-scroll"
    >
      <div className="bg-[#EBEBEB] w-full grid md:grid-cols-[40%_60%] relative h-screen overflow-hidden">
        {/* Left: Content */}
        <div className="h-dvh flex flex-col justify-between  overflow-y-auto">
          <div data-lenis-prevent >
            <div className="flex justify-between mb-10 sticky top-0 bg-[#ebebeb] p-4">
              <img
                src="https://ik.imagekit.io/x5xessyka/digicots/public/logo-black.png"
                className="max-w-[200px]"
                alt="Logo"
              />
              <button
                onClick={onClose}
                className="text-xl text-gray-600 hover:text-black cursor-pointer"
              ></button>
              <button
                onClick={() => {
                  gsap.to(caseStudyRef.current, {
                    opacity: 0,
                    scale: 1.2,
                    duration: 0.5,
                    ease: "power4.inOut",
                    onComplete: () => {
                      isAnimating.current = false;
                      setSelectedIndex(-1);
                    },
                  });
                }}
                className="text-xl text-gray-600 hover:text-black cursor-pointer"
              >
                <img
                  src="https://ik.imagekit.io/8mbzq2hdl/digicots/close-2.png"
                  className="max-w-[40px]"
                  alt="Close"
                />
              </button>
            </div>

            <h2 className="text-5xl font-bold text-[#242424] mb-6 px-4 raleway">
              {slide.title}
            </h2>
            <div className="px-4">
            <img src={slide.image} className="md:hidden w-full mb-5 h-[400px] object-cover" alt="" />
            </div>

            {/* Render section blocks */}
            {slide.section?.map((group, idx) => (
              <div key={idx} className="mb-10 px-4 raleway">
                {group.map((item, i) => {
                  if (item.key === "title") {
                    return (
                      <h3 key={i} className="text-2xl font-bold mb-3">
                        {item.value}
                      </h3>
                    );
                  }
                  if (item.key === "subH") {
                    return (
                      <h4
                        key={i}
                        className="text-lg font-semibold mb-2 "
                      >
                        {item.value}
                      </h4>
                    );
                  }
                  if (item.key === "p") {
                    return (
                      <p key={i} className="text-gray-700 mb-3">
                        {item.value}
                      </p>
                    );
                  }
                  if (item.key === "ul") {
                    return (
                      <ul key={i} className="list-disc pl-6 text-gray-700 mb-3">
                        {item.value.map((point, j) => (
                          <li key={j}>{point}</li>
                        ))}
                      </ul>
                    );
                  }
                  return null;
                })}
              </div>
            ))}

            {/* Tags
            <div className="flex gap-3 flex-wrap mt-6 px-4">
              {slide.tags.map((text, index) => (
                <span
                  key={index}
                  className="bg-[#ED510C] text-white px-4 py-2 rounded-[20px] font-inter font-bold text-sm"
                >
                  {text}
                </span>
              ))}
            </div> */}

            {/* Footer Navigation */}
            <div className="h-0.5 bg-[#CECECE] my-5"></div>
            <div className="next flex justify-between items-center p-4 pt-0">
              <p className="font-medium text-sm font-inter opacity-0">
                Another Project Name here
              </p>
              <Link
                to={""}
                onClick={() => {
                  gsap.to(caseStudyRef.current, {
                    opacity: 0,
                    scale: 1.2,
                    duration: 0.5,
                    ease: "power4.inOut",
                    onComplete: () => {
                      isAnimating.current = false;
                      setSelectedIndex(-1);
                      setTimeout(() => {
                        setSelectedIndex(++index % 5);
                      }, 100);
                    },
                  });
                }}
                className="flex gap-1 items-center font-medium text-sm text-[#6F6F6F] font-inter"
              >
                <span>Next Project</span>
                <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>

        {/* Right: Image */}
        <div className="w-full md:h-full">
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full "
          />
        </div>
      </div>
    </div>
  );
}
