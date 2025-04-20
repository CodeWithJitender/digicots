import React, { useRef } from "react";
import Member from "../../components/Member";
import MainHeading from "../../components/MainHeading";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

function MeetThePack() {
  const teamMembers = [
    { position: window.innerWidth > 600 ? { top: "35%", left: "50%" } : { top: "65%", left: "60%"  }, name: "Sarah Johnson", designation: "Support", image: "https://ik.imagekit.io/x5xessyka/digicots/public/Person-4.png" },
    { position: window.innerWidth > 600 ? { top: "30%", left: "25%" } : { top: "55%", left: "-10%" }, name: "Jane Doe", designation: "Designer", image: "https://ik.imagekit.io/x5xessyka/digicots/public/Person-2.png" },
    { position: window.innerWidth > 600 ? { top: "30%", left: "40%" } : { top: "45%", left: "20%" }, name: "John Doe", designation: "Developer", image: "https://ik.imagekit.io/x5xessyka/digicots/public/Person-1.png" },
  ];

  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const memberRef = useRef([]);

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    // Ensure refs are available
    if (!containerRef.current || !bgRef.current || !memberRef.current.length) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 50%", // Adjusted for smoother trigger
        end: "top 10%",
        scrub: true,
      },
    });

    tl.from(containerRef.current, {
      width: 0,
      duration: 1,
      ease: "power1.inOut",
    })
      .to(bgRef.current, {
        opacity: 1,
        duration: 0.5,
      })
      .from(
        memberRef.current,
        {
          y: "50%",
          opacity: 0,
          duration: 1,
          ease: "power1.inOut",
          stagger: 0.2, // Reduced stagger for smoother effect
        },
        "-=0.5" // Overlap with background animation
      );
  }, [containerRef.current, bgRef.current, memberRef.current]);

  return (
    <section className="meet-the-pack min-h-screen overflow-hidden">
      <div className="container-xxl h-[100vh]">
        <div className="text-center">
          <MainHeading heading="MEET THE PACK" />
        </div>
        <div
          ref={containerRef}
          className="meet-container relative left-1/2 overflow-hidden -translate-x-1/2 w-full h-full rounded-3xl bg-[#212120] bg-cover bg-no-repeat"
        >
          <img
            ref={bgRef}
            className="h-full w-full object-cover opacity-0 absolute top-0"
            src="https://ik.imagekit.io/x5xessyka/digicots/public/meet-bg.png"
            alt="Team background"
          />
          <div className="relative h-full w-full left-0 translate-x-0">
            {teamMembers.map((member, i) => (
              <Member
                key={i}
                ref={(el) => (memberRef.current[i] = el)}
                member={member}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MeetThePack;