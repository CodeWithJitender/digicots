import React, { useRef } from "react";
import MainHeading from "../../components/MainHeading";
import JourneyCard from "../../components/JourneyCard";
import { useState } from "react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function OurJourney() {
  const [activeIndex, setActiveIndex] = useState();
  const handleCardClick = (index) => setActiveIndex(index);

  const data = [
    { head: "Lorem ipsum 1", pera: "Lorem ipsum dolor sit amet...", bgImg: "journey-bg-1.png", mainImg: "journey-1.png" },
    { head: "Lorem ipsum 2", pera: "Lorem ipsum dolor sit amet...", bgImg: "journey-bg-2.png", mainImg: "journey-1.png" },
    { head: "Lorem ipsum 3", pera: "Lorem ipsum dolor sit amet...", bgImg: "journey-bg-3.png", mainImg: "journey-1.png" },
    { head: "Lorem ipsum 4", pera: "Lorem ipsum dolor sit amet...", bgImg: "journey-bg-4.png", mainImg: "journey-1.png" },
    { head: "Lorem ipsum 5", pera: "Lorem ipsum dolor sit amet...", bgImg: "journey-bg-5.png", mainImg: "journey-1.png" },
    { head: "Lorem ipsum 6", pera: "Lorem ipsum dolor sit amet...", bgImg: "journey-bg-6.png", mainImg: "journey-1.png" },
    { head: "Lorem ipsum 7", pera: "Lorem ipsum dolor sit amet...", bgImg: "journey-bg-1.png", mainImg: "journey-1.png" },
  ];

  const cardRefs = useRef([]);
  const parentRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: parentRef.current,
        start: "top 30%",
        end: "top -10%",
        scrub: 1,
        snap:true
      },
    });


    tl.to(cardRefs.current,{
      rotateY:20,
      stagger:.4,
      duration:1,
      ease:"linear",
      transform:"translateX(400%)"
    },"a")
    tl.to(cardRefs.current,{
      rotateY:0,
      scale:1.2,
      stagger:.4,
      duration:1,
      ease:"linear",
      delay:1,
      transform:"translateX(150%)"
    },"a")
    tl.to(cardRefs.current,{
      rotateY:-20,
      scale:1.2,
      stagger:.4,
      duration:1,
      ease:"linear",
      delay:2,
      transform:"translateX(0%)"
    },"a")
    tl.to(cardRefs.current,{
      rotateY:0,
      scale:1,
      stagger:.4,
      duration:1,
      ease:"linear",
      delay:3,
      transform:"translateX(-100%)"
    },"a")
    tl.to(cardRefs.current,{
      rotateY:0,
      scale:1,
      stagger:.4,
      duration:1,
      ease:"linear",
      delay:4,
      transform:"translateX(-200%)"
    },"a")
  
  }, []);

  return (
    <section ref={parentRef} className="our-journey bg-[#DF782B] py-10 overflow-hidden">
      <div className="container mx-auto">
        <MainHeading heading="OUR JOURNEY" pera="Lorem ipsum dolor sit amet, consectetur adipiscing" cl="text-center" tColor="text-white" />
        <div className="journey-card-container perspective-normal grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 mt-20 gap-10">
          {data.map((card, index) => (
            <JourneyCard
              ref={(el) => (cardRefs.current[index] = el)}
              key={index}
              head={card.head}
              pera={card.pera}
              bg={card.bgImg}
              img={card.mainImg}
              onMouseMove={() => handleCardClick(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default OurJourney;
