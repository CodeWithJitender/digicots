import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useEffect, useRef, useState } from "react";
import { useLenis } from "../../App";

const brandingData = [
  {
    id: 1,
    image: "project-1.webp",
    title: "Charlie’s Organics",
    tags: ["HTML5", "CSS3", "React.js", "Vue.js", "GSAP", "JQuery"],
    description: "Best ideas for branding in the coffee industry.",
    complexity: "TAT",
    timeTaken: "3 Months",
    services: ["HTML5", "CSS3", "React.js", "Vue.js", "GSAP", "JQuery"],
    pera: [
      "Charlie’s Organics is a vibrant digital store that embodies the brand’s commitment to healthy, organic refreshment with a sleek, modern interface designed to impress and engage its audience.",
      "At its core, the website is a visually compelling, responsive platform that seamlessly showcases an array of products, all presented with clean, crisp imagery and intuitive navigation. From a developer’s perspective, the site is built on a robust foundation using HTML5 for semantic structure and CSS3 for polished, responsive styling. These core technologies work hand-in-hand to ensure that every element from the grid-based product layout to the animated transitions operates flawlessly across devices, whether accessed on mobile, tablet or desktop. JavaScript is skillfully utilized to handle dynamic content and interactive elements such as smooth-scrolling navigation menus, interactive product carousels and responsive forms that capture customer orders and inquiries with ease. While the website’s front-end appears streamlined and lightweight, it likely incorporates trusted JavaScript libraries such as jQuery or even frameworks like React or Vue to manage state, handle events and deliver those pleasing micro-interactions that keep users engaged. Moreover, this modern approach ensures that the website not only meets but exceeds performance benchmarks with fast load times and a secure environment, a critical factor for any ecommerce or product-focused digital presence. With responsive design techniques, quality imagery and an intuitive layout, the site encapsulates the philosophy of doing well by doing good.",
      "Understanding the intricate development process behind Charlie’s Organics highlights our capacity to create similarly impactful websites for our clients. We bring expertise in front-end and back-end technologies, mastery of responsive design and a keen eye for aesthetic detail that delivers an engaging digital experience. With our comprehensive approach of utilizing industry-standard languages like HTML5, CSS3, JavaScript and powerful frameworks that streamline development, we are well-equipped to build a website that mirrors the exemplary standards set by Charlie’s Organics, tailored specifically to meet your business goals. Rest assured, our team is ready to translate your vision into a robust, dynamic online presence that captivates your audience and drives your brand’s success.",
    ],
  },
  {
    id: 2,
    image: "project-2.webp",
    title: "McDonald's Marketing",
    tags: ["FAST FOOD", "HOSPITALITY", "ADVERTISING"],
    description: "A strategic approach to food marketing.",
    complexity: "8/10",
    timeTaken: "4 Months",
    services: ["Hospitality", "Branding", "Advertisement"],
    pera: [
      "Charlie’s Organics is a vibrant digital store that embodies the brand’s commitment to healthy, organic refreshment with a sleek, modern interface designed to impress and engage its audience.",
      "At its core, the website is a visually compelling, responsive platform that seamlessly showcases an array of products, all presented with clean, crisp imagery and intuitive navigation. From a developer’s perspective, the site is built on a robust foundation using HTML5 for semantic structure and CSS3 for polished, responsive styling. These core technologies work hand-in-hand to ensure that every element from the grid-based product layout to the animated transitions operates flawlessly across devices, whether accessed on mobile, tablet or desktop. JavaScript is skillfully utilized to handle dynamic content and interactive elements such as smooth-scrolling navigation menus, interactive product carousels and responsive forms that capture customer orders and inquiries with ease. While the website’s front-end appears streamlined and lightweight, it likely incorporates trusted JavaScript libraries such as jQuery or even frameworks like React or Vue to manage state, handle events and deliver those pleasing micro-interactions that keep users engaged. Moreover, this modern approach ensures that the website not only meets but exceeds performance benchmarks with fast load times and a secure environment, a critical factor for any ecommerce or product-focused digital presence. With responsive design techniques, quality imagery and an intuitive layout, the site encapsulates the philosophy of doing well by doing good.",
      "Understanding the intricate development process behind Charlie’s Organics highlights our capacity to create similarly impactful websites for our clients. We bring expertise in front-end and back-end technologies, mastery of responsive design and a keen eye for aesthetic detail that delivers an engaging digital experience. With our comprehensive approach of utilizing industry-standard languages like HTML5, CSS3, JavaScript and powerful frameworks that streamline development, we are well-equipped to build a website that mirrors the exemplary standards set by Charlie’s Organics, tailored specifically to meet your business goals. Rest assured, our team is ready to translate your vision into a robust, dynamic online presence that captivates your audience and drives your brand’s success.",
    ],
  },
  {
    id: 3,
    image: "project-3.webp",
    title: "Nike Advertisement",
    tags: ["SPORTS", "FASHION", "MARKETING"],
    description: "Innovative branding for sportswear.",
    complexity: "7/10",
    timeTaken: "5 Months",
    services: ["Sports", "Fashion", "Marketing"],
    pera: [
      "Charlie’s Organics is a vibrant digital store that embodies the brand’s commitment to healthy, organic refreshment with a sleek, modern interface designed to impress and engage its audience.",
      "At its core, the website is a visually compelling, responsive platform that seamlessly showcases an array of products, all presented with clean, crisp imagery and intuitive navigation. From a developer’s perspective, the site is built on a robust foundation using HTML5 for semantic structure and CSS3 for polished, responsive styling. These core technologies work hand-in-hand to ensure that every element from the grid-based product layout to the animated transitions operates flawlessly across devices, whether accessed on mobile, tablet or desktop. JavaScript is skillfully utilized to handle dynamic content and interactive elements such as smooth-scrolling navigation menus, interactive product carousels and responsive forms that capture customer orders and inquiries with ease. While the website’s front-end appears streamlined and lightweight, it likely incorporates trusted JavaScript libraries such as jQuery or even frameworks like React or Vue to manage state, handle events and deliver those pleasing micro-interactions that keep users engaged. Moreover, this modern approach ensures that the website not only meets but exceeds performance benchmarks with fast load times and a secure environment, a critical factor for any ecommerce or product-focused digital presence. With responsive design techniques, quality imagery and an intuitive layout, the site encapsulates the philosophy of doing well by doing good.",
      "Understanding the intricate development process behind Charlie’s Organics highlights our capacity to create similarly impactful websites for our clients. We bring expertise in front-end and back-end technologies, mastery of responsive design and a keen eye for aesthetic detail that delivers an engaging digital experience. With our comprehensive approach of utilizing industry-standard languages like HTML5, CSS3, JavaScript and powerful frameworks that streamline development, we are well-equipped to build a website that mirrors the exemplary standards set by Charlie’s Organics, tailored specifically to meet your business goals. Rest assured, our team is ready to translate your vision into a robust, dynamic online presence that captivates your audience and drives your brand’s success.",
    ],
  },
  {
    id: 4,
    image: "project-4.webp",
    title: "Adidas Digital Strategy",
    tags: ["TECHNOLOGY", "INNOVATION", "LUXURY"],
    description: "Expanding Adidas's reach through digital campaigns.",
    complexity: "7.5/10",
    timeTaken: "6 Months",
    services: ["Sports", "Branding", "E-commerce"],
    pera: [
      "Charlie’s Organics is a vibrant digital store that embodies the brand’s commitment to healthy, organic refreshment with a sleek, modern interface designed to impress and engage its audience.",
      "At its core, the website is a visually compelling, responsive platform that seamlessly showcases an array of products, all presented with clean, crisp imagery and intuitive navigation. From a developer’s perspective, the site is built on a robust foundation using HTML5 for semantic structure and CSS3 for polished, responsive styling. These core technologies work hand-in-hand to ensure that every element from the grid-based product layout to the animated transitions operates flawlessly across devices, whether accessed on mobile, tablet or desktop. JavaScript is skillfully utilized to handle dynamic content and interactive elements such as smooth-scrolling navigation menus, interactive product carousels and responsive forms that capture customer orders and inquiries with ease. While the website’s front-end appears streamlined and lightweight, it likely incorporates trusted JavaScript libraries such as jQuery or even frameworks like React or Vue to manage state, handle events and deliver those pleasing micro-interactions that keep users engaged. Moreover, this modern approach ensures that the website not only meets but exceeds performance benchmarks with fast load times and a secure environment, a critical factor for any ecommerce or product-focused digital presence. With responsive design techniques, quality imagery and an intuitive layout, the site encapsulates the philosophy of doing well by doing good.",
      "Understanding the intricate development process behind Charlie’s Organics highlights our capacity to create similarly impactful websites for our clients. We bring expertise in front-end and back-end technologies, mastery of responsive design and a keen eye for aesthetic detail that delivers an engaging digital experience. With our comprehensive approach of utilizing industry-standard languages like HTML5, CSS3, JavaScript and powerful frameworks that streamline development, we are well-equipped to build a website that mirrors the exemplary standards set by Charlie’s Organics, tailored specifically to meet your business goals. Rest assured, our team is ready to translate your vision into a robust, dynamic online presence that captivates your audience and drives your brand’s success.",
    ],
  },
  {
    id: 5,
    image: "project-5.webp",
    title: "Apple Product Launch",
    tags: ["BEVERAGES", "MARKETING", "GLOBAL"],
    description: "Revolutionary branding strategies for Apple.",
    complexity: "9/10",
    timeTaken: "8 Months",
    services: ["Technology", "Branding", "Retail"],
    pera: [
      "Charlie’s Organics is a vibrant digital store that embodies the brand’s commitment to healthy, organic refreshment with a sleek, modern interface designed to impress and engage its audience.",
      "At its core, the website is a visually compelling, responsive platform that seamlessly showcases an array of products, all presented with clean, crisp imagery and intuitive navigation. From a developer’s perspective, the site is built on a robust foundation using HTML5 for semantic structure and CSS3 for polished, responsive styling. These core technologies work hand-in-hand to ensure that every element from the grid-based product layout to the animated transitions operates flawlessly across devices, whether accessed on mobile, tablet or desktop. JavaScript is skillfully utilized to handle dynamic content and interactive elements such as smooth-scrolling navigation menus, interactive product carousels and responsive forms that capture customer orders and inquiries with ease. While the website’s front-end appears streamlined and lightweight, it likely incorporates trusted JavaScript libraries such as jQuery or even frameworks like React or Vue to manage state, handle events and deliver those pleasing micro-interactions that keep users engaged. Moreover, this modern approach ensures that the website not only meets but exceeds performance benchmarks with fast load times and a secure environment, a critical factor for any ecommerce or product-focused digital presence. With responsive design techniques, quality imagery and an intuitive layout, the site encapsulates the philosophy of doing well by doing good.",
      "Understanding the intricate development process behind Charlie’s Organics highlights our capacity to create similarly impactful websites for our clients. We bring expertise in front-end and back-end technologies, mastery of responsive design and a keen eye for aesthetic detail that delivers an engaging digital experience. With our comprehensive approach of utilizing industry-standard languages like HTML5, CSS3, JavaScript and powerful frameworks that streamline development, we are well-equipped to build a website that mirrors the exemplary standards set by Charlie’s Organics, tailored specifically to meet your business goals. Rest assured, our team is ready to translate your vision into a robust, dynamic online presence that captivates your audience and drives your brand’s success.",
    ],
  },
  {
    id: 6,
    image: "project-6.webp",
    title: "Apple Product Launch",
    tags: ["BEVERAGES", "MARKETING", "GLOBAL"],
    description: "Revolutionary branding strategies for Apple.",
    complexity: "9/10",
    timeTaken: "8 Months",
    services: ["Technology", "Branding", "Retail"],
    pera: [
      "Charlie’s Organics is a vibrant digital store that embodies the brand’s commitment to healthy, organic refreshment with a sleek, modern interface designed to impress and engage its audience.",
      "At its core, the website is a visually compelling, responsive platform that seamlessly showcases an array of products, all presented with clean, crisp imagery and intuitive navigation. From a developer’s perspective, the site is built on a robust foundation using HTML5 for semantic structure and CSS3 for polished, responsive styling. These core technologies work hand-in-hand to ensure that every element from the grid-based product layout to the animated transitions operates flawlessly across devices, whether accessed on mobile, tablet or desktop. JavaScript is skillfully utilized to handle dynamic content and interactive elements such as smooth-scrolling navigation menus, interactive product carousels and responsive forms that capture customer orders and inquiries with ease. While the website’s front-end appears streamlined and lightweight, it likely incorporates trusted JavaScript libraries such as jQuery or even frameworks like React or Vue to manage state, handle events and deliver those pleasing micro-interactions that keep users engaged. Moreover, this modern approach ensures that the website not only meets but exceeds performance benchmarks with fast load times and a secure environment, a critical factor for any ecommerce or product-focused digital presence. With responsive design techniques, quality imagery and an intuitive layout, the site encapsulates the philosophy of doing well by doing good.",
      "Understanding the intricate development process behind Charlie’s Organics highlights our capacity to create similarly impactful websites for our clients. We bring expertise in front-end and back-end technologies, mastery of responsive design and a keen eye for aesthetic detail that delivers an engaging digital experience. With our comprehensive approach of utilizing industry-standard languages like HTML5, CSS3, JavaScript and powerful frameworks that streamline development, we are well-equipped to build a website that mirrors the exemplary standards set by Charlie’s Organics, tailored specifically to meet your business goals. Rest assured, our team is ready to translate your vision into a robust, dynamic online presence that captivates your audience and drives your brand’s success.",
    ],
  },
];

