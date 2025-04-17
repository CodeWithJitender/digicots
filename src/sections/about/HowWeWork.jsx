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
      heading: "Smell the Wind (Discovery & Vision Alignment)",
      pera: "We sniff out every detail, dig deep – your goals, your challenges, your hidden opportunities.",
      list: [
        "What are the obstacles blocking your path to excellence?",
        "Where is the untapped potential waiting to explode?",
        "What’s the vision that fuels your fire?",
      ],
      quoat: "Your vision becomes our obsession.",
      bgColor: "bg-gray-900",
      textColor: "text-white",
      img: "https://ik.imagekit.io/8mbzq2hdl/digicots/wolf-face.png?updatedAt=1744631748121",
    },
    {
      id: 2,
      step: "STEP 2",
      heading: "Sharpen the Claws (Strategy Development)",
      pera: "We craft systems that are precise, powerful and purpose-driven.",
      list: [
        "We design systems that cut through the noise.",
        "Data-driven actionable insights help us predict the next big opportunity.",
        "Infuse bold creativity into systems tailored for you.",
      ],
      quoat: "Our instinct is your advantage.",
      bgColor: "bg-gray-700",
      textColor: "text-white",
      img: "https://ik.imagekit.io/8mbzq2hdl/digicots/wolf-face.png?updatedAt=1744631748121",
    },
    {
      id: 3,
      step: "STEP 3",
      heading: "Set the Pack in Motion (Execution & System Creation – Make it Real!)",
      pera: "Fast. Fierce. Relentless.",
      list: [
        "We create systems that adapt, endure and drive momentum.",
        "We balance creativity with practicality – our duality gives you the edge.",
        "We dominate the ever-changing trends, industry norms and practices.",
      ],
      quoat: "This isn’t execution. This is a movement.",
      bgColor: "bg-orange-500",
      textColor: "text-white",
      img: "https://ik.imagekit.io/8mbzq2hdl/digicots/wolf-face.png?updatedAt=1744631748121",
    },
    {
      id: 4,
      step: "STEP 4",
      heading: "Guard the Territory (Optimize & Dominate)",
      pera: "Paranoid. Protective. Ferocious. Always keeping an eye for sudden changes and threats.",
      list: [
        "We track each metric, knowing exactly when to strike again.",
        "We strike out weak spots and double down on our strengths.",
        "We ensure your brand remains at the peak.",
      ],
      quoat: "Survival is only the beginning. Domination is the goal.",
      bgColor: "bg-orange-700",
      textColor: "text-white",
      img: "https://ik.imagekit.io/8mbzq2hdl/digicots/wolf-face.png?updatedAt=1744631748121",
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
            per={'With us, you don’t just play the game – you own it. The hunt never stops. Absolute domination.'}
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
