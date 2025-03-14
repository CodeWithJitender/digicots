import React, { useRef } from "react";
import HeadingWithLink from "../../components/HeadingWithLink";
import WolfCard from "../../components/WolfCards";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

function HowWeWork() {
  const cardList = [
    {
      id: 1,
      step: "STEP 1",
      heading: "Hunt the Weak (Identify & Attack)",
      pera: "We identify weak points and strike with precision.",
      list: [
        "Analyze competition weaknesses.",
        "Target the most vulnerable spots.",
        "Strike with a tailored strategy.",
      ],
      quoat: "Only the strongest survive.",
      bgColor: "bg-gray-900",
      textColor: "text-white",
      img: "/wolf-face.png",
    },
    {
      id: 2,
      step: "STEP 2",
      heading: "Mark the Territory (Establish & Expand)",
      pera: "We solidify our presence and dominate the market.",
      list: [
        "Build a strong brand foundation.",
        "Expand into new digital landscapes.",
        "Dominate through consistency.",
      ],
      quoat: "Claim what’s yours and make it unshakable.",
      bgColor: "bg-gray-700",
      textColor: "text-white",
      img: "/wolf-face.png",
    },
    {
      id: 3,
      step: "STEP 3",
      heading: "Lead the Pack (Innovate & Inspire)",
      pera: "We don’t follow trends, we create them.",
      list: [
        "Innovate with cutting-edge strategies.",
        "Set the industry standard.",
        "Inspire others to follow your lead.",
      ],
      quoat: "A true leader runs with the pack but leads from the front.",
      bgColor: "bg-orange-500",
      textColor: "text-white",
      img: "/wolf-face.png",
    },
    {
      id: 4,
      step: "STEP 4",
      heading: "Guard the Territory (Optimize & Dominate)",
      pera: "Paranoid. Protective. Ferocious. Always keeping an eye for sudden changes and threats",
      list: [
        "We track each metric, knowing exactly when to strike again.",
        "We strike out weak spots and double down on our maniac side.",
        "We ensure your brand remains at the peak.",
      ],
      quoat: "Survival is only the beginning. Domination is the goal.",
      bgColor: "bg-orange-700",
      textColor: "text-white",
      img: "/wolf-face.png",
    },
  ];

  const cardsRef = useRef([]);
  gsap.registerPlugin(ScrollTrigger);
  useGSAP(() => {
    if(window.innerWidth>600){
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".how-we-work",
          start: "top 0%",
          end: "top -100%",
          scrub: 1,
        },
      });
      tl.from(cardsRef.current, {
        left:"150%",
        stagger:.3
      });
    }
    else{
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".how-we-work",
          start: "top 0%",
          end: "top -100%",
          scrub: 1,
        },
      });
      tl.from(cardsRef.current, {
        top:"150%",
        stagger:.3
      });
    }
  }, [cardsRef.current,window.innerWidth]);
  console.log(cardsRef)

  return (
    <div className="min-h-[200vh]">
      <section className=" sticky top-0 how-we-work py-10 overflow-hidden">
        <div className="min-h-screen container mx-auto px-4">
          {/* Heading Section */}
          <HeadingWithLink
            head="HOW WE WORK?!"
            link="/contact"
            linkh="Contact Us"
          />

          {/* Grid Layout for Cards */}
          <div className="relative mt-28 w-full">
            {cardList.map((card, i) => (
              <WolfCard
                ref={(el) => (cardsRef.current[i] = el)}
                key={card.id}
                {...card}
                className="absolute"
                style={window.innerWidth > 600 ? { left: `${i * 8.5}%`, width: `${100 - 3.7*8.5}% ` } : { top: `${i * 10}%`, }}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HowWeWork;
