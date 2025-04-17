import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

// Move constant data outside of component
const brandingData = [
  {
    id: 1,
    image: "https://ik.imagekit.io/8mbzq2hdl/digicots/project-1.webp?updatedAt=1744631783188",
    title: "Starbucks Branding",
    tags: ["FOOD", "HOSPITALITY", "BRANDING"],
    description: "Best ideas for branding in the coffee industry.",
    complexity: "6/10",
    timeTaken: "3 Months",
    services: ["Food", "Branding", "Web Design"],
    per1: "Lorem ipsum odor amet, consectetuer adipiscing elit...",
    per2: "Lorem ipsum odor amet, consectetuer adipiscing elit..."
  },
  {
    id: 2,
    image: "https://ik.imagekit.io/8mbzq2hdl/digicots/project-2.webp?updatedAt=1744631784710",
    title: "McDonald's Marketing",
    tags: ["FAST FOOD", "HOSPITALITY", "ADVERTISING"],
    description: "A strategic approach to food marketing.",
    complexity: "8/10",
    timeTaken: "4 Months",
    services: ["Hospitality", "Branding", "Advertisement"],
    per1: "Lorem ipsum odor amet, consectetuer adipiscing elit...",
    per2: "Lorem ipsum odor amet, consectetuer adipiscing elit..."
  },
  {
    id: 3,
    image: "https://ik.imagekit.io/8mbzq2hdl/digicots/project-3.webp?updatedAt=1744631785525",
    title: "Starbucks Branding",
    tags: ["FOOD", "HOSPITALITY", "BRANDING"],
    description: "Best ideas for branding in the coffee industry.",
    complexity: "6/10",
    timeTaken: "3 Months",
    services: ["Food", "Branding", "Web Design"],
    per1: "Lorem ipsum odor amet, consectetuer adipiscing elit...",
    per2: "Lorem ipsum odor amet, consectetuer adipiscing elit..."
  },
  {
    id: 4,
    image: "https://ik.imagekit.io/8mbzq2hdl/digicots/project-4.webp?updatedAt=1744631786341",
    title: "McDonald's Marketing",
    tags: ["FAST FOOD", "HOSPITALITY", "ADVERTISING"],
    description: "A strategic approach to food marketing.",
    complexity: "8/10",
    timeTaken: "4 Months",
    services: ["Hospitality", "Branding", "Advertisement"],
    per1: "Lorem ipsum odor amet, consectetuer adipiscing elit...",
    per2: "Lorem ipsum odor amet, consectetuer adipiscing elit..."
  },
  {
    id: 5,
    image: "https://ik.imagekit.io/8mbzq2hdl/digicots/project-5.webp?updatedAt=1744631787444",
    title: "Starbucks Branding",
    tags: ["FOOD", "HOSPITALITY", "BRANDING"],
    description: "Best ideas for branding in the coffee industry.",
    complexity: "6/10",
    timeTaken: "3 Months",
    services: ["Food", "Branding", "Web Design"],
    per1: "Lorem ipsum odor amet, consectetuer adipiscing elit...",
    per2: "Lorem ipsum odor amet, consectetuer adipiscing elit..."
  },
  {
    id: 6,
    image: "https://ik.imagekit.io/8mbzq2hdl/digicots/project-6.webp?updatedAt=1744631787845",
    title: "McDonald's Marketing",
    tags: ["FAST FOOD", "HOSPITALITY", "ADVERTISING"],
    description: "A strategic approach to food marketing.",
    complexity: "8/10",
    timeTaken: "4 Months",
    services: ["Hospitality", "Branding", "Advertisement"],
    per1: "Lorem ipsum odor amet, consectetuer adipiscing elit...",
    per2: "Lorem ipsum odor amet, consectetuer adipiscing elit..."
  },
  // ... (other data items remain the same, shortened for brevity)
];

