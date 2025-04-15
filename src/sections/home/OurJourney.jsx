import React, { useRef, useState, useEffect } from "react";
import MainHeading from "../../components/MainHeading";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function OurJourney() {
  const [activeIndex, setActiveIndex] = useState(null);

  const data = [
    {
      head: "Lorem ipsum 1",
      pera: "Lorem ipsum dolor sit amet...",
      bgImg:
        "https://ik.imagekit.io/x5xessyka/digicots/public/journey-bg-1.png",
      mainImg: "https://ik.imagekit.io/x5xessyka/digicots/public/journey-1.png",
    },
    {
      head: "Lorem ipsum 1",
      pera: "Lorem ipsum dolor sit amet...",
      bgImg:
        "https://ik.imagekit.io/x5xessyka/digicots/public/journey-bg-1.png",
      mainImg: "https://ik.imagekit.io/x5xessyka/digicots/public/journey-1.png",
    },
    {
      head: "Lorem ipsum 1",
      pera: "Lorem ipsum dolor sit amet...",
      bgImg:
        "https://ik.imagekit.io/x5xessyka/digicots/public/journey-bg-1.png",
      mainImg: "https://ik.imagekit.io/x5xessyka/digicots/public/journey-1.png",
    },
    {
      head: "Lorem ipsum 1",
      pera: "Lorem ipsum dolor sit amet...",
      bgImg:
        "https://ik.imagekit.io/x5xessyka/digicots/public/journey-bg-1.png",
      mainImg: "https://ik.imagekit.io/x5xessyka/digicots/public/journey-1.png",
    },
    {
      head: "Lorem ipsum 1",
      pera: "Lorem ipsum dolor sit amet...",
      bgImg:
        "https://ik.imagekit.io/x5xessyka/digicots/public/journey-bg-1.png",
      mainImg: "https://ik.imagekit.io/x5xessyka/digicots/public/journey-1.png",
    },
    {
      head: "Lorem ipsum 1",
      pera: "Lorem ipsum dolor sit amet...",
      bgImg:
        "https://ik.imagekit.io/x5xessyka/digicots/public/journey-bg-1.png",
      mainImg: "https://ik.imagekit.io/x5xessyka/digicots/public/journey-1.png",
    },
    {
      head: "Lorem ipsum 1",
      pera: "Lorem ipsum dolor sit amet...",
      bgImg:
        "https://ik.imagekit.io/x5xessyka/digicots/public/journey-bg-1.png",
      mainImg: "https://ik.imagekit.io/x5xessyka/digicots/public/journey-1.png",
    },
    {
      head: "Lorem ipsum 1",
      pera: "Lorem ipsum dolor sit amet...",
      bgImg:
        "https://ik.imagekit.io/x5xessyka/digicots/public/journey-bg-1.png",
      mainImg: "https://ik.imagekit.io/x5xessyka/digicots/public/journey-1.png",
    },
    {
      head: "Lorem ipsum 1",
      pera: "Lorem ipsum dolor sit amet...",
      bgImg:
        "https://ik.imagekit.io/x5xessyka/digicots/public/journey-bg-1.png",
      mainImg: "https://ik.imagekit.io/x5xessyka/digicots/public/journey-1.png",
    },
    {
      head: "Lorem ipsum 1",
      pera: "Lorem ipsum dolor sit amet...",
      bgImg:
        "https://ik.imagekit.io/x5xessyka/digicots/public/journey-bg-1.png",
      mainImg: "https://ik.imagekit.io/x5xessyka/digicots/public/journey-1.png",
    },
    {
      head: "Lorem ipsum 1",
      pera: "Lorem ipsum dolor sit amet...",
      bgImg:
        "https://ik.imagekit.io/x5xessyka/digicots/public/journey-bg-1.png",
      mainImg: "https://ik.imagekit.io/x5xessyka/digicots/public/journey-1.png",
    },
  ];

  const cardRefs = useRef([]);
  const parentRef = useRef(null);
  const cardContainerRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);

  const handleClickOutside =()=>{
    cardRefs.current.forEach((card, i) => {
      card.style.display = "none";
      card.style.opacity = 0;
    })
  }

  const handleCardClick = (index)=>{
    handleClickOutside()
      gsap.to(cardRefs.current[index],{
        display:"initial",
        opacity:1,
        delay:0.2,
        duration:0.5,
      })
  }

  useEffect(()=>{
    window.addEventListener("click",handleClickOutside)
  })

  return (
    <div className="relative w-full ">
      <section
        ref={parentRef}
        className="our-journey sticky top-0 bg-[#DF782B] py-10 overflow-hidden"
      >
        <div className="container mx-auto">
          <MainHeading
            heading="OUR JOURNEY"
            pera="Lorem ipsum dolor sit amet, consectetur adipiscing"
            cl="text-center"
            tColor="text-white"
          />

          <div class="wrapper">
            <div class="items">
            {data.map((card, index) => (<div
                className="item"
                tabindex="0"
                style={{
                  backgroundImage:
                    `url(${card.bgImg})`,
                }}
                onClick={()=>handleCardClick(index)}
              >
                <div 
                ref={(el)=>cardRefs.current[index] = el}
                 class="content h-full w-full overflow-hidden hidden opacity-0">
                  <img
                    src={card.bgImg}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-[80%] bg-white rounded-md p-3 text-center">
                    <h5 className="font-bold mb-1 font-inter text-[3vw] md:text-[1vw]">{card.head}</h5>
                    <p className="text-[2vw] md:text-[.8vw]">{card.pera}</p>
                  </div>
                </div>
              </div>) )}
              
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default OurJourney;
