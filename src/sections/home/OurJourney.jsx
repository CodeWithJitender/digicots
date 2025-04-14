import React, { useRef, useState, useEffect } from "react";
import MainHeading from "../../components/MainHeading";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function OurJourney() {
  const [activeIndex, setActiveIndex] = useState(null);
  const handleCardClick = (index) => setActiveIndex(index);

  const data = [
    {
      head: "Lorem ipsum 1",
      pera: "Lorem ipsum dolor sit amet...",
      bgImg: "journey-bg-1.png",
      mainImg: "journey-1.png",
    },
    {
      head: "Lorem ipsum 1",
      pera: "Lorem ipsum dolor sit amet...",
      bgImg: "journey-bg-1.png",
      mainImg: "journey-1.png",
    },
    {
      head: "Lorem ipsum 1",
      pera: "Lorem ipsum dolor sit amet...",
      bgImg: "journey-bg-1.png",
      mainImg: "journey-1.png",
    },
    {
      head: "Lorem ipsum 1",
      pera: "Lorem ipsum dolor sit amet...",
      bgImg: "journey-bg-1.png",
      mainImg: "journey-1.png",
    },
    {
      head: "Lorem ipsum 1",
      pera: "Lorem ipsum dolor sit amet...",
      bgImg: "journey-bg-1.png",
      mainImg: "journey-1.png",
    },
    {
      head: "Lorem ipsum 1",
      pera: "Lorem ipsum dolor sit amet...",
      bgImg: "journey-bg-1.png",
      mainImg: "journey-1.png",
    },
    {
      head: "Lorem ipsum 1",
      pera: "Lorem ipsum dolor sit amet...",
      bgImg: "journey-bg-1.png",
      mainImg: "journey-1.png",
    },
    {
      head: "Lorem ipsum 1",
      pera: "Lorem ipsum dolor sit amet...",
      bgImg: "journey-bg-1.png",
      mainImg: "journey-1.png",
    },
    {
      head: "Lorem ipsum 1",
      pera: "Lorem ipsum dolor sit amet...",
      bgImg: "journey-bg-1.png",
      mainImg: "journey-1.png",
    },
    {
      head: "Lorem ipsum 1",
      pera: "Lorem ipsum dolor sit amet...",
      bgImg: "journey-bg-1.png",
      mainImg: "journey-1.png",
    },
    {
      head: "Lorem ipsum 1",
      pera: "Lorem ipsum dolor sit amet...",
      bgImg: "journey-bg-1.png",
      mainImg: "journey-1.png",
    },
  ];

  const cardRefs = useRef([]);
  const parentRef = useRef(null);
  const cardContainerRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    if (window.innerWidth > 600) {
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: parentRef.current,
          start: "top 0%",
          end: "top -250%",
          scrub: 1,
        },
      });
      tl2.to(cardContainerRef.current, {
        left: "-60%",
        duration: 40,
        ease: "linear",
      });
    } else {
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: parentRef.current,
          start: "top -10%",
          end: "top -90%",
          scrub: 1,
        },
      });
      tl2.to(cardContainerRef.current, {
        left: "-280%",
        duration: 40,
        ease: "linear",
      });
    }
  }, []);

  if (window.innerWidth > 600) {
    let lastScrollY = window.scrollY;
    let isAnimating = false;
    let scrollTimeout;

    const updateAnimation = (e) => {
      if (!cardContainerRef.current || !cardRefs.current) return;
      const cardContainerRect = cardContainerRef.current.getBoundingClientRect();
      if (cardContainerRect.left <= -window.innerWidth * 0.48) return;

      const windowCenter = window.innerWidth / 2;
      let scrollDiff = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;

      const intensity = Math.min(1, Math.abs(scrollDiff) / 150);
      const rotationValue = (scrollDiff > 0 ? 10 : -10) * (intensity * 5);

      let closestCard = null;
      let minDistance = Infinity;

      cardRefs.current.forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const distanceFromCenter = Math.abs(windowCenter - cardCenter);

        if (distanceFromCenter < minDistance) {
          minDistance = distanceFromCenter;
          closestCard = card;
        }
      });

      cardRefs.current.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const distanceFromCenter = Math.abs(windowCenter - cardCenter);
        const maxDistance = window.innerWidth / 3;

        let scaleFactor = 1;
        let cardRotation = rotationValue * (1 - distanceFromCenter / maxDistance);

        if (distanceFromCenter <= maxDistance) {
          scaleFactor = 1 + (1.1 - 1) * (1 - distanceFromCenter / maxDistance);
          if (card === closestCard) {
            scaleFactor += 0.1;
          }
        }

        // console.log(cardRotation)

        card.style.transformOrigin = "center center";

        // console.log(e.deltaY)

        gsap.to(card, {
          scale: scaleFactor,
          ease: "sine.out",
          duration: 1.5,
          overwrite: "auto",
          stagger: 0.1 * index,
          onComplete: () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
              gsap.to(cardRefs.current, {
                scale: 1,
                rotateY: 0,
                ease: "power2.out",
                duration: 0.5,
              });
            }, 0);
          },
        });
      });
    };

    const handleScroll = (e) => {
      if (isAnimating) return;
      isAnimating = true;

      requestAnimationFrame(() => {
        isAnimating = false;
        updateAnimation(e);
      });
    };

    window.addEventListener("scroll",(e)=> handleScroll(e));
  } else {
    let lastScrollY = window.scrollY;
    let isAnimating = false;
    let scrollTimeout;

    const updateAnimation = () => {
      if (!cardContainerRef.current || !cardRefs.current) return;
      const cardContainerRect = cardContainerRef.current.getBoundingClientRect();

      const windowCenter = window.innerWidth / 2;
      let scrollDiff = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;

      const intensity = Math.min(1, Math.abs(scrollDiff) / 150);
      const rotationValue = (scrollDiff > 0 ? 10 : -10) * (intensity * 5);

      let closestCard = null;
      let minDistance = Infinity;

      cardRefs.current.forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const distanceFromCenter = Math.abs(windowCenter - cardCenter);

        if (distanceFromCenter < minDistance) {
          minDistance = distanceFromCenter;
          closestCard = card;
        }
      });

      cardRefs.current.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const distanceFromCenter = Math.abs(windowCenter - cardCenter);
        const maxDistance = window.innerWidth / 3;

        let scaleFactor = 1;
        let cardRotation = rotationValue * (1 - distanceFromCenter / maxDistance);

        if (distanceFromCenter <= maxDistance) {
          scaleFactor = 1 + (1.1 - 1) * (1 - distanceFromCenter / maxDistance);
          if (card === closestCard) {
            scaleFactor += 0.1;
          }
        }

        const mappedX = (index / 10) * (100 - -320) + -320;

        card.style.transformOrigin = "center center";

        gsap.to(card, {
          scale: scaleFactor,
          xPercent: mappedX,
          ease: "sine.out",
          duration: 1.5,
          overwrite: "auto",
          stagger: 0.1 * index,
          onComplete: () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
              gsap.to(cardRefs.current, {
                scale: 1,
                xPercent: 0,
                ease: "power2.out",
                duration: 0.5,
              });
            }, 0);
          },
        });
      });
    };

    const handleScroll = () => {
      if (isAnimating) return;
      isAnimating = true;

      requestAnimationFrame(() => {
        isAnimating = false;
        updateAnimation();
      });
    };

    window.addEventListener("scroll", handleScroll);
  }

  const renderCard = (card, index, ref) => {
    const contentRef = useRef(null);
  
    const handleMouseEnter = (index) => {
      gsap.to(cardRefs.current[index], {
        filter: `grayscale(50%)`,
      });
    };
  
    const handleMouseClick = (index) => {
      // If the clicked card is already active, do nothing
      if (activeIndex === index) return;
  
      setActiveIndex(index); // Set the active index
      cardRefs.current.forEach((card, i) => {
        if (card) {
          gsap.to(card, {
            width: window.innerWidth > 600 ? "8vw" : "30vw",
            borderRadius: "0px",
            scaleY: 1,
            duration: 0.5,
            ease: "power4.out",
          });
        }
      });
  
      const cardContents = document.querySelectorAll(".card-content");
      gsap.to(cardContents, {
        opacity: 0,
        duration: 0.1,
        ease: "power4.out",
      });
  
      if (cardRefs.current[index]) {
        gsap.to(contentRef.current, {
          opacity: 0,
          scale: 1,
          duration: 0.5,
          ease: "power4.out",
        });
  
        gsap.to(cardRefs.current[index], {
          width: window.innerWidth > 600 ? "20vw" : "50vw",
          borderRadius: "8px",
          scaleY: 1.2,
          duration: 0.5,
          ease: "back.inOut",
        });
  
        gsap.to(contentRef.current, {
          opacity: 1,
        });
      }
    };
  
    const handleMouseClickOutside = () => {
      setActiveIndex(null); // Reset active index
      cardRefs.current.forEach((card, i) => {
        if (card) {
          gsap.to(card, {
            width: window.innerWidth > 600 ? "8vw" : "30vw",
            borderRadius: "0px",
            scaleY: 1,
            duration: 0.5,
            ease: "power4.out",
          });
        }
      });
  
      const cardContents = document.querySelectorAll(".card-content");
      gsap.to(cardContents, {
        opacity: 0,
        duration: 0.1,
        ease: "power4.out",
      });
    };
  
    useEffect(() => {
      function handleClickOutside(event) {
        // Check if the click is outside any card
        const isOutside = cardRefs.current.every(
          (card) => card && !card.contains(event.target)
        );
  
        if (isOutside) {
          handleMouseClickOutside();
        }
      }
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []); // No dependencies, as this should run only once
  
    const handleMouseLeave = (index) => {
      gsap.to(cardRefs.current[index], {
        filter: `grayscale(0%)`,
      });
    };
  
    return (
      <div
        ref={ref}
        className={`jou-card ${activeIndex === index ? "active z-2" : ""} 
        relative flex-shrink-0  md:h-[20vw] md:w-[8vw] w-[100px] overflow-hidden bg-cover bg-center cursor-pointer`}
        style={{ backgroundImage: `url(${card.bgImg})` }}
        onMouseEnter={() => handleMouseEnter(index)}
        onMouseLeave={() => handleMouseLeave(index)}
        onClick={() => handleMouseClick(index)}
      >
        <div
          ref={contentRef}
          className="absolute card-content top-0 left-0 bottom-0 right-0 inset-0 flex flex-col rounded-lg overflow-hidden justify-center items-center opacity-0 scale-100 transition-transform duration-500"
        >
          <img
            src={card.mainImg}
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute bottom-2.5 bg-white rounded-2xl mx-2.5 p-3 text-center">
            <h5 className="font-bold mb-3 font-inter">{card.head}</h5>
            <p>{card.pera}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full h-[350vh] ">
      <section
        ref={parentRef}
        className="our-journey min-h-screen sticky top-0 bg-[#DF782B] py-10 overflow-hidden"
      >
        <div className="container mx-auto">
          <MainHeading
            heading="OUR JOURNEY"
            pera="Lorem ipsum dolor sit amet, consectetur adipiscing"
            cl="text-center"
            tColor="text-white"
          />
          <div
            ref={cardContainerRef}
            className="journey-card-container relative left-[140%] md:left-[100%] perspective-normal flex no-scrollBar py-10 md:mt-20 md:gap-5  gap-2"
          >
            {data.map((card, index) => {
              const ref = (el) => {
                if (el) cardRefs.current[index] = el;
              };
              return (
                <React.Fragment key={index}>
                  {renderCard(card, index, ref)}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default OurJourney;