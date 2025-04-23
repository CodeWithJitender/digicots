import React, { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function TestimonialsSlider({ data }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef(null);
  const containerRef = useRef(null); // Ref for the animated div

  // Existing text animation for active slide
  let animateText;
  useGSAP(() => {
    clearTimeout(animateText);
    gsap.to(".testimonial-text", { top: "100%", opacity: 0, duration: 0.1 });

    animateText = setTimeout(() => {
      const activeSlide = document.querySelector(
        ".slick-current .testimonial-text"
      );
      if (activeSlide) {
        gsap.to(activeSlide, {
          top: window.innerWidth > 768 ? "70%" : "60%",
          opacity: 1,
          delay: 0.3,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(".testimonial-text", {
              top: "100%",
              opacity: 0,
              duration: 0.1,
            });
            gsap.to(".slick-current .testimonial-text", {
              top: window.innerWidth > 768 ? "60%" : "60%",
              opacity: 1,
              ease: "power2.out",
            });
          },
        });
      }
    }, 1000);
  }, [activeIndex]);

  useGSAP(() => {
    // Entry animation with ScrollTrigger
    gsap.fromTo(
      containerRef.current,
      {
        opacity: 0,
        scale: 1.2,
        filter: "blur(10px)",
      },
      {
        opacity: 1,
        filter: "blur(0px)",
        scale: 1,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%", // Start when top of container hits 80% of viewport
          end: "top 50%", // End when top of container hits 50% of viewport
          scrub: 1,
        },
      }
    );
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4.9,
    slidesToScroll: 1,
    arrow:true,
    // speed: 500,
    // autoplay: true,
    // autoplaySpeed: 2000,
    cssEase: "linear",
    centerMode: true,
    centerPadding: "0px",
    beforeChange: (current, next) => {
      setActiveIndex(next);
      gsap.to(".parallax-img", {
        x: "10",
        duration: 0.1,
        ease: "power2.out",
      });
    },
    afterChange: () => {
      gsap.to(".parallax-img", {
        x: "0",
        delay: 0.5,
        duration: 0.1,
        ease: "power2.out",
      });
    },
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.1,
        },
      },
    ],
  };

  return (
    <div ref={containerRef} className="w-full flex justify-center mt-10">
      <div className="w-full">
        <Slider
          {...settings}
          ref={sliderRef}
          className="[&_.slick-slide]:mx-[1vw] [&_.slick-list]:overflow-visible md:h-[350px] h-[300px] overflow-hidden"
        >
          {data.map((d, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden cursor-grab"
              style={{ width: window.innerWidth > 768 ? 300 : 150 }}
            >
              <div className="relative">
                <img
                  src={d.img}
                  className={`parallax-img h-[300px] md:h-[350px] w-full rounded-2xl object-cover transition-transform ${
                    activeIndex === i ? "active-color" : "grayscale"
                  }`}
                  alt=""
                />
                <div className="testimonial-text cursor-pointer rounded-lg absolute h-[40%] md:h-[40%] w-full bg-[#20202053] backdrop-blur-sm top-full left-0 z-10 opacity-0 p-5 flex flex-col justify-between">
                  <p className="font-inter text-white text-[3vw] md:text-[.7vw]">
                    {d.text}
                  </p>
                  <div>
                    {/* <div className="name font-inter text-white text-[3.2vw] md:text-[.8vw]">
                      {d.name}
                    </div> */}
                    <div className="position font-inter font-bold text-white text-[3.5vw] md:text-[.8vw]">
                      {d.position}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}