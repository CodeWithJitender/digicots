import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import MainHeading from "../../components/MainHeading";
import TestimonialsSlider from "../../components/TestmonialsSlider";

function Testimonials() {
  const data = [
    {
      id: 1,
      name: "John Doe",
      position: "CEO Ashwary.Design",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      img: "testimonial-1.jpg",
      isCenter: false,
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "CEO Ashwary.Design",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      img: "testimonial-2.jpg",
      isCenter: false,
    },
    {
      id: 3,
      name: "Ashwary Sinha",
      position: "CEO Ashwary.Design",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      img: "testimonial-3.jpg",
      isCenter: false,
    },
    {
      id: 4,
      name: "Ashwary Sinha",
      position: "CEO Ashwary.Design",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      img: "testimonial-4.jpg",
      isCenter: false,
    },
    {
      id: 5,
      name: "Ashwary Sinha",
      position: "CEO Ashwary.Design",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      img: "testimonial-5.jpg",
      isCenter: false,
    },
  ]
  const [testimonials, setTestimonials] = useState([
    ...data,
    ...data,
    ...data,
  ]);

  // const scrollRef = useRef(null);
  // const lastScrollLeft = useRef(0);

  // const updateCenterElement = () => {
  //   if (!scrollRef.current) return;

  //   const scrollLeft = scrollRef.current.scrollLeft;
  //   const containerWidth = scrollRef.current.clientWidth;
  //   const centerPosition = scrollLeft + containerWidth / 2;

  //   let closestIndex = 0;
  //   let minDistance = Infinity;

  //   testimonials.forEach((_, index) => {
  //     const element = scrollRef.current.children[index];
  //     const elementCenter = element.offsetLeft + element.clientWidth / 2;
  //     const distance = Math.abs(centerPosition - elementCenter);

  //     if (distance < minDistance) {
  //       minDistance = distance;
  //       closestIndex = index;
  //     }
  //   });

  //   setTestimonials((prev) =>
  //     prev.map((t, i) => ({ ...t, isCenter: i === closestIndex }))
  //   );
  // };

  // useEffect(() => {
  //   updateCenterElement();
  // }, []);

  // useEffect(() => {
  //   if (scrollRef.current) {
  //     const scrollAmount = window.innerWidth > 768 ? 250 + window.innerWidth *10+ 210 : 200 + window.innerWidth *10+ 210;
  //     scrollRef.current.scrollLeft += scrollAmount;
  //   }
  //   const handleScroll = () => {
  //     updateCenterElement();
  //     const currentScrollLeft = scrollRef.current.scrollLeft;
  //     const direction = currentScrollLeft > lastScrollLeft.current ? 1 : -1;
  //     lastScrollLeft.current = currentScrollLeft;

  //     gsap.to(".testimonial-item img", {
  //       duration: 1,
  //       // transformOrigin:"center center",
  //       x: (_, el) =>
  //         window.innerWidth > 768 ? direction * 10 : direction * 10,
  //       ease: "power2.out",
  //     });
  //   };

  //   const ref = scrollRef.current;
  //   ref?.addEventListener("scroll", handleScroll);
  //   return () => ref?.removeEventListener("scroll", handleScroll);
  // }, []);

  // useEffect(() => {
  //   gsap.to(".testimonial-item", {
  //     duration: 1,
  //     transformOrigin: "center center",
  //     // delay:0.5,
  //     width: (i) =>
  //       testimonials[i].isCenter ? (window.innerWidth > 768 ? "350px" : "250px") : "180px",
  //     filter: (i) => (testimonials[i].isCenter ? "none" : "grayscale(100%)"),
  //     onStart: function () {
  //       gsap.to(`.testimonial-text`, {
  //         opacity: 0,
  //         duration: 0.5,
  //         top: "100%",
  //         ease: "power2.out",
  //         delay: 0.05,
  //       })

  //       const item = testimonials.find(t => t.isCenter); // Find the object with isCenter = true
  //       const index = testimonials.findIndex(t => t === item); // Get the index of that object
  //       console.log(index);
  //       if (testimonials[index].isCenter) {
  //         console.log("center")
  //         gsap.to(`.testimonial-text-${index}`, {
  //           opacity: 1,
  //           duration: 0.5,
  //           top: "70%",
  //           ease: "power2.out",
  //           delay: 0.07,
  //         })
  //       }
  //     },
  //     ease: "power2.out",
  //   });

   
    
  // }, [testimonials]);
  
  

  // const handleScroll = (direction) => {
  //   if (scrollRef.current) {
  //     const scrollAmount = window.innerWidth > 768 ? 220 : 200;
  //     gsap.to(scrollRef.current, {
  //       duration: .5, // Adjust duration for smoothness
  //       scrollLeft:
  //         direction === "left"
  //           ? scrollRef.current.scrollLeft - scrollAmount
  //           : scrollRef.current.scrollLeft + scrollAmount,
  //       ease: "power4.inOut", // Smooth deceleration
  //     });
  //   }
  // };

  return testimonials.length > 0 && (
    <section className="testimonial min-h-screen relative py-10 md:px-40">
      <div className="container">
        <MainHeading
          heading="TESTIMONIALS"
          pera="Lorem ipsum dolor sit amet, consectetur adipiscing"
          cl="text-center"
          tColor="black"
        />
        {/* <div className="relative max-w-7xl overflow-hidden mx-auto">
          <button
            className="absolute cursor-pointer left-2 top-1/2 -translate-y-1/2 text-white p-2 md:p-3 rounded-full z-10"
            onClick={() => handleScroll("left")}
          >
            ◀
          </button>

          <div
            ref={scrollRef}
            className="w-full flex flex-nowrap gap-4 md:gap-10 mt-6 px-[20vw] md:px-[30vw] overflow-x-auto no-scrollBar rounded-lg scroll-smooth"
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="testimonial-item relative h-[250px] md:h-[400px] rounded-lg flex-shrink-0 overflow-hidden"
              >
                <div
                  className={`testimonial-text cursor-pointer rounded-lg testimonial-text-${i} absolute h-[30%] w-full bg-[#20202053] backdrop-blur top-[100%] left-0 z-10 opacity-0 p-5 flex flex-col justify-between`}
                >
                  <p className="font-inter  text-white text-[14px]">{t.text}</p>
                  <div>
                    <div className="name font-inter  text-white text-[20px]">
                      {t.name}
                    </div>
                    <div className="position font-inter font-bold  text-white text-[14px]">
                      {t.position}
                    </div>
                  </div>
                </div>
                <div className="h-full w-full max-w-[250px] md:max-w-[400px] rounded-lg overflow-hidden">
                  <img
                    src={t.img}
                    className="h-full w-full scale-[1.2] object-cover"
                    alt={t.name}
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 text-white p-2 md:p-3 rounded-full z-10"
            onClick={() => handleScroll("right")}
          >
            ▶
          </button>
        </div> */}

        <TestimonialsSlider data={testimonials} />


      </div>
    </section>
  );
}

export default Testimonials;
