import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import DiscoverItem from "./DiscoverItem";
import { useState } from "react";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import TextHoverAnimation from "../animation/text/TextHoverAnimation";
function Header({ location }) {
  const data = [
    {
      title: "Content Production",
      pera: "The art of storytelling by transforming ideas into captivating visual narratives that engage...",
      icon: "https://digicots.com/images/service/content-production.png",
      id: "content-production",
    },
    {
      title: "Outreach Solutions",
      pera: "In today's super crowded market, old-school ads just don't cut it anymore. Really connecting with...",
      icon: "https://digicots.com/images/service/outreach-solutions.png",
      id: "outreach-solutions",
    },
    {
      title: "Public Relations",
      pera: "This is the art of shaping and maintaining a brand’s reputation – its most valuable asset...",
      icon: "https://digicots.com/images/service/public-relations.png",
      id: "public-relations",
    },
    {
      title: "Digital Marketing",
      pera: "We do way more than just post on social media. We build real strategies with data behind...",
      icon: "https://digicots.com/images/service/digital-marketing.png",
      id: "digital-marketing",
    },
    {
      title: "Performance Marketing",
      pera: "We're all about getting you the best returns on your advertising budget. We do this by creating...",
      icon: "https://digicots.com/images/service/performance-marketing.png",
      id: "performance-marketing",
    },
    {
      title: "Creative Designing",
      pera: "Turn concepts into striking visual assets – digital or print. Design is way more than just aesthetics...",
      icon: "https://digicots.com/images/service/creative-designing.png",
      id: "creative-designing",
    },
    {
      title: "Branding",
      pera: "We're all about getting you the best returns on your advertising budget. We do this by creating...",
      icon: "https://digicots.com/images/service/branding.png",
      id: "branding",
    },
    {
      title: "Outdoor Advertising",
      pera: "Regardless of the ever-changing digital landscape, outdoor advertising remains an unparalleled...",
      icon: "https://digicots.com/images/service/outdoor-advertising.png",
      id: "outdoor-advertising",
    },
    {
      title: "Website Development",
      pera: "Think of a website like your brand's online home. It's not just a place on the internet, it's how people...",
      icon: "https://digicots.com/images/service/website-development.png",
      id: "website-development",
    },
    {
      title: "Artificial Reality (AR)",
      pera: "The future of marketing is immersive. AR brings products to life – allowing consumers to virtually...",
      icon: "https://digicots.com/images/service/artificial-reality.png",
      id: "artificial-reality",
    },
  ];
  const [toggle, setToggle] = useState(false);
  const [subMenu, setSubMenu] = useState(false);

  const headerRef = useRef(null);
  const linksRef = useRef([]);
  const upperLine = useRef(null);
  const lowerLine = useRef(null);

  const menuRef = useRef(null);
  const navRef = useRef(null);
  const mainMenuRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);
  useGSAP(() => {
    console.log(toggle);
    if (toggle) {
      const tl = gsap.timeline();
      tl.to(
        menuRef.current,
        {
          top: "69px",
          display: "initial",
          opacity: 1,
          duration: 1,
          ease: "power3.inOut",
        },
        "a"
      )
        .to(mainMenuRef.current, {
          top: "0%",
          opacity: 1,
        })
        .to(
          upperLine.current,
          {
            rotate: "45deg",
            y: 2,
          },
          "a"
        )
        .to(
          lowerLine.current,
          {
            rotate: "-45deg",
            y: -2,
          },
          "a"
        )
        .to(navRef.current, {
          // height: "100vh",
        });
    } else {
      setSubMenu(false);
      const tl = gsap.timeline();
      tl.to(
        mainMenuRef.current,
        {
          top: "100%",
          opacity: 0,
        },
        "a"
      )
        .to(menuRef.current, {
          top: "-100%",
          display: "none",
          opacity: 0,
          duration: 1,
          ease: "power3.inOut",
        })
        .to(
          [upperLine.current, lowerLine.current],
          {
            rotate: "0deg",
            y: 0,
          },
          "a"
        );
    }
  }, [menuRef.current, toggle, upperLine.current, lowerLine.current]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const deltaY = currentScrollY - lastScrollY;

          if (deltaY > 0) {
            // Scroll Down
            gsap.to([headerRef.current], {
              y: "-200%",
              duration: 0.4,
              ease: "power2.out",
            });
          } else if (deltaY < 0) {
            // Scroll Up
            gsap.to([headerRef.current], {
              y: "0%",
              duration: 0.4,
              ease: "power2.out",
            });
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });
      }
    };

    if (window.innerWidth > 600) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (window.innerWidth > 600) {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [headerRef.current]);

  const [deskToggle, setDeskToggle] = useState(false);
  const navigate = useNavigate();


  useGSAP(() => {
    if (deskToggle) {
      const tl = gsap.timeline();
      tl.set(".desktop-header", {
        display: "flex",
      });
      tl.from(
        ".desktop-header",
        {
          // top: "100%",
          scale: 1.2,
          opacity: 0,
          filter: "blur(10px)",
          duration: 0.5,
          ease: "power1.inOut",
        },
        "a"
      )
        .from(".left-links", {
          x: -100,
          opacity: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power1.inOut",
        })
        .from(".discover-grid", {
          // top: "100%",
          scale: 0.9,
          opacity: 0,
          filter: "blur(10px)",
          duration: 1,
          ease: "power1.inOut",
          onComplete(){
            // navigate();
          }
        });
      console.log("opened");
    } else {
      const tl = gsap.timeline();
      tl.to(
        ".left-links",
        {
          x: -100,
          opacity: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power1.inOut",
        },
        "b"
      )
        .to(
          ".discover-grid",
          {
            // top: "100%",
            scale: 0.9,
            opacity: 0,
            filter: "blur(10px)",
            duration: 1,
            ease: "power1.inOut",
          },
          "b"
        )
        .to(
          ".desktop-header",
          {
            // top: "100%",
            scale: 1.2,
            opacity: 0,
            filter: "blur(10px)",
            duration: 0.5,
            ease: "power1.inOut",
          },
          "a"
        )
        .set(".desktop-header", {
          display: "none",
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          // duration: .5,
          // ease: "power1.inOut",
        })
        .set(".discover-grid", {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          // duration: 1,
          // ease: "power1.inOut",
        })
        .set(".left-links", {
          x: 0,
          opacity: 1,
        });

      console.log("closed");
    }
  }, [deskToggle]);

  return (
    <>
      <header ref={headerRef} className="fixed top-[-1px] z-[1000] w-full ">
        {/* <div className="header-wrapper relative flex items-center justify-between bg-[#242424] lg:bg-gradient-to-r from-black via-gray-900 to-gray-800 px-6 py-4"> */}

        <div className="header-wrapper relative flex items-center justify-between px-6 py-4 bg-zinc-900 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none ">
          <div className="logo">
            <Link onClick={() => setToggle(false)} to="/">
              <img
                src={
                  ["/case-study"].includes(location.pathname) &&
                  window.innerWidth > 600
                    ? "https://digicots.com/images/logo-black.png"
                    : "https://digicots.com/images/logo-white.png"
                }
                className="max-w-36 md:max-w-40 lg:max-w-52"
                alt=""
              />
            </Link>
          </div>

          <div className="side-btn cursor-pointer">
            <div
              className="toggler block lg:hidden bg-white p-3 py-4 rounded-[50px]"
              onClick={() => setToggle((togg) => !togg)}
            >
              <span
                ref={upperLine}
                className="w-8 bg-black h-0.5 block rounded-3xl"
              ></span>
              <span
                ref={lowerLine}
                className="w-8 bg-black h-0.5 block rounded-3xl mt-1"
              ></span>
              {/* <span className="w-8 bg-black h-0.5 block rounded-3xl mt-1"></span> */}
            </div>
            <div className=" flex gap-4">
              <Link
                className="font-bold rounded-[50px] relative   w-30 items-center justify-center overflow-hidden bg-[#ED510C] text-white shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-black before:duration-500 before:ease-out  hover:before:h-56 hover:before:w-56 hidden lg:flex px-5 py-2 raleway"
                to="/contact"
              >
                <span class="relative z-10">Let's Talk</span>
              </Link>

              <div
                className="desk-menu-btn font-bold rounded-[50px] relative   w-30 items-center justify-center overflow-hidden bg-white text-black shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-[#ED510C] before:duration-500 before:ease-out  hover:before:h-56 hover:before:w-56 hover:text-white hidden lg:flex px-5 py-2 cursor-pointer raleway"
                onClick={() => setDeskToggle((prev) => !prev)}
              >
                <div className="relative z-10">
                  <span> Menu</span> <i class="far fa-bars"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div
        ref={menuRef}
        data-lenis-prevent
        className={`mobile-menu bg-zinc-900  backdrop-blur-sm overflow-hidden fixed opacity-0 top-[-100%] z-[1000]  w-full left-0 h-[100vh] lg:hidden `}
      >
        <div className="relative h-[calc(100%-71px)] pb-5 ">
          <div
            ref={mainMenuRef}
            className={`main-menu h-[100%] top-[100%] z-[1000] opacity-0 relative transition-[.5s] flex flex-col justify-between px-6  ${
              subMenu ? "start-[-100%]" : "start-[0%]"
            }`}
          >
            <ul>
              <li>
                <Link
                  onClick={() => setToggle((togg) => !togg)}
                  to="/things-we-do"
                  className="flex justify-between hover:text-[#ED510C] transition-[.5s] py-4 font-bold text-white text-2xl font-inter"
                >
                  <div className="link-t"> Things We Do </div>
                  <i className="fal fa-arrow-up rotate-45 text-white ml-3"></i>
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => setToggle((togg) => !togg)}
                  to="/about"
                  className="flex justify-between hover:text-[#ED510C] transition-[.5s] py-4 font-bold text-white text-2xl font-inter"
                >
                  <div className="link-t"> About Us </div>
                  <i className="fal fa-arrow-up rotate-45 text-white ml-3"></i>
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => setToggle((togg) => !togg)}
                  to="/case-study"
                  className="flex justify-between hover:text-[#ED510C] transition-[.5s] py-4 font-bold text-white text-2xl font-inter"
                >
                  <div className="link-t"> Case Studies</div>
                  <i className="fal fa-arrow-up rotate-45 text-white ml-3"></i>
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => setToggle((togg) => !togg)}
                  to="/insights"
                  className="flex justify-between hover:text-[#ED510C] transition-[.5s] py-4 font-bold text-white text-2xl font-inter"
                >
                  <div className="link-t"> Insight </div>
                  <i className="fal fa-arrow-up rotate-45 text-white ml-3"></i>
                </Link>
              </li>
              
              <li>
                <Link
                  className="flex justify-between hover:text-[#ED510C] transition-[.5s] py-4 font-bold text-white text-2xl font-inter"
                  onClick={() => setSubMenu((togg) => !togg)}
                >
                  <div className="link-t">
                    {" "}
                    Discover <span className="text-[#525252]">
                      Solutions
                    </span>{" "}
                  </div>
                  {/* <i className="fal fa-arrow-up rotate-45 text-white ml-3"></i> */}
                  <i className="fal fa-chevron-right text-white ml-3"></i>
                </Link>
              </li>
              
            </ul>
            <div className="contact-btn">
              <Link
                onClick={() => setToggle((togg) => !togg)}
                className="bg-[#ED510C] block text-center rounded-[8px] font-bold text-white text-[14px] font-inter p-3  lg:p-5"
                to="/contact"
              >
                Let's Talk
              </Link>
            </div>
          </div>
          <div
            className={`sub-menu transition-[.5s] px-6 absolute top-0 w-full bg-[#0b0b0c] ${
              subMenu ? "start-[0%]" : "start-[100%]"
            }`}
          >
            <div
              className="back font-bold flex gap-2 justify-start text-[18px] items-center py-3 cursor-pointer"
              onClick={() => setSubMenu((togg) => !togg)}
            >
              <span className="text-white">Home</span>
              <span>
                <i className="fal fa-arrow-right  w-2 text-center text-[16px] translate-x-[-50%] text-white ml-3"></i>
              </span>
              <span className="text-[#ED510C]">Discover</span>
            </div>
            <div className="sub-menu-wrapper w-full">
              {data.map((item, index) => (
                <DiscoverItem
                  title={item.title}
                  pera={item.pera}
                  icon={item.icon}
                  key={index}
                  link={`/discover?i=${index}`}
                  onClick={() => {
                    setSubMenu((togg) => !togg);
                    setToggle((togg) => !togg);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        data-lenis-prevent
        className={`desktop-header fixed top-0 bg-black z-[1000] h-[100vh] w-full flex overflow-hidden ${"hidden"}`}
      >
        <div className="header-left w-[30%] bg-[#ED510C] h-screen p-8 flex flex-col justify-between">
          <div className="">
            <div className="logo">
              <Link onClick={() =>{ setDeskToggle(false, navigate("/")) }}>
                <img
                  src="https://digicots.com/images/logo.png"
                  className="w-full max-w-36 md:max-w-40 lg:max-w-52"
                  alt=""
                />
              </Link>
            </div>
            <ul className="mt-5 flex flex-col gap-4">
              <li>
                <Link
                  onClick={() =>{ setDeskToggle(false) }}
                  to={"/things-we-do"}
                  className="font-inter left-links inline-block text-3xl font-bold text-white"
                >
                  <TextHoverAnimation
                    className={"h-[32px] w-full leading-none overflow-hidden"}
                  >
                    Things We Do
                  </TextHoverAnimation>
                </Link>
              </li>
              <li>
                <Link
                  onClick={() =>{ setDeskToggle(false) }}
                  to={"/about"}
                  className="font-inter left-links inline-block text-3xl font-bold text-white"
                >
                  <TextHoverAnimation
                    className={"h-[32px] w-full leading-none overflow-hidden"}
                  >
                    About Us
                  </TextHoverAnimation>
                </Link>
              </li>
              <li>
                <Link
                  onClick={() =>{ setDeskToggle(false) }}
                  to={"/case-study"}
                  className="font-inter left-links inline-block text-3xl font-bold text-white"
                >
                  <TextHoverAnimation
                    className={"h-[32px] w-full leading-none overflow-hidden"}
                  >
                    Case Studies
                  </TextHoverAnimation>
                </Link>
              </li>
              <li>
                <Link
                  onClick={() =>{ setDeskToggle(false) }}
                  to={"/insights"}
                  className="font-inter left-links inline-block text-3xl font-bold text-white"
                >
                  <TextHoverAnimation
                    className={"h-[32px] w-full leading-none overflow-hidden"}
                  >
                    Insights
                  </TextHoverAnimation>
                </Link>
              </li>
            </ul>
          </div>
          <div className="">
            <p className="font-inter left-links inline-block text-2xl font-bold text-white">
              Got an Idea?
            </p>
            <div className="mb-5">
              <Link
                to={"/contact"}
                onClick={() =>{ setDeskToggle(false) }}
                className="font-inter left-links inline-block text-3xl font-bold"
              >
                <span className="text-[#242424]">Let’s Get in Touch</span>{" "}
                <i class="far fa-arrow-right rotate-[-45deg] text-white"></i>
              </Link>
            </div>
            <p className="text-white font-inter left-links">
              A <b> Headfield Venture </b>| Want to know more about Headfield{" "}
            </p>
          </div>
        </div>
        <div className="header-right w-[70%] h-screen bg-[#141414] py-10 px-20">
          <div className="relative flex justify-end">
            <div
              className="desk-menu-btn cursor-pointer font-bold rounded-[50px] relative   w-30 items-center justify-center overflow-hidden bg-white text-black shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-[#ED510C] before:duration-500 before:ease-out  hover:before:h-56 hover:before:w-56 hidden lg:flex px-5 py-2 gap-2 raleway"
              onClick={() => setDeskToggle(false)}
            >
              <div className="relative z-10">
                <span>Close</span>{" "}
                <span>
                  <i class="far fa-times"></i>
                </span>
              </div>
            </div>
          </div>
          <Link
            onClick={() => setDeskToggle(false)}
            to={"/discover"}
            className="font-inter text-3xl font-bold left-links text-white"
          >
            Discover <i className="fal fa-arrow-up rotate-45  ml-2"/>
          </Link>
          <div
            className="rounded-3xl  w-full h-full overflow-y-auto"
            data-lenis-prevent
          >
            <div className="discover-grid grid xl:grid-cols-2 pe-6 py-3 pb-8">
              {data.map((item, index) => (
                <DiscoverItem
                  onClick={() => setDeskToggle(false)}
                  title={item.title}
                  pera={item.pera}
                  icon={item.icon}
                  key={index}
                  link={`/discover?i=${index}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
