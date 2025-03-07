import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React from "react";

const WhyChooseUs = () => {
  const cards = [
    {
      id: 1,
      title: "Timely Delivery",
      image: "why.jpeg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      rotation: "rotate-3",
    },
    {
      id: 2,
      title: "Best Quality",
      image: "why.jpeg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      rotation: "-rotate-6",
    },
    // {
    //   id: 3,
    //   title: "Customer Satisfaction",
    //   image: "why.jpeg",
    //   description:
    //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    //   rotation: "rotate-6",
    // },
  ];

  // const cardsRef = useRef([]);
  // gsap.registerPlugin(ScrollTrigger);
  // useGSAP(() => {
  //   if(window.innerWidth>600){
  //     const tl = gsap.timeline({
  //       scrollTrigger: {
  //         trigger: ".how-we-work",
  //         start: "top 0%",
  //         end: "top -100%",
  //         scrub: 1,
  //       },
  //     });
  //     tl.from(cardsRef.current, {
  //       left:"150%",
  //       stagger:.3
  //     });
  //   }
  //   else{
  //     const tl = gsap.timeline({
  //       scrollTrigger: {
  //         trigger: ".how-we-work",
  //         start: "top 0%",
  //         end: "top -100%",
  //         scrub: 1,
  //       },
  //     });
  //     tl.from(cardsRef.current, {
  //       top:"150%",
  //       stagger:.3
  //     });
  //   }
  // }, [cardsRef.current,window.innerWidth]);
  // // console.log(cardsRef)


  return (
    <div className="min-h-[200vh]">
      <section className="bg-[#ED510C] sticky top-0 min-h-[100vh] flex items-center py-20 px-6 md:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2  items-center gap-10">
          {/* Left Text Content */}
          <div className="text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              WHY CHOOSE US?
            </h2>
            <p className="text-lg mb-6">
              Stage requirement gathering is a crucial phase in project
              development, where stakeholders come together to define the
              project's goals and needs. This process involves identifying key
              functionalities.
            </p>
            <p className="font-semibold text-lg flex items-center gap-2">
              Scroll To actually know why →
            </p>
          </div>

          {/* Right Cards Content */}
          <div className="relative flex justify-end">
            {cards.map((card, index) => (
              <div
                key={card.id}
                className={`absolute md:relative transform ${card.rotation} bg-white p-4 rounded-[14px] shadow-lg max-w-xs transition hover:scale-105`}
                style={{ top: index * 20, left: index * 10 }}
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full  rounded-lg"
                />
                <span className="absolute top-3 left-[-10%] bg-white text-[#ED510C]  px-3 py-1 rounded-[14px] px-2 text-2xl font-bold">
                  {card.title}
                </span>
                <p className="text-black mt-4 text-sm">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyChooseUs;
