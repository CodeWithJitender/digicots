import React from "react";
import MainHeading from "../../components/MainHeading";
import JourneyCard from "../../components/JourneyCard";
import { useState } from "react";

function OurJourney() {
    const [activeIndex, setActiveIndex] = useState(3); // Initially, step 4 is active

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
  return (
    <section className="our-journey bg-[#DF782B] py-10">
      <div className="container mx-auto">
        <MainHeading
          heading={"OUR JOURNEY"}
          pera={"Lorem ipsum dolor sit amet, consectetur adipiscing"}
          cl={"text-center"}
          tColor={"text-white"}
        />
        <div className="journey-card-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 mt-20 gap-4">
          {data.map((card, index) => (
            <JourneyCard
              key={index}
              head={card.head}
              pera={card.pera}
              bg={card.bgImg}
              img={card.mainImg}
              status={index === activeIndex ? "active" : "in-active"}
              onClick={() => handleCardClick(index)} // Make it interactive
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default OurJourney;
