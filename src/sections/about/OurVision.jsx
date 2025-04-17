import React from "react";

const OurVision = () => {
  return (
    <section className="bg-black ">
      <div className="container-xxl">
        {/* Title */}
        <h2 className="text-5xl md:text-8xl font-black  mb-6 relative font-inter text-center">
          <span className="absolute inset-0 text-black custom-stroke">
            OUR VISION
          </span>
          OUR VISION
        </h2>

        {/* Image with Overlay */}
        <div className="relative">
          {/* Background Image */}
          <img
            src="https://ik.imagekit.io/8mbzq2hdl/digicots/our-vision.png?updatedAt=1744631779993" // 🔴 Replace with actual image path
            alt="Our Vision"
            className=""
          />

          {/* Text Overlay */}
          <div className="absolute inset-0 flex items-center justify-center  rounded-lg p-6 font-inter text-center">
            <p className="text-[#B2B2B2] text-lg md:text-xl font-bold sm:max-w-[750px]">
              To lead as the apex pack of creative individuals, penetrating
              through unexplored gaps, unventured industries with courage,
              instinct and wisdom – transforming bold visions into success
              stories imprinted in people’s minds while thriving in the
              constantly changing world.
            </p>
          </div>
        </div>
      </div>
      <div className="container-xxl">
        {/* Title */}
        <h2 className="text-5xl md:text-8xl font-black  mb-6 relative font-inter text-center">
          <span className="absolute inset-0 text-black custom-stroke uppercase">
            OUR Mission
          </span>
          OUR VISION
        </h2>

        {/* Image with Overlay */}
        <div className="relative bg-[url('https://ik.imagekit.io/8mbzq2hdl/digicots/our-vision.png?updatedAt=1744631779993')] bg-cover bg-center bg-no-repeat rounded-3xl py-10 md:py-auto">
          {/* Background Image */}
          <img
            src="https://ik.imagekit.io/8mbzq2hdl/digicots/our-vision.png?updatedAt=1744631779993" // 🔴 Replace with actual image path
            alt="Our Vision"
            className="hidden md:block"
          />

          {/* Text Overlay */}
          <div className="md:absolute inset-0 flex items-center justify-center  rounded-lg p-6 font-inter text-center">
            <p className="text-[#B2B2B2] text-lg md:text-xl font-bold max-w-[750px]">
              Our mission is to guide businesses that dare to be different
              through the unknown with sharp vision, adaptability and loyalty.
              We don’t prioritize superficial outcomes; we juggle calculated
              risk & bold innovation in order to create legacies. <br />
              We are picky as sh*t! We don’t want to be your average outsourcing
              agency. We want to know you, delve into your story, know your
              vision and philosophies. With a blend of data-backed insights,
              tech-savvy approach and creative finesse; we craft bespoke systems
              unlocking abundance. <br />
              With us, it will never just be marketing. We want to be the answer
              to all your problems – a central hub you can rely on for
              recognizing gaps in any process; and trustworthy, worthwhile
              consultancy in all areas of growth. We want to be the forefront of
              our client’s businesses; representing them on all fronts. Being at
              the peak is non-negotiable! We do that for ourselves; and we
              empower you to dominate your arena. Every strategy, every system
              is meticulously designed to give your vision a momentum; to
              generate long-lasting impact.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurVision;
