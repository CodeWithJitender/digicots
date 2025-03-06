import React from "react";

function Hero() {
  return (
    <section className="relative bg-black text-white px-8  flex flex-col md:flex-row items-center justify-between">
      <div className="container-xxl">
     <div className="grid lg:grid-cols-[40fr_60fr] items-center">
       {/* Left side - Logo and Animation */}
       <div className="">
        <img src="logo.gif" alt="Logo" className="w-full animate-pulse"/>
      </div>

      {/* Right side - Text Content */}
      <div className="">
        <h2 className="text-4xl md:text-8xl font-bold mb-6">WHO WE ARE</h2>
        <p className="text-lg md:text-sm ">
          Digicots is a cutting-edge digital marketing company that specializes
          in helping businesses thrive in the online landscape. With a team of
          innovative strategists and creative thinkers, Digicots offers a range
          of services including SEO, social media management, content creation,
          and pay-per-click advertising. Their mission is to empower brands by
          enhancing their online presence and driving targeted traffic to their
          websites. By leveraging the latest technologies and trends, Digicots
          crafts tailored marketing solutions that resonate with audiences and
          deliver measurable results. Partner with Digicots to elevate your
          brand and achieve your digital marketing goals.
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2  px-6  rounded-full text-black font-medium">
        <img src="scroll.png" className="max-w-80" alt="" />
      </div>
     </div>
      </div>
    </section>
  );
}

export default Hero;
