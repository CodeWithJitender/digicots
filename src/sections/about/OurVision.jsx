import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useEffect, useRef } from "react";
import TextAnimation2 from "../../animation/text/TextAnimation2";

const Section = ({ title, img, p }) => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const imgref = useRef(null);
  const textRef = useRef(null);

  gsap.registerPlugin(ScrollTrigger);
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 0%",
        end: "top -50%",
        scrub: true,
      },
    });
    tl.fromTo(
      sectionRef.current,
      {
        scale: 0.65,
        y: "10%",
        borderRadius: "18px",
        ease: "power1.inOut",
      },
      {
        scale: 1,
        y: "0%",
        borderRadius: "0px",
        duration: 10,
      },
      "a"
    );
    tl.fromTo(
      [imgref.current, textRef.current],
      {
        scale: 1.35,
        // duration: 10,
        ease: "power1.inOut",
      },
      {
        scale: 1,
        duration: 10,
        // ease: "power1.inOut",
      },
      "a"
    );
  }, [sectionRef.current, containerRef.current, imgref.current]);
  console.log(p.length)

  return (
    <div className="min-h-[200vh] w-full h-full bg-black relative">
      <div className="min-h-screen pt-20 w-full sticky top-0">
        {/* Title */}
        <h2 className="text-5xl md:text-8xl font-black uppercase mb-6 relative font-inter text-center audiowide-regular">
          <span className="absolute inset-0 text-black custom-stroke">
            {title}
          </span>
          {title}
        </h2>

        {/* Image with Overlay */}
        <div
          ref={sectionRef}
          className="absolute top-0 left-0 h-full w-full overflow-hidden"
          style={{ willChange: "transform" }}
        >
          {/* Background Image */}
          <img
            ref={imgref}
            src={img}
            alt="Our Vision"
            className="h-full w-full object-cover"
            style={{ willChange: "transform" }}
          />

          {/* Text Overlay */}
          <div
            ref={textRef}
            className="absolute inset-0 flex items-center justify-center rounded-lg p-6 font-inter text-center"
            style={{ willChange: "transform" }}
          >
            <p className="text-[#B2B2B2] text-[3vw] md:text-xl font-bold max-w-[320px] md:max-w-[900px] raleway">
              <TextAnimation2 stagger={p.length < 400 ? 50 : 80} animeStart={p.length < 400 ? "20" : "40"} animeEnd={p.length < 400 ? "-20" : "-50"} scrub={true} duration={p.length < 400 ? 5.5 : 10.5}>
                {p}
              </TextAnimation2>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const OurVision = ({ setComponentLoaded }) => {
  gsap.ticker.lagSmoothing(1000, 16);

  const data = [
    {
      title: "OUR VISION",
      img: "https://digicots.com/images/vision.webp",
      p: ` To lead as the apex pack of creative individuals, penetrating through unexplored gaps, unventured industries with courage, instinct and wisdom – transforming bold visions into success stories imprinted in people’s minds while thriving in the constantly changing world.`,
    },
    {
      title: "OUR MISSION",
      img: "https://digicots.com/images/mission.webp",
      p: `Our mission is to guide businesses that dare to be different through the unknown with sharp vision, adaptability and loyalty. We don’t prioritize superficial outcomes; we juggle calculated risk & bold innovation in order to create legacies. We are picky as sh*t! We don’t want to be your average outsourcing agency. We want to know you, delve into your story, know your vision and philosophies. With a blend of data-backed insights, tech-savvy approach and creative finesse; we craft bespoke systems unlocking abundance. With us, it will never just be marketing. We want to be the answer to all your problems – a central hub you can rely on for recognizing gaps in any process; and trustworthy, worthwhile consultancy in all areas of growth. We want to be the forefront of our client’s businesses; representing them on all fronts. Being at the peak is non-negotiable! We do that for ourselves; and we empower you to dominate your arena. Every strategy, every system is meticulously designed to give your vision a momentum; to generate long-lasting impact.`,
    },
  ];

  useEffect(()=>{
    setComponentLoaded((prev) => ({ ...prev, ourVision: true }));
  },[setComponentLoaded])

  return (
    <section className="h-full w-full">
      {data.map((d, i) => (
        <Section title={d.title} img={d.img} p={d.p} key={i}  />
      ))}
    </section>
  );
};

export default OurVision;
