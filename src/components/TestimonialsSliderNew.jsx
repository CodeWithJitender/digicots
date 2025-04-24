import React from "react";
import Slider from "react-slick";

export default function TestimonialsSliderNew({ data }) {
  const settings = {
    className: "center",
    centerMode: true,
    centerPadding: "60px",
    slidesToShow: 5,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false, 
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerPadding: "40px",
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings} className="py-10">
      {data.map((d, i) => (
        <div
          key={d.id}
          className="rounded-2xl  cursor-grab px-3"
        >
          <div className="relative overflow-hidden">
            <img
              src={d.img}
              className="parallax-img  w-full rounded-2xl object-cover transition-transform grayscale transition"
              alt={d.name}
            />
            <div className="px-2">
                
            </div>
            <div className="testimonial-text cursor-pointer rounded-lg absolute  bg-[#20202053] backdrop-blur-sm p-5">
              <p className="font-inter text-white text-[3vw] md:text-[.7vw] mb-3">
                {d.text}
              </p>
              <div>
                <div className="position font-inter font-bold text-white text-[3.5vw] md:text-[.8vw]">
                  {d.position}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
}
