import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import DiscoverItem from "./DiscoverItem";
import { useState } from "react";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
function Header() {
  const data = [
    {
      title: "Website Development",
      pera: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      icon: "icon-1.png",
    },
    {
      title: "Artificial Reality (AR)",
      pera: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      icon: "icon-2.png",
    },
    {
      title: "Outdoor Advertising",
      pera: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      icon: "icon-3.png",
    },
    {
      title: "Public Relations",
      pera: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      icon: "icon-4.png",
    },
    {
      title: "Performance Marketing",
      pera: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      icon: "icon-5.png",
    },
    {
      title: "Digital Marketing",
      pera: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      icon: "icon-6.png",
    },
    {
      title: "Creative Designing",
      pera: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      icon: "icon-7.png",
    },
    {
      title: "Outreach Solutions",
      pera: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      icon: "icon-8.png",
    },
    {
      title: "Content Production",
      pera: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      icon: "icon-9.png",
    },
    {
      title: "Performance Marketing",
      pera: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      icon: "icon-5.png",
    },
  ];
  const [toggle, setToggle] = useState(false);
  const [subMenu, setSubMenu] = useState(false);

  const logoRef = useRef(null);
  const linksRef = useRef([]);
  const letsTalkRef = useRef(null);
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
          top: "71px",
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
        .from([liRefs.current, ".contact-btn"], {
          opacity: 0,
          y: 20,
          stagger: 0.4,
          duration: 0.6,
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
    } else {
      setSubMenu(false)
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
            gsap.to([logoRef.current, letsTalkRef.current], {
              y: "-200%",
              duration: 0.4,
              ease: "power2.out",
            });
          } else if (deltaY < 0) {
            // Scroll Up
            gsap.to([logoRef.current, letsTalkRef.current], {
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

    const mediaQuery = window.matchMedia("(min-width: 601px)");

    const handleMediaQueryChange = (event) => {
      if (event.matches) {
        window.addEventListener("scroll", handleScroll);
      } else {
        window.removeEventListener("scroll", handleScroll);
      }
    };

    handleMediaQueryChange(mediaQuery); // Initial check
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, [logoRef, letsTalkRef]);

  const liRefs = useRef([]); // Array to store refs for each li

  const menuItems = [
    { name: "Work", link: "/our-work" },
    { name: "Insight", link: "/insights" },
    { name: "About Us", link: "/about" },
    { name: "Discover Solutions", link: "#", isDropdown: true },
    { name: "Case Studies", link: "/case-study" },
  ];

  const itemRefs = useRef([]); // Array to store refs

  useGSAP(() => {
    if (subMenu) {
      const tl = gsap.timeline();

      // Ensure itemRefs.current has valid elements before animation
      if (itemRefs.current.length > 0) {
        tl.from(
          itemRefs.current.filter((el) => el), // Filter out any null values
          {
            opacity: 0,
            // duration: 0.8,
            y: 50, // Add slight movement
            ease: "power3.inOut",
            // stagger: 0.2, // Stagger animation
          },
          "a"
        );
      }
    }
  }, [subMenu]);

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const timeoutRef = useRef(null); // Delay ke liye ref use karenge

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current); // Pehle se koi timeout hai toh usko hata do
    setIsDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDropdownVisible(false);
    }, 500); // 200ms ka delay, taki dropdown instantly na hide ho
  };

  useGSAP(()=>{
    if(isDropdownVisible){
      gsap.from(".dropdown",{
        opacity:1,
        pointerEvents:"all",
        duration:.5,
        y:20
      })
    }
  },[isDropdownVisible])

  return (
    <header className="fixed top-[-1px] z-[1000] w-full ">
      {/* <div className="header-wrapper relative flex items-center justify-between bg-[#242424] lg:bg-gradient-to-r from-black via-gray-900 to-gray-800 px-6 py-4"> */}
      <div className="header-wrapper relative flex items-center justify-between px-6 py-4 bg-zinc-500/[.1] lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none ">
        <div ref={logoRef} className="logo">
          <Link to="/">
            <img
              src="logo-white.png"
              className="max-w-24 md:max-w-34 lg:max-w-40"
              alt=""
            />
          </Link>
        </div>
        <div className="menu hidden border border-zinc-200/[.5] absolute left-1/2 top-1/2 -translate-[50%] lg:block bg-zinc-500/[.1] backdrop-blur-sm  px-10 py-4 rounded-full flex items-center ">
          <ul className="list-none m-0 p-0 mt-1 flex items-center gap-10">
            <li
              ref={(el) => (linksRef.current[0] = el)}
              className="relative text-white hover:text-[#DF782B] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[4px] after:rounded-2xl after:bg-[#DF782B] after:transition-all after:opacity-0 after:duration-300 hover:after:opacity-100 pb-2.5"
            >
              <Link
                to="/our-work"
                className="font-bold text-white text-[14px] font-inter "
              >
                {" "}
                Work
              </Link>
            </li>
            <li
              ref={(el) => (linksRef.current[1] = el)}
              className="relative text-white hover:text-[#DF782B] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[4px] after:rounded-2xl after:bg-[#DF782B] after:transition-all after:opacity-0 after:duration-300 hover:after:opacity-100 pb-2.5"
            >
              <Link
                to="/insights"
                className="font-bold text-white text-[14px] font-inter "
              >
                Insights
              </Link>
            </li>
            <li
              ref={(el) => (linksRef.current[2] = el)}
              className="relative text-white hover:text-[#DF782B] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[4px] after:rounded-2xl after:bg-[#DF782B] after:transition-all after:opacity-0 after:duration-300 hover:after:opacity-100 pb-2.5"
            >
              <Link
                to="/about"
                className="font-bold text-white text-[14px] font-inter "
              >
                About Us
              </Link>
            </li>
            <li
              ref={(el) => (linksRef.current[3] = el)}
              className="discover-link pb-2.5 "
              onMouseEnter={handleMouseEnter} // Dropdown pe mouse aaye toh hide mat karo
          onMouseLeave={handleMouseLeave} // Dropdown se bahar jaane pe hide karo
            >
              <Link
                to="/discover"
                className=" font-bold text-white text-[14px] font-inter "
              >
                Discover
              </Link>
              
            </li>
            <li
              ref={(el) => (linksRef.current[4] = el)}
              className="relative text-white hover:text-[#DF782B] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[4px] after:rounded-2xl after:bg-[#DF782B] after:transition-all after:opacity-0 after:duration-300 hover:after:opacity-100 pb-2.5"
            >
              <Link
                to="/case-study"
                className="font-bold text-white text-[14px] font-inter "
              >
                Case Stuides
              </Link>
            </li>
          </ul>
        </div>
        {isDropdownVisible && (<div
                 onMouseEnter={handleMouseEnter} // Dropdown pe mouse aaye toh hide mat karo
                 onMouseLeave={handleMouseLeave} // Dropdown se bahar jaane pe hide karo
         
         className="dropdown absolute top-30 left-[50%] no-scrollBar z-[100] bg-zinc-800/[.5] backdrop-blur-xl rounded-3xl translate-x-[-50%] w-[350%] max-w-[600px] lg:max-w-[900px] xl:max-w-[1300px]">
                <div className="dropdown-inner no-scrollBar grid grid-cols-2 xl:grid-cols-3 p-3">
                  {data.map((item, index) => (
                    <DiscoverItem
                      title={item.title}
                      pera={item.pera}
                      icon={item.icon}
                      key={index}
                    />
                  ))}
                </div>
              </div>)}
        <div
          ref={menuRef}
          className={`mobile-menu  bg-zinc-500/[.1] backdrop-blur-sm overflow-hidden absolute opacity-0 top-[-100%] z-[10]  w-full left-0 h-[100vh] lg:hidden `}
        >
          <div className="relative">
            <div
              ref={mainMenuRef}
              className={`main-menu top-[100%] z-[1000] opacity-0 relative transition-[.5s] flex flex-col justify-between px-6  ${
                subMenu ? "start-[-100%]" : "start-[0%]"
              }`}
            >
              <ul className="space-y-2">
                {menuItems.map((item, index) => (
                  <li key={index} ref={(el) => (liRefs.current[index] = el)}>
                    <Link
                      to={item.isDropdown ? "#" : item.link}
                      className="flex justify-between hover:text-[#DF782B] transition-[.5s] py-4 font-bold text-white text-2xl font-inter"
                      onClick={
                        ()=>{
                          if (item.isDropdown) {
                            setSubMenu((togg) => !togg);
                          } else {
                            setToggle(false);
                          }
                        }
                      }
                    >
                      <div className="link-t">{item.name}</div>
                      {item.isDropdown ? (
                        <i className="fal fa-chevron-right text-white ml-3"></i>
                      ) : (
                        <i className="fal fa-arrow-up rotate-45 text-white ml-3"></i>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="contact-btn">
                <Link
                onClick={()=>setToggle(false)}  
                  className="bg-[#ED510C] block text-center rounded-[8px] font-bold text-white text-[14px] font-inter p-3  lg:p-5"
                  to="/contact"
                >
                  Let's Talk
                </Link>
              </div>
            </div>
            <div
              className={`sub-menu transition-[.5s] px-6 absolute top-0 w-full bg-[#242424] ${
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
                    key={index}
                    ref={(el) => (itemRefs.current[index] = el)} // Store ref in array
                    title={item.title}
                    pera={item.pera}
                    icon={item.icon}
                    link={item.link}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div ref={letsTalkRef} className="side-btn cursor-pointer">
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
          <Link
            className="bg-[#DF782B] max-h-full rounded-[8px] font-bold text-white text-[14px] hidden lg:block font-inter p-3  lg:p-5"
            to="/contact"
          >
            Let's Talk
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
