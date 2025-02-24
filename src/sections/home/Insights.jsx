import React from "react";
import MainHeading from "../../components/MainHeading";
import { Link } from "react-router-dom";

function Insights() {
  return (
    <section className="insights">
      <div className="container-xxl">
        <MainHeading
          heading={"INSIGHTS"}
          pera={
            "We specialize in personalized and conversational marketing, crafting tailored experiences for every business."
          }
          cl={"text-center"}
          tColor={"text-black"}
        />
        <div className="insights-container mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          <div id="insights-1" className="insights-box bg-black p-5 rounded-3xl">
            <div>
              <h1 className="font-bold font-inter text-white">29%</h1>
            </div>
            <div className="">
              <h4 className="font-bold font-inter text-white text-2xl">
                Lorem Ispum
              </h4>
              <p className="font-inter text-white text-sm mt-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
          <div id="insights-2" className="insights-box bg-[#93E9FF] p-5 rounded-3xl flex pr-0 lg:col-span-2" >
            <div className="flex flex-col justify-between pr-2">
              <div className="">
                <h1 className="font-bold font-inter">512+</h1>
              </div>
              <div className="">
                <h4 className="font-bold font-inter  text-2xl">Lorem Ispum</h4>
                <p className="font-inter text-sm mt-3">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
            <div className="">
              <img src="insights-img.png" className="w-full max-w-3xl" alt="" />
            </div>
          </div>
          <div id="insights-3" className="insights-box bg-[#63D863] p-5 rounded-3xl flex flex-col justify-between">
            <div>
              <h1 className="font-bold font-inter">196K</h1>
            </div>
            <div className="">
              <h4 className="font-bold font-inter text-2xl">Lorem Ispum</h4>
              <p className="font-inter text-sm mt-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
          <div id="insights-4" className="insights-box bg-[#61A0FF] p-5 rounded-3xl lg:flex items-center gap-5 col-auto lg:col-span-3" >
            <div>
              <h1 className="font-bold font-inter">91.6M</h1>
            </div>
            <div className="">
              <h4 className="font-bold font-inter  text-2xl">Lorem Ispum</h4>
              <p className="font-inter text-sm mt-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
          <div id="insights-5" className="insights-box bg-[#FF6969] p-5 rounded-3xl flex items-center gap-5 flex-col pt-0">
            <img src="insights-img-2.png" alt="" />
            <div className="">
              <h4 className="font-bold font-inter  text-2xl">Lorem Ispum</h4>
              <p className="font-inter text-sm mt-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
          <div className="col-span-4 text-center">
            <Link
              to={"/"}
              className="font-semibold flex items-center justify-center"
            >
              Keep them coming{" "}
              <i class="fal fa-arrow-up rotate-45 text-[#DF782B] ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Insights;
