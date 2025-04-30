import React, { useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HeadingWithLink from "../../components/HeadingWithLink";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

// Register plugins once
gsap.registerPlugin(ScrollTrigger);

const contentData = [
  {
    heading: "Content Production",
    i:"Crafting your howl in seamless harmony with the consumer’s voice.",
    p: "The art of storytelling by transforming ideas into captivating visual narratives that engage, inform, and persuade. Content production is the bridge between creativity and commerce – making brands not just visible, but rather unforgettable.",
    link: "/content-production",
    img: "https://ik.imagekit.io/x5xessyka/digicots/public/icon-9.png",
    thumbnail: "https://ik.imagekit.io/x5xessyka/digicots/public/icon-9.png",
    tag: [
      "Product Photography",
      "Corporate Videos",
      "eCommerce Photography",
      "Explainer Videos",
      "Reel Production & Showreels",
      "Amazon Video Ads",
    ],
  },
  {
    heading: "Outreach Solutions",
    i:"Exploring the Unknown; Making Your Mark.",
    p: "Extend brand awareness beyond traditional channels by leveraging trusted voices in the industry to authentically engage with niche groups. Reaching the right audience requires more than just good content – it demands strategic outreach that ensures maximum impact.",
    link: "/marketing-strategy",
    img: "https://ik.imagekit.io/x5xessyka/digicots/public/icon-8.png",
    thumbnail: "https://ik.imagekit.io/x5xessyka/digicots/public/icon-8.png",
    tag: [
      "Influencer Marketing",
      "Inter-Brand Collaborations",
      "WhatsApp Marketing & Email Campaigns",
      "Regional Amplification",
    ],
  },
  {
    heading: "Public Relations",
    i:"Making your vision echo across the globe",
    p: "This is the art of shaping and maintaining a brand’s reputation – its most valuable asset. PR strategies go way beyond publicity; they help in establishing credibility, authority, and trust. Effective PR creates a wave that turns mere businesses into industry icons.",
    link: "/web-development",
    img: "https://ik.imagekit.io/x5xessyka/digicots/public/icon-4.png",
    thumbnail: "https://ik.imagekit.io/x5xessyka/digicots/public/icon-4.png",
    tag: [
      "Press Releases & Editorial Articles",
      "Authored Articles",
      "Reputation Management",
    ],
  },
  {
    heading: "Digital Marketing",
    i:"Hunt Smarter. Hunt Harder.",
    p: "It’s not just about posting on social media; it’s about formulating impactful, data-driven strategies. A strong, consistent online presence helps garner engagement and brand loyalty. Digital marketing is the ultimate blend of creativity, analytics, and strategy delivering quantifiable results that drive growth.",
    link: "/web-development",
    img: "https://ik.imagekit.io/x5xessyka/digicots/public/icon-6.png",
    thumbnail: "https://ik.imagekit.io/x5xessyka/digicots/public/icon-6.png",
    tag: [
      "Social Media Management & Evergreen Strategies",
      "Campaign-level Strategy & SEO",
    ],
  },
  {
    heading: "Performance Marketing",
    i:"Unmatched Precision. Uncaged Results.",
    p: "Maximize ROI through hyper-targeted advertising and conversion-focused strategies. Every click, every impression, every interaction is counted for to ensure the highest possible return. It isn’t about spending more; it’s about spending smart, leveraging data, and strategizing growth.",
    link: "/web-development",
    img: "https://ik.imagekit.io/x5xessyka/digicots/public/icon-5.png",
    thumbnail: "https://ik.imagekit.io/x5xessyka/digicots/public/icon-5.png",
    tag: [
      "eCommerce Revenue & Brand Awareness Campaigns",
      "Lead Generation & Remarketing Funnels",
      "Conversion Rate Optimization (CRO)",
    ],
  },
  {
    heading: "Creative Designing",
    i:"Visuals that Make the Consumer Stop.",
    p: "Turn concepts into striking visual assets – digital or print. Design is way more than just aesthetics; it is the visual language of a brand. It is the backbone of compelling brand communication ensuring every interaction is simply WOW!",
    link: "/web-development",
    img: "https://ik.imagekit.io/x5xessyka/digicots/public/icon-7.png",
    thumbnail: "https://ik.imagekit.io/x5xessyka/digicots/public/icon-7.png",
    tag: [
      "Lookbooks, Catalogs & Pitch Decks",
      "Illustrations",
      "Amazon A+ Content",
    ],
  },
  {
    heading: "Branding",
    i:"Craft the soul of your company",
    p: "Carving the Alpha Identity. Craft the soul of your company – define an identity, shape user perception, and create an emotional connection. Branding is the art of ensuring that people don’t just buy products; they buy into a vision, a story, an experience.",
    link: "/web-development",
    img: "https://ik.imagekit.io/x5xessyka/digicots/public/icon-4.png",
    thumbnail: "https://ik.imagekit.io/x5xessyka/digicots/public/icon-4.png",
    tag: [
      "Naming & Logo Development",
      "Brand Matrix & Packaging Development",
      "UI Creation (Adobe Figma)",
    ],
  },
  {
    heading: "Outdoor Advertising",
    i:"Marking Your Territory in the Real World",
    p: "Regardless of the ever-changing digital landscape, outdoor advertising remains an unparalleled tool for massive brand visibility. We, at Digicots, ensure that advertising comes across as an experience rather than an interruption.",
    link: "/web-development",
    img: "https://ik.imagekit.io/x5xessyka/digicots/public/icon-3.png",
    thumbnail: "https://ik.imagekit.io/x5xessyka/digicots/public/icon-3.png",
    tag: ["Hoardings & Unipoles", "Kiosks & Outdoor Design"],
  },
  {
    heading: "Website Development",
    i:"Your Digital Swarm",
    p: "A website is more than an online address; it’s a brand’s digital storefront. Website development is a blend of technology, design, and user experience to create seamless, high-converting platforms with every element optimized for performance.",
    link: "/web-development",
    img: "https://ik.imagekit.io/x5xessyka/digicots/public/icon-1.png",
    thumbnail: "https://ik.imagekit.io/x5xessyka/digicots/public/icon-1.png",
    tag: [
      "eCommerce Websites & Landing Pages",
      "Dynamic Website & CRO",
      "UX/UI Creation (Adobe Figma)",
    ],
  },
  {
    heading: "Artificial Reality (AR)",
    i:"Wildly Immersive Experiences",
    p: "The future of marketing is immersive. AR brings products to life – allowing consumers to virtually experience near-real manifestations of products before purchasing them. This revolutionizes how brands interact with consumers making experiences richer, more engaging, and more impactful.",
    link: "/web-development",
    img: "https://ik.imagekit.io/x5xessyka/digicots/public/icon-2.png",
    thumbnail: "https://ik.imagekit.io/x5xessyka/digicots/public/icon-2.png",
    tag: ["Augmented Reality", "Virtual Reality","Story-driven Games"],
  },
];

const ContentSlider = () => {
  const mainSlider = useRef(null);
  const thumbSlider = useRef(null);
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const thumbRef = useRef(null);
  const animationRefs = useRef({
    animations: [],
    scrollTriggers: []
  });

  // Slider settings
  const mainSettings = {
    asNavFor: thumbSlider.current,
    arrows: false,
    ref: (slider) => (mainSlider.current = slider),
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
  };

  const thumbSettings = {
    asNavFor: mainSlider.current,
    ref: (slider) => (thumbSlider.current = slider),
    slidesToShow: 5,
    swipeToSlide: true,
    focusOnSelect: true,
    centerMode: true,
    arrows: false,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };

  // Animation cleanup function
  const cleanupAnimations = useCallback(() => {
    animationRefs.current.animations.forEach(anim => anim?.kill());
    animationRefs.current.scrollTriggers.forEach(trigger => trigger?.kill());
    animationRefs.current.animations = [];
    animationRefs.current.scrollTriggers = [];
  }, []);

  // Register animation for cleanup
  const registerAnimation = useCallback((animation) => {
    animationRefs.current.animations.push(animation);
    if (animation.scrollTrigger) {
      animationRefs.current.scrollTriggers.push(animation.scrollTrigger);
    }
    return animation;
  }, []);

  // GSAP animations
  useGSAP(() => {
    cleanupAnimations();

    // Heading Animation
    registerAnimation(
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: -50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      )
    );

    // Thumbnails Animation
    if (thumbRef.current) {
      const thumbAnimation = gsap.fromTo(
        thumbRef.current.querySelectorAll(".slick-slide"),
        { opacity: 0, scale: 1.2, filter: "blur(10px)" },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: thumbRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
      registerAnimation(thumbAnimation);
    }

    // Slider Content Animations
    if (containerRef.current) {
      const slides = containerRef.current.querySelectorAll(".solution-box");
      slides.forEach((slide) => {
        const mainBlock = slide.querySelector(".solution-main");
        const imgBlock = slide.querySelector(".solution-img img");
        const tagBlock = slide.querySelector(".solution-tag");
        const bgHeading = slide.querySelector(".heading-cot h1");

        // Main Content Block
        if (mainBlock) {
          registerAnimation(
            gsap.fromTo(
              mainBlock,
              { opacity: 0, x: -100 },
              {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: slide,
                  start: "top 80%",
                  end: "top 20%",
                  scrub: 0.5,
                },
              }
            )
          );
        }

        // Image
        if (imgBlock) {
          registerAnimation(
            gsap.fromTo(
              imgBlock,
              { opacity: 0, scale: 0.8 },
              {
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: slide,
                  start: "top 80%",
                  end: "top 20%",
                  scrub: 0.5,
                },
              }
            )
          );
        }

        // Tags
        if (tagBlock) {
          registerAnimation(
            gsap.fromTo(
              tagBlock.querySelectorAll("button"),
              { opacity: 0, x: 50 },
              {
                opacity: 1,
                x: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: slide,
                  start: "top 80%",
                  end: "top 20%",
                  scrub: 0.5,
                },
              }
            )
          );
        }

        // Background Heading
        if (bgHeading) {
          registerAnimation(
            gsap.fromTo(
              bgHeading,
              { opacity: 0, rotate: 5 },
              {
                opacity: 0.3,
                rotate: 0,
                duration: 1.5,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: slide,
                  start: "top 80%",
                  end: "top 20%",
                  scrub: 0.5,
                },
              }
            )
          );
        }
      });
    }
  }, { scope: containerRef, dependencies: [contentData] });

  // MoveY animation
  // useGSAP(() => {
  //   const moveY = gsap.to(containerRef.current, {
  //     y: "40%",
  //     duration: 20,
  //     ease: "power1.inOut",
  //     scrollTrigger: {
  //       trigger: containerRef.current,
  //       start: "top -50%",
  //       end: "top -200%",
  //       scrub: 1,
  //     },
  //   });
  //   registerAnimation(moveY);
  // }, []);

  // Component cleanup
  useEffect(() => {
    return () => {
      cleanupAnimations();
      
      // Cleanup sliders
      if (mainSlider.current) {
        mainSlider.current.unslick?.();
      }
      if (thumbSlider.current) {
        thumbSlider.current.unslick?.();
      }

      // Cleanup all ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === containerRef.current || 
            trigger.trigger === headingRef.current || 
            trigger.trigger === thumbRef.current) {
          trigger.kill();
        }
      });
    };
  }, [cleanupAnimations]);

  return (
    <div ref={containerRef} className="bg-white relative z-[2]  py-10 md:py-24">
      <div className="">
        <div ref={headingRef} className="max-w-[1600px] m-auto px-5">
          <HeadingWithLink
            head="SOLUTIONS"
            per="The Alpha’s Guide to Absolute Domination"
            link="/contact"
            linkh="Contact Us"
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-col-reverse  mx-auto ">
        {/* Thumbnails */}
        <div className="slider-thumb" ref={thumbRef}>
          <Slider {...thumbSettings} className="">
            {contentData.map((item, index) => (
              <div key={`thumb-${index}`} className="px-2">
                <div className="border-2 border-[#ED510C] rounded-lg overflow-hidden cursor-pointer">
                  <img
                    src={item.thumbnail}
                    alt={item.heading}
                    className="w-full hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>

        <div className="md:col-start-2 md:col-span-2 max-w-[1600px] w-full mx-auto px-5">
          <Slider {...mainSettings}>
            {contentData.map((data, index) => (
              <div key={`main-${index}`}>
                <div className="solution-box relative lg:h-[600px] xl:h-[500px]">
                  {/* Background Heading */}
                  <div className="heading-cot absolute w-full h-full flex lg:items-center justify-center text-center z-[-1]">
                    <h1 className="text-stroke text-transparent max-w-[900px] text-6xl md:text-8xl lg:text-9xl font-black uppercase mt-32 lg:mt-0">
                      {data.heading}
                    </h1>
                  </div>

                  <div className="solution-content grid lg:grid-cols-3 grid-rows-[auto_auto_auto] md:grid-rows-1 gap-6">
                    {/* Left Block */}
                    <div className="solution-main bg-[#202020] rounded-[24px] p-6 lg:p-8 row-start-2 md:row-start-auto md:col-start-1">
                      <h2
                        style={{ fontSize: "clamp(32px, 5vw, 60px)" }}
                        className="font-inter font-black text-white mb-3 leading-[100%]"
                      >
                        {data.heading}
                      </h2>
                      <p className="font-inter text-white my-4 italic">{data.i}</p>
                      <p className="font-inter text-white my-4">{data.p}</p>
                      <Link to={data.link} className="text-white">
                        Explore More{" "}
                        <i className="far fa-arrow-right rotate-[-45deg] text-[#ED510C]"></i>
                      </Link>
                      <div className="flex flex-wrap gap-4 mt-4 lg:hidden">
                        {data.tag.filter(t => t).map((text, index) => (
                          <button
                            key={`mobile-tag-${index}`}
                            className="border-2 border-[#ED510C] text-[#ED510C] px-4 py-2 rounded-[20px] font-inter font-bold text-start"
                          >
                            <Link>
                              {text}
                              <i className="far fa-arrow-right rotate-[-45deg] text-[#ED510C] ms-2"></i>
                            </Link>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Image */}
                    <div className="solution-img flex items-center justify-center row-start-1 lg:row-start-auto lg:col-start-2">
                      <img
                        src={data.img}
                        className="w-full max-w-[500px]"
                        alt={data.heading}
                        loading="lazy"
                      />
                    </div>

                    {/* Tags */}
                    <div className="solution-tag bg-[#202020] rounded-[24px] p-6 lg:p-8 hidden lg:block md:col-start-3">
                      <div className="flex flex-wrap gap-4 text-start">
                        {data.tag.filter(t => t).map((text, index) => (
                          <button
                            key={`desktop-tag-${index}`}
                            className="border-2 border-[#ED510C] text-[#ED510C] px-4 py-2 rounded-[20px] font-inter font-bold"
                          >
                            <Link>
                              {text}
                              <i className="far fa-arrow-right rotate-[-45deg] text-[#ED510C] ms-2"></i>
                            </Link>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default ContentSlider;