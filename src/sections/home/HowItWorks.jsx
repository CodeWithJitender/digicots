import React from "react";
import MainHeading from "../../components/MainHeading";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

function HowItWorks() {
  const data = [
    {
      h1: "STEP 1",
      h2: "Smell the Wind",
      p: "Your vision becomes our obsession.",
      img: "wolf-face.png",
      h_color: "#2A2A2A",
      bg_Color: "#F3A265",
    },
    {
      h1: "STEP 2",
      h2: "Sharpen the Claws",
      p: "Our instinct is your advantage.",
      img: "wolf-face.png",
      h_color: "#F3A265",
      bg_Color: "#2A2A2A",
    },
    {
      h1: "STEP 3",
      h2: "Set the Pack in Motion",
      p: "This isn’t execution. This is a movement.",
      img: "wolf-face.png",
      h_color: "#F3A265",
      bg_Color: "#515151",
    },
    {
      h1: "STEP 4",
      h2: "Guard the Territory",
      p: "Survival is only the beginning. Domination is the goal.",
      img: "wolf-face.png",
      h_color: "#2A2A2A",
      bg_Color: "#F3A265",
    },
  ];

  const cardRefs = useRef([]);
  const parentRef = useRef(null);
  const videoRef = useRef(null);
  const hasPlayed = useRef(false); // Added flag to track if video has played
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    const video = videoRef.current;
    // video.pause(); // Pause video initially

    // Video playback ScrollTrigger
    ScrollTrigger.create({
      trigger: parentRef.current,
      start: "top 30%",
      onEnter: () => {
        if (!hasPlayed.current) {
          // Check if video hasn't played yet
          video.play();
          hasPlayed.current = true; // Set flag to true after playing
        }
      },
    });

    if (window.innerWidth > 600) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: parentRef.current,
          start: "top 0%",
          end: "top -40%",
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
          start: "top 0-3%",
          end: "top -30%",
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

  console.log(window.innerWidth);

  return (
    <div className="md:min-h-[140vh] h-[140vh] w-full relative bg-black">
      <section
        ref={parentRef}
        className="how-it-works min-h-screen sticky top-0 overflow-hidden"
        // style={{ backgroundImage: "url('how-it-works.png')" }}
      >
        <div className="absolute w-screen h-screen z-[-1]">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            id="our-work-video"
            src="./1.mp4"
            muted
            autoPlay
            // loop
            playsInline
          />
        </div>
        <div className="container-xxl absolute top-0 left-0 right-0 bottom-0 h-full w-full">
          <MainHeading
            heading="HOW IT WORKS"
            pera="We specialize in personalized and conversational marketing, crafting tailored experiences for every business."
            cl={"text-center"}
            tColor={"text-white"}
          />

          <div className="wolf-card-container h-[70vh] md:h-fit relative grid md:grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-5 mt-20">
            {data.map((dataChild, index) => (
              <div
                ref={(el) => (cardRefs.current[index] = el)}
                className="wolf-card absolute md:static p-4 rounded-2xl shadow-lg border-8 border-[#FFFFFF4D]"
                style={{
                  background: dataChild.bg_Color,
                  top: window.innerWidth > 600 ? 0 : 0,
                }}
                key={index}
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
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HowItWorks;
