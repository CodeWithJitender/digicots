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
    }
  ];

  const cardRefs = useRef([]);
  const parentRef = useRef(null);
  const cardContainerRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    if(window.innerWidth > 600){
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: parentRef.current,
          start: "top 30%",
          end: "top 10%",
          scrub: 1,
          snap: true,
        },
      });
      tl.to(
        cardContainerRef.current,
        {
          left: "13%",
          duration: 10,
          ease: "linear",
        },
        "a"
      )
        .to(
          cardRefs.current,
          {
            rotateY: 20,
            stagger: 1,
            duration: 1,
            ease: "linear",
            delay: 1,
            scale: 1.05,
          },
          "a"
        )
        .to(
          cardRefs.current,
          {
            rotateY: 0,
            stagger: 1,
            duration: 1,
            ease: "linear",
            delay: 2,
            scale: 1.1,
          },
          "a"
        )
        .to(
          cardRefs.current,
          {
            rotateY: -20,
            stagger: 1,
            duration: 1,
            ease: "linear",
            delay: 3,
            scale: 1.05,
          },
          "a"
        )
        .to(
          cardRefs.current,
          {
            rotateY: 0,
            stagger: 1,
            duration: 1,
            ease: "linear",
            delay: 4,
            scale: 1,
          },
          "a"
        );
    }else{
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: parentRef.current,
          start: "top 0%",
          end: "top -50%",
          scrub: 1,
          // snap: true,
          pin:true
        },
      });
      tl.to(
        cardContainerRef.current,
        {
          left: "-220%",
          duration: 10,
          ease: "linear",
        },
        "a"
      )
        .to(
          cardRefs.current,
          {
            rotateY: 20,
            stagger: 1,
            duration: 1,
            ease: "linear",
            // delay: 1,
            scale: 1.05,
          },
          "a"
        )
        .to(
          cardRefs.current,
          {
            rotateY: 0,
            stagger: 1,
            duration: 1,
            ease: "linear",
            delay: 1,
            scale: 1.1,
          },
          "a"
        )
        .to(
          cardRefs.current,
          {
            rotateY: -20,
            stagger: 1,
            duration: 1,
            ease: "linear",
            delay: 2,
            scale: 1.05,
          },
          "a"
        )
        .to(
          cardRefs.current,
          {
            rotateY: 0,
            stagger: 1,
            duration: 1,
            ease: "linear",
            delay: 3,
            scale: 1,
          },
          "a"
        );
    }
  }, []);

  // ⬇️ Inline JourneyCard Logic
  const renderCard = (card, index, ref) => {
    const contentRef = useRef(null);
    const rectRef = useRef({ width: 100 }); // Default rect values

    useEffect(() => {
      if (ref && ref.current) {
        rectRef.current = ref.current.getBoundingClientRect();
      }
    }, [ref]);

    const handleMouseEnter = (index) => {
      gsap.to(contentRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });

      if (cardRefs.current[index]) {
        if(window.innerWidth>600){
          gsap.to(cardRefs.current[index], {
            width: "20vw",
            borderRadius: "8px",
            // scaleY: 1.2,
            duration: 0.5,
            ease: "back.inOut",
          });
        }else{
          gsap.to(cardRefs.current[index], {
            width: "50vw",
            borderRadius:"0px",
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
        if(window.innerWidth>600){
          gsap.to(cardRefs.current[index], {
            width: "8vw",
            borderRadius:"0px",
            // scaleY: 1,
            duration: 0.5,
            ease: "power4.out",
          });
        }else{
          gsap.to(cardRefs.current[index], {
            width: "30vw",
            borderRadius:"0px",
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
        relative flex-shrink-0 md:h-[20vw] md:w-[8vw] w-[30vw] h-[20vw] overflow-hidden bg-cover bg-center cursor-pointer`}
        style={{ backgroundImage: `url(${card.bgImg})` }}
        onMouseEnter={()=>handleMouseEnter(index)}
        onMouseLeave={()=>handleMouseLeave(index)}
      >
        {/* Inner Content (Hidden Initially) */}
        <div
          ref={contentRef}
          className="absolute  top-0 left-0 bottom-0 right-0 inset-0 flex flex-col rounded-lg overflow-hidden justify-center items-center opacity-0 scale-100 transition-transform duration-500"
        >
          <img src={card.mainImg} alt="" className="h-full w-full object-cover" />
          <div className="absolute bottom-2.5 bg-white rounded-2xl mx-2.5 p-3 text-center">
            <h5 className="font-bold mb-3 font-inter">{card.head}</h5>
            <p>{card.pera}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      ref={parentRef}
      className="our-journey bg-[#DF782B] py-10 overflow-hidden"
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
          className="journey-card-container relative left-[80%] perspective-normal flex no-scrollBar py-10 md:mt-20 gap-5"
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
  );
}

export default OurJourney;