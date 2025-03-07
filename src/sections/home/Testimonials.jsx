import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import MainHeading from "../../components/MainHeading";

function Testimonials() {
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: "John Doe",
      position: "CEO Ashwary.Design",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,",
      img: "testimonial-1.jpg",
      isCenter: false,
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "CEO Ashwary.Design",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,",
      img: "testimonial-2.jpg",
      isCenter: false,
    },
    {
      id: 3,
      name: "Ashwary Sinha",
      position: "CEO Ashwary.Design",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,",
      img: "testimonial-3.jpg",
      isCenter: false,
    },
    {
      id: 4,
      name: "Ashwary Sinha",
      position: "CEO Ashwary.Design",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,",
      img: "testimonial-4.jpg",
      isCenter: false,
    },
    {
      id: 5,
      name: "Ashwary Sinha",
      position: "CEO Ashwary.Design",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,",
      img: "testimonial-5.jpg",
      isCenter: false,
    },
  ]);

  const scrollRef = useRef(null);
  const lastScrollLeft = useRef(0);

  const updateCenterElement = () => {
    if (!scrollRef.current) return;

    const scrollLeft = scrollRef.current.scrollLeft;
    const containerWidth = scrollRef.current.clientWidth;
    const centerPosition = scrollLeft + containerWidth / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    testimonials.forEach((_, index) => {
      const element = scrollRef.current.children[index];
      const elementCenter = element.offsetLeft + element.clientWidth / 2;
      const distance = Math.abs(centerPosition - elementCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    setTestimonials((prev) =>
      prev.map((t, i) => ({ ...t, isCenter: i === closestIndex }))
    );
  };

  useEffect(() => {
    updateCenterElement();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      updateCenterElement();
      const currentScrollLeft = scrollRef.current.scrollLeft;
      const direction = currentScrollLeft > lastScrollLeft.current ? 1 : -1;
      lastScrollLeft.current = currentScrollLeft;

      gsap.to(".testimonial-item img", {
        duration: 1,
        x: (_, el) =>
          window.innerWidth > 768 ? direction * 20 : direction * 10,
        ease: "power2.out",
      });
    };

    const ref = scrollRef.current;
    ref?.addEventListener("scroll", handleScroll);
    return () => ref?.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    gsap.to(".testimonial-item", {
      duration: 1,
      width: (i) =>
        testimonials[i].isCenter
          ? window.innerWidth > 768
            ? "350px"
            : "250px"
          : "180px",
      filter: (i) => (testimonials[i].isCenter ? "none" : "grayscale(100%)"),
      ease: "power2.out",
    });

    gsap.to(".testimonial-text", {
      duration: 0.5,
      opacity: (i) => (testimonials[i].isCenter ? 0 : 0),
    });
  }, [testimonials]);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 250 : 200;
      scrollRef.current.scrollLeft +=
        direction === "left" ? -scrollAmount : scrollAmount;
    }
  };

  return (
    <section className="testimonial relative py-10">
      <div className="container mx-auto">
        <MainHeading
          heading="TESTIMONIALS"
          pera="Lorem ipsum dolor sit amet, consectetur adipiscing"
          cl="text-center"
          tColor="black"
        />
        <div className="relative max-w-7xl overflow-hidden mx-auto">
          <button
            className="absolute cursor-pointer left-2 top-1/2 -translate-y-1/2 text-white p-2 md:p-3 rounded-full z-10"
            onClick={() => handleScroll("left")}
          >
            ◀
          </button>

          <div
            ref={scrollRef}
            className="w-full flex flex-nowrap gap-4 md:gap-10 mt-6 px-[20vw] md:px-[30vw] overflow-x-auto no-scrollBar rounded-lg scroll-smooth"
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="testimonial-item relative h-[250px] md:h-[400px] rounded-lg flex-shrink-0 overflow-hidden"
                onMouseEnter={() => {
                  if (t.isCenter) {
                    gsap.to(`.testimonial-text-${t.id}`, {
                      opacity: 1,
                      duration: 0.5,
                      top:0
                    });
                  }
                }}
                onMouseMove={() => {
                  if (t.isCenter) {
                    gsap.to(`.testimonial-text-${t.id}`, {
                      opacity: 1,
                      duration: 0.5,
                      top:0
                    });
                  }
                }}
                onMouseLeave={() => {
                  if (t.isCenter) {
                    gsap.to(`.testimonial-text-${t.id}`, {
                      opacity: 0,
                      duration: 0.5,
                      top:"100%"
                    });
                  }
                }}
              >
                <div
                  className={`testimonial-text cursor-pointer rounded-lg testimonial-text-${t.id} absolute h-full w-full bg-[#202020] top-[100%] left-0 z-10 opacity-0 rounded-2xl p-5 flex flex-col justify-between`}
                >
                  <p className="font-inter  text-white text-[14px]">{t.text}</p>
                  <div>
                    <div className="name font-inter  text-white text-[20px]">
                      {t.name}
                    </div>
                    <div className="position font-inter font-bold  text-white text-[14px]">
                      {t.position}
                    </div>
                  </div>
                </div>
                <div className="h-full w-full max-w-[250px] md:max-w-[400px] rounded-lg overflow-hidden">
                  <img
                    src={t.img}
                    className="h-full w-full scale-[1.3] object-cover"
                    alt={t.name}
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 text-white p-2 md:p-3 rounded-full z-10"
            onClick={() => handleScroll("right")}
          >
            ▶
          </button>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
