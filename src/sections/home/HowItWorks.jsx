import React, { useState, useEffect, useRef, useCallback } from "react";
import MainHeading from "../../components/MainHeading";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import HowItWorksCanvas from "../../animation/canvas/HowItsWorkCanvas";
import WolfCard from "../../components/WolfCards";

// Register plugins once
gsap.registerPlugin(ScrollTrigger);

const HowItWorks = () => {
  const data = [
    {
      h1: "STEP 1",
      h2: "Smell the Wind",
      p: "Your vision becomes our obsession.",
      img: "https://ik.imagekit.io/x5xessyka/digicots/public/wolf-face.png",
      h_color: "#2A2A2A",
      bg_Color: "#F3A265",
    },
    {
      h1: "STEP 2",
      h2: "Sharpen the Claws",
      p: "Our instinct is your advantage.",
      img: "https://ik.imagekit.io/x5xessyka/digicots/public/wolf-face.png",
      h_color: "#F3A265",
      bg_Color: "#2A2A2A",
    },
    {
      h1: "STEP 3",
      h2: "Set the Pack in Motion",
      p: "This isn't execution. This is a movement.",
      img: "https://ik.imagekit.io/x5xessyka/digicots/public/wolf-face.png",
      h_color: "#F3A265",
      bg_Color: "#515151",
    },
    {
      h1: "STEP 4",
      h2: "Guard the Territory",
      p: "Survival is only the beginning. Domination is the goal.",
      img: "https://ik.imagekit.io/x5xessyka/digicots/public/wolf-face.png",
      h_color: "#2A2A2A",
      bg_Color: "#F3A265",
    },
  ];

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
      img: "https://ik.imagekit.io/x5xessyka/digicots/public/wolf-face.png",
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
      img: "https://ik.imagekit.io/x5xessyka/digicots/public/wolf-face.png",
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
      img: "https://ik.imagekit.io/x5xessyka/digicots/public/wolf-face.png",
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
      img: "https://ik.imagekit.io/x5xessyka/digicots/public/wolf-face.png",
    },
  ];


  const cardRefs = useRef([]);
  const parentRef = useRef(null);
  const containerRef = useRef(null);
  const hasPlayed = useRef(false);
  const animationRefs = useRef({
    timeline: null,
    moveY: null,
    clickAnimations: [],
  });
  const [openedIndex, setOpenedIndex] = useState(-1);

  // GSAP animations setup
  useGSAP(() => {
    // ScrollTrigger for play state
    ScrollTrigger.create({
      trigger: parentRef.current,
      start: "top 30%",
      onEnter: () => {
        if (!hasPlayed.current) {
          hasPlayed.current = true;
        }
      },
    });

    // Clear previous animations
    if (animationRefs.current.timeline) {
      animationRefs.current.timeline.kill();
    }
    if (animationRefs.current.moveY) {
      animationRefs.current.moveY.kill();
    }

    // Create card entrance animation
    animationRefs.current.timeline = gsap.timeline({
      scrollTrigger: {
        trigger: parentRef.current,
        start: "top -100%",
        end: window.innerWidth > 600 ? "top -240%" : "top -230%",
        scrub: 1,
      },
    });

    animationRefs.current.timeline.from(cardRefs.current, {
      y: window.innerWidth > 600 ? 100 : "50%",
      opacity: 0,
      duration: window.innerWidth > 600 ? 3 : 4,
      stagger: window.innerWidth > 600 ? 3 : 5,
      ease: "expoScale(0.5,7,none)",
    });

    // Create moveY animation
    animationRefs.current.moveY = gsap.to(parentRef.current, {
      y: "40%",
      duration: 20,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: parentRef.current,
        start: "top -244%",
        end: "top -344%",
        scrub: 1,
      },
    });

    return () => {
      // Cleanup GSAP animations
      if (animationRefs.current.timeline) {
        animationRefs.current.timeline.kill();
      }
      if (animationRefs.current.moveY) {
        animationRefs.current.moveY.kill();
      }
    };
  }, []);

  // Card click handler
  const handleClick = useCallback(
    (i) => {
      if (i !== openedIndex) {
        handleClose();

        const animation = gsap.to(cardRefs.current[i], {
          left: "50%",
          scale: 1.2,
          zIndex: 2,
          translateX: "-50%",
          rotateY: "180deg",
          duration: 0.8,
          ease: "power4.inOut",
          onStart: () => {
            const unflipped =
              cardRefs.current[i].querySelector(".unflipped-text");
            const flipped = cardRefs.current[i].querySelector(".flipped-text");
            const tl = gsap.timeline();
            tl.to(unflipped, { opacity: 0 }, "a");
            tl.to(flipped, { opacity: 1 }, "a");
          },
          onComplete: () => {
            setOpenedIndex(i);
            // Store animation for cleanup
            animationRefs.current.clickAnimations[i] = animation;
          },
        });
      }
    },
    [openedIndex]
  );

  // Card close handler
  const handleClose = useCallback(() => {
    setOpenedIndex(-1);
    cardRefs.current.forEach((e, i) => {
      const animation = gsap.to(e, {
        left: 20 * (i * 1.4 + 1) + "%",
        scale: 1,
        zIndex: 1,
        translateX: "-100%",
        rotateY: "0deg",
        onStart: () => {
          const unflipped = e.querySelector(".unflipped-text");
          const flipped = e.querySelector(".flipped-text");
          const tl = gsap.timeline();
          tl.to(unflipped, { opacity: 1 }, "a");
          tl.to(flipped, { opacity: 0 }, "a");
        },
      });
      // Store animation for cleanup
      animationRefs.current.clickAnimations[i] = animation;
    });
  }, []);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      // Cleanup click animations
      animationRefs.current.clickAnimations.forEach((anim) => anim?.kill());
    };
  }, [handleClose]);

  // Responsive left position calculation
  const getCardLeftPosition = useCallback(
    (index) => {
      return window.innerWidth > 600 ? `${8 * (index * 3.5 + 2.5)}%` : "50%";
    },
    [window.innerWidth]
  );

  // Component cleanup
  useEffect(() => {
    return () => {
      // Kill all animations and ScrollTriggers
      if (animationRefs.current.timeline) {
        animationRefs.current.timeline.kill();
        animationRefs.current.timeline.scrollTrigger?.kill();
      }
      if (animationRefs.current.moveY) {
        animationRefs.current.moveY.kill();
        animationRefs.current.moveY.scrollTrigger?.kill();
      }
      animationRefs.current.clickAnimations.forEach((anim) => anim?.kill());

      // Kill all related ScrollTriggers
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === parentRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <div className="md:min-h-[340vh] h-[340vh] w-full relative bg-black">
      <section
        ref={parentRef}
        className="how-it-works min-h-screen sticky top-0 overflow-hidden"
      >
        <div className="absolute w-screen h-screen z-[-1]">
          <HowItWorksCanvas />
        </div>

        <div className="container-xxl absolute top-0 left-0 right-0 bottom-0 h-full w-full">
          <MainHeading
            heading="HOW IT WORKS"
            pera="With us, you don’t just play the game – you own it. The hunt never stops. Absolute domination."
            cl="text-center"
            tColor="text-white"
          />

          <div
            ref={containerRef}
            className="wolf-card-container h-[70vh] md:h-fit relative grid md:grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-5"
          >
            {cardList.map((dataChild, index) => (
              <>
                <div className="unflipped-text">
                <div
                ref={(el) => (cardRefs.current[index] = el)}
                className="wolf-card absolute md:static p-4 rounded-2xl shadow-lg border-8 border-[#FFFFFF4D]"
                style={{ background: dataChild.bgColor, top: window.innerWidth > 600 ? 0:index*5 + "%" }}
                key={index}
                onClick={() => window.innerWidth > 600 && handleClick(index)}
              >
                <div className="wolf-img mb-4">
                  <img
                    src={dataChild.img}
                    alt="Wolf Icon"
                    className=" mx-auto w-full"
                  />
                </div>
                <div className="wolf-text grid gap-1">
                  <h6
                    className="font-bold"
                    style={{
                      color: dataChild.h_color,
                      fontSize: "clamp(8px, 20vw, 11px)",
                    }}
                  >
                    {dataChild.h1}
                  </h6>
                  <h4
                    className="font-semibold text-white"
                    style={{ fontSize: "clamp(16px, 20vw, 24px)" }}
                  >
                    {dataChild.h2}
                  </h4>
                  <p
                    className=" text-[#EAEAEA]"
                    style={{ fontSize: "clamp(10px, 20vw, 14px)" }}
                  >
                    {dataChild.p}
                  </p>
                </div>
              </div>
                </div>

                <div className="flipped-text absolute top-0 left-0 right-0 h-full w-full rotate-y-180 opacity-0 p-3 text-sm text-white">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptate numquam eaque laudantium, earum repellendus illo
                  accusamus cumque quisquam consequuntur assumenda reprehenderit
                  recusandae debitis expedita excepturi voluptatibus nam maxime
                  blanditiis qui dolores, quasi eum error atque. Similique
                  aperiam exercitationem illum magnam fugit itaque totam, libero
                  fuga consequuntur commodi, labore sint culpa quibusdam
                  reiciendis? Commodi, sapiente possimus nostrum impedit
                  deleniti qui obcaecati?
                </div>
              </>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;

// <div
//   ref={(el) => (cardRefs.current[index] = el)}
//   className="wolf-card absolute p-4 rounded-2xl md:-translate-x-[100%] -translate-x-1/2 left-[50%] w-full md:h-[56vh] md:w-[20vw] shadow-lg border-8 border-[#FFFFFF4D]"
//   style={{
//     background: dataChild.bg_Color,
//     top: 0,
//     left: window.innerWidth > 600 ? getCardLeftPosition(index) : "50%",
//     // transform:window.innerWidth > 600 ? "translateX (-100%)" : "translateX(-50%)"
//   }}
//   key={index}
// >
