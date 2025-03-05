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
  ];

  const cardRefs = useRef([]);
  const parentRef = useRef(null);
  const cardContainerRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: parentRef.current,
        start: "top 30%",
        end: "top 10%",
        scrub: 1,
        snap:true
      },
    });
    tl.to(cardContainerRef.current, {
      left:"20%",
      duration:10,
      ease:"linear",
    },"a")
    .to(cardRefs.current,{
      rotateY:20,
      stagger:1,
      duration:1,
      ease:"linear",
      delay:1,
      scale:1.05
    },"a")
    .to(cardRefs.current,{
      rotateY:0,
      stagger:1,
      duration:1,
      ease:"linear",
      delay:2,
      scale:1.1
    },"a")
    .to(cardRefs.current,{
      rotateY:-20,
      stagger:1,
      duration:1,
      ease:"linear",
      delay:3,
      scale:1.05
    },"a")
    .to(cardRefs.current,{
      rotateY:0,
      stagger:1,
      duration:1,
      ease:"linear",
      delay:4,
      scale:1
    },"a")
  
  }, []);

  return (
    <section ref={parentRef} className="our-journey bg-[#DF782B] py-10 overflow-hidden">
      <div className="container mx-auto">
        <MainHeading heading="OUR JOURNEY" pera="Lorem ipsum dolor sit amet, consectetur adipiscing" cl="text-center" tColor="text-white" />
        <div ref={cardContainerRef} className="journey-card-container relative left-[80%] perspective-normal flex no-scrollBar py-10 mt-20 gap-5">
          {data.map((card, index) => (
             <JourneyCard
               ref={(el) => (cardRefs.current[index] = el)}
               currentCard={cardRefs.current[index]}
               key={index}
               head={card.head}
               pera={card.pera}
               bg={card.bgImg}
               img={card.mainImg}
             />
            
          ))}
        </div>
      </div>
    </section>
  );
}

export default OurJourney;
