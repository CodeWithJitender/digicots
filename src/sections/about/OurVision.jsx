import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useRef } from "react";
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
    tl.from(
      sectionRef.current,
      {
        scale: 0.65,
        y: "10%",
        borderRadius: "18px",
        duration: 10,
        ease: "power1.inOut",
      },
      "a"
    );
    tl.from(
      [imgref.current, textRef.current],
      {
        scale: 1.35,
        duration: 10,
        ease: "power1.inOut",
      },
      "a"
    );
  }, [sectionRef.current, containerRef.current, imgref.current]);

  return (
    <div className="min-h-[200vh] w-full h-full  bg-black relative">
      <div className=" min-h-screen pt-20 w-full sticky top-0">
        {/* Title */}
        <h2 className="text-5xl md:text-8xl font-black uppercase  mb-6 relative font-inter text-center">
          <span className="absolute inset-0 text-black custom-stroke">
            {title}
          </span>
          {title}
        </h2>

        {/* Image with Overlay */}
        <div
          ref={sectionRef}
          className="absolute top-0 left-0 h-full w-full overflow-hidden"
        >
          {/* Background Image */}
          <img
            ref={imgref}
            src={img} // 🔴 Replace with actual image path
            alt="Our Vision"
            className=" h-full w-full object-cover"
          />

          {/* Text Overlay */}
          <div
            ref={textRef}
            className="absolute inset-0 flex items-center justify-center  rounded-lg p-6 font-inter text-center"
          >
            <p className="text-[#B2B2B2] text-sm md:text-xl font-bold max-w-[250px] md:max-w-[750px]">
              <TextAnimation2 animeStart="20" duration={0.5}>
                {p}
              </TextAnimation2>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const OurVision = () => {
  const data = [
    {
      title: "OUR VISION",
      img: "our-vision.png",
      p: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curae non
      venenatis magna tellus conubia cras convallis montes in. Nibh consectetur etiam himenaeos mi semper malesuada.`,
    },
    {
      title: "OUR Mission",
      img: "our-vision.png",
      p: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curae non
      venenatis magna tellus conubia cras convallis montes in. Nibh consectetur etiam himenaeos mi semper malesuada.`,
    },
  ];
  return (
    <section className=" h-full w-full  ">
      {data.map((d, i) => (
        <Section title={d.title} img={d.img} p={d.p} key={i} />
      ))}
    </section>
  );
};

export default OurVision;