// Memoized BrandingCard component
const BrandingCard = React.memo(({ card, onClick }) => {
  const imgRef = useRef(null);
  const animationRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!imageLoaded) return;
    
    if (animationRef.current) cancelAnimationFrame(animationRef.current);

    animationRef.current = requestAnimationFrame(() => {
      const img = imgRef.current;
      if (!img) return;

      const rect = img.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      let x = (e.clientX - centerX) / (rect.width / 2);
      let y = (e.clientY - centerY) / (rect.height / 2);

      x = Math.max(-1, Math.min(1, x));
      y = Math.max(-1, Math.min(1, y));

      gsap.to(img, {
        rotationX: y * 10,
        rotationY: x * -10,
        ease: "linear",
        duration: 0.05,
      });
    });
  }, [imageLoaded]);

  const handleMouseLeave = useCallback(() => {
    if (!imageLoaded) return;
    
    gsap.to(imgRef.current, {
      rotationX: 0,
      rotationY: 0,
      ease: "linear",
      duration: 0.1,
    });
  }, [imageLoaded]);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    // Add event listeners only after image is loaded
    if (imageLoaded) {
      img.addEventListener("mousemove", handleMouseMove);
      img.addEventListener("mouseleave", handleMouseLeave);
    }

    console.log(imageLoaded)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      img.removeEventListener("mousemove", handleMouseMove);
      img.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave, imageLoaded]);

  return (
    <div
      ref={imgRef}
      className="text-white rounded-lg overflow-hidden shadow-lg cursor-pointer transition transform perspective-[1000px]"
      onClick={() => onClick(card)}
    >
      <img 
        src={card.image} 
        alt={card.title} 
        className="w-full h-[60vh] object-cover rounded-2xl"
        onLoad={() => setImageLoaded(true)}
        style={{ display: imageLoaded ? 'block' : 'none' }}
      />
      {!imageLoaded && (
        <div className="w-full h-[200px] bg-gray-800 rounded-2xl animate-pulse"></div>
      )}
      <div className="py-4">
        <div className="text-sm font-semibold mb-2 space-x-2">
          {card.tags?.map((tag, index) => (
            <React.Fragment key={index}>
              <span className="text-white">{tag}</span>
              {index < card.tags.length - 1 && (
                <span className="text-orange-500">•</span>
              )}
            </React.Fragment>
          ))}
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
          {card.title}
        </h2>
      </div>
    </div>
  );
});


