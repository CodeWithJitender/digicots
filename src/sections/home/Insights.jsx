import React, { useRef } from "react";
import MainHeading from "../../components/MainHeading";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

function Insights() {
  const blackBoxRef = useRef(null);
  const blackBoxTextRef = useRef(null);
  const parentRef = useRef(null);
  const boxsRefs = useRef([]);

  gsap.registerPlugin(ScrollTrigger);
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: parentRef.current,
        start: "top -10%",
        end: "top -90%",
        scrub: 1,
      },
    });

    tl.from(blackBoxRef.current, {
      scale: 6.7,
      left: "210%",
    }).from(blackBoxTextRef.current, {
      opacity: 0,
    })
    .from(boxsRefs.current, {
      opacity: 0,
      stagger: 0.2,
      scale:0,
      left:"-80%",
    })
  }, []);

  // console.log(blackBoxTextRef);

  return (
    <div className="h-[200vh] relative ">
      <section ref={parentRef} className="insights sticky top-0 overflow-hidden">
        <div className="container-xxl">
          <MainHeading
            heading={"INSIGHTS"}
            pera={
              "We specialize in personalized and conversational marketing, crafting tailored experiences for every business."
            }
            cl={"text-center"}
            tColor={"text-black"}
          />
          <div className="insights-container mt-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-5">
            {/* Box 1 */}
            <div
              ref={blackBoxRef}
              className="insights-box relative bg-black p-5 rounded-3xl"
            >
              <div ref={blackBoxTextRef} className="">
                <h1 className="font-bold font-inter text-white">29%</h1>
                <h4 className="font-bold font-inter text-white text-2xl">
                  Lorem Ipsum
                </h4>
                <p className="font-inter text-white text-sm mt-3">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>

            {/* Box 2 */}
            <div 
             ref={(el) => (boxsRefs.current[0] = el)}
            className="insights-box relative bg-[#93E9FF] p-5 rounded-3xl flex flex-col md:flex-col lg:flex-row pr-0 md:col-span-1 lg:col-span-3">
              <div className="flex flex-col justify-between pr-2">
                <h1 className="font-bold font-inter">512+</h1>
                <h4 className="font-bold font-inter text-2xl">Lorem Ipsum</h4>
                <p className="font-inter text-sm mt-3">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
              <img
                src="insights-img.png"
                className="w-full max-w-sm md:max-w-md lg:max-w-xs"
                alt=""
              />
            </div>

            {/* Box 3 */}
            <div
             ref={(el) => (boxsRefs.current[1] = el)}
             className="insights-box relative bg-[#63D863] p-5 rounded-3xl flex flex-col justify-between">
              <h1 className="font-bold font-inter">196K</h1>
              <h4 className="font-bold font-inter text-2xl">Lorem Ipsum</h4>
              <p className="font-inter text-sm mt-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>

            {/* Box 4 */}
            <div
             ref={(el) => (boxsRefs.current[2] = el)}
             className="insights-box relative bg-[#61A0FF] p-5 rounded-3xl flex flex-col md:flex-col lg:flex-row items-center gap-5 md:col-span-1 lg:col-span-3">
              <h1 className="font-bold font-inter">91.6M</h1>
              <h4 className="font-bold font-inter text-2xl">Lorem Ipsum</h4>
              <p className="font-inter text-sm mt-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>

            {/* Box 5 */}
            <div
             ref={(el) => (boxsRefs.current[3] = el)}
             className="insights-box relative bg-[#FF6969] p-5 rounded-3xl sm:col-span-2 flex flex-col items-center gap-5">
              <img
                src="insights-img-2.png"
                alt=""
                className="w-full max-w-sm md:max-w-md lg:max-w-xs"
                />
              <h4 className="font-bold font-inter text-2xl">Lorem Ipsum</h4>
              <p className="font-inter text-sm mt-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>

            {/* CTA Link */}
            <div className="col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-4 text-center">
              <Link
                to={"/"}
                className="font-semibold flex items-center justify-center"
              >
                Keep them coming{" "}
                <i className="fal fa-arrow-up rotate-45 text-[#DF782B] ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Insights;
