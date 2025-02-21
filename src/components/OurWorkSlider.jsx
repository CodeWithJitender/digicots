import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import './styles.css';

// import required modules
import { Pagination } from 'swiper/modules';

function OurWorkSlider() {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide><img src="slide-1.png" alt="" /></SwiperSlide>
        <SwiperSlide><img src="slide-1.png" alt="" /></SwiperSlide>
        <SwiperSlide><img src="slide-1.png" alt="" /></SwiperSlide>
        <SwiperSlide><img src="slide-1.png" alt="" /></SwiperSlide>
        <SwiperSlide><img src="slide-1.png" alt="" /></SwiperSlide>
        <SwiperSlide><img src="slide-1.png" alt="" /></SwiperSlide>
        <SwiperSlide><img src="slide-1.png" alt="" /></SwiperSlide>
        <SwiperSlide><img src="slide-1.png" alt="" /></SwiperSlide>
        <SwiperSlide><img src="slide-1.png" alt="" /></SwiperSlide>
      </Swiper>
    </>
  )
}

export default OurWorkSlider
