import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import DiscoverItem from "./DiscoverItem";
import { useState } from "react";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
function Header({location}) {
  const data = [
    {
      title: "Website Development",
      pera: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      icon: "https://ik.imagekit.io/x5xessyka/digicots/public/icon-1.png",
      id: "Website Development",
    },
    {
      title: "Artificial Reality (AR)",
      pera: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      icon: "https://ik.imagekit.io/x5xessyka/digicots/public/icon-2.png",
      id: "artificial-reality",
    },
    {
      title: "Outdoor Advertising",
      pera: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      icon: "https://ik.imagekit.io/x5xessyka/digicots/public/icon-3.png",
      id: "outdoor-advertising",
    },
    {
      title: "Public Relations",
      pera: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      icon: "https://ik.imagekit.io/x5xessyka/digicots/public/icon-4.png",
      id: "public-relations",
    },
    {
      title: "Performance Marketing",
      pera: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      icon: "https://ik.imagekit.io/x5xessyka/digicots/public/icon-5.png",
      id: "performance-marketing",
    },
    {
      title: "Digital Marketing",
      pera: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      icon: "https://ik.imagekit.io/x5xessyka/digicots/public/icon-6.png",
      id: "digital-marketing",
    },
    {
      title: "Creative Designing",
      pera: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      icon: "https://ik.imagekit.io/x5xessyka/digicots/public/icon-7.png",
      id: "creative-designing",
    },
    {
      title: "Outreach Solutions",
      pera: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      icon: "https://ik.imagekit.io/x5xessyka/digicots/public/icon-8.png",
      id: "outreach-solutions",
    },
    {
      title: "Content Production",
      pera: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      icon: "https://ik.imagekit.io/x5xessyka/digicots/public/icon-9.png",
      id: "content-production",
    },
    {
      title: "Performance Marketing",
      pera: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      icon: "https://ik.imagekit.io/x5xessyka/digicots/public/icon-5.png",
      id: "performance-marketing",
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

   
    window.addEventListener("scroll", handleScroll);
   

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [headerRef.current]);


  const [deskToggle, setDeskToggle] = useState(false);

  useGSAP(()=>{
    if(deskToggle){
      const tl = gsap.timeline();
      tl.set(".desktop-header",{
        display:"flex",
      })
      tl.from(
        ".desktop-header",
        {
          // top: "100%",
          scale:1.2,
          opacity:0,
          filter:"blur(10px)",
          duration: .5,
          ease: "power1.inOut",
        },
        "a"
      )
      .from(".left-links",{
        x: -100,
        opacity:0,
        stagger: .1,
        duration: .5,
        ease: "power1.inOut",
      })
      .from(".discover-grid",{
          // top: "100%",
          scale:.9,
          opacity:0,
          filter:"blur(10px)",
          duration: 1,
          ease: "power1.inOut",
        
      })
      console.log("opened")
      
    }else{
      const tl = gsap.timeline();
      tl
      .to(".left-links",{
        x: -100,
        opacity:0,
        stagger: .1,
        duration: .5,
        ease: "power1.inOut",
      },
      "b"
    )
      .to(".discover-grid",{
          // top: "100%",
          scale:.9,
          opacity:0,
          filter:"blur(10px)",
          duration: 1,
          ease: "power1.inOut", 
      },
      "b"
    ).to(
        ".desktop-header",
        {
          // top: "100%",
          scale:1.2,
          opacity:0,
          filter:"blur(10px)",
          duration: .5,
          ease: "power1.inOut",
        },
        "a"
      )
      .set(".desktop-header",{
        display:"none",
        scale:1,
        opacity:1,
        filter:"blur(0px)",
        // duration: .5,
        // ease: "power1.inOut",
      })
      .set(".discover-grid",{
        scale:1,
          opacity:1,
          filter:"blur(0px)",
          // duration: 1,
          // ease: "power1.inOut",
      })
      .set(".left-links",{
        x: 0,
        opacity:1,
      })

      console.log("closed")
    }
  },[deskToggle])




  return (
    <>
    <header ref={headerRef} className="fixed top-[-1px] z-[1000] w-full ">
      {/* <div className="header-wrapper relative flex items-center justify-between bg-[#242424] lg:bg-gradient-to-r from-black via-gray-900 to-gray-800 px-6 py-4"> */}
     
      <div className="header-wrapper relative flex items-center justify-between px-6 py-4 bg-zinc-500/[.1] lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none ">
        <div className="logo">
          <Link to="/">
            <img
              src={["/case-study"].includes(location.pathname) ? "https://ik.imagekit.io/x5xessyka/digicots/public/logo-black.png" : "https://ik.imagekit.io/x5xessyka/digicots/public/logo-white.png" }
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
              className="bg-[#DF782B] max-h-full rounded-[50px] font-bold text-white text-[14px] hidden lg:block font-inter p-3  lg:px-5"
              to="/contact"
            >
              Let's Talk
            </Link>
            <div
              className="desk-menu-btn bg-white max-h-full rounded-[50px] font-bold  text-[14px] hidden lg:block font-inter p-3 flex items-center gap-2 lg:px-5"
              onClick={() => setDeskToggle((prev) => !prev)}
            >
             <span> Menu</span> <i class="far fa-bars"></i>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div
          ref={menuRef}
          className={`mobile-menu  bg-zinc-500/[.1] backdrop-blur-sm overflow-hidden fixed opacity-0 top-[-100%] z-[10]  w-full left-0 h-[100vh] lg:hidden `}
        >
          <div className="relative h-[calc(100%-70px)] pb-5 bg-[#0b0b0c]">
            <div
              ref={mainMenuRef}
              className={`main-menu h-[100%] top-[100%] z-[1000] opacity-0 relative transition-[.5s] flex flex-col justify-between px-6  ${
                subMenu ? "start-[-100%]" : "start-[0%]"
              }`}
            >
              <ul>
                <li>
                  <Link
                    to="/our-work"
                    className="flex justify-between hover:text-[#DF782B] transition-[.5s] py-4 font-bold text-white text-2xl font-inter"
                  >
                    <div className="link-t"> Work </div>
                    <i className="fal fa-arrow-up rotate-45 text-white ml-3"></i>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/insights"
                    className="flex justify-between hover:text-[#DF782B] transition-[.5s] py-4 font-bold text-white text-2xl font-inter"
                  >
                    <div className="link-t"> Insight </div>
                    <i className="fal fa-arrow-up rotate-45 text-white ml-3"></i>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="flex justify-between hover:text-[#DF782B] transition-[.5s] py-4 font-bold text-white text-2xl font-inter"
                  >
                    <div className="link-t"> About Us </div>
                    <i className="fal fa-arrow-up rotate-45 text-white ml-3"></i>
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex justify-between hover:text-[#DF782B] transition-[.5s] py-4 font-bold text-white text-2xl font-inter"
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
                <li>
                  <Link
                    to="/case-study"
                    className="flex justify-between hover:text-[#DF782B] transition-[.5s] py-4 font-bold text-white text-2xl font-inter"
                  >
                    <div className="link-t"> Case Studies</div>
                    <i className="fal fa-arrow-up rotate-45 text-white ml-3"></i>
                  </Link>
                </li>
              </ul>
              <div className="contact-btn">
                <Link
                  className="bg-[#ED510C] block text-center rounded-[8px] font-bold text-white text-[14px] font-inter p-3  lg:p-5"
                  to="/"
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
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

     <div
     data-lenis-prevent
       className={`desktop-header fixed top-0 bg-black z-[1000] h-[100vh] w-full flex overflow-hidden ${
         "hidden"
       }`}
     >
       <div className="header-left w-[30%] bg-[#ED510C] h-screen p-8 flex flex-col justify-between">
         <div className="">
           <div className="logo">
             <img src="https://ik.imagekit.io/x5xessyka/digicots/public/logo-white.png" className="w-full max-w-[249px]" alt="" />
           </div>
           <ul className="mt-5 flex flex-col gap-4">
             <li>
               <Link onClick={() => setDeskToggle((prev) => !prev)}
                 to={"/our-work"}
                 className="font-inter left-links inline-block text-3xl font-bold text-white"
               >
                 Work
               </Link>
             </li>
             <li>
               <Link onClick={() => setDeskToggle((prev) => !prev)}
                 to={"/insights"}
                 className="font-inter left-links inline-block text-3xl font-bold text-white"
               >
                 Insights
               </Link>
             </li>
             <li>
               <Link onClick={() => setDeskToggle((prev) => !prev)}
                 to={"/about"}
                 className="font-inter left-links inline-block text-3xl font-bold text-white"
               >
                 About Us
               </Link>
             </li>
             <li>
               <Link onClick={() => setDeskToggle((prev) => !prev)}
                 to={"/case-study"}
                 className="font-inter left-links inline-block text-3xl font-bold text-white"
               >
                 Case Studies
               </Link>
             </li>
           </ul>
         </div>
         <div className="">
           <p className="font-inter left-links inline-block text-2xl font-bold text-white">
             Got an Idea?
           </p>
           <div className="mb-5">
             <Link onClick={() => setDeskToggle((prev) => !prev)} to={""} className="font-inter left-links inline-block text-3xl font-bold">
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
             className="desk-menu-btn  text-2xl bg-white max-h-full rounded-[50px] font-bold cursor-pointer text-[14px]  font-inter py-3 flex items-center gap-2 lg:px-5 "
             onClick={() => setDeskToggle((prev) => !prev)}
           >
             <span>Close</span> <span><i class="far fa-times"></i></span>
           </div>
         </div>
         <p className="font-inter text-3xl font-bold left-links text-white">Dicover</p>
         <div className="rounded-3xl  w-full h-full overflow-y-auto" data-lenis-prevent >
           <div className="discover-grid grid xl:grid-cols-2 pe-6 py-3 pb-8">
             {data.map((item, index) => (
               <DiscoverItem
               onClick={() => setDeskToggle((prev) => !prev)}
                 title={item.title}
                 pera={item.pera}
                 icon={item.icon}
                 key={index}
                 link={`/discover#${item.id}`}
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
