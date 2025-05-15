import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import MainHeading from "../../components/MainHeading";
import TestimonialsSlider from "../../components/TestimonialsSliderNew";
import { useGSAP } from "@gsap/react";
import TestimonialsSliderNew from "../../components/TestimonialsSliderNew";

function Testimonials() {
  const data = [
    {
      id: 1,
      name: "John Doe",
      position: "~Glocal Edits",
      text: "Digicots knows how to strike a balance among knowledge, humor & relatability. They really know how to keep our viewers engaged.",
      img: "https://digicots.com/images/testimonials/1.webp",
      isCenter: false,
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "~Head Field Solutions",
      text: "It feels like having a team that can flawlessly harmonize with our vision, mission and values. They thoroughly understand how we want the world to see us; and they make it happen.",
      img: "https://digicots.com/images/testimonials/2.webp",
      isCenter: false,
    },
    {
      id: 3,
      name: "Ashwary Sinha",
      position: "~Taste & Beyond",
      text: "The design sense perfectly aligns with the vision we have. Having Digicots is like having a therapist who gets you.",
      img: "https://digicots.com/images/testimonials/3.webp",
      isCenter: false,
    },
    {
      id: 4,
      name: "Ashwary Sinha",
      position: "~ArtifiQ",
      text: "They are data-driven and that is where our visions align. Their ability to blend data, tech & creativity is truly exceptional.",
      img: "https://digicots.com/images/testimonials/4.webp",
      isCenter: false,
    },
    {
      id: 5,
      name: "Ashwary Sinha",
      position: "~Glocal BPO",
      text: "It is phenomenal how easily they dive into details and grab the gap. They really do know when, where and how to strike.",
      img: "https://digicots.com/images/testimonials/5.webp",
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
    <section ref={testimonialsRef} className="testimonial min-h-[65vh] relative z-[5] pb-30">
      <div className="">
        <MainHeading
          heading="TESTIMONIALS"
          pera="We specialize in personalized and conversational marketing, crafting tailored experiences for every business."
          cl="text-center"
          tColor="black"
          animeStart="60"
        />
        

        <TestimonialsSliderNew data={testimonials} />
        {/* <TestimonialsSlider data={testimonials}/> */}


      </div>
    </section>
  );
}

export default Testimonials;
