// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import { useCallback, useEffect, useRef, useState } from "react";
// import { Link } from "react-router-dom";
// import Header from "../../components/Header";

// export default function CaseStudy({ slide, index, setSelectedIndex }) {
//   const caseStudyRef = useRef(null);
//   const pRef = useRef([]);
//   const h2Ref = useRef([]);
//   const imgRef = useRef([]);
//   const lastScrollTime = useRef(0);
//   const currentIndex = useRef(0);
//   const isAnimating = useRef(false);
//   const touchStartY = useRef(0); // For touch tracking
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   // Shared animation logic for both wheel and touch
//   const animateSlide = useCallback((direction) => {
//     const now = Date.now();
//     if (now - lastScrollTime.current < 1000 || isAnimating.current) return;

//     lastScrollTime.current = now;
//     isAnimating.current = true;

//     const itemCount = pRef.current.length;
//     let newIndex = currentIndex.current;

//     if (direction > 0 && currentIndex.current < itemCount - 1) {
//       newIndex++;
//       gsap.to([pRef.current, h2Ref.current], {
//         y: `-${newIndex * 100}%`,
//         duration: 2,
//         ease: "power4.inOut",
//         onComplete: () => {
//           currentIndex.current = newIndex;
//           isAnimating.current = false;
//         },
//       });
//       gsap.to(imgRef.current[currentIndex.current], {
//         scale: 0.5,
//         opacity: 0,
//         duration: 2,
//         ease: "power4.inOut",
//       });
//       gsap.to(imgRef.current[newIndex], {
//         scale: 1,
//         top: "0",
//         opacity: 1,
//         duration: 2,
//         ease: "power4.inOut",
//       });
//     } else if (direction < 0 && currentIndex.current > 0) {
//       newIndex--;
//       gsap.to([pRef.current, h2Ref.current], {
//         y: `-${newIndex * 100}%`,
//         duration: 2,
//         ease: "power4.inOut",
//         onComplete: () => {
//           currentIndex.current = newIndex;
//           isAnimating.current = false;
//         },
//       });
//       gsap.to(imgRef.current[newIndex], {
//         scale: 1,
//         opacity: 1,
//         duration: 2,
//         ease: "power4.inOut",
//       });
//       gsap.to(imgRef.current[currentIndex.current], {
//         scale: 0.7,
//         top: "100%",
//         opacity: 0,
//         duration: 2,
//         ease: "power4.inOut",
//       });
//     } else {
//       isAnimating.current = false;
//       return;
//     }
//   }, []);

//   // Wheel event handler for laptop
//   const handleScroll = useCallback((e) => {
//     animateSlide(e.deltaY);
//   }, [animateSlide]);

//   // Touch event handlers for phone
//   const handleTouchStart = useCallback((e) => {
//     touchStartY.current = e.touches[0].clientY;
//   }, []);

//   const handleTouchMove = useCallback((e) => {
//     const touchY = e.touches[0].clientY;
//     const deltaY = touchStartY.current - touchY; // Positive = swipe up, Negative = swipe down
//     if (Math.abs(deltaY) > 20) { // Threshold to avoid accidental triggers
//       animateSlide(deltaY); // Use deltaY directly to match wheel behavior
//       touchStartY.current = touchY; // Reset start point for continuous swiping
//     }
//   }, [animateSlide]);

//   useEffect(() => {
//     // Device detection
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     window.addEventListener("resize", handleResize);

//     // Add event listeners based on device
//     if (isMobile) {
//       window.addEventListener("touchstart", handleTouchStart, { passive: true });
//       window.addEventListener("touchmove", handleTouchMove, { passive: true });
//     } else {
//       window.addEventListener("wheel", handleScroll, { passive: true });
//     }

//     // Cleanup
//     return () => {
//       window.removeEventListener("resize", handleResize);
//       if (isMobile) {
//         window.removeEventListener("touchstart", handleTouchStart);
//         window.removeEventListener("touchmove", handleTouchMove);
//       } else {
//         window.removeEventListener("wheel", handleScroll);
//       }
//     };
//   }, [isMobile, handleScroll, handleTouchStart, handleTouchMove]);

