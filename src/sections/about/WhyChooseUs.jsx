import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useRef } from "react";
import TextAnimation1 from "../../animation/text/TextAnimation1";
import TextAnimation2 from "../../animation/text/TextAnimation2";

const CardComponent = ({ card, index }) => {
  const cardRef = useRef(null);

  // useGSAP(() => {
  //   gsap.to(cardRef.current, {
  //     rotationZ: index % 2 ? "10deg" : "-10deg",
  //     duration: 3,
  //     repeat: -1,
  //     onUpdate: () => {},
  //   });
  // }, [cardRef.current]);

  return (
    <div
      key={card.id}
      ref={cardRef}
      className={`relative transform ${card.rotation}  grid grid-cols-[400px_400px] gap-5`}
      style={{ top: index * 20, left: index * 10, willChange: "transform" }}
    >
      <div className="w-[400px]  bg-white p-4 rounded-[14px] shadow-lg left-0 transition">
        <img
          src={card.image}
          alt={card.title}
          className="rounded-lg"
        />
        <span className="absolute top-3  sm:left-[-10%] bg-white text-[#ED510C] px-3 py-1 rounded-[14px] text-2xl font-bold">
          {card.title}
        </span>
      </div>
      <div className="sm:text-2xl text-lg">
        <p className="text-black ">{card.description1}</p>
        <p className="text-black mt-2">{card.description2}</p>
      </div>
    </div>
  );
};

const WhyChooseUs = () => {
  gsap.ticker.lagSmoothing(1000, 16);

  const cards = [
    {
      id: 1,
      title: "Exclusivity",
      image: "https://ik.imagekit.io/8mbzq2hdl/digicots/why-1.webp",
      description1: "We don’t just work with anyone.",
      description2:
        "Partnering exclusively with brands ready to dominate the global arena.",
      rotation: "rotate-3",
    },
    {
      id: 2,
      title: "Duality",
      image: "https://ik.imagekit.io/8mbzq2hdl/digicots/why-2.webp",
      description1: "We don’t compromise.",
      description2:
        "Every solution strikes the perfect balance between raw instinct & precise strategy.",
      rotation: "rotate-3",
    },
    {
      id: 3,
      title: "Boldness",
      image: "https://ik.imagekit.io/8mbzq2hdl/digicots/why-3.webp",
      description1: "We don’t follow.",
      description2:
        "Running with brands that crave risk, aim for greatness and are ready to dust their competition.",
      rotation: "rotate-3",
    },
    {
      id: 4,
      title: "True Power",
      image: "https://ik.imagekit.io/8mbzq2hdl/digicots/why-4.webp",
      description1: "We fear nothing.",
      description2:
        "Tearing into the wild knowing that risk-taking is the only path to true power.",
      rotation: "rotate-3",
    },
    {
      id: 5,
      title: "Farsightedness",
      image: "https://ik.imagekit.io/8mbzq2hdl/digicots/why-5.webp",
      description1: "We don’t build for today.",
      description2:
        "Forging brands that destroy boundaries, thrive in chaos and master the ever-changing landscape.",
      rotation: "rotate-3",
    },
  ];

  const scrollXRef = useRef(null);
  const sectionRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);
  useGSAP(() => {
    if (window.innerWidth > 600) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".why-choose",
          start: "top 0%",
          end: "top -200%",
          scrub: 1,
        },
      });

      tl.fromTo(
        sectionRef.current,
        {
          scale: 0.9,
          borderRadius: "19px",
        },
        {
          scale: 1,
          borderRadius: "0px",
        }
      )
        .to(scrollXRef.current, {
          transform: `translateX(-70%)`,
          duration: 10,
        })
        .to(sectionRef.current, {
          scale: 0.9,
          borderRadius: "19px",
        });
    } else {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".why-choose",
          start: "top 0%",
          end: "top -200%",
          scrub: 1,
        },
      });
      tl.fromTo(
        sectionRef.current,
        {
          scale: 0.9,
          borderRadius: "19px",
        },
        {
          scale: 1,
          borderRadius: "0px",
        }
      )
        .to(scrollXRef.current, {
          transform: `translateY(-5%)`,
          duration: 10,
        })
        .to(sectionRef.current, {
          scale: 0.9,
          borderRadius: "19px",
        });
    }
  }, [scrollXRef.current, window.innerWidth, sectionRef.current]);

  return (
    <div className="why-choose min-h-[300vh]">
      <section
        ref={sectionRef}
        className="bg-[#ED510C] sticky top-0 min-h-[100vh] flex items-center overflow-hidden no-scrollBar py-20 px-6 md:px-20"
        style={{ willChange: "transform" }}
      >
        <div
          ref={scrollXRef}
          className="mx-auto flex flex-col sm:flex-row sm:items-center translate-y-[20%] sm:translate-y-[0%] sm:translate-x-[100%] gap-10 min-w-screen sm:min-w-[400vw]"
          style={{ willChange: "transform" }}
        >
          <div className="text-white sm:w-fit">
            <h2 className="sm:w-[500px] w-[90vw] text-4xl md:text-5xl font-bold mb-4 overflow-hidden">
              WHY CHOOSE US?
            </h2>
            <p className="sm:w-[500px] w-[90vw] text-lg mb-6">
              Stage requirement gathering is a crucial phase in project
              development, where stakeholders come together to define the
              project's goals and needs. This process involves identifying key
              functionalities.
            </p>
            <p className="sm:w-[500px] w-[90vw] font-semibold text-lg flex items-center gap-2">
              Scroll To actually know why →
            </p>
          </div>
          {cards.map((card, index) => (
            <div className="relative flex sm:justify-end ml-[10%]">
              <CardComponent key={card.id} card={card} index={index} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default WhyChooseUs;
