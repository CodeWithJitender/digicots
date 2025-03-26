import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";

export default function CaseStudy({ slide, index, setSelectedIndex }) {
  const caseStudyRef = useRef(null);
  const pRef = useRef([]);
  const h2Ref = useRef([]);
  const imgRef = useRef([]);
  const lastScrollTime = useRef(0);
  const currentIndex = useRef(0);
  const isAnimating = useRef(false);

  const handleScroll = useCallback((e) => {
    const now = Date.now();

    // Throttle check (1 second) + animation lock
    if (now - lastScrollTime.current < 1000 || isAnimating.current) return;

    lastScrollTime.current = now;
    isAnimating.current = true;

    const deltaY = e.deltaY;
    const itemCount = pRef.current.length;
    let newIndex = currentIndex.current;

    // Determine direction and bounds
    console.log(imgRef);
    console.log(currentIndex);
    console.log(newIndex);
    if (deltaY > 0 && currentIndex.current < itemCount - 1) {
      newIndex++;
      gsap.to([pRef.current,h2Ref.current], {
        y: `-${newIndex * 100}%`, // Move to exact position
        duration: 2,
        ease: "power4.inOut",
        onComplete: () => {
          currentIndex.current = newIndex;
          isAnimating.current = false;
        },
      });
      gsap.to(imgRef.current[currentIndex.current], {
        scale: 0.5,
        opacity: 0,
        duration: 2,
        ease: "power4.inOut",
      });
      gsap.to(imgRef.current[newIndex], {
        scale: 1,
        top: "0",
        opacity: 1,
        duration: 2,
        ease: "power4.inOut",
      });
    } else if (deltaY < 0 && currentIndex.current > 0) {
      newIndex--;
      gsap.to([pRef.current,h2Ref.current], {
        y: `-${newIndex * 100}%`, // Move to exact position
        duration: 2,
        ease: "power4.inOut",
        onComplete: () => {
          currentIndex.current = newIndex;
          isAnimating.current = false;
        },
      });
      gsap.to(imgRef.current[newIndex], {
        scale: 1,
        opacity: 1,
        duration: 2,
        ease: "power4.inOut",
      });
      gsap.to(imgRef.current[currentIndex.current], {
        scale: 0.7,
        top: "100%",
        opacity: 0,
        duration: 2,
        ease: "power4.inOut",
      });
    } else {
      isAnimating.current = false;
      return; // At bounds, do nothing
    }
  }, []);

  useEffect(() => {
    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, [handleScroll]);
  const [isMobile, setisMobile] = useState(false);

  useEffect(() => {
    setisMobile(window.innerWidth < 768);
  }, [window.innerWidth]);

  window.addEventListener("resize", () => {
    setisMobile(window.innerWidth < 768);
  });

  return (
    <div
      ref={caseStudyRef}
      className="fixed inset-0  bg-opacity-60 flex h-[100vh]  z-[1000]"
    >
      {isMobile && (
        <header className="fixed top-[-1px] z-[1000] w-full ">
          {/* <div className="header-wrapper relative flex items-center justify-between bg-[#242424] lg:bg-gradient-to-r from-black via-gray-900 to-gray-800 px-6 py-4"> */}
          <div className="header-wrapper relative flex items-center justify-between px-6 py-4 bg-zinc-500/[.1] lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none ">
            <div className="logo">
              <Link to="/">
                <img
                  src="logo-white.png"
                  className="max-w-24 md:max-w-34 lg:max-w-40"
                  alt=""
                />
              </Link>
            </div>
            <button
              onClick={() => {
                gsap.to(caseStudyRef.current, {
                  // y: `-${(++index)% 3 * 100}%`,
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
              className=" text-xl text-gray-600 hover:text-black cursor-pointer"
            >
              <img src="cross.png" className="max-w-[40px]" alt="" />
            </button>
          </div>
        </header>
      )}
      <div className="bg-[#EBEBEB]  w-full  overflow-hidden grid grid-rows-2 grid-cols-1 md:grid-rows-1 md:grid-cols-[40%_60%] relative">
        <div className="md:h-dvh flex flex-col justify-between p-6 md:row-start-1">
          <div className="">
            <div className="md:flex hidden justify-between  mb-10">
              <img src="logo-black.png" className="max-w-[200px]" alt="" />
              <button
                onClick={() => {
                  gsap.to(caseStudyRef.current, {
                    // y: `-${(++index)% 3 * 100}%`,
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
                className=" text-xl text-gray-600 hover:text-black cursor-pointer"
              >
                <img src="cross.png" className="max-w-[40px]" alt="" />
              </button>
            </div>

            <div className="md:h-[15vh] h-[4.9vh]  overflow-hidden md:mb-10 mb-3">
              {slide.title.map((text, index) => (
                <h2
                key={index}
                ref={(el)=> (h2Ref.current[index] = el)}
                 className="md:text-5xl md:h-[15vh] h-[4.9vh] text-2xl font-bold text-[#242424]">
                  {text}
                </h2>
              ))}
            </div>
            <div className="md:h-[40vh] h-[23vh] overflow-hidden">
              {slide.text.map((text, index) => (
                <p
                  key={index}
                  ref={(el) => (pRef.current[index] = el)}
                  className=" text-gray-600 text-sm md:text-base md:h-[40vh] h-[30vh]"
                >
                  {text}
                </p>
              ))}
            </div>
          </div>
          <div className="">
            <div className="flex gap-3">
              {slide.tags.map((text, index) => (
                <button
                  key={index}
                  className="bg-[#ED510C] text-white px-4 py-2 rounded-[20px] font-inter font-bold"
                >
                  {text}
                </button>
              ))}
            </div>
            <div className="h-0.5 bg-[#CECECE] my-5"></div>
            <div className="next flex justify-between">
              <p className="font-medium text-sm  font-inter">
                Another Project Name here{" "}
              </p>
              {/* <Link>Next Project</Link> */}
              <div
                onClick={() => {
                  gsap.to(caseStudyRef.current, {
                    // y: `-${(++index)% 3 * 100}%`,
                    opacity: 0,
                    scale: 1.2,
                    duration: 0.5,
                    ease: "power4.inOut",
                    onComplete: () => {
                      isAnimating.current = false;
                      setSelectedIndex(-1);
                      setTimeout(() => {
                        setSelectedIndex(++index % 3);
                      }, 100);
                    },
                  });
                }}
                className="flex gap-1 items-center font-medium text-sm text-[#6F6F6F] font-inter"
              >
                <span>Next Project</span>
                <i className="fas fa-arrow-right"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="relative row-start-1 overflow-hidden">
          {slide.image.map((s, i) => (
            <img
              ref={(el) => (imgRef.current[i] = el)}
              key={i}
              src={s}
              alt={s}
              className={` absolute ${
                i != 0 && "top-full scale-[.7] opacity-0"
              }  w-full h-full object-cover object-center`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
