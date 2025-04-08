import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useEffect, useRef, useState } from "react";

const brandingData = [
  {
    id: 1,
    image: "project-1.png",
    title: "Starbucks Branding",
    tags: ["FOOD", "HOSPITALITY", "BRANDING"],
    description: "Best ideas for branding in the coffee industry.",
    complexity: "6/10",
    timeTaken: "3 Months",
    services: ["Food", "Branding", "Web Design"],
    per1: "Lorem ipsum odor amet, consectetuer adipiscing elit. Imperdiet leo hac congue metus enim natoque eros dignissim sem. Id duis mattis felis leo scelerisque sodales. Bibendum ligula vivamus nam taciti; vel eu. Aclass conubia integer id ridiculus velit accumsan. Non amet vestibulum senectus ac donec dictum himenaeos. Afelis cubilia dolor nisl ac vivamus tellus platea. Turpis fusce platea donec blandit dapibus ex turpis.",
    per2: "Lorem ipsum odor amet, consectetuer adipiscing elit. Imperdiet leo hac congue metus enim natoque eros dignissim sem. Id duis mattis felis leo scelerisque sodales. Bibendum ligula vivamus nam taciti; vel eu. Aclass conubia integer id ridiculus velit accumsan. Non amet vestibulum senectus ac donec dictum himenaeos. Afelis cubilia dolor nisl ac vivamus tellus platea. Turpis fusce platea donec blandit dapibus ex turpis.",
  },
  {
    id: 2,
    image: "project-2.png",
    title: "McDonald's Marketing",
    tags: ["FAST FOOD", "HOSPITALITY", "ADVERTISING"],
    description: "A strategic approach to food marketing.",
    complexity: "8/10",
    timeTaken: "4 Months",
    services: ["Hospitality", "Branding", "Advertisement"],
    per1: "Lorem ipsum odor amet, consectetuer adipiscing elit. Imperdiet leo hac congue metus enim natoque eros dignissim sem. Id duis mattis felis leo scelerisque sodales. Bibendum ligula vivamus nam taciti; vel eu. Aclass conubia integer id ridiculus velit accumsan. Non amet vestibulum senectus ac donec dictum himenaeos. Afelis cubilia dolor nisl ac vivamus tellus platea. Turpis fusce platea donec blandit dapibus ex turpis.",
    per2: "Lorem ipsum odor amet, consectetuer adipiscing elit. Imperdiet leo hac congue metus enim natoque eros dignissim sem. Id duis mattis felis leo scelerisque sodales. Bibendum ligula vivamus nam taciti; vel eu. Aclass conubia integer id ridiculus velit accumsan. Non amet vestibulum senectus ac donec dictum himenaeos. Afelis cubilia dolor nisl ac vivamus tellus platea. Turpis fusce platea donec blandit dapibus ex turpis.",
  },
  {
    id: 3,
    image: "project-3.jpg",
    title: "Nike Advertisement",
    tags: ["SPORTS", "FASHION", "MARKETING"],
    description: "Innovative branding for sportswear.",
    complexity: "7/10",
    timeTaken: "5 Months",
    services: ["Sports", "Fashion", "Marketing"],
    per1: "Lorem ipsum odor amet, consectetuer adipiscing elit. Imperdiet leo hac congue metus enim natoque eros dignissim sem. Id duis mattis felis leo scelerisque sodales. Bibendum ligula vivamus nam taciti; vel eu. Aclass conubia integer id ridiculus velit accumsan. Non amet vestibulum senectus ac donec dictum himenaeos. Afelis cubilia dolor nisl ac vivamus tellus platea. Turpis fusce platea donec blandit dapibus ex turpis.",
    per2: "Lorem ipsum odor amet, consectetuer adipiscing elit. Imperdiet leo hac congue metus enim natoque eros dignissim sem. Id duis mattis felis leo scelerisque sodales. Bibendum ligula vivamus nam taciti; vel eu. Aclass conubia integer id ridiculus velit accumsan. Non amet vestibulum senectus ac donec dictum himenaeos. Afelis cubilia dolor nisl ac vivamus tellus platea. Turpis fusce platea donec blandit dapibus ex turpis.",
  },
  {
    id: 4,
    image: "project-4.jpg",
    title: "Adidas Digital Strategy",
    tags: ["TECHNOLOGY", "INNOVATION", "LUXURY"],
    description: "Expanding Adidas's reach through digital campaigns.",
    complexity: "7.5/10",
    timeTaken: "6 Months",
    services: ["Sports", "Branding", "E-commerce"],
    per1: "Lorem ipsum odor amet, consectetuer adipiscing elit. Imperdiet leo hac congue metus enim natoque eros dignissim sem. Id duis mattis felis leo scelerisque sodales. Bibendum ligula vivamus nam taciti; vel eu. Aclass conubia integer id ridiculus velit accumsan. Non amet vestibulum senectus ac donec dictum himenaeos. Afelis cubilia dolor nisl ac vivamus tellus platea. Turpis fusce platea donec blandit dapibus ex turpis.",
    per2: "Lorem ipsum odor amet, consectetuer adipiscing elit. Imperdiet leo hac congue metus enim natoque eros dignissim sem. Id duis mattis felis leo scelerisque sodales. Bibendum ligula vivamus nam taciti; vel eu. Aclass conubia integer id ridiculus velit accumsan. Non amet vestibulum senectus ac donec dictum himenaeos. Afelis cubilia dolor nisl ac vivamus tellus platea. Turpis fusce platea donec blandit dapibus ex turpis.",
  },
  {
    id: 5,
    image: "project-5.jpg",
    title: "Apple Product Launch",
    tags: ["BEVERAGES", "MARKETING", "GLOBAL"],
    description: "Revolutionary branding strategies for Apple.",
    complexity: "9/10",
    timeTaken: "8 Months",
    services: ["Technology", "Branding", "Retail"],
    per1: "Lorem ipsum odor amet, consectetuer adipiscing elit. Imperdiet leo hac congue metus enim natoque eros dignissim sem. Id duis mattis felis leo scelerisque sodales. Bibendum ligula vivamus nam taciti; vel eu. Aclass conubia integer id ridiculus velit accumsan. Non amet vestibulum senectus ac donec dictum himenaeos. Afelis cubilia dolor nisl ac vivamus tellus platea. Turpis fusce platea donec blandit dapibus ex turpis.",
    per2: "Lorem ipsum odor amet, consectetuer adipiscing elit. Imperdiet leo hac congue metus enim natoque eros dignissim sem. Id duis mattis felis leo scelerisque sodales. Bibendum ligula vivamus nam taciti; vel eu. Aclass conubia integer id ridiculus velit accumsan. Non amet vestibulum senectus ac donec dictum himenaeos. Afelis cubilia dolor nisl ac vivamus tellus platea. Turpis fusce platea donec blandit dapibus ex turpis.",
  },
  {
    id: 1,
    image: "project-1.png",
    title: "Starbucks Branding",
    tags: ["FOOD", "HOSPITALITY", "BRANDING"],
    description: "Best ideas for branding in the coffee industry.",
    complexity: "6/10",
    timeTaken: "3 Months",
    services: ["Food", "Branding", "Web Design"],
    per1: "Lorem ipsum odor amet, consectetuer adipiscing elit. Imperdiet leo hac congue metus enim natoque eros dignissim sem. Id duis mattis felis leo scelerisque sodales. Bibendum ligula vivamus nam taciti; vel eu. Aclass conubia integer id ridiculus velit accumsan. Non amet vestibulum senectus ac donec dictum himenaeos. Afelis cubilia dolor nisl ac vivamus tellus platea. Turpis fusce platea donec blandit dapibus ex turpis.",
    per2: "Lorem ipsum odor amet, consectetuer adipiscing elit. Imperdiet leo hac congue metus enim natoque eros dignissim sem. Id duis mattis felis leo scelerisque sodales. Bibendum ligula vivamus nam taciti; vel eu. Aclass conubia integer id ridiculus velit accumsan. Non amet vestibulum senectus ac donec dictum himenaeos. Afelis cubilia dolor nisl ac vivamus tellus platea. Turpis fusce platea donec blandit dapibus ex turpis.",
  },
  {
    id: 2,
    image: "project-2.png",
    title: "McDonald's Marketing",
    tags: ["FAST FOOD", "HOSPITALITY", "ADVERTISING"],
    description: "A strategic approach to food marketing.",
    complexity: "8/10",
    timeTaken: "4 Months",
    services: ["Hospitality", "Branding", "Advertisement"],
    per1: "Lorem ipsum odor amet, consectetuer adipiscing elit. Imperdiet leo hac congue metus enim natoque eros dignissim sem. Id duis mattis felis leo scelerisque sodales. Bibendum ligula vivamus nam taciti; vel eu. Aclass conubia integer id ridiculus velit accumsan. Non amet vestibulum senectus ac donec dictum himenaeos. Afelis cubilia dolor nisl ac vivamus tellus platea. Turpis fusce platea donec blandit dapibus ex turpis.",
    per2: "Lorem ipsum odor amet, consectetuer adipiscing elit. Imperdiet leo hac congue metus enim natoque eros dignissim sem. Id duis mattis felis leo scelerisque sodales. Bibendum ligula vivamus nam taciti; vel eu. Aclass conubia integer id ridiculus velit accumsan. Non amet vestibulum senectus ac donec dictum himenaeos. Afelis cubilia dolor nisl ac vivamus tellus platea. Turpis fusce platea donec blandit dapibus ex turpis.",
  },
  {
    id: 3,
    image: "project-3.jpg",
    title: "Nike Advertisement",
    tags: ["SPORTS", "FASHION", "MARKETING"],
    description: "Innovative branding for sportswear.",
    complexity: "7/10",
    timeTaken: "5 Months",
    services: ["Sports", "Fashion", "Marketing"],
    per1: "Lorem ipsum odor amet, consectetuer adipiscing elit. Imperdiet leo hac congue metus enim natoque eros dignissim sem. Id duis mattis felis leo scelerisque sodales. Bibendum ligula vivamus nam taciti; vel eu. Aclass conubia integer id ridiculus velit accumsan. Non amet vestibulum senectus ac donec dictum himenaeos. Afelis cubilia dolor nisl ac vivamus tellus platea. Turpis fusce platea donec blandit dapibus ex turpis.",
    per2: "Lorem ipsum odor amet, consectetuer adipiscing elit. Imperdiet leo hac congue metus enim natoque eros dignissim sem. Id duis mattis felis leo scelerisque sodales. Bibendum ligula vivamus nam taciti; vel eu. Aclass conubia integer id ridiculus velit accumsan. Non amet vestibulum senectus ac donec dictum himenaeos. Afelis cubilia dolor nisl ac vivamus tellus platea. Turpis fusce platea donec blandit dapibus ex turpis.",
  },
  {
    id: 4,
    image: "project-4.jpg",
    title: "Adidas Digital Strategy",
    tags: ["TECHNOLOGY", "INNOVATION", "LUXURY"],
    description: "Expanding Adidas's reach through digital campaigns.",
    complexity: "7.5/10",
    timeTaken: "6 Months",
    services: ["Sports", "Branding", "E-commerce"],
    per1: "Lorem ipsum odor amet, consectetuer adipiscing elit. Imperdiet leo hac congue metus enim natoque eros dignissim sem. Id duis mattis felis leo scelerisque sodales. Bibendum ligula vivamus nam taciti; vel eu. Aclass conubia integer id ridiculus velit accumsan. Non amet vestibulum senectus ac donec dictum himenaeos. Afelis cubilia dolor nisl ac vivamus tellus platea. Turpis fusce platea donec blandit dapibus ex turpis.",
    per2: "Lorem ipsum odor amet, consectetuer adipiscing elit. Imperdiet leo hac congue metus enim natoque eros dignissim sem. Id duis mattis felis leo scelerisque sodales. Bibendum ligula vivamus nam taciti; vel eu. Aclass conubia integer id ridiculus velit accumsan. Non amet vestibulum senectus ac donec dictum himenaeos. Afelis cubilia dolor nisl ac vivamus tellus platea. Turpis fusce platea donec blandit dapibus ex turpis.",
  },
  {
    id: 5,
    image: "project-5.jpg",
    title: "Apple Product Launch",
    tags: ["BEVERAGES", "MARKETING", "GLOBAL"],
    description: "Revolutionary branding strategies for Apple.",
    complexity: "9/10",
    timeTaken: "8 Months",
    services: ["Technology", "Branding", "Retail"],
    per1: "Lorem ipsum odor amet, consectetuer adipiscing elit. Imperdiet leo hac congue metus enim natoque eros dignissim sem. Id duis mattis felis leo scelerisque sodales. Bibendum ligula vivamus nam taciti; vel eu. Aclass conubia integer id ridiculus velit accumsan. Non amet vestibulum senectus ac donec dictum himenaeos. Afelis cubilia dolor nisl ac vivamus tellus platea. Turpis fusce platea donec blandit dapibus ex turpis.",
    per2: "Lorem ipsum odor amet, consectetuer adipiscing elit. Imperdiet leo hac congue metus enim natoque eros dignissim sem. Id duis mattis felis leo scelerisque sodales. Bibendum ligula vivamus nam taciti; vel eu. Aclass conubia integer id ridiculus velit accumsan. Non amet vestibulum senectus ac donec dictum himenaeos. Afelis cubilia dolor nisl ac vivamus tellus platea. Turpis fusce platea donec blandit dapibus ex turpis.",
  },
];

