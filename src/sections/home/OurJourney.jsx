import React, { useRef, useState, useEffect, useCallback } from "react";
import MainHeading from "../../components/MainHeading";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Register plugins once
gsap.registerPlugin(ScrollTrigger);

const data = [
  {
    head: "Head Field",
    pera: "In 2007, Head Field started as a startup with a drive, commitment, energy, and vision. Starting with just 50 employees, it has now grown into a diversified conglomerate comprising 10 niche groups.",
    bgImg: "https://ik.imagekit.io/8mbzq2hdl/digicots/journey-bg-1.webp",
    mainImg: "https://ik.imagekit.io/x5xessyka/digicots/public/journey-1.png",
  },
  {
    head: "Glocal RPO",
    pera: "In 2008, Glocal RPO was founded, a top-notch recruitment partner for firms with intensive hiring requirements.",
    bgImg: "https://ik.imagekit.io/8mbzq2hdl/digicots/journey-bg-2.webp",
    mainImg: "https://ik.imagekit.io/x5xessyka/digicots/public/journey-1.png",
  },
  {
    head: "Glocal Edit",
    pera: "In 2009, spreading out hands into other fields, Glocal Edit, Glocal LPO & Glocal Assist were founded.",
    bgImg: "https://ik.imagekit.io/8mbzq2hdl/digicots/journey-bg-3.webp",
    mainImg: "https://ik.imagekit.io/x5xessyka/digicots/public/journey-1.png",
  },
  {
    head: "Glocal Accounting",
    pera: "In 2011, we decided to literally go Glocal and opened headquarters in Delaware, USA. Glocal Accounting was founded in the same year.",
    bgImg: "https://ik.imagekit.io/8mbzq2hdl/digicots/journey-bg-4.webp",
    mainImg: "https://ik.imagekit.io/x5xessyka/digicots/public/journey-1.png",
  },
  {
    head: "Digicots",
    pera: "In 2016, the pack was formed and left to hunt into the wild. Digicots. Initially a marketing initiative, now a team that recognizes hidden opportunities and gaps in businesses and helps them scale to new horizons.",
    bgImg: "https://ik.imagekit.io/8mbzq2hdl/digicots/journey-bg-5.webp",
    mainImg: "https://ik.imagekit.io/x5xessyka/digicots/public/journey-1.png",
  },
  {
    head: "Team Expansion",
    pera: "In 2017, we underwent a major team expansion with over 500 employees.",
    bgImg: "https://ik.imagekit.io/8mbzq2hdl/digicots/journey-bg-6.webp",
    mainImg: "https://ik.imagekit.io/x5xessyka/digicots/public/journey-1.png",
  },
  {
    head: "Expertise",
    pera: "In 2022, we had over 1200 experts working with us.",
    bgImg: "https://ik.imagekit.io/8mbzq2hdl/digicots/journey-bg-7.webp",
    mainImg: "https://ik.imagekit.io/x5xessyka/digicots/public/journey-1.png",
  },
  {
    head: "Global Team Size",
    pera: "In 2025, we have spread across all continents and grown into a rapidly growing pack.",
    bgImg: "https://ik.imagekit.io/8mbzq2hdl/digicots/journey-bg-8.webp",
    mainImg: "https://ik.imagekit.io/x5xessyka/digicots/public/journey-1.png",
  },
  {
    head: "Core Team",
    pera: "Bold ideas. Wild Creativity. Unstoppable Results.",
    bgImg: "https://ik.imagekit.io/8mbzq2hdl/digicots/journey-bg-9.webp",
    mainImg: "https://ik.imagekit.io/x5xessyka/digicots/public/journey-1.png",
  },
  {
    head: " Global Dominance",
    pera: "Absolute domination.",
    bgImg: "https://ik.imagekit.io/8mbzq2hdl/digicots/journey-bg-10.webp",
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
    clickAnimations: [],
  });

  // Handle click outside cards
  const handleClickOutside = useCallback((e) => {
    // if (!cardContainerRef.current?.contains(e.target)) {
    cardRefs.current.forEach((card, i) => {
      if (card) {
        const anim = gsap.to(card, {
          display: "none",
          opacity: 0,
          duration: 0.3,
        });
        animationRefs.current.clickAnimations[i] = anim;
      }
    });
    setActiveIndex(null);
    // }
  }, []);

  // Handle card click
  const handleCardClick = useCallback((index) => {
    // Close all other cards first
    cardRefs.current.forEach((card, i) => {
      if (i !== index && card) {
        const anim = gsap.to(card, {
          display: "none",
          opacity: 0,
          duration: 0.3,
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
        onStart: () => setActiveIndex(index),
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
    // animationRefs.current.moveY = gsap.to(parentRef.current, {
    //   y: "40%",
    //   duration: 20,
    //   ease: "power1.inOut",
    //   scrollTrigger: {
    //     trigger: parentRef.current,
    //     start: "top 20%",
    //     end: "top -100%",
    //     scrub: 1,
    //   },
    // });

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
      animationRefs.current.clickAnimations.forEach((anim) => anim?.kill());

      // Cleanup ScrollTriggers
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === parentRef.current) {
          trigger.kill();
        }
      });
    };
  }, [handleClickOutside]);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: parentRef.current,
        start: "top 60%",
        end: "top 58%",
        scrub: 1,
        // markers:true
      },
    });

    tl.to("body", {
      backgroundColor: "#DF782B",
      ease: "power1.inOut",
    });

    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: parentRef.current,
        start: "top -30%",
        end: "top -32%",
        scrub: 1,
        // markers:true
      },
    });

    tl2.to("body", {
      backgroundColor: "white",
      ease: "power1.inOut",
    });
  }, [parentRef.current]);

  return (
    <div className="relative w-full z-[3] container-xxl">
      <section
        ref={parentRef}
        className="our-journey sticky top-0 py-10 overflow-hidden"
      >
        <div className="container mx-auto">
          <MainHeading
            // animeStart="40"
            heading="OUR JOURNEY"
            pera="Alpha minds, untamed ambition, legendary impact."
            cl="text-center"
            tColor="text-white"
          />

          <div className="wrapper" ref={cardContainerRef}>
            <div className="items">
              {/* {data.map((card, index) => (
                <div
                  key={`journey-${index}`}
                  className="item overflow-hidden"
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
                      <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-[80%] bg-white rounded-md md:p-3 p-1 text-center">
                      
                      <p className="text-[1.1vw] md:text-[.8vw] leading-[1.3vw]">
                      {card.pera}
                      </p>
                      </div>
                      </div>
                      </div>
                      ))} */}

              <div class="items">
              {data.map((card, index) => (

                <div
                  class="item"
                  tabindex="0"
                  key={`journey-${index}`}
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
                    <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-[80%] max-h-[100%] overflow-hidden text-white rounded-md md:p-3 p-1 text-center bg-[#20202053] backdrop-blur-sm">
                      <p className="text-[1.1vw] md:text-[.8vw] leading-[1.3vw]">
                        {card.pera}
                      </p>
                    </div>
                  </div>

                </div>
              ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurJourney;
