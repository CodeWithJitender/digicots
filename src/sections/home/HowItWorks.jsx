import React, { useState, useEffect, useRef } from "react";
import MainHeading from "../../components/MainHeading";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import HowItWorksCanvas from "../../animation/canvas/HowItsWorkCanvas";

function HowItWorks() {
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
      p: "This isn’t execution. This is a movement.",
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

  const cardRefs = useRef([]);
  const parentRef = useRef(null);
  // const videoRef = useRef(null);
  const containerRef = useRef(null); // 👈 New: Ref for card container
  const hasPlayed = useRef(false);
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    // const video = videoRef.current;

    ScrollTrigger.create({
      trigger: parentRef.current,
      start: "top 30%",
      onEnter: () => {
        if (!hasPlayed.current) {
          // video.play();
          hasPlayed.current = true;
        }
      },
    });

    if (window.innerWidth > 600) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: parentRef.current,
          start: "top -100%",
          end: "top -240%",
          scrub: 1,
        },
      });
      tl.from(cardRefs.current, {
        y: 100,
        duration: 3,
        opacity: 0,
        stagger: 3,
        ease: "expoScale(0.5,7,none)",
      });
    } else {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: parentRef.current,
          start: "top -100%",
          end: "top -230%",
          scrub: 1,
        },
      });
      tl.from(cardRefs.current, {
        top: "50%",
        duration: 4,
        opacity: 0,
        stagger: 5,
        ease: "expoScale(0.5,7,none)",
      });
    }
  }, []);

  const [openedIndex, setopenedIndex] = useState(-1);

  const handleClick = (i) => {
    if (i !== openedIndex) {
      handleClose();
      gsap.to(cardRefs.current[i], {
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
          tl.to(
            unflipped,
            {
              opacity: 0,
            },
            "a"
          );
          tl.to(
            flipped,
            {
              opacity: 1,
            }
            // "a"
          );
        },
        onComplete() {
          setopenedIndex(i);
        },
      });
    }
  };

  const handleClose = () => {
    setopenedIndex(-1);
    cardRefs.current.forEach((e, i) => {
      gsap.to(e, {
        left: 20 * (i * 1.4 + 1) + "%",
        scale: 1,
        zIndex: 1,
        translateX: "-100%",
        rotateY: "0deg",
        onStart: () => {
          const unflipped = e.querySelector(".unflipped-text");
          const flipped = e.querySelector(".flipped-text");
          const tl = gsap.timeline();
          tl.to(
            unflipped,
            {
              opacity: 1,
            },
            "a"
          );
          tl.to(
            flipped,
            {
              opacity: 0,
            },
            "a"
          );
        },
      });
    });
  };

  // 👇 Click outside logic
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="md:min-h-[340vh] h-[340vh] w-full relative bg-black">
      <section
        ref={parentRef}
        className="how-it-works min-h-screen sticky top-0 overflow-hidden"
      >
        <div className="absolute w-screen h-screen z-[-1]">
          {/* <video
            ref={videoRef}
            className="w-full h-full object-cover"
            id="our-work-video"
            src="./1.mp4"
            muted
            autoPlay
            playsInline
          /> */}

            <HowItWorksCanvas />

        </div>
        <div className="container-xxl absolute top-0 left-0 right-0 bottom-0 h-full w-full">
          <MainHeading
            heading="HOW IT WORKS"
            pera="We specialize in personalized and conversational marketing, crafting tailored experiences for every business."
            cl={"text-center"}
            tColor={"text-white"}
          />

          <div
            ref={containerRef} // 👈 Added here
            className="wolf-card-container h-[70vh] md:h-fit relative grid md:grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-5 mt-20"
          >
            {data.map((dataChild, index) => (
              <div
                ref={(el) => (cardRefs.current[index] = el)}
                className="wolf-card absolute p-4 rounded-2xl md:-translate-x-[100%] -translate-x-1/2 w-full md:h-[56vh] md:w-[20vw] shadow-lg border-8 border-[#FFFFFF4D]"
                style={{
                  background: dataChild.bg_Color,
                  top: 0,
                  left:
                    window.innerWidth > 600
                      ? 20 * (index * 1.4 + 1) + "%"
                      : "50%",
                }}
                key={index}
                onClick={() => window.innerWidth > 600 && handleClick(index)}
              >
                <div className="unflipped-text">
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
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HowItWorks;
