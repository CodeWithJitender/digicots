import React, { useRef, useEffect } from "react";
import Member from "../../components/Member";
import MainHeading from "../../components/MainHeading";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

function MeetThePack() {
  const teamMembers = [
    { position: window.innerWidth > 600 ? { top: "40%", left: "53%" } : { top: "65%", left: "60%"  }, name: "Sarah Johnson", designation: "Support", image: "https://ik.imagekit.io/x5xessyka/digicots/public/Person-4.png" },
    { position: window.innerWidth > 600 ? { top: "30%", left: "22%" } : { top: "55%", left: "-10%" }, name: "Jane Doe", designation: "Designer", image: "https://ik.imagekit.io/x5xessyka/digicots/public/Person-2.png" },
    { position: window.innerWidth > 600 ? { top: "0%", left: "36%" } : { top: "45%", left: "20%" }, name: "John Doe", designation: "Developer", image: "https://ik.imagekit.io/x5xessyka/digicots/public/Person-1.png" },
  ];

  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const memberRef = useRef([]);

  gsap.registerPlugin(ScrollTrigger, useGSAP);

  useGSAP(() => {
    // Reset initial states
    gsap.set(containerRef.current, { width: 0 });
    gsap.set(bgRef.current, { opacity: 0 });
    gsap.set(memberRef.current, { y: "50%", opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "top 10%",
        scrub: true,
        markers: false // Enable this for debugging if needed
      },
    });

    tl.to(containerRef.current, {
      width: "100%",
      duration: 1,
      ease: "power1.inOut",
    })
    .to(bgRef.current, {
      opacity: 1,
      duration: 0.5,
    }, "-=0.5")
    .to(memberRef.current, {
      y: "0%",
      opacity: 1,
      duration: 1,
      ease: "power1.inOut",
      stagger: 0.2,
    }, "-=0.5");
  }, []);

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