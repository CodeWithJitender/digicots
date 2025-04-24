import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import MainHeading from "../components/MainHeading"; // assume you have this
import TestimonialsSliderNew from "../components/TestimonialsSliderNew";

export default function Test() {
  const baseData = [
    {
      id: 1,
      name: "John Doe",
      position: "~Glocal Edits",
      text:
        "Digicots knows how to strike a balance among knowledge, humor & relatability. They really know how to keep our viewers engaged.",
      img:
        "https://ik.imagekit.io/8mbzq2hdl/digicots/testimonial-1.webp",
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "~Head Field Solutions",
      text:
        "It feels like having a team that can flawlessly harmonize with our vision, mission and values. They thoroughly understand how we want the world to see us; and they make it happen.",
      img:
        "https://ik.imagekit.io/8mbzq2hdl/digicots/testimonial-2.webp",
    },
    {
      id: 3,
      name: "Ashwary Sinha",
      position: "~Taste & Beyond",
      text:
        "The design sense perfectly aligns with the vision we have. Having Digicots is like having a therapist who gets you.",
      img:
        "https://ik.imagekit.io/8mbzq2hdl/digicots/testimonial-3.webp",
    },
    {
      id: 4,
      name: "Ashwary Sinha",
      position: "~ArtifiQ",
      text:
        "They are data-driven and that is where our visions align. Their ability to blend data, tech & creativity is truly exceptional.",
      img:
        "https://ik.imagekit.io/8mbzq2hdl/digicots/testimonial-4.webp",
    },
    {
      id: 5,
      name: "Ashwary Sinha",
      position: "~Glocal BPO",
      text:
        "It is phenomenal how easily they dive into details and grab the gap. They really do know when, where and how to strike.",
      img:
        "https://ik.imagekit.io/8mbzq2hdl/digicots/testimonial-5.webp",
    },
  ];

  // duplicate so the auto‑scroll feels infinite
  const [testimonials] = useState([
    ...baseData,
    ...baseData,
    ...baseData,
  ]);

  const testimonialsRef = useRef(null);
  useGSAP(() => {
    gsap.to(testimonialsRef.current, {
      y: "40%",
      duration: 20,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: testimonialsRef.current,
        start: "top 0%",
        end: "top -100%",
        scrub: 1,
      },
    });
  }, [testimonialsRef]);

  return (
    <section
      ref={testimonialsRef}
      className="testimonial min-h-[65vh] relative pb-12"
    >
      <MainHeading
        heading="TESTIMONIALS"
        pera="We specialize in personalized and conversational marketing, crafting tailored experiences for every business."
        cl="text-center"
        tColor="black"
      />

      <TestimonialsSliderNew data={testimonials} />
    </section>
  );
}
