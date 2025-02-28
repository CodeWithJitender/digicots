import React, { useRef } from "react";
import MainHeading from "../../components/MainHeading";
import JourneyCard from "../../components/JourneyCard";
import { useState } from "react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function OurJourney() {
    const [activeIndex, setActiveIndex] = useState(); // Initially, step 4 is active

  const handleCardClick = (index) => {
    setActiveIndex(index);
  };
  const data = [
    {
      head: "Lorem ipsum 1",
      pera: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      bgImg: "journey-bg-1.png",
      mainImg: "journey-1.png",
    },
    {
      head: "Lorem ipsum 2",
      pera: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      bgImg: "journey-bg-1.png",
      mainImg: "journey-1.png",
    },
    {
      head: "Lorem ipsum 3",
      pera: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      bgImg: "journey-bg-1.png",
      mainImg: "journey-1.png",
    },
    {
      head: "Lorem ipsum 4",
      pera: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      bgImg: "journey-bg-1.png",
      mainImg: "journey-1.png",
    },
    {
      head: "Lorem ipsum 5",
      pera: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      bgImg: "journey-bg-1.png",
      mainImg: "journey-1.png",
    },
    {
      head: "Lorem ipsum 6",
      pera: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      bgImg: "journey-bg-1.png",
      mainImg: "journey-1.png",
    },
    {
      head: "Lorem ipsum 7",
      pera: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      bgImg: "journey-bg-1.png",
      mainImg: "journey-1.png",
    },
  ];

  const cardRefs = useRef([]); // Array of refs
  const parentRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: parentRef.current,
        start: "top 30%",
        end: "top 5%",
        scrub: 1,
      },
    });
   tl.from(cardRefs.current,{
    x:"700%",
    duration:1,
   })
  }, []);



  return (
    <section ref={parentRef} className="our-journey bg-[#DF782B] py-10 overflow-hidden">
      <div className="container mx-auto">
        <MainHeading
          heading={"OUR JOURNEY"}
          pera={"Lorem ipsum dolor sit amet, consectetur adipiscing"}
          cl={"text-center"}
          tColor={"text-white"}
        />
        <div className="journey-card-container grid grid-cols-7 mt-20">
          {data.map((card, index) => (
            <JourneyCard
              ref={(el) => (cardRefs.current[index] = el)}
              key={index}
              head={card.head}
              pera={card.pera}
              bg={card.bgImg}
              img={card.mainImg}
              status={index === activeIndex ? "active" : "in-active"}
              onMouseMove={() => handleCardClick(index)} // Make it interactive
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default OurJourney;