const BrandingCard = ({ card, onClick }) => {
  const imgRef = useRef(null);
  const animationRef = useRef(null); // For requestAnimationFrame throttling

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const handleMouseMove = (e) => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);

      animationRef.current = requestAnimationFrame(() => {
        const rect = img.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        let x = (e.clientX - centerX) / (rect.width / 2);
        let y = (e.clientY - centerY) / (rect.height / 2);

        // Clamping values to -1 to 1
        x = Math.max(-1, Math.min(1, x));
        y = Math.max(-1, Math.min(1, y));

        gsap.to(img, {
          rotationX: y * 10, // Adjusted for a more natural tilt
          rotationY: x * -10,
          ease: "linear", // Smoother easing
          duration: 0.05, // Slightly longer duration for fluid motion
        });
      });
    };

    const handleMouseLeave = (e) => {
      gsap.to(img, {
        rotationX: 0, // Adjusted for a more natural tilt
        rotationY: 0,
        ease: "linear", // Smoother easing
        duration: 0.1, // Slightly longer duration for fluid motion
      });
    };

    // img.addEventListener("mousemove", handleMouseMove);
    // img.addEventListener("mouseleave", handleMouseLeave);
    return () => img.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={imgRef}
      className=" text-white rounded-lg overflow-hidden shadow-lg cursor-pointer transition transform perspective-[1000px]"
      onClick={() => onClick(card)}
    >
      <img src={card.image} alt={card.title} className="w-full rounded-2xl " />
      <div className="py-4">
        <div className="text-sm  font-semibold mb-2 space-x-2">
          {card.tags?.map((tag, index) => (
            <span key={index} className="text-white">
              {tag}{" "}
              {index < card.tags.length - 1 && (
                <span className="text-orange-500">•</span>
              )}
            </span>
          ))}
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
          {card.title}
        </h2>
        {/* <p className="text-gray-400 text-sm mt-2">{card.description}</p> */}
      </div>
    </div>
  );
};

