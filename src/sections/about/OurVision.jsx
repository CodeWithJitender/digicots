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
              src="our-vision.png" // 🔴 Replace with actual image path
              alt="Our Vision"
              className=""
            />

            {/* Text Overlay */}
            <div className="absolute inset-0 flex items-center justify-center  rounded-lg p-6 font-inter text-center">
              <p className="text-[#B2B2B2] text-lg md:text-xl font-bold max-w-[750px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curae
                non venenatis magna tellus conubia cras convallis montes in.
                Nibh consectetur etiam himenaeos mi semper malesuada.
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
          <div className="relative">
            {/* Background Image */}
            <img
              src="our-vision.png" // 🔴 Replace with actual image path
              alt="Our Vision"
              className=""
            />

            {/* Text Overlay */}
            <div className="absolute inset-0 flex items-center justify-center  rounded-lg p-6 font-inter text-center">
              <p className="text-[#B2B2B2] text-lg md:text-xl font-bold max-w-[750px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curae
                non venenatis magna tellus conubia cras convallis montes in.
                Nibh consectetur etiam himenaeos mi semper malesuada.
              </p>
            </div>
          </div>
      </div>
    </section>
  );
};

export default OurVision;
