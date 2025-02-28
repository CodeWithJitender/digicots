// import React, { useRef, useState } from 'react';
// // Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/pagination';

// // import './styles.css';

// // import required modules
// import { Pagination } from 'swiper/modules';

// function OurWorkSlider() {
//   return (
//     <>



//       {/* <Swiper
//         slidesPerView={1}
//         spaceBetween={10}
//         breakpoints={{
//           640: {
//             slidesPerView: 1,
//             spaceBetween: 20,
//           },
//           768: {
//             slidesPerView: 2,
//             spaceBetween: 40,
//           },
//           1024: {
//             slidesPerView: 3,
//             spaceBetween: 50,
//           },
//         }}
//         modules={[Pagination]}
//         className="mySwiper"
//       >
//         <SwiperSlide><img src="slide-1.png" alt="" /></SwiperSlide>
//         <SwiperSlide><img src="slide-1.png" alt="" /></SwiperSlide>
//         <SwiperSlide><img src="slide-1.png" alt="" /></SwiperSlide>
//         <SwiperSlide><img src="slide-1.png" alt="" /></SwiperSlide>
//         <SwiperSlide><img src="slide-1.png" alt="" /></SwiperSlide>
//         <SwiperSlide><img src="slide-1.png" alt="" /></SwiperSlide>
//         <SwiperSlide><img src="slide-1.png" alt="" /></SwiperSlide>
//         <SwiperSlide><img src="slide-1.png" alt="" /></SwiperSlide>
//         <SwiperSlide><img src="slide-1.png" alt="" /></SwiperSlide>
//       </Swiper> */}
//     </>
//   )
// }

// // export default OurWorkSlider
// import React from "react";
// const colWidth = 270;
// const count = 9; // Sirf 9 images ka cylinder
// const rotateY = 360 / count;
// const halfW = colWidth / 2;
// const halfDeg = rotateY / 2;
// const distance = halfW / Math.tan((halfDeg * Math.PI) / 180);

// export default function Cylinder() {
//   return (
//     <div className="relative w-[300px] h-[350px] left-1/2 transform -translate-x-1/2 perspective-[1200px]">
//       <div
//         className="relative w-full h-full transform-style-preserve-3d"
//         style={{
//           transform: "rotateX(15deg)", // Thoda top view se dikhane ke liye
//         }}
//       >
//         {[...Array(count)].map((_, i) => {
//           let rotDeg = i * rotateY;
//           return (
//             <div
//               key={i}
//               className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform-style-preserve-3d"
//               style={{
//                 transform: `rotateY(${rotDeg}deg) translateZ(${distance}px)`,
//               }}
//             >
//               <img
//                 src={"slide-1.png"}
//                 alt=""
//                 className="w-[250px] h-auto rounded-lg shadow-xl"
//               />
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

import React from "react";
import MainHeading from "./MainHeading";

const images = Array(15).fill("slide-1.png"); // Array with 10 images

const CylindricalSlider = () => {
  return (
    <div className="banner w-full  overflow-hidden">
      <div className="relative z-10">
        <MainHeading
          heading={"OUR WORK"}
          pera={
            "We specialize in personalized and conversational marketing, crafting tailored experiences for every business."
          }
          cl={"text-center pt-10"}
          tColor={"text-white"}
        />
        <div className="mt-10"></div>
      </div>
      <div className="slider" style={{ "--quantity": images.length }}>
        {images.map((src, i) => (
          <div  key={i} className="item relative" style={{ "--position": i + 1 }}>
            <div className="checkout absolute opacity-0 top-1/2 left-1/2 -translate-[50%] scale-[3] uppercase bg-white rounded-full p-2 px-3">click to check out</div>
            <img src={src} alt={`Slide ${i + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CylindricalSlider;
