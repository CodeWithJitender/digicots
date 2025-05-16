import React, { useRef, useState, useEffect } from "react";
import HeadingWithLink from "../../components/HeadingWithLink";
import WolfCard from "../../components/WolfCards";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

function HowWeWork({ setComponentLoaded }) {
  const cardList = [
    {
      id: 1,
      step: "STEP 1",
      heading: " Smell the Wind (Discovery & Vision Alignment)",
      pera: "We sniff out every detail, dig deep – your goals, your challenges, your hidden opportunities.",
      list: [
        "What are the obstacles blocking your path to excellence?",
        "Where is the untapped potential waiting to explode?",
        "What’s the vision that fuels your fire?",
      ],
      quoat: "Your vision becomes our obsession.",
      bgColor: "bg-[#F3A265]",
      textColor: "text-white",
      img: "https://digicots.com/images/how-it-works.png",
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
      bgColor: "bg-[#2A2A2A]",
      textColor: "text-white",
      img: "https://digicots.com/images/how-it-works.png",
    },
    {
      id: 3,
      step: "STEP 3",
      heading: "Set the Pack in Motion (Execution & System Creation – Make it Real!)",
      pera: "Fast. Fierce. Relentless. ",
      list: [
        "We create systems that adapt, endure and drive momentum.",
        "We balance creativity with practicality – our duality gives you the edge.",
        "We dominate the ever-changing trends, industry norms and practices.",
      ],
      quoat: "This isn’t execution. This is a movement.",
      bgColor: "bg-[#515151]",
      textColor: "text-white",
      img: "https://digicots.com/images/how-it-works.png",
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
      bgColor: "bg-[#F3A265]",
      textColor: "text-white",
      img: "https://digicots.com/images/how-it-works.png",
    },
  ];

  const cardsRef = useRef([]);
  const sectionRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 600);

  // Handle resize to update isDesktop state
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 600);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(()=>{
    setComponentLoaded((prev) => ({ ...prev, howWeWork: true }));
  },[setComponentLoaded])


  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    if (!sectionRef.current || !cardsRef.current.length) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%", // Adjusted for smoother trigger
        end: "top -300%",
        scrub: 1,
      },
    });

    if (isDesktop) {
      tl.from(cardsRef.current, {
        x: (i)=> -(i+1)*150 + "%" , // Changed to percentage for consistency
        duration: 5,
        ease: "power1.inOut",
        stagger: 0.3,
      });
    } else {
      tl.fromTo(
        cardsRef.current,
        {
          top: "100%",
          opacity: 0,
        },
        {
          top: "0%",
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          stagger: 1.2,
        }
      );
    }
  }, [isDesktop]);

  return (
    <div className="relative min-h-[400vh]">
      <section ref={sectionRef} className="sticky top-0 min-h-screen how-we-work py-10 overflow-hidden">
        <div className="min-h-screen container mx-auto px-4">
          {/* Heading Section */}
          <HeadingWithLink
            head="HOW WE WORK?!"
            link="/contact"
            linkh="Contact Us"
          />

          {/* Grid Layout for Cards */}
          <div className="relative md:mt-[2vh] w-full flex h-[60vh] flex-col md:flex-row gap-5">
            {cardList.map((card, i) => (
              <WolfCard
                ref={(el) => (cardsRef.current[i] = el)}
                key={card.id}
                {...card}
                className="absolute md:relative"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HowWeWork;