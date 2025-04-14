import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useRef } from "react";
import TextAnimation1 from "../../animation/text/TextAnimation1";
import TextAnimation2 from "../../animation/text/TextAnimation2";

const CardComponent = ({ card, index }) => {
  const cardRef = useRef(null);

  // const handleMouseEnter = () => {

  // };

  useGSAP(() => {
    gsap.to(cardRef.current, {
      // x: "random(-5, 5, true)", // Random shake horizontally with snapping
      // y: "random(-5, 5, true)", // Random shake vertically with snapping
      rotationZ: index %2? "10deg" : "-10deg", // Slight rotation with snapping
      duration: 3, // Duration of each shake
      repeat: -1, // Infinite repeats
      // yoyo: true, // Back and forth effect
      // ease: "back.inOut", // Linear easing for a more erratic shake
      onUpdate: () => {
        // Add a slight delay between shakes for a more natural feel
        //   gsap.delayedCall(0.05, () => {
        //     gsap.set(cardRef.current, {
        //       x: "random(-5, 5, true)",
        //       y: "random(-5, 5, true)",
        //       rotation: "random(-5, 5, true)",
        //     });
        //   });
        // },
      },
    });
  }, [cardRef.current]);

  // const handleMouseLeave = () => {
  //   gsap.killTweensOf(cardRef.current); // Stop all ongoing animations
  //   gsap.to(cardRef.current, {
  //     x: 0,
  //     y: 0,
  //     rotation: card.rotation,
  //     duration: 0.3,
  //     ease: "power2.out",
  //   });
  // };

  return (
    <div
      key={card.id}
      ref={cardRef}
      // onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
      className={`relative transform ${card.rotation} bg-white p-4 rounded-[14px] shadow-lg max-w-[150px] left-0 sm:w-[300px] sm:max-w-[300px] transition`}
      style={{ top: index * 20, left: index * 10 }}
    >
      <img src={card.image} alt={card.title} className="w-full rounded-lg" />
      <span className="absolute top-3 w-full sm:left-[-10%] bg-white text-[#ED510C] px-3 py-1 rounded-[14px] text-2xl font-bold">
        {card.title}
      </span>
      <p className="text-black mt-4 sm:text-sm text-xs">{card.description}</p>
    </div>
  );
};

const WhyChooseUs = () => {
  const cards = [
    {
      id: 1,
      title: "Timely Delivery",
      image: "why.jpeg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      rotation: "rotate-9",
    },
    {
      id: 2,
      title: "Best Quality",
      image: "why.jpeg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      rotation: "-rotate-6",
    },
    {
      id: 3,
      title: "Customer Satisfaction",
      image: "why.jpeg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      rotation: "rotate-6",
    },
    {
      id: 2,
      title: "Best Quality",
      image: "why.jpeg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      rotation: "-rotate-6",
    },
    {
      id: 3,
      title: "Customer Satisfaction",
      image: "why.jpeg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      rotation: "rotate-6",
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

      tl.from(sectionRef.current, {
        scale: 0.9,
        borderRadius: "19px",
      })
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
      tl.from(sectionRef.current, {
        scale: 0.9,
        borderRadius: "19px",
      })
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
  // console.log(cardsRef)

  return (
    <div className="why-choose min-h-[300vh]">
      <section
        ref={sectionRef}
        className="bg-[#ED510C] sticky top-0 min-h-[100vh] flex items-center overflow-hidden no-scrollBar py-20 px-6 md:px-20"
      >
        <div
          ref={scrollXRef}
          className="mx-auto flex flex-col sm:flex-row sm:items-center translate-y-[20%] sm:translate-y-[0%] sm:translate-x-[100%] gap-10 min-w-screen sm:min-w-[400vw]"
        >
          {/* Left Text Content */}
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

          {/* Right Cards Content */}
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
