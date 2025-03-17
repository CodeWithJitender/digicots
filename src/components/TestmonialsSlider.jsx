import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function TestimonialsSlider({ data }) {
  const [activeIndex, setActiveIndex] = useState(0);

  let animateText;
  useGSAP(() => {
    clearTimeout(animateText);
    gsap.to(".testimonial-text", { top: "100%", opacity: 0, duration: 0.1 }); // Reset all

    animateText = setTimeout(() => {
      const activeSlide = document.querySelector(
        ".swiper-slide-active .testimonial-text"
      );
      if (activeSlide) {
        gsap.to(activeSlide, {
          top: window.innerWidth > 770 ? "70%" : "50%",
          opacity: 1,
          delay: 0.3,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(".testimonial-text", {
              top: "100%",
              opacity: 0,
              duration: 0.1,
            }); // Reset all
            gsap.to(".swiper-slide-active .testimonial-text", {
              top: window.innerWidth > 770 ? "70%" : "50%",
              opacity: 1,
              ease: "power2.out",
            });
          },
        });
      }
    }, 1000);
  }, [activeIndex]); // Run when activeIndex changes
  console.log(window.innerWidth);
  const mapRange = (value, inMin, inMax, outMin, outMax) => {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  };

  const [slidesPerView, setSlidesPerView] = useState(
    mapRange(window.innerWidth, 770, 1536, 3.5, 5.5)
  );

  useEffect(() => {
    const handleResize = () => {
      setSlidesPerView(mapRange(window.innerWidth, 770, 1536, 3.5, 5.5));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    console.log(slidesPerView);
  }, [slidesPerView]);

  return (
    <Swiper
      //   spaceBetween={25}
      loop={true}
      centeredSlides={true}
      //   slidesPerView={5} // Always show 5 slides
      onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      onSwiper={(swiper) => {
        swiper.on("slideChangeTransitionStart", (swiper) => {
          gsap.to(".parallax-img", {
            x: "10",
            duration: 0.1,
            ease: "power2.out",
          }); // Zoom effect while sliding
        });

        swiper.on("slideChangeTransitionEnd", () => {
          gsap.to(".parallax-img", {
            x: "0",
            delay: 0.5,
            duration: 0.1,
            ease: "power2.out",
          }); // Reset scale
        });
      }}
      breakpoints={
        window.innerWidth > 770
          ? {
              "@0.00": { slidesPerView, spaceBetween: 10 },
              "@0.75": { slidesPerView, spaceBetween: 20 },
              "@1.00": { slidesPerView, spaceBetween: 30 },
              "@1.50": { slidesPerView, spaceBetween: 40 },
              "@2.50": { slidesPerView, spaceBetween: 50 },
            }
          : {
              "@0.00": { slidesPerView: 3, spaceBetween: 10 },
              "@0.75": { slidesPerView: 3, spaceBetween: 20 },
              "@1.00": { slidesPerView: 3, spaceBetween: 30 },
              "@1.50": { slidesPerView: 3, spaceBetween: 40 },
              "@2.50": { slidesPerView: 3, spaceBetween: 50 },
            }
      }
      className="mySwiper"
    >
      {data.map((d, i) => (
        <SwiperSlide
          key={i}
          className="rounded-2xl overflow-hidden float-right w-auto"
        >
          {/* Parallax Image */}
          <img
            src={d.img}
            className="parallax-img h-full w-full rounded-2xl object-cover transition-transform"
            alt=""
          />

          <div className="testimonial-text cursor-pointer rounded-lg absolute md:h-[30%] h-[50%] w-full bg-[#20202053] backdrop-blur top-[100%] left-0 z-10 opacity-0 p-5 flex flex-col justify-between">
            <p className="font-inter text-white md:text-[12px] text-[10px]">
              {d.text}
            </p>
            <div>
              <div className="name font-inter text-white md:text-[15px] text-[12px]">
                {d.name}
              </div>
              <div className="position font-inter font-bold text-white md:text-[12px] text-[10px] ">
                {d.position}
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