const BrandingCard = ({ card, onClick }) => {
  const cardRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(cardRef.current, {
      duration: 0.3,
      opacity: 0,
      y: 20,
      ease: "power4.inOut",
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 70%",
        end: "top 40%",
        scrub: 1,
      },
    });
  }, [cardRef.current]);

  return (
    <div
      ref={cardRef}
      className="bg-black text-white rounded-lg overflow-hidden shadow-lg cursor-pointer transition transform hover:scale-105"
      onClick={() => onClick(card)}
    >
      <img src={card.image} alt={card.title} className="w-full rounded-2xl" />
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
  // const lenis = useLenis();

  // useEffect(() => {
  //     console.log(lenis);
  //     lenis?.stop(); // Disable Lenis smooth scroll

  //   return () => {
  //     if (lenis) {
  //       lenis.start(); // Re-enable Lenis smooth scroll
  //     }
  //   };
  // }, [lenis,card]);

  const popupRef = useRef(null);

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
  if (!card) return null;

  return (
    <div
      ref={popupRef}
      className="fixed inset-0 flex items-end justify-center bg-black bg-opacity-60 backdrop-blur-md z-50 px-4 "
    >
      <div className="bg-white rounded-lg rounded-b-none w-full max-w-[1400px] p-6 relative shadow-xl ">
        <button
          className="absolute top-[-80px] cursor-pointer right-[50%] transform-[-50%] text-black text-xl bg-white p-2 rounded-[50%]"
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
        <div className="max-h-[500px] overflow-y-auto popup-container">
          <h2 className="text-2xl font-bold text-center">{card?.title}</h2>
          <p className="text-gray-600 text-center">{card?.description}</p>
          <div className="grid md:grid-cols-3 md:justify-items-center mt-4 py-10 gap-10 px-3">
            <div className="text-sm text-[#202020] max-w-[600px] sm:col-span-2 md:col-auto">
              {pera.map((p, index) => (
                <p className="mb-3">{p}</p>
              ))}
              {/* <p>{card?.per1}</p>
              <p className="mt-3">{card?.per2}</p> */}
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
                {card?.services.map((service, index) => (
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
  );
};

const BrandingGrid = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <div className="container-xxl">
      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 md:gap-20">
        {brandingData.map((card, index) => (
          <BrandingCard key={card.id} card={card} onClick={setSelectedCard} />
        ))}
      </div>

      {/* Popup Modal */}
      <PopupModal card={selectedCard} onClose={() => setSelectedCard(null)} />
    </div>
  );
};

export default BrandingGrid;
