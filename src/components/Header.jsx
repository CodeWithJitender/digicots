import React from "react";
import { Link } from "react-router-dom";
import DiscoverItem from "./DiscoverItem";
import { useState } from "react";
function Header() {
  const data = [
    {
      title: "Website Development",
      pera: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      icon: "icon-1.png"
    },
    {
      title: "Artificial Reality (AR)",
      pera: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      icon: "icon-2.png"
    },
    {
      title: "Outdoor Advertising",
      pera: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      icon: "icon-3.png"
    },
    {
      title: "Public Relations",
      pera: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      icon: "icon-4.png"
    },
    {
      title: "Performance Marketing",
      pera: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      icon: "icon-5.png"
    },
    {
      title: "Digital Marketing",
      pera: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      icon: "icon-6.png"
    },
    {
      title: "Creative Designing",
      pera: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      icon: "icon-7.png"
    },
    {
      title: "Outreach Solutions",
      pera: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      icon: "icon-8.png"
    },
    {
      title: "Content Production",
      pera: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      icon: "icon-9.png"
    },
    {
      title: "Performance Marketing",
      pera: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      icon: "icon-5.png"
    }
  ];
  const [toggle, setToggle] = useState(false);
  const [subMenu, setSubMenu] = useState(false);
  return (
    <header className="sticky top-0 z-[100]">
      <div className="header-wrapper relative flex items-center justify-between bg-[#242424] lg:bg-gradient-to-r from-black via-gray-900 to-gray-800 px-6 py-4">
        <div className="logo">
          <Link to="/">
            <img
              src="logo-white.png"
              className="max-w-36 md:max-w-40 lg:max-w-52"
              alt=""
            />
          </Link>
        </div>
        <div className="menu hidden lg:block">
          <ul className="list-none m-0 p-0 flex items-center gap-10">
            <li className="relative text-white hover:text-[#DF782B] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[4px] after:rounded-2xl after:bg-[#DF782B] after:transition-all after:opacity-0 after:duration-300 hover:after:opacity-100 pb-2.5">
              <Link
                to="/our-work"
                className="font-bold text-white text-[14px] font-inter "
              >
                {" "}
                Work
              </Link>
            </li>
            <li className="relative text-white hover:text-[#DF782B] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[4px] after:rounded-2xl after:bg-[#DF782B] after:transition-all after:opacity-0 after:duration-300 hover:after:opacity-100 pb-2.5">
              <Link
                to="/insights"
                className="font-bold text-white text-[14px] font-inter "
              >
                Insights
              </Link>
            </li>
            <li className="relative text-white hover:text-[#DF782B] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[4px] after:rounded-2xl after:bg-[#DF782B] after:transition-all after:opacity-0 after:duration-300 hover:after:opacity-100 pb-2.5">
              <Link
                to="/about"
                className="font-bold text-white text-[14px] font-inter "
              >
                About Us
              </Link>
            </li>
            <li className="discover-link pb-2.5 ">
              <Link
                to="/discover"
                className=" font-bold text-white text-[14px] font-inter "
              >
                Discover
              </Link>
              <div className="dropdown  absolute top-20 left-[50%] z-[100] border-[10px] border-[#FFFFFF33] rounded-3xl translate-x-[-50%] w-full max-w-[600px] lg:max-w-[900px] xl:max-w-[1300px]">
                <div className="dropdown-inner bg-gradient-to-l from-gray-800 via-gray-900 p-5 to-black  grid grid-cols-2 xl:grid-cols-3">
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
            </li>
            <li className="relative text-white hover:text-[#DF782B] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[4px] after:rounded-2xl after:bg-[#DF782B] after:transition-all after:opacity-0 after:duration-300 hover:after:opacity-100 pb-2.5">
              <Link
                to="/case-study"
                className="font-bold text-white text-[14px] font-inter "
              >
                Case Stuides
              </Link>
            </li>
          </ul>
        </div>
        <div className={`mobile-menu absolute top-[71px] bg-[#242424] w-full left-0 h-[100vh] lg:hidden ${toggle? 'block':'hidden'}`}>
          <div className="relative">
          <div className={`main-menu relative transition-[.5s] flex flex-col justify-between px-6 bg-[#242424]  ${subMenu? 'start-[-100%]':'start-[0%]'}`}>
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

                  className="flex justify-between hover:text-[#DF782B] transition-[.5s] py-4 font-bold text-white text-2xl font-inter"  onClick={() => setSubMenu((togg) => !togg)}
                >
                  <div className="link-t"> Discover <span className="text-[#525252]">Solutions</span> </div>
                  {/* <i className="fal fa-arrow-up rotate-45 text-white ml-3"></i> */}
                  <i class="fal fa-chevron-right text-white ml-3"></i>
                </Link>
              </li>
              <li>
                <Link
                  to="/"
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
          <div className={`sub-menu transition-[.5s] px-6 absolute top-0 w-full bg-[#242424] ${subMenu? 'start-[0%]':'start-[100%]'}`}>
            <div className="back font-bold flex gap-2 justify-start text-[18px] items-center py-3 cursor-pointer" onClick={() => setSubMenu((togg) => !togg)}>
              <span className="text-white">Home</span>
              <span><i className="fal fa-arrow-right  w-2 text-center text-[16px] translate-x-[-50%] text-white ml-3"></i></span>
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
        <div className="side-btn cursor-pointer">
          <div className="toggler block lg:hidden bg-white p-3 rounded-[50px]" onClick={() => setToggle((togg) => !togg)}>
            <span className="w-8 bg-black h-0.5 block rounded-3xl"></span>
            <span className="w-8 bg-black h-0.5 block rounded-3xl mt-1"></span>
            <span className="w-8 bg-black h-0.5 block rounded-3xl mt-1"></span>
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
