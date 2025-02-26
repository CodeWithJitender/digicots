import React from "react";
import MainHeading from "../../components/MainHeading";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      position: "CEO Ashwary.Design",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      img: "testimonial-1.jpg"
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "CEO Ashwary.Design",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      img: "testimonial-3.jpg"
    },
    {
      id: 3,
      name: "Ashwary Sinha",
      position: "CEO Ashwary.Design",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      img: "testimonial-3.jpg"
    },
    {
      id: 4,
      name: "Ashwary Sinha",
      position: "CEO Ashwary.Design",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      img: "testimonial-4.jpg"
    },
    {
      id: 5,
      name: "Ashwary Sinha",
      position: "CEO Ashwary.Design",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      img: "testimonial-5.jpg"
    }
  ];
  return (
    <section className="testimonial">
      <div className="container-xxl">
        <MainHeading
          heading={"TESTIMONIALS"}
          pera={"Lorem ipsum dolor sit amet, consectetur adipiscing"}
          cl={"text-center"}
          tColor={"black"}
        />
        <div className="testimonial-slider mt-20">
          <Swiper
            slidesPerView={5}
            spaceBetween={20}
            centeredSlides={true}
            variableWidth={true}
            loop={true}
            pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20
              }
            }}
            className="mySwiper"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="testimonial-item flex gap-4">
                  <div className="testimonial-text hidden bg-[#202020] rounded-2xl p-5 flex flex-col justify-between">
                    <p className="font-inter  text-white text-[14px]">{testimonial.text}</p>
                    <div>
                      <div className="name font-inter  text-white text-[20px]">{testimonial.name}</div>
                      <div className="position font-inter font-bold  text-white text-[14px]">{testimonial.position}</div>
                    </div>
                  </div>
                  <div className="testimonials-img rounded-2xl overflow-hidden">
                    <img src={testimonial.img} alt={testimonial.name} className="" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
