import React, { useRef } from "react";
import HeadingWithLink from "../../components/HeadingWithLink";
import { Link } from "react-router-dom";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function Solutions() {
  const data = [
    {
      img: "content-production.png",
      title: "Content Production",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      btn: "Explore More",
    },
    {
      img: "website-development.png",
      title: "Website Development",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      btn: "Explore More",
    },
    {
      img: "content-production.png",
      title: "Content Production",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      btn: "Explore More",
    },
    {
      img: "website-development.png",
      title: "Content Production",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      btn: "Explore More",
    },
  ];

  const imgsRefs = useRef([]); // Array of refs
  const heading1Refs = useRef([]); // Array of refs
  const heading2Refs = useRef([]); // Array of refs
  const linksRefs = useRef([]); // Array of refs
  const pRefs = useRef([]); // Array of refs
  const parentRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: parentRef.current,
        start: "top 30%",
        end: "top -300%",
        scrub: 1,
      },
    });
    tl.to(
      imgsRefs.current,
      {
        scale: 1,
        stagger: 1,
      },
      "a"
    )
      .to(
        imgsRefs.current.slice(0, -1),
        {
          scale: 0,
          stagger: 1,
          delay: 0.5,
        },
        "a"
      )
      .to(
        heading1Refs.current,
        {
          transform: "translateY(-360%)",
          duration: 3.8,
          stagger: 0.3,
        },
        "a"
      )
      .to(
        heading2Refs.current,
        {
          transform: "translateY(-360%)",
          duration: 3.8,
          stagger: 0.3,
        },
        "a"
      )
      .to(
        pRefs.current,
        {
          transform: "translateY(-300%)",
          duration: 3.8,
          stagger: 0.3,
        },
        "a"
      )
      .to(
        linksRefs.current,
        {
          transform: "translateY(-300%)",
          duration: 3.8,
          stagger: 0.3,
        },
        "a"
      );
  }, []);

  console.log(heading1Refs);

  return (
    data && (
      <div className="min-h-[400vh] relative">
        <section ref={parentRef} className="min-h-screen solution sticky top-0">
          <div className="container-xl">
            <HeadingWithLink
              head="SOLUTIONS"
              per="Lorem ipsum dolor sit amet, consectetur adipiscing"
              link={"/contact"}
              linkh={"Contact Us"}
            />

            <div className="solution-content-conainer mt-5 bg-[#202020] rounded-3xl py-8 md:py-24 px-5 md:px-10">
              <div className="solution-content grid items-center grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-5 gap-x-20">
                <div className="sol-content-left h-[40vh] overflow-hidden relative">
                  {data.map((d, index) => (
                    <img
                      key={d.title}
                      ref={(el) => (imgsRefs.current[index] = el)}
                      src={d.img}
                      alt=""
                      className="w-full top-0.5 left-0.5 -translate-0.5 absolute scale-0"
                    />
                  ))}
                </div>
                <div className="sol-content-right space-y-3">
                  <div className="h-[60px] overflow-hidden">
                    {data.map((d, index) => (
                      <h3
                        key={index}
                        ref={(el) => (heading1Refs.current[index] = el)}
                        className="font-bold capitalize translate-y-[100%] text-white text-6xl mb-3 font-inter"
                      >
                        {d.title.split(" ")[0]}
                      </h3>
                    ))}
                  </div>
                  <div className="h-[60px] overflow-hidden">
                    {data.map((d, index) => (
                      <h3
                        key={index}
                        ref={(el) => (heading2Refs.current[index] = el)}
                        className="font-bold capitalize translate-y-[100%] text-white text-6xl mb-3 font-inter"
                      >
                        {d.title.split(" ")[1]}
                      </h3>
                    ))}
                  </div>
                  {/* <h5
                className="text-white mb-4 font-inter"
                style={{ fontSize: "clamp(12px, 20vw, 16px)" }}
              >
                Where big ideas meet smart strategies
              </h5> */}
                  <div className="h-[90px] overflow-hidden">
                    {data.map((d, index) => (
                      <p
                        key={index}
                        ref={(el) => (pRefs.current[index] = el)}
                        className="text-[#808080] font-normal font-inter translate-y-[100%] "
                        style={{ fontSize: "clamp(10px, 20vw, 12px)" }}
                      >
                        {d.description}
                      </p>
                    ))}
                  </div>
                  {/* <div className="sol-content-img grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-5 mt-10">
                <img src="sol-box-1.png" alt="" />
                <img src="sol-box-2.png" alt="" />
              </div> */}
                  <div className="link md:mt-20"></div>
                  <div className=" overflow-hidden w-fit h-[25px] ">
                    {data.map((d, index) => (
                      <Link
                        to={"/"}
                        key={index}
                        ref={(el) => (linksRefs.current[index] = el)}
                        className="font-semibold text-white block translate-y-[100%]"
                      >
                        {d.btn}{" "}
                        <i className="fal fa-arrow-up rotate-45 text-[#DF782B] ml-2" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  );
}

export default Solutions;
