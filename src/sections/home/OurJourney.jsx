import React, { useRef, useState, useEffect } from "react";
import MainHeading from "../../components/MainHeading";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function OurJourney() {
  const [activeIndex, setActiveIndex] = useState();
  const handleCardClick = (index) => setActiveIndex(index);

  const data = [
    {
      head: "Lorem ipsum 1",
      pera: "Lorem ipsum dolor sit amet...",
      bgImg: "journey-bg-1.png",
      mainImg: "journey-1.png",
    },
    {
      head: "Lorem ipsum 2",
      pera: "Lorem ipsum dolor sit amet...",
      bgImg: "journey-bg-2.png",
      mainImg: "journey-1.png",
    },
    {
      head: "Lorem ipsum 3",
      pera: "Lorem ipsum dolor sit amet...",
      bgImg: "journey-bg-3.png",
      mainImg: "journey-1.png",
    },
    {
      head: "Lorem ipsum 4",
      pera: "Lorem ipsum dolor sit amet...",
      bgImg: "journey-bg-4.png",
      mainImg: "journey-1.png",
    },
    {
      head: "Lorem ipsum 5",
      pera: "Lorem ipsum dolor sit amet...",
      bgImg: "journey-bg-5.png",
      mainImg: "journey-1.png",
    },
    {
      head: "Lorem ipsum 6",
      pera: "Lorem ipsum dolor sit amet...",
      bgImg: "journey-bg-6.png",
      mainImg: "journey-1.png",
    },
    {
      head: "Lorem ipsum 7",
      pera: "Lorem ipsum dolor sit amet...",
      bgImg: "journey-bg-1.png",
      mainImg: "journey-1.png",
    },
    {
      head: "Lorem ipsum 8",
      pera: "Lorem ipsum dolor sit amet...",
      bgImg: "journey-bg-2.png",
      mainImg: "journey-1.png",
    },
    {
      head: "Lorem ipsum 8",
      pera: "Lorem ipsum dolor sit amet...",
      bgImg: "journey-bg-2.png",
      mainImg: "journey-1.png",
    },
    {
      head: "Lorem ipsum 8",
      pera: "Lorem ipsum dolor sit amet...",
      bgImg: "journey-bg-2.png",
      mainImg: "journey-1.png",
    },
    {
      head: "Lorem ipsum 8",
      pera: "Lorem ipsum dolor sit amet...",
      bgImg: "journey-bg-2.png",
      mainImg: "journey-1.png",
    },
  ];

  const cardRefs = useRef([]);
  const parentRef = useRef(null);
  const cardContainerRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    if (window.innerWidth > 600) {
      // const tl = gsap.timeline({
      //   scrollTrigger: {
      //     trigger: parentRef.current,
      //     start: "top 10%",
      //     // scrub: 1,
      //   },
      // });
      // tl.to(
      //   cardContainerRef.current,
      //   {
      //     left: "50%",
      //     duration: 2,
      //     ease: "power4.in",
      //   },
      //   "a"
      // );
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: parentRef.current,
          start: "top -10%",
          end: "top -90%",
          scrub: 1,
        },
      });
      tl2.to(cardContainerRef.current, {
        left: "-60%",
        duration: 10,
        ease: "power4.in",
      });
      // .to(
      //   cardRefs.current,
      //   {
      //     rotateY: 20,
      //     stagger: 1,
      //     duration: 1,
      //     ease: "linear",
      //     // delay: 1,
      //     scale: 1.05,
      //   },
      //   "a"
      // )
      // .to(
      //   cardRefs.current,
      //   {
      //     rotateY: 0,
      //     stagger: 1,
      //     duration: 1,
      //     ease: "linear",
      //     delay: 1,
      //     scale: 1.1,
      //   },
      //   "a"
      // )
      // .to(
      //   cardRefs.current,
      //   {
      //     rotateY: -20,
      //     stagger: 1,
      //     duration: 1,
      //     ease: "linear",
      //     delay: 2,
      //     scale: 1.05,
      //   },
      //   "a"
      // )
      // .to(
      //   cardRefs.current,
      //   {
      //     rotateY: 0,
      //     stagger: 1,
      //     duration: 1,
      //     ease: "linear",
      //     delay: 3,
      //     scale: 1,
      //   },
      //   "a"
      // );
    } else {
      // const tl = gsap.timeline({
      //   scrollTrigger: {
      //     trigger: parentRef.current,
      //     start: "top 0%",
      //     end: "top -50%",
      //     scrub: 1,
      //     // snap: true,
      //     pin: true,
      //   },
      // });
      // tl.to(
      //   cardContainerRef.current,
      //   {
      //     left: "-220%",
      //     duration: 10,
      //     ease: "linear",
      //   },
      //   "a"
      // )
      //   .to(
      //     cardRefs.current,
      //     {
      //       rotateY: 20,
      //       stagger: 1,
      //       duration: 1,
      //       ease: "linear",
      //       // delay: 1,
      //       scale: 1.05,
      //     },
      //     "a"
      //   )
      //   .to(
      //     cardRefs.current,
      //     {
      //       rotateY: 0,
      //       stagger: 1,
      //       duration: 1,
      //       ease: "linear",
      //       delay: 1,
      //       scale: 1.1,
      //     },
      //     "a"
      //   )
      //   .to(
      //     cardRefs.current,
      //     {
      //       rotateY: -20,
      //       stagger: 1,
      //       duration: 1,
      //       ease: "linear",
      //       delay: 2,
      //       scale: 1.05,
      //     },
      //     "a"
      //   )
      //   .to(
      //     cardRefs.current,
      //     {
      //       rotateY: 0,
      //       stagger: 1,
      //       duration: 1,
      //       ease: "linear",
      //       delay: 3,
      //       scale: 1,
      //     },
      //     "a"
      //   );

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
        duration: 10,
        ease: "power4.in",
      });

    }
  }, []);

