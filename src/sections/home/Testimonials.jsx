import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import MainHeading from "../../components/MainHeading";
import TestimonialsSlider from "../../components/TestmonialsSlider";
import { useGSAP } from "@gsap/react";

function Testimonials() {
  const data = [
    {
      id: 1,
      name: "John Doe",
      position: "CEO Ashwary.Design",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      img: "https://ik.imagekit.io/x5xessyka/digicots/public/testimonial-1.jpg",
      isCenter: false,
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "CEO Ashwary.Design",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      img: "https://ik.imagekit.io/x5xessyka/digicots/public/testimonial-2.jpg",
      isCenter: false,
    },
    {
      id: 3,
      name: "Ashwary Sinha",
      position: "CEO Ashwary.Design",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      img: "https://ik.imagekit.io/x5xessyka/digicots/public/testimonial-3.jpg",
      isCenter: false,
    },
    {
      id: 4,
      name: "Ashwary Sinha",
      position: "CEO Ashwary.Design",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      img: "https://ik.imagekit.io/x5xessyka/digicots/public/testimonial-4.jpg",
      isCenter: false,
    },
    {
      id: 5,
      name: "Ashwary Sinha",
      position: "CEO Ashwary.Design",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      img: "https://ik.imagekit.io/x5xessyka/digicots/public/testimonial-5.jpg",
      isCenter: false,
    },
  ]
  const [testimonials, setTestimonials] = useState([
    ...data,
    ...data,
    ...data,
  ]);

  const testimonialsRef = useRef(null);
   useGSAP(()=>{
      const moveY = gsap.to(testimonialsRef.current, {
        y: "40%",
        duration: 20,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: testimonialsRef.current,
          start: "top 0%",
          end: "top -100%",
          scrub: 1,
          // markers:true
        },
      });
    },[testimonialsRef.current])


  return testimonials.length > 0 && (
    <section ref={testimonialsRef} className="testimonial min-h-screen relative z-[5] py-10 md:px-40 bg-white">
      <div className="container">
        <MainHeading
          heading="TESTIMONIALS"
          pera="Lorem ipsum dolor sit amet, consectetur adipiscing"
          cl="text-center"
          tColor="black"
        />
        

        <TestimonialsSlider data={testimonials} />


      </div>
    </section>
  );
}

export default Testimonials;
