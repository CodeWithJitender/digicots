import React, { useRef, useState, useEffect, useCallback } from "react";
import MainHeading from "../../components/MainHeading";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Register plugins once
gsap.registerPlugin(ScrollTrigger);

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


const OurJourney = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const cardRefs = useRef([]);
  const parentRef = useRef(null);
  const cardContainerRef = useRef(null);
  const animationRefs = useRef({
    moveY: null,
    clickAnimations: []
  });

  // Handle click outside cards
  const handleClickOutside = useCallback((e) => {
    if (!cardContainerRef.current?.contains(e.target)) {
      cardRefs.current.forEach((card, i) => {
        if (card) {
          const anim = gsap.to(card, {
            display: "none",
            opacity: 0,
            duration: 0.3
          });
          animationRefs.current.clickAnimations[i] = anim;
        }
      });
      setActiveIndex(null);
    }
  }, []);

  // Handle card click
  const handleCardClick = useCallback((index) => {
    // Close all other cards first
    cardRefs.current.forEach((card, i) => {
      if (i !== index && card) {
        const anim = gsap.to(card, {
          display: "none",
          opacity: 0,
          duration: 0.3
        });
        animationRefs.current.clickAnimations[i] = anim;
      }
    });

    // Open clicked card
    if (cardRefs.current[index]) {
      const anim = gsap.to(cardRefs.current[index], {
        display: "initial",
        opacity: 1,
        duration: 0.5,
        delay: 0.2,
        onComplete: () => setActiveIndex(index)
      });
      animationRefs.current.clickAnimations[index] = anim;
    }
  }, []);

  // GSAP animations
  useGSAP(() => {
    // Cleanup previous animations
    if (animationRefs.current.moveY) {
      animationRefs.current.moveY.kill();
      animationRefs.current.moveY.scrollTrigger?.kill();
    }

    // Create new moveY animation
    animationRefs.current.moveY = gsap.to(parentRef.current, {
      y: "40%",
      duration: 20,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: parentRef.current,
        start: "top 20%",
        end: "top -100%",
        scrub: 1,
      },
    });

    return () => {
      // Cleanup animation on unmount
      if (animationRefs.current.moveY) {
        animationRefs.current.moveY.kill();
        animationRefs.current.moveY.scrollTrigger?.kill();
      }
    };
  }, []);

  // Event listeners setup and cleanup
  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
      
      // Cleanup all animations
      if (animationRefs.current.moveY) {
        animationRefs.current.moveY.kill();
        animationRefs.current.moveY.scrollTrigger?.kill();
      }
      animationRefs.current.clickAnimations.forEach(anim => anim?.kill());
      
      // Cleanup ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === parentRef.current) {
          trigger.kill();
        }
      });
    };
  }, [handleClickOutside]);

  return (
    <div className="relative w-full z-[3]">
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

          <div className="wrapper" ref={cardContainerRef}>
            <div className="items">
              {data.map((card, index) => (
                <div
                  key={`journey-${index}`}
                  className="item"
                  tabIndex="0"
                  style={{
                    backgroundImage: `url(${card.bgImg})`,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(index);
                  }}
                >
                  <div 
                    ref={(el) => (cardRefs.current[index] = el)}
                    className="content h-full w-full overflow-hidden hidden opacity-0"
                  >
                    <img
                      src={card.bgImg}
                      alt={`Journey ${index + 1}`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-[80%] bg-white rounded-md p-3 text-center">
                      <h5 className="font-bold mb-1 font-inter text-[2vw] md:text-[1vw]">
                        {card.head}
                      </h5>
                      <p className="text-[1vw] md:text-[.8vw]">
                        {card.pera}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurJourney;