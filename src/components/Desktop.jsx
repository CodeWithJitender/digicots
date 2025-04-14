import React from "react";
import { Link } from "react-router-dom";
import DiscoverItem from "./DiscoverItem";

function Desktop() {
  const data = [
    {
      title: "Website Development",
      pera: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      icon: "icon-1.png",
      id: "Website Development",
    },
    {
      title: "Artificial Reality (AR)",
      pera: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      icon: "icon-2.png",
      id: "artificial-reality",
    },
    {
      title: "Outdoor Advertising",
      pera: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      icon: "icon-3.png",
      id: "outdoor-advertising",
    },
    {
      title: "Public Relations",
      pera: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      icon: "icon-4.png",
      id: "public-relations",
    },
    {
      title: "Performance Marketing",
      pera: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      icon: "icon-5.png",
      id: "performance-marketing",
    },
    {
      title: "Digital Marketing",
      pera: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      icon: "icon-6.png",
      id: "digital-marketing",
    },
    {
      title: "Creative Designing",
      pera: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      icon: "icon-7.png",
      id: "creative-designing",
    },
    {
      title: "Outreach Solutions",
      pera: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      icon: "icon-8.png",
      id: "outreach-solutions",
    },
    {
      title: "Content Production",
      pera: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      icon: "icon-9.png",
      id: "content-production",
    },
    {
      title: "Performance Marketing",
      pera: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      icon: "icon-5.png",
      id: "performance-marketing",
    },
  ];
  return (
    <div className="desktop-header fixed bg-black z-[1000] h-[100vh] w-full flex overflow-hidden  ">
      <div className="header-left w-[30%] bg-[#ED510C] h-screen p-8 flex flex-col justify-between">
        <div className="">
          <div className="logo">
            <img src="logo.png" className="w-full max-w-[249px]" alt="" />
          </div>
          <ul className="mt-5 flex flex-col gap-4">
            <li>
              <Link
                to={""}
                className="font-inter text-3xl font-bold text-white"
              >
                Work
              </Link>
            </li>
            <li>
              <Link
                to={""}
                className="font-inter text-3xl font-bold text-white"
              >
                Insights
              </Link>
            </li>
            <li>
              <Link
                to={""}
                className="font-inter text-3xl font-bold text-white"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to={""}
                className="font-inter text-3xl font-bold text-white"
              >
                Case Studies
              </Link>
            </li>
          </ul>
        </div>
        <div className="">
          <p className="font-inter text-2xl font-bold text-white">
            Got an Idea?
          </p>
          <div className="mb-5">
            <Link to={""} className="font-inter text-3xl font-bold">
              <span className="text-[#242424]">Let’s Get in Touch</span>{" "}
              <i class="far fa-arrow-right rotate-[-45deg] text-white"></i>
            </Link>
          </div>
          <p className="text-white font-inter">
            A <b> Headfield Venture </b>| Want to know more about Headfield{" "}
          </p>
        </div>
      </div>
      <div className="header-right w-[70%] h-screen bg-[#141414] py-10 px-20">
        <p className="font-inter text-3xl font-bold text-white">Work</p>
        <div className="rounded-3xl  w-full h-full ">
          <div className="grid xl:grid-cols-2 pe-6 pt-3 overflow-scroll">
            {data.map((item, index) => (
              <DiscoverItem
                title={item.title}
                pera={item.pera}
                icon={item.icon}
                key={index}
                link={item.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Desktop;