//   return (
//     <div
//       ref={caseStudyRef}
//       className="fixed inset-0 bg-opacity-60 flex h-[100vh] z-[1000]"
//     >
//       {isMobile && (
//         <header className="fixed top-[-1px] z-[1000] w-full">
//           <div className="header-wrapper relative flex items-center justify-between px-6 py-4 bg-zinc-500/[.1] lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none">
//             <div className="logo">
//               <Link to="/">
//                 <img
//                   src="logo-white.png"
//                   className="max-w-24 md:max-w-34 lg:max-w-40"
//                   alt=""
//                 />
//               </Link>
//             </div>
//             <button
//               onClick={() => {
//                 gsap.to(caseStudyRef.current, {
//                   opacity: 0,
//                   scale: 1.2,
//                   duration: 0.5,
//                   ease: "power4.inOut",
//                   onComplete: () => {
//                     isAnimating.current = false;
//                     setSelectedIndex(-1);
//                   },
//                 });
//               }}
//               className="text-xl text-gray-600 hover:text-black cursor-pointer"
//             >
//               <img src="https://ik.imagekit.io/x5xessyka/digicots/public/cross.png" className="max-w-[40px]" alt="" />
//             </button>
//           </div>
//         </header>
//       )}
//       <div className="bg-[#EBEBEB] w-full overflow-hidden grid grid-rows-[32%_68%] grid-cols-1 md:grid-rows-1 md:grid-cols-[60%_40%] relative">
//         <div className="md:h-dvh flex flex-col justify-between md:p-6 px-6 py-2 md:row-start-1">
//           <div>
//             <div className="md:flex hidden justify-between md:mb-10">
//               <img src="logo-black.png" className="max-w-[200px]" alt="" />
//               <button
//                 onClick={() => {
//                   gsap.to(caseStudyRef.current, {
//                     opacity: 0,
//                     scale: 1.2,
//                     duration: 0.5,
//                     ease: "power4.inOut",
//                     onComplete: () => {
//                       isAnimating.current = false;
//                       setSelectedIndex(-1);
//                     },
//                   });
//                 }}
//                 className="text-xl text-gray-600 hover:text-black cursor-pointer"
//               >
//                 <img src="cross.png" className="max-w-[40px]" alt="" />
//               </button>
//             </div>

//             <div className="md:h-[5.8vw] h-[7vw] overflow-hidden md:mb-3">
//               {slide.title.map((text, i) => (
//                 <h2
//                   key={i}
//                   ref={(el) => (h2Ref.current[i] = el)}
//                   className="md:text-[4vw] md:h-[5.8vw] h-[7vw] text-[5vw] font-bold text-[#242424]"
//                 >
//                   {text}
//                 </h2>
//               ))}
//             </div>
//             <div className="md:h-[60vh] h-[51vh] overflow-hidden">
//               {slide.text.map((text, i) => (
//                 <p
//                   key={i}
//                   ref={(el) => (pRef.current[i] = el)}
//                   className="text-gray-600 text-[2.5vw] md:text-[1vw] md:h-[60vh] md:leading-[1.3vw] leading-[3vw] h-[51vh]"
//                 >
//                   {text}
//                 </p>
//               ))}
//             </div>
//           </div>
//           <div>
//             <div className="flex gap-3">
//               {slide.tags.map((text, i) => (
//                 <button
//                   key={i}
//                   className="bg-[#ED510C] text-white text-xs md:text-base px-4 py-2 rounded-[20px] font-inter font-bold"
//                 >
//                   {text}
//                 </button>
//               ))}
//             </div>
//             <div className="h-0.5 bg-[#CECECE] md:my-5 my-2"></div>
//             <div className="next flex justify-between">
//               <p className="font-medium text-sm font-inter">
//                 Another Project Name here
//               </p>
//               <div
//                 onClick={() => {
//                   gsap.to(caseStudyRef.current, {
//                     opacity: 0,
//                     scale: 1.2,
//                     duration: 0.5,
//                     ease: "power4.inOut",
//                     onComplete: () => {
//                       isAnimating.current = false;
//                       setSelectedIndex(-1);
//                       setTimeout(() => {
//                         setSelectedIndex(++index % 3);
//                       }, 100);
//                     },
//                   });
//                 }}
//                 className="flex gap-1 items-center font-medium text-sm text-[#6F6F6F] font-inter"
//               >
//                 <span>Next Project</span>
//                 <i className="fas fa-arrow-right"></i>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="relative row-start-1 overflow-hidden">
//           {slide.image.map((s, i) => (
//             <img
//               ref={(el) => (imgRef.current[i] = el)}
//               key={i}
//               src={s}
//               alt={s}
//               className={`absolute ${i !== 0 && "top-full scale-[.7] opacity-0"} w-full h-full object-cover object-center`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

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
      <div className="bg-[#EBEBEB] w-full grid grid-cols-[40%_60%] relative h-screen overflow-hidden">
        {/* Left: Content */}
        <div className="h-dvh flex flex-col justify-between p-6 overflow-y-auto">
          <div data-lenis-prevent >
            <div className="flex justify-between mb-10">
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
                  src="https://ik.imagekit.io/x5xessyka/digicots/public/cross.png"
                  className="max-w-[40px]"
                  alt="Close"
                />
              </button>
            </div>

            <h2 className="text-5xl font-bold text-[#242424] mb-6">
              {slide.title}
            </h2>

            {/* Render section blocks */}
            {slide.section?.map((group, idx) => (
              <div key={idx} className="mb-10">
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
                        className="text-lg font-semibold mb-2 text-orange-500"
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

            {/* Tags */}
            <div className="flex gap-3 flex-wrap mt-6">
              {slide.tags.map((text, index) => (
                <span
                  key={index}
                  className="bg-[#ED510C] text-white px-4 py-2 rounded-[20px] font-inter font-bold text-sm"
                >
                  {text}
                </span>
              ))}
            </div>

            {/* Footer Navigation */}
            <div className="h-0.5 bg-[#CECECE] my-5"></div>
            <div className="next flex justify-between items-center">
              <p className="font-medium text-sm font-inter">
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
                        setSelectedIndex(++index % 3);
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
        <div className="w-full h-full">
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