if(window.innerWidth > 600){
  let lastScrollY = window.scrollY;
  let isAnimating = false;
  let scrollTimeout;
  
  const updateAnimation = () => {
    if (!cardContainerRef.current || !cardRefs.current) return;
    const cardContainerRect = cardContainerRef.current.getBoundingClientRect();
    if(cardContainerRect.left <= -window.innerWidth * .48) return;
  
    const windowCenter = window.innerWidth / 2;
    let scrollDiff = window.scrollY - lastScrollY;
    lastScrollY = window.scrollY;
  
    const intensity = Math.min(1, Math.abs(scrollDiff) / 150);
    const rotationValue = (scrollDiff > 0 ? 10 : -10) * (intensity * 5); // Smooth range from -5 to 5
  
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
        scaleFactor = 1 + (1.1 - 1) * (1 - distanceFromCenter / maxDistance); // Slightly increased scale
        if (card === closestCard) {
          scaleFactor += 0.1; // More emphasis on the closest card
        }
      } else {
        // cardRotation = 0;
      }
  
      // Set transform-origin for smoother rotation
      card.style.transformOrigin = "center center";
      // console.log(rotationValue *10);
  
      gsap.to(card, {
        scale: scaleFactor,
        // rotateY: rotationValue *10,
        ease: "sine.out", // Smoother easing
        duration: 1.5, // Slightly faster animation
        overwrite: "auto",
        stagger: 0.1 * index, // Increased stagger for a wave-like effect
        onComplete: () => {
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            gsap.to(cardRefs.current, {
              scale: 1,
              rotateY: 0,
              ease: "power2.out",
              duration: .5,
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
else{
  let lastScrollY = window.scrollY;
let isAnimating = false;
let scrollTimeout;

const updateAnimation = () => {
  if (!cardContainerRef.current || !cardRefs.current) return;
  const cardContainerRect = cardContainerRef.current.getBoundingClientRect();
  // if (cardContainerRect.left <= -window.innerWidth * 0.48) return;

  const windowCenter = window.innerWidth / 2;
  let scrollDiff = window.scrollY - lastScrollY;
  lastScrollY = window.scrollY;

  const intensity = Math.min(1, Math.abs(scrollDiff) / 150);
  const rotationValue = (scrollDiff > 0 ? 10 : -10) * (intensity * 5); // Smooth range from -5 to 5

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
      scaleFactor = 1 + (1.1 - 1) * (1 - distanceFromCenter / maxDistance); // Slightly increased scale
      if (card === closestCard) {
        scaleFactor += 0.1; // More emphasis on the closest card
      }
    }

    // Map the 11 cards from 100% to -320%
    const mappedX = (index / 10) * (100 - (-320)) + (-320);

    // Set transform-origin for smoother rotation
    card.style.transformOrigin = "center center";

    gsap.to(card, {
      scale: scaleFactor,
      xPercent: mappedX, // Applying the mapped range
      ease: "sine.out", // Smoother easing
      duration: 1.5, // Slightly faster animation
      overwrite: "auto",
      stagger: 0.1 * index, // Increased stagger for a wave-like effect
      onComplete: () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          gsap.to(cardRefs.current, {
            scale: 1,
            xPercent: 0, // Reset to default
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
  
  
  
  

  // ⬇️ Inline JourneyCard Logic
  const renderCard = (card, index, ref) => {
    const contentRef = useRef(null);
    const rectRef = useRef({ width: 100 }); // Default rect values

    useEffect(() => {
      if (ref && ref.current) {
        rectRef.current = ref.current.getBoundingClientRect();
      }
    }, [ref]);

    // const handleMouseEnter = (index) => {
    //   gsap.to(contentRef.current, {
    //     opacity: 1,
    //     duration: 0.5,
    //     ease: "power2.out",
    //   });

    //   if (cardRefs.current[index]) {
    //     if (window.innerWidth > 600) {
    //       gsap.to(cardRefs.current[index], {
    //         width: "20vw",
    //         borderRadius: "8px",
    //         scaleY: 1.2,
    //         duration: 0.5,
    //         ease: "back.inOut",
    //       });
    //     } else {
    //       gsap.to(cardRefs.current[index], {
    //         width: "50vw",
    //         borderRadius: "0px",
    //         // scaleY: 1.2,
    //         duration: 0.5,
    //         ease: "power4.out",
    //       });
    //     }
    //   }
    // };
    const handleMouseEnter = (index) => {
      gsap.to(contentRef.current, {
        opacity: 1,
      });

      if (cardRefs.current[index]) {
        if (window.innerWidth > 600) {
          gsap.to(cardRefs.current[index], {
            width: "20vw",
            borderRadius: "8px",
            scaleY: 1.2,
            duration: 0.5,
            ease: "back.inOut",
          });
        } else {
          gsap.to(cardRefs.current[index], {
            width: "50vw",
            borderRadius: "0px",
            // scaleY: 1.2,
            duration: 0.5,
            ease: "power4.out",
          });
        }
      }
    };

    const handleMouseLeave = (index) => {
      gsap.to(contentRef.current, {
        opacity: 0,
        scale: 1,
        duration: 0.5,
        ease: "power4.out",
      });

      if (cardRefs.current[index]) {
        if (window.innerWidth > 600) {
          gsap.to(cardRefs.current[index], {
            width: "8vw",
            borderRadius: "0px",
            scaleY: 1,
            duration: 0.5,
            ease: "power4.out",
          });
        } else {
          gsap.to(cardRefs.current[index], {
            width: "30vw",
            borderRadius: "0px",
            // scaleY: 1,
            duration: 0.5,
            ease: "power4.out",
          });
        }
      }
    };

    return (
      <div
        ref={ref}
        className={`jou-card ${activeIndex === index ? "active z-2" : ""} 
        relative flex-shrink-0 md:h-[20vw] md:w-[8vw] w-[100px] overflow-hidden bg-cover bg-center cursor-pointer`}
        style={{ backgroundImage: `url(${card.bgImg})` }}
        onMouseEnter={() => handleMouseEnter(index)}
        onMouseLeave={() => handleMouseLeave(index)}
      >
        {/* Inner Content (Hidden Initially) */}
        <div
          ref={contentRef}
          className="absolute  top-0 left-0 bottom-0 right-0 inset-0 flex flex-col rounded-lg overflow-hidden justify-center items-center opacity-0 scale-100 transition-transform duration-500"
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
    <div className="relative w-full h-[200vh] ">
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
          <div
            ref={cardContainerRef}
            className="journey-card-container relative left-[100%] perspective-normal flex no-scrollBar py-10 md:mt-20 md:gap-5 gap-2"
          >
            {data.map((card, index) => {
              const ref = (el) => {
                if (el) cardRefs.current[index] = el; // ✅ Properly storing the ref
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