const PopupModal = ({ card, onClose }) => {
  const popupRef = useRef(null);
  const popupContainer = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    const tl = gsap.timeline();
    if (card) {
      tl.from(popupRef.current, {
        duration: 1,
        opacity: 0,
        y: 100,
        ease: "power4.inOut",
      });
    }
  }, [popupRef.current, card]);

  let scrollY = 0; // Track scroll position
  let touchStartY = 0; // Track initial touch position

  useEffect(() => {
    if (!popupContainer.current) return;

    const container = popupContainer.current;
    const maxScroll = container.scrollHeight - container.clientHeight + 5;

    // Wheel event handler for desktop
    const handleWheel = (e) => {
      e.preventDefault();
      scrollY -= e.deltaY * 0.5;
      scrollY = Math.max(-maxScroll, Math.min(0, scrollY));
      gsap.to(container, {
        y: scrollY,
        duration: 2,
        ease: "power2.out",
      });
    };

    // Touch event handlers for mobile
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      const touchY = e.touches[0].clientY;
      const deltaY = (touchStartY - touchY) * 0.5; // Adjust speed
      scrollY -= deltaY;
      scrollY = Math.max(-maxScroll, Math.min(0, scrollY));
      gsap.to(container, {
        y: scrollY,
        duration: 0.5, // Faster duration for touch responsiveness
        ease: "power2.out",
      });
      touchStartY = touchY; // Update start position for smooth scrolling
    };

    const handleTouchEnd = () => {
      // Optional: Add inertia or snap-back effect here if desired
    };

    // Add event listeners
    window.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, { passive: false });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });
    container.addEventListener("touchend", handleTouchEnd, { passive: false });

    // Cleanup event listeners
    return () => {
      window.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [card]);

  if (!card) return null;

  return (
    <div
      ref={popupRef}
      data-lenis-prevent
      className="fixed inset-0 flex items-end justify-center overflow-hidden bg-black bg-opacity-60 backdrop-blur-md z-50 px-4 "
    >
      <button
        className="absolute sm:top-[15vh] top-[8vh] cursor-pointer right-[50%] translate-x-[50%] text-black text-xl bg-white p-2 rounded-[50%]"
        onClick={() => {
          gsap.to(popupRef.current, {
            duration: 0.3,
            opacity: 0,
            y: 100,
            ease: "power4.inOut",
            onComplete: () => {
              onClose();
            },
          });
        }}
      >
        ✖
      </button>
      <div className="bg-white rounded-lg rounded-b-none w-full overflow-hidden max-w-[1400px] p-6 relative shadow-xl ">
        <div className="overflow-hidden ">
          <div ref={popupContainer} className="max-h-[500px] popup-container">
            <h2 className="text-2xl font-bold text-center">{card?.title}</h2>
            <p className="text-gray-600 text-center">{card?.description}</p>
            <div className="grid md:grid-cols-3 md:justify-items-center mt-4 py-10 gap-10 px-3">
              <div className="text-sm text-[#202020] max-w-[600px] sm:col-span-2 md:col-auto">
                <p>{card?.per1}</p>
                <p className="mt-3">{card?.per2}</p>
              </div>
              <div className="h-full flex flex-col justify-between ">
                <p className="text-2xl font-bold">
                  Complexity: <br />
                  <span className="text-gray-600 text-[18px]">
                    {card?.complexity}
                  </span>
                </p>
                <p className="text-2xl font-bold">
                  Time Taken: <br />
                  <span className="text-gray-600 text-[18px]">
                    {card?.timeTaken}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-end">Services:</p>
                <ul className="text-gray-600 text-end list-none">
                  {card?.services?.map((service, index) => (
                    <li key={index}>{service}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex justify-center my-4">
              <img
                src={card?.image}
                alt={card?.title}
                className="w-full max-h-96 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CardWrapper = ({ setSelectedCard, from, to }) => {
  const cardRef = useRef(null);
  const cardWrapperRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cardWrapperRef.current,
        start: "top 120%",
        end: window.innerWidth > 628 ?  "top -90%" : "top -40%",
        scrub: 1,
        // markers: true,
      },
    });

    // First animation (scale down while appearing)
    tl.fromTo(
      cardRef.current,
      {
        scale: 1.2,
        opacity: 0,
        rotationX: 40,
      },
      {
        scale: 0.8,
        opacity: 1,
        rotationX: 0,
        duration: 20,
        ease: "power1.inOut", // Changed from linear for smoother blending
      }
    )
      // Second animation (scale up while disappearing)
      .to(
        cardRef.current,
        {
          scale: window.innerWidth > 628 ?  1.2 : 1.1,
          opacity: .2,
          rotationX: -40,
          duration: window.innerWidth > 628 ?  20 : 15,
          ease: "power1.inOut", // Changed from linear
          immediateRender: false, // Ensures smooth transition between animations
        },
        "-=1" // Overlaps the animations by 0.5 seconds to eliminate gap
      );
  }, []);
  return (
    <>
      <div
        ref={cardWrapperRef}
        className="card-wrapper flex flex-col gap-10 perspective-[1000px]"
      >
        <div
          ref={cardRef}
          className=" w-full bg-cover transform-3d translate-3d rotate-x-[30deg] "
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 md:gap-20 perspective-[1000px]">
            {brandingData.slice(from, to).map((card, index) => (
              <BrandingCard
                key={card.id}
                card={card}
                onClick={()=>{
                  console.log(from + index)
                  setSelectedCard(brandingData[from+index])}}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const BrandingGrid = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <>
      <div className="container-xxl">
        {/* Responsive Grid Layout */}

        {window.innerWidth > 628 ? (<>
        <CardWrapper setSelectedCard={setSelectedCard} from={0} to={2} />
        <CardWrapper setSelectedCard={setSelectedCard} from={2} to={4} />
        <CardWrapper setSelectedCard={setSelectedCard} from={4} to={6} />
        <CardWrapper setSelectedCard={setSelectedCard} from={6} to={8} />
        <CardWrapper setSelectedCard={setSelectedCard} from={8} to={10} />
        </>) : (
          <>
          {brandingData.map((c,i)=>(
            <CardWrapper setSelectedCard={setSelectedCard} from={i} to={i+1} />
          ))}
          </>
        )}
      {/* Popup Modal */}
      <PopupModal card={selectedCard} onClose={() => setSelectedCard(null)} />
      </div>
    </>
  );
};

export default BrandingGrid;
