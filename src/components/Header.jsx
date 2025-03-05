import React from "react";
import { Link } from "react-router-dom";
import DiscoverItem from "./DiscoverItem";
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
  return (
    <header className="fixed  w-full top-0 z-[100] ">
      <div className="header-wrapper relative flex items-center justify-between bg-gradient-to-r from-black via-gray-900 to-gray-800 px-6 py-4">
      <div className="logo">
        <Link to="/">
          <img src="logo-white.png" className="max-w-52 " alt="" />
        </Link>
      </div>
      <div className="menu">
        <ul className="list-none m-0 p-0 flex items-center gap-10">
          <li className="relative text-white hover:text-[#DF782B] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[4px] after:rounded-2xl after:bg-[#DF782B] after:transition-all after:opacity-0 after:duration-300 hover:after:opacity-100 pb-2.5">
            <Link to="/" className="font-bold text-white text-[14px] font-inter "> Work</Link>
          </li>
          <li className="relative text-white hover:text-[#DF782B] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[4px] after:rounded-2xl after:bg-[#DF782B] after:transition-all after:opacity-0 after:duration-300 hover:after:opacity-100 pb-2.5">
            <Link to="/" className="font-bold text-white text-[14px] font-inter ">Insights</Link>
          </li>
          <li className="relative text-white hover:text-[#DF782B] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[4px] after:rounded-2xl after:bg-[#DF782B] after:transition-all after:opacity-0 after:duration-300 hover:after:opacity-100 pb-2.5">
            <Link to="/" className="font-bold text-white text-[14px] font-inter ">About Us</Link>
          </li>
          <li className="discover-link pb-2.5 ">
            <Link to="/" className=" font-bold text-white text-[14px] font-inter ">Discover</Link>
             <div className="dropdown  absolute top-20 left-[50%] z-[100] border-[10px] border-[#FFFFFF33] rounded-3xl translate-x-[-50%] w-full max-w-[600px] lg:max-w-[900px] xl:max-w-[1300px]">
              <div className="dropdown-inner bg-gradient-to-l from-gray-800 via-gray-900 p-5 to-black rounded-3xl grid grid-cols-2 xl:grid-cols-3">
                  {data.map((item, index)=>(
                    <DiscoverItem title={item.title} pera={item.pera} icon={item.icon} key={index} />
                  ))}
              </div>
             </div>
          </li>
          <li className="relative text-white hover:text-[#DF782B] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[4px] after:rounded-2xl after:bg-[#DF782B] after:transition-all after:opacity-0 after:duration-300 hover:after:opacity-100 pb-2.5">
            <Link to="/" className="font-bold text-white text-[14px] font-inter ">Case Stuides</Link>
          </li>
        </ul>
      </div>
      <div className="side-btn">
        <Link className="bg-[#DF782B] rounded-[8px] font-bold text-white text-[14px] font-inter  p-5" to='/'>Let's Talk</Link>
      </div>
      </div>
    </header>
  );
}

export default Header;
