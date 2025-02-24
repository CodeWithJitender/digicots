import React from "react";
import HeadingWithLink from "../../components/HeadingWithLink";
import { Link } from "react-router-dom";

function Solutions() {
  return (
    <section className="solution">
      <div className="container-xxl ">
        <HeadingWithLink
          head="SOLUTIONS"
          per="Lorem ipsum dolor sit amet, consectetur adipiscing"
          link={"/contact"}
          linkh={"Contact Us"}
        />

        <div className="solution-content-conainer mt-5 bg-[#202020] rounded-3xl py-8 md:py-24 px-5 md:px-10">
          <div className="solution-content grid items-center grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-5 gap-x-20">
            <div className="sol-content-left">
              <img src="content-production.png" alt="" className="w-full" />
            </div>
            <div className="sol-content-right">
              <h3 className="font-bold text-white text-6xl mb-3 font-inter">
              Content Production
              </h3>
              {/* <h5
                className="text-white mb-4 font-inter"
                style={{ fontSize: "clamp(12px, 20vw, 16px)" }}
              >
                Where big ideas meet smart strategies
              </h5> */}
              <p
                className="text-[#808080] font-normal font-inter"
                style={{ fontSize: "clamp(10px, 20vw, 12px)" }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              {/* <div className="sol-content-img grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-5 mt-10">
                <img src="sol-box-1.png" alt="" />
                <img src="sol-box-2.png" alt="" />
              </div> */}
<div className="link md:mt-20"></div>
<Link
              to={"/"}
              className="font-semibold text-white"
            >
              Keep them coming{" "}
              <i class="fal fa-arrow-up rotate-45 text-[#DF782B] ml-2" />
            </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Solutions;
