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

  return testimonials.length > 0 && (
    <section className="testimonial min-h-screen relative py-10 md:px-40">
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