// Memoized PopupModal component
const PopupModal = React.memo(({ card, onClose }) => {
  const popupRef = useRef(null);
  const popupContainer = useRef(null);
  const scrollY = useRef(0);
  const touchStartY = useRef(0);

  useGSAP(() => {
    if (card) {
      gsap.from(popupRef.current, {
        duration: 1,
        opacity: 0,
        y: 100,
        ease: "power4.inOut",
      });
    }
  }, [card]);

  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const container = popupContainer.current;
    if (!container) return;

    const maxScroll = container.scrollHeight - container.clientHeight + 5;
    scrollY.current -= e.deltaY * 0.5;
    scrollY.current = Math.max(-maxScroll, Math.min(0, scrollY.current));
    
    gsap.to(container, {
      y: scrollY.current,
      duration: 2,
      ease: "power2.out",
    });
  }, []);

  const handleTouchStart = useCallback((e) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback((e) => {
    e.preventDefault();
    const container = popupContainer.current;
    if (!container) return;

    const maxScroll = container.scrollHeight - container.clientHeight + 5;
    const touchY = e.touches[0].clientY;
    const deltaY = (touchStartY.current - touchY) * 0.5;
    
    scrollY.current -= deltaY;
    scrollY.current = Math.max(-maxScroll, Math.min(0, scrollY.current));
    
    gsap.to(container, {
      y: scrollY.current,
      duration: 0.5,
      ease: "power2.out",
    });
    
    touchStartY.current = touchY;
  }, []);

  useEffect(() => {
    if (!card) return;

    const container = popupContainer.current;
    if (!container) return;

    window.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, { passive: false });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, [card, handleWheel, handleTouchStart, handleTouchMove]);

  if (!card) return null;

  return (
    <div
      ref={popupRef}
      data-lenis-prevent
      className="fixed inset-0 flex items-end bottom-0 z-[1000] justify-center overflow-hidden bg-black bg-opacity-60 backdrop-blur-md px-4"
    >
      <button
        className="absolute sm:top-[15vh] top-[8vh] cursor-pointer right-[50%] translate-x-[50%] text-black text-xl bg-white p-2 rounded-[50%]"
        onClick={() => {
          gsap.to(popupRef.current, {
            duration: 0.3,
            opacity: 0,
            y: 100,
            ease: "power4.inOut",
            onComplete: onClose,
          });
        }}
      >
        ✖
      </button>
      <div className="bg-white rounded-lg rounded-b-none w-full overflow-hidden max-w-[1400px] p-6 relative shadow-xl relative z-50">
        <div className="overflow-hidden">
          <div ref={popupContainer} className="max-h-[400px] popup-container">
            <h2 className="text-2xl font-bold text-center">{card.title}</h2>
            <p className="text-gray-600 text-center">{card.description}</p>
            <div className="grid md:grid-cols-3 md:justify-items-center mt-4 py-10 gap-10 px-3">
              <div className="text-sm text-[#202020] max-w-[600px] sm:col-span-2 md:col-auto">
                <p>{card.per1}</p>
                <p className="mt-3">{card.per2}</p>
              </div>
              <div className="h-full flex flex-col justify-between">
                <p className="text-2xl font-bold">
                  Complexity: <br />
                  <span className="text-gray-600 text-[18px]">
                    {card.complexity}
                  </span>
                </p>
                <p className="text-2xl font-bold">
                  Time Taken: <br />
                  <span className="text-gray-600 text-[18px]">
                    {card.timeTaken}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-end">Services:</p>
                <ul className="text-gray-600 text-end list-none">
                  {card.services?.map((service) => (
                    <li key={service}>{service}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex justify-center my-4">
              <img
                src={card.image}
                alt={card.title}
                className="w-full max-h-96 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

// Memoized CardWrapper component
const CardWrapper = React.memo(({ setSelectedCard, from, to }) => {
  const cardRef = useRef(null);
  const cardWrapperRef = useRef(null);
  const isDesktop = window.innerWidth > 628;

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cardWrapperRef.current,
        start: "top 120%",
        end: isDesktop ? "top -90%" : "top -40%",
        scrub: 1,
      },
    });

    tl.fromTo(
      cardRef.current,
      { scale: 1.2, opacity: 0, rotationX: 40 },
      { scale: 0.8, opacity: 1, rotationX: 0, duration: 20, ease: "power1.inOut" }
    ).to(
      cardRef.current,
      { 
        scale: isDesktop ? 1.2 : 1.1, 
        opacity: 0.2, 
        rotationX: -40, 
        duration: isDesktop ? 20 : 15, 
        ease: "power1.inOut",
        immediateRender: false 
      },
      "-=1"
    );
  }, [isDesktop]);

  const handleCardClick = useCallback((index) => {
    setSelectedCard(brandingData[from + index]);
  }, [from, setSelectedCard]);

  return (
    <div ref={cardWrapperRef} className="card-wrapper flex flex-col gap-10 perspective-[1000px]">
      <div ref={cardRef} className="w-full bg-cover transform-3d translate-3d rotate-x-[30deg]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 md:gap-20 perspective-[1000px]">
          {brandingData.slice(from, to).map((card, index) => (
            <BrandingCard
              key={`${card.id}-${index}`}
              card={card}
              onClick={() => handleCardClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

// Main BrandingGrid component

const BrandingGrid = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("i");
  const [selectedCard, setSelectedCard] = useState(null);
  const isDesktop = useMemo(() => window.innerWidth > 628, []);

  // 🔁 Refresh the page once when this component mounts
  useEffect(() => {
    const hasRefreshed = sessionStorage.getItem("hasRefreshed");
    if (!hasRefreshed) {
      sessionStorage.setItem("hasRefreshed", "true");
      window.location.reload();
    }

    return()=>{
      setTimeout(()=>{
        sessionStorage.removeItem("hasRefreshed")
      },2000)
    }
  }, []);

  useEffect(() => {
    if (id) {
      const cardIndex = parseInt(id, 10);
      if (!isNaN(cardIndex) && brandingData[cardIndex]) {
        setSelectedCard(brandingData[cardIndex]);
      }
    }
  }, [id]);

  const cardWrappers = useMemo(() => {
    if (isDesktop) {
      return [0, 2, 4, 6, 8].map((from) => (
        <CardWrapper
          key={`desktop-${from}`}
          setSelectedCard={setSelectedCard}
          from={from}
          to={from + 2}
        />
      ));
    }
    return brandingData.map((_, i) => (
      <CardWrapper
        key={`mobile-${i}`}
        setSelectedCard={setSelectedCard}
        from={i}
        to={i + 1}
      />
    ));
  }, [isDesktop]);

  return (
    <div className="container-xxl">
      {cardWrappers}
      <PopupModal card={selectedCard} onClose={() => setSelectedCard(null)} />
    </div>
  );
};

export default React.memo(BrandingGrid);