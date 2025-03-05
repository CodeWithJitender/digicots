import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import CaseStudy from "./CaseStudy";

const slides = [
  {
    image: "case-study-1.png",
    title: "Product: With Long Heading",
    text: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."],
    tags:['Design', 'Web-Dev', 'Product']
  },
  {
    image: "case-study-2.png",
    title: "Product: With Long Heading",
    text: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."],
    tags:['Design', 'Web-Dev', 'Product']

  },
  {
    image: "case-study-3.png",
    title: "Product: With Long Heading",
    text: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."],
    tags:['Design', 'Web-Dev', 'Product']

  },
  {
    image: "case-study-2.png",
    title: "Product: With Long Heading",
    text: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."],
    tags:['Design', 'Web-Dev', 'Product']

  },
];

export default function SimpleSlider() {
  const [selectedCase, setSelectedCase] = useState(null);

  return (
    <div className="w-full flex justify-center items-center py-10 bg-gray-100">
      {selectedCase ? (
        <CaseStudy slide={selectedCase} onClose={() => setSelectedCase(null)} />
      ) : (
        <div className="container-xxl">
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            loop={true}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="w-full max-w-7xl"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index} className="w-80">
                <div
                  className="w-full bg-white rounded-xl overflow-hidden shadow-lg relative cursor-pointer"
                  onClick={() => setSelectedCase(slide)}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute flex flex-col h-full justify-end top-0 left-0 w-full">
                    <div className="p-5 backdrop-blur-[3px] bg-black/40 text-white">
                      <h4 className="text-2xl font-bold">{slide.title}</h4>
                      <p className="text-sm mt-3">{slide.text}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}
