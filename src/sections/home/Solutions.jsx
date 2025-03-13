import React, { useRef } from "react";
import HeadingWithLink from "../../components/HeadingWithLink";
import { Link } from "react-router-dom";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import TextAnimation1 from "../../animation/text/TextAnimation1";
import TextAnimation2 from "../../animation/text/TextAnimation2";

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

  const heading1Refs = useRef([]); // Array of refs
  const imgsRefs = useRef([]); // Array of refs
  const blackBoxRef = useRef(null);
  const parentRef = useRef(null);
  const contentRef = useRef([]);
  gsap.registerPlugin(ScrollTrigger);
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: parentRef.current,
        start: "top 70%",
        end: "top -300%",
        scrub: 1,
      },
      ease: "power4.inOut",
    });

   if(window.innerWidth>600){
    console.log("laptop")
    tl.from(blackBoxRef.current, {
      left: "110%",
      opacity: 0,
      duration: 3,
      ease: "linear",
    })
      .to(
        contentRef.current,
        {
          translateX: "-320%",
          duration: 10,
          // ease:"linear",
        },
        "a"
      )
      .from(
        ".sol-content-left img",
        {
          duration: 0.8,
          scale: 0,
          delay: .9,
          ease: "back.out(4)",
          stagger: 1.7,
        },
        "a"
      )
      
   }else{
    tl.from(blackBoxRef.current, {
      left: "110%",
      opacity: 0,
      duration: 3,
      ease: "power4.inOut",
    })
      .to(
        contentRef.current,
        {
          translateY: "-355%",
          duration: 10,
          // ease:"linear",
        },
        "a"
      )
      .from(
        ".sol-content-left img",
        {
          duration: 0.8,
          scale: 0,
          delay:1,
          ease: "back.out(4)",
          stagger: 1.7,
        },
        "a"
      );
   }
  }, [blackBoxRef.current, parentRef.current, contentRef.current,window.innerWidth]);


  return (
    data && (
      <div className="min-h-[400vh] relative">
        <section
          ref={parentRef}
          className="h-screen solution sticky top-0 overflow-hidden"
        >
          <div className="container-xl">
            <HeadingWithLink
              head="SOLUTIONS"
              per="Lorem ipsum dolor sit amet, consectetur adipiscing"
              link={"/contact"}
              linkh={"Contact Us"}
            />

            <div
              ref={blackBoxRef}
              className="solution-content-container opacity-100 overflow-hidden relative mt-5 bg-[#202020] rounded-3xl py-8 md:py-24 px-5 md:px-10 flex gap-20 flex-col md:flex-row"
            >
              {data.map((d, index) => (
                <div
                  ref={(el) => (contentRef.current[index] = el)}
                  key={index}
                  className="solution-content min-w-[70vw] md:translate-x-[150%] md:translate-y-0 translate-y-[150%] relative z-[10] h-full flex items-center md:justify-between xl:justify-center xl:gap-[5vw] flex-col md:flex-row "
                >
                  <div className="sol-content-left lg:h-[35vh] xl:h-[20vh] relative">
                    <img key={d.title} src={d.img} alt="" className=" h-full object-contain" />
                  </div>
                  <div className="sol-content-right md:w-[500px] h-[80%] md:space-y-3">
                    <div className="">
                      <h3
                        key={index}
                        className="font-bold overflow-hidden w-fit capitalize text-white md:text-6xl text-2xl md:mb-3 font-inter"
                      >
                        <TextAnimation1 animeStart={window.innerWidth > 600 ? -15 * (index * 3.4) : 4 * ((index !=0 ? index + 25 : 7))}>
                          {d.title.split(" ")[0]}
                        </TextAnimation1>
                      </h3>
                    </div>
                    <div className="">
                      <h3
                        key={index}
                        className="font-bold capitalize overflow-hidden w-fit text-white md:text-6xl text-2xl md:mb-3 font-inter"
                      >
                        <TextAnimation1 animeStart={window.innerWidth > 600 ? -15 * (index * 3.4) : 4 * ((index !=0 ? index + 25 : 7))}>
                          {d.title.split(" ")[1]}
                        </TextAnimation1>
                      </h3>
                    </div>
                    {/* <h5
                  className="text-white mb-4 font-inter"
                  style={{ fontSize: "clamp(12px, 20vw, 16px)" }}
                  >
                  Where big ideas meet smart strategies
                  </h5> */}
                    <div className="">
                      <p
                        key={index}
                        className="text-[#808080] font-normal font-inter"
                        style={{ fontSize: "clamp(10px, 20vw, 12px)" }}
                      >
                        <TextAnimation2 animeStart={-14.8 * (index * 3.4)} duration={.6}>
                          {d.description}
                        </TextAnimation2>
                      </p>
                    </div>
                    {/* <div className="sol-content-img grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-5 mt-10">
                  <img src="sol-box-1.png" alt="" />
                  <img src="sol-box-2.png" alt="" />
                </div> */}
                    <div className="link md:mt-20"></div>
                    <div className=" overflow-hidden w-fit ">
                      <Link
                        to={"/"}
                        key={index}
                        className="font-semibold text-white block"
                      >
                        {d.btn}{" "}
                        <i className="fal fa-arrow-up rotate-45 text-[#DF782B] ml-2" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    )
  );
}

export default Solutions;
