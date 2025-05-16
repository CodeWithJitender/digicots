import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useEffect, useRef } from "react";
import TextAnimation1 from "../../animation/text/TextAnimation1";
import TextAnimation2 from "../../animation/text/TextAnimation2";

const CardComponent = ({ card, index }) => {
  const cardRef = useRef(null);

  useGSAP(() => {
    gsap.to(cardRef.current, {
      rotationZ: index % 2 ? "10deg" : "-10deg",
      duration: 3,
      repeat: -1,
      yoyo:true,
      onUpdate: () => {},
    });
  }, [cardRef.current]);

  return (
    <div
      key={card.id}
      
      className={`relative transform ${card.rotation}  grid grid-cols-[500px_500px] gap-8`}
      style={{ top: index * 20, left: index * 10, willChange: "transform" }}
    >
      <div
         ref={cardRef}
       className="md:w-full w-[220px]  bg-white p-4 rounded-[14px] shadow-lg left-0 transition">
        <img
          src={card.image}
          alt={card.title}
          className="rounded-lg"
        />
        <span className="absolute left-0 sm:left-[-4%] top-0 sm:top-6  bg-white text-[#ED510C] px-3 py-1 rounded-[14px] md:text-2xl font-bold raleway">
          {card.title}
        </span>
      </div>
      <div className="sm:text-2xl hidden sm:block text-lg raleway">
        <p className="text-white ">{card.description1}</p>
        <p className="text-white mt-2">{card.description2}</p>
      </div>
    </div>
  );
};

const WhyChooseUs = ({ setComponentLoaded }) => {
  gsap.ticker.lagSmoothing(1000, 16);

  const cards = [
    {
      id: 1,
      title: "Exclusivity",
      image: "https://digicots.com/images/why-choose-us/1.webp",
      description1: "We don’t just work with anyone.",
      description2:
        "Partnering exclusively with brands ready to dominate the global arena.",
      rotation: "rotate-3",
    },
    {
      id: 2,
      title: "Duality",
      image: "https://digicots.com/images/why-choose-us/2.webp",
      description1: "We don’t compromise.",
      description2:
        "Every solution strikes the perfect balance between raw instinct & precise strategy.",
      rotation: "rotate-3",
    },
    {
      id: 3,
      title: "Boldness",
      image: "https://digicots.com/images/why-choose-us/3.webp",
      description1: "We don’t follow.",
      description2:
        "Running with brands that crave risk, aim for greatness and are ready to dust their competition.",
      rotation: "rotate-3",
    },
    {
      id: 4,
      title: "True Power",
      image: "https://digicots.com/images/why-choose-us/4.webp",
      description1: "We fear nothing.",
      description2:
        "Tearing into the wild knowing that risk-taking is the only path to true power.",
      rotation: "rotate-3",
    },
    {
      id: 5,
      title: "Farsightedness",
      image: "https://digicots.com/images/why-choose-us/5.webp",
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
          end: "top -400%",
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
          transform: `translateX(-7680px)`,
          duration: 10,
          ease:"power1.inOut",
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
          end: "top -400%",
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
          transform: `translateY(-12%)`,
          duration: 10,
        })
        .to(sectionRef.current, {
          scale: 0.9,
          borderRadius: "19px",
        });
    }

    console.log(window.innerWidth);

  }, [scrollXRef.current, window.innerWidth, sectionRef.current]);

  useEffect(()=>{
    setComponentLoaded((prev) => ({ ...prev, whyChooseUs: true }));
  },[setComponentLoaded])

  return (
    <div className="why-choose min-h-[500vh]">
      <section
        ref={sectionRef}
        className="bg-[#ED510C] sticky top-0 min-h-[100vh] flex items-center overflow-hidden no-scrollBar py-20 px-6 md:px-20"
        style={{ willChange: "transform" }}
      >
        <div
          ref={scrollXRef}
          className="mx-auto flex flex-col sm:flex-row sm:items-center translate-y-[20%] sm:translate-y-[0%] sm:translate-x-[15%] gap-10 min-w-screen sm:min-w-[400vw]"
          style={{ willChange: "transform" }}
        >
          <div className="text-white sm:w-fit">
            <h2 className="sm:w-[500px] w-[90vw] text-4xl md:text-5xl font-bold mb-4 overflow-hidden audiowide-regular">
              WHY CHOOSE US?
            </h2>
            <p className="sm:w-[500px] w-[90vw] text-lg mb-6 raleway">
            Our approach isn’t just about building systems – it’s about igniting revolutions, forging legacies. We destroy boundaries leaving a trail of dominance. Running with us isn’t about hiring a team; it’s about partnering with a team that blends creativity with precision.

            </p>
            <p className="sm:w-[500px] w-[90vw] font-semibold text-lg flex items-center gap-2 raleway">
              Scroll to know more →
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
