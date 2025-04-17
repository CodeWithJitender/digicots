import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useRef } from "react";
import TextAnimation1 from "../../animation/text/TextAnimation1";
import TextAnimation2 from "../../animation/text/TextAnimation2";


const CardComponent = ({ card, index }) => {
  const cardRef = useRef(null);

  // const handleMouseEnter = () => {
  //   gsap.to(cardRef.current, {
  //     x: "random(-5, 5, true)", // Random shake horizontally with snapping
  //     y: "random(-5, 5, true)", // Random shake vertically with snapping
  //     rotation: "random(-5, 5, true)", // Slight rotation with snapping
  //     duration: 0.1, // Duration of each shake
  //     repeat: -1, // Infinite repeats
  //     yoyo: true, // Back and forth effect
  //     ease: "none", // Linear easing for a more erratic shake
  //     onUpdate: () => {
  //       // Add a slight delay between shakes for a more natural feel
  //       gsap.delayedCall(0.05, () => {
  //         gsap.set(cardRef.current, {
  //           x: "random(-5, 5, true)",
  //           y: "random(-5, 5, true)",
  //           rotation: "random(-5, 5, true)",
  //         });
  //       });
  //     },
  //   });
  // };

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
      className={`absolute md:relative transform ${card.rotation} bg-white p-4 rounded-[14px] shadow-lg max-w-xs transition hover:scale-105`}
      style={{ top: index * 20, left: index * 10 }}
    >
      <img
        src={card.image}
        alt={card.title}
        className="w-full rounded-lg"
      />
      <span className="absolute top-3 left-[-10%] bg-white text-[#ED510C] px-3 py-1 rounded-[14px] text-2xl font-bold">
        {card.title}
      </span>
      <p className="text-black mt-4 text-sm">{card.description1}</p>
      <p className="text-black mt-2 text-sm">{card.description2}</p>
    </div>
  );
};



const WhyChooseUs = () => {
  const cards = [
    {
      id: 1,
      title: "Exclusivity",
      image: "https://ik.imagekit.io/8mbzq2hdl/digicots/why-1.webp",
      description1:"We don’t just work with anyone.",
      description2:"Partnering exclusively with brands ready to dominate the global arena.",
      rotation: "rotate-3",
    },
    {
      id: 2,
      title: "Duality",
      image: "https://ik.imagekit.io/8mbzq2hdl/digicots/why-2.webp",
      description1:"We don’t compromise.",
      description2:"Every solution strikes the perfect balance between raw instinct & precise strategy.",
      rotation: "rotate-3",
    },
    {
      id: 3,
      title: "Boldness",
      image: "https://ik.imagekit.io/8mbzq2hdl/digicots/why-3.webp",
      description1:"We don’t follow.",
      description2:"Running with brands that crave risk, aim for greatness and are ready to dust their competition.",
      rotation: "rotate-3",
    },
    {
      id: 4,
      title: "True Power",
      image: "https://ik.imagekit.io/8mbzq2hdl/digicots/why-4.webp",
      description1:"We fear nothing.",
      description2:"Tearing into the wild knowing that risk-taking is the only path to true power.",
      rotation: "rotate-3",
    },
    {
      id: 5,
      title: "Farsightedness",
      image: "https://ik.imagekit.io/8mbzq2hdl/digicots/why-5.webp",
      description1:"We don’t build for today.",
      description2:"Forging brands that destroy boundaries, thrive in chaos and master the ever-changing landscape.",
      rotation: "rotate-3",
    },
  ];

  const scrollXRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);
  useGSAP(() => {
    if(window.innerWidth>600){
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".why-choose",
          start: "top 0%",
          end: "top -100%",
          scrub: 1,
        },
      });
      tl.to(scrollXRef.current, {
        transform:`translateX(-70%)`,
      });
    }
    // else{
    //   const tl = gsap.timeline({
    //     scrollTrigger: {
    //       trigger: ".why-choose",
    //       start: "top 0%",
    //       end: "top -100%",
    //       scrub: 1,
    //     },
    //   });
    //   tl.from(scrollXRef.current, {
    //     top:"150%",
    //     stagger:.3
    //   });
    // }
  }, [scrollXRef.current,window.innerWidth]);
  // console.log(cardsRef)


  return (
    <div className="why-choose min-h-[200vh]">
      <section className="bg-[#ED510C] sticky top-0 min-h-[100vh] flex items-center overflow-hidden no-scrollBar py-20 px-6 md:px-20">
        <div ref={scrollXRef} className="mx-auto flex items-center translate-x-[100%] gap-10 min-w-[200vw]">
          {/* Left Text Content */}
          <div className="text-white w-[20%]">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <TextAnimation1 animeStart="10">
                WHY CHOOSE US?
              </TextAnimation1>
            </h2>
            <p className="text-lg mb-6">
              <TextAnimation2 animeStart="20">
              Stage requirement gathering is a crucial phase in project
              development, where stakeholders come together to define the
              project's goals and needs. This process involves identifying key
              functionalities.
              </TextAnimation2>
            </p>
            <p className="font-semibold text-lg flex items-center gap-2">
              <TextAnimation1 animeStart="40" duration={.1}>
                Scroll To actually know why →
              </TextAnimation1>
            </p>
          </div>

          {/* Right Cards Content */}
          <div className="relative flex justify-end ml-[10%]">
            {cards.map((card, index) => (
              <CardComponent key={card.id} card={card} index={index} />
            ))}
          </div>
          <div className="relative flex justify-end ml-[10%]">
            {cards.map((card, index) => (
             <CardComponent key={card.id} card={card} index={index} />
            ))}
          </div>
          <div className="relative flex justify-end ml-[10%]">
            {cards.map((card, index) => (
              <CardComponent key={card.id} card={card} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyChooseUs;
