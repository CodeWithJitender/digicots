import React, { useRef } from "react";
import HeadingWithLink from "../../components/HeadingWithLink";
import { Link } from "react-router-dom";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import TextAnimation1 from "../../animation/text/TextAnimation1";
import TextAnimation2 from "../../animation/text/TextAnimation2";

function Solutions() {
  const data = [
    {
      img: "content-production.png",
      title: "Content Production",
      description:
        "The art of storytelling by transforming ideas into captivating visual narratives that engage, inform and persuade. Content production is the bridge between creativity and commerce – making brands not just visible, but rather unforgettable.",
      btn: "Explore More",
    },
    {
      img: "website-development.png",
      title: "Outreach Solutions",
      description:
        "Extend brand awareness beyond traditional channels by leveraging trusted voices in the industry to authentically engage with niche groups. Reaching the right audience requires more than just good content – it demands strategic outreach that ensures maximum impact.",
      btn: "Explore More",
    },
    {
      img: "content-production.png",
      title: "Public Relations",
      description:
        "This is the art of shaping and maintaining a brand’s reputation – its most valuable asset. PR strategies go way beyond publicity; they help in establishing credibility, authority and trust. Effective PR creates a wave that turns mere businesses into industry icons.",
      btn: "Explore More",
    },
    {
      img: "website-development.png",
      title: "Digital Marketing",
      description: `It’s not just about posting on social media; it’s about formulating impactful, data-driven strategies. A strong, consistent online presence helps garner engagement and brand loyalty. Digital marketing is the ultimate blend of creativity, analytics and strategy delivering quantifiable results that drive growth.`,
      btn: "Explore More",
    },
    {
      img: "website-development.png",
      title: "Performance Marketing",
      description: `Maximize ROI through hyper-targeted advertising and conversion-focused strategies. Every click, every impression, every interaction is counted for to ensure highest possible return. It isn’t about spending more; it’s about spending smart, leveraging data and strategizing growth.`,
      btn: "Explore More",
    },
    {
      img: "website-development.png",
      title: "Creative Designing",
      description: `Turn concepts into striking visual assets – digital or print. Design is way more than just aesthetics; it is the visual language of a brand. It is the backbone of compelling brand communication ensuring every interaction is simply WOW!`,
      btn: "Explore More",
    },
    {
      img: "website-development.png",
      title: "Branding",
      description: `Craft the soul of your company – define an identity, shape user perception and create an emotional connection. Branding is the art of ensuring that people don’t just buy products; they buy into a vision, a story, an experience.`,
      btn: "Explore More",
    },
    {
      img: "website-development.png",
      title: "Outdoor Advertising Digicots OOH",
      description: `Regardless of the ever-changing digital landscape, outdoor advertising remains an unparalleled tool for massive brand visibility. We, at Digicots, ensure that advertising comes across as an experience rather than an interruption. While digital ads can be skipped, outdoor ads remain unmissable and serve as a constant, powerful reminder of a brand’s presence.`,
      btn: "Explore More",
    },
    {
      img: "website-development.png",
      title: "Website Development",
      description: `A website is more than an online address; it’s a brand’s digital storefront. Website development is a blend of technology, design and user experience to create seamless, high-converting platforms with every element optimized for performance.`,
      btn: "Explore More",
    },
    {
      img: "website-development.png",
      title: "Artificial Reality (AR)",
      description: `The future of marketing is immersive. AR brings products to life – allowing consumers to virtually experience near-real manifestations of products before purchasing them. This revolutionizes how brands interact with consumers making experiences richer, more engaging and more impactful. Engage your audience with interactive tools that leave them hooked and coming back for more.`,
      btn: "Explore More",
    },
  ];

  const heading1Refs = useRef([]); // Array of refs
  const imgsRefs = useRef([]); // Array of refs
  const blackBoxRef = useRef(null);
  const parentRef = useRef(null);
  const contentRef = useRef([]);

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    // Ensure refs are not null
    if (!parentRef.current || !blackBoxRef.current || !contentRef.current.length) return;

    if (window.innerWidth > 767) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: parentRef.current,
          start: "top 70%",
          end: "top -1100%",
          scrub: 1,
          // // markers: true,
        },
        ease: "linear",
      });

      tl.from(blackBoxRef.current, {
        left: "110%",
        opacity: 0,
        duration: 3,
        ease: "power4.inOut",
      })
        .to(
          contentRef.current,
          {
            translateX: "-1080%",
            duration: 80,
            ease: "linear",
          },
          "a"
        )
        .from(
          ".sol-content-left img",
          {
            opacity: 0,
            duration: 2,
            delay: 6,
            ease: "back.out(1.5)",
            stagger: {
              each: 8,
              from: "start",
            },
          },
          "a"
        )
        .from(
          ".sol-content-right",
          {
            opacity: 0,
            scale: 1.1,
            duration: 3,
            delay: 6,
            ease: "power4.inOut",
            filter: "blur(10px)",
            stagger: {
              each: 8.05,
              from: "start",
            },
          },
          "a"
        );
    } else {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: parentRef.current,
          start: "top 70%",
          end: "top -1500%",
          scrub: 1,
        },
        ease: "linear",
      });

      tl.from(blackBoxRef.current, {
        left: "110%",
        opacity: 0,
        duration: 3,
        ease: "power4.inOut",
      })
        .to(
          contentRef.current,
          {
            translateY: "-900%",
            duration: 100,
            ease: "linear",
          },
          "a"
        )
        .from(
          ".sol-content-left img",
          {
            opacity: 0,
            duration: 2,
            delay: 6,
            ease: "back.out(1.5)",
            stagger: {
              each: 4,
              from: "start",
            },
          },
          "a"
        );
    }
  }, []); // Empty dependency array to run only once on mount

  return (
    data && (
      <div className="md:min-h-[1200vh] min-h-[1600vh] relative">
        <section
          ref={parentRef}
          className="h-screen solution sticky top-0 overflow-hidden"
        >
          <div className="container-xl">
            <HeadingWithLink
              head="SOLUTIONS"
              per="Lorem ipsum dolor sit amet, consectetur adipiscing"
              link={"/contact"}
              linkh={"Contact Us"}
            />

            <div
              ref={blackBoxRef}
              className="solution-content-container h-[75vh] md:h-[70vh] opacity-100 overflow-hidden relative mt-5 bg-[#202020] rounded-3xl py-8 md:py-24 px-5 md:px-10 flex lg:gap-40 xl:gap-56 flex-col md:flex-row"
            >
              {data.map((d, index) => (
                <div
                  ref={(el) => (contentRef.current[index] = el)}
                  key={index}
                  className="solution-content min-w-[70vw] md:translate-x-[150%] md:translate-y-0 translate-y-[150%] relative z-[10] h-full flex items-center md:justify-between xl:justify-center lg:gap-[5vw] flex-col md:flex-row"
                >
                  <div className="sol-content-left lg:h-[35vh] xl:h-[20vh] relative">
                    <img
                      key={d.title}
                      src={d.img}
                      alt=""
                      className="lg:scale-[2.5] h-full object-contain"
                    />
                  </div>
                  <div
                    style={{
                      width: window.innerWidth > 1023 ? "600px" : "550px",
                      maxWidth: window.innerWidth > 1023 ? "450px" : "",
                    }}
                    className="sol-content-right max-h-[80%] md:space-y-1"
                  >
                    <div>
                      <h3
                        key={index}
                        className="font-bold overflow-hidden md:h-[65px] w-fit capitalize text-white md:text-6xl text-2xl md:mb-3 font-inter"
                      >
                        {d.title
                          .split(" ")
                          .slice(0, Math.ceil(d.title.split(" ").length / 2))
                          .join(" ")}
                      </h3>
                    </div>

                    {d.title.split(" ").length > 1 && (
                      <div>
                        <h3
                          key={index}
                          className="font-bold capitalize overflow-hidden md:h-[65px] w-fit text-white md:text-6xl text-2xl md:mb-3 font-inter"
                        >
                          {d.title
                            .split(" ")
                            .slice(Math.ceil(d.title.split(" ").length / 2))
                            .join(" ")}
                        </h3>
                      </div>
                    )}

                    <div>
                      <p
                        key={index}
                        className="text-[#808080] font-normal font-inter"
                        style={{ fontSize: "clamp(10px, 20vw, 12px)" }}
                      >
                        {d.description}
                      </p>
                    </div>

                    <div className="link md:mt-10"></div>
                    <div className="overflow-hidden w-fit">
                      <Link
                        to={"/"}
                        key={index}
                        className="font-semibold text-white block"
                      >
                        {d.btn}{" "}
                        <i className="fal fa-arrow-up rotate-45 text-[#ED510C] ml-2" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    )
  );
}

export default Solutions;