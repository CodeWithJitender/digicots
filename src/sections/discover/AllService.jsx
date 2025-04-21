import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useRef, useEffect } from "react";

function AllService() {
  const data = {
    "Content Production": {
      img: "https://ik.imagekit.io/8mbzq2hdl/digicots/icon-9.png",
      description:
        "Crafting your howl in seamless harmony with the consumer’s voice. The art of storytelling by transforming ideas into captivating visual narratives that engage, inform, and persuade. Content production is the bridge between creativity and commerce – making brands not just visible, but rather unforgettable.",
      offerings: {
        "Product Photography":
          "State-of-the-art visuals that catch the aesthetics, details, and features of your product.",
        "Corporate Videos":
          "Your story, your voice – professional video content curated to showcase your brand, culture, services, and achievements.",
        "eCommerce Photography":
          "Precise images that leave no questions unanswered. Photographing experiences, not products.",
        "Explainer Videos":
          "Short, engaging videos that simplify complex concepts, services, or products for a better user understanding.",
        "Reel Production & Showreels":
          "Showcasing your strengths and victories in an avant-garde storytelling template.",
        "Amazon Video Ads":
          "Capturing visions, experiences & character to drive engagement and conversions.",
      },
    },
    "Outreach Solutions": {
      img: "https://ik.imagekit.io/8mbzq2hdl/digicots/icon-8.png ",
      description:
        "Exploring the Unknown; Making Your Mark. Extend brand awareness beyond traditional channels by leveraging trusted voices in the industry to authentically engage with niche groups. Reaching the right audience requires more than just good content – it demands strategic outreach that ensures maximum impact.",
      offerings: {
        "Influencer Marketing":
          "Make your brand echo – leveraging social media influencers to maximize reach while building trust.",
        "Inter-Brand Collaborations":
          "Partner with other brands to co-market products/services and seize new opportunities.",
        "WhatsApp Marketing & Email Campaigns":
          "Direct. Personal. Precise. Tailored messaging to engage, share offers, and nurture leads.",
        "Regional Amplification":
          "Building customer loyalty in every corner – customizing campaigns to specific geographic regions to enhance relevance and engagement.",
      },
    },
    "Public Relations": {
      img: "https://ik.imagekit.io/8mbzq2hdl/digicots/icon-4.png ",
      description:
        "Making your vision echo across the globe! This is the art of shaping and maintaining a brand’s reputation – its most valuable asset. PR strategies go way beyond publicity; they help in establishing credibility, authority, and trust. Effective PR creates a wave that turns mere businesses into industry icons.",
      offerings: {
        "Press Releases & Editorial Articles":
          "Dominate the headlines, own the narrative – official announcements and news coverage to enhance brand awareness and increase credibility.",
        "Authored Articles":
          "Thought leadership content written by company executives or industry experts.",
        "Reputation Management":
          "Be the voice of authority, guard your image – monitoring and responding to online mentions and ensuring a positive brand image across platforms.",
      },
    },
    "Digital Marketing": {
      img: "https://ik.imagekit.io/8mbzq2hdl/digicots/icon-6.png ",
      description:
        "Hunt Smarter. Hunt Harder. It’s not just about posting on social media; it’s about formulating impactful, data-driven strategies. A strong, consistent online presence helps garner engagement and brand loyalty. Digital marketing is the ultimate blend of creativity, analytics, and strategy delivering quantifiable results that drive growth.",
      offerings: {
        "Social Media Management & Evergreen Strategies":
          "Keep your audience engaged and loyal to your brand – creating, scheduling, and managing content using long-term content strategies that transcend the bounds of time.",
        "Campaign-level Strategy & SEO":
          "Pop up where it matters the most – crafting digital ad strategies, running performance-driven campaigns, and optimizing website to increase organic search visibility.",
      },
    },
    "Performance Marketing": {
      img: "https://ik.imagekit.io/8mbzq2hdl/digicots/icon-5.png ",
      description:
        "Unmatched Precision. Uncaged Results. Maximize ROI through hyper-targeted advertising and conversion-focused strategies. Every click, every impression, every interaction is counted for to ensure the highest possible return. It isn’t about spending more; it’s about spending smart, leveraging data, and strategizing growth.",
      offerings: {
        "eCommerce Revenue & Brand Awareness Campaigns":
          "Paid advertising campaigns to boost sales and brand visibility.",
        "Lead Generation & Remarketing Funnels":
          "Bring everyone back to you – strategies to capture interest, nurture leads, and retarget past visitors.",
        "Conversion Rate Optimization (CRO)":
          "Turn visitors into loyal customers – techniques to improve website performance and checkout processes in order to maximize conversions.",
      },
    },
    "Creative Designing": {
      img: "https://ik.imagekit.io/8mbzq2hdl/digicots/icon-7.png ",
      description:
        "Visuals that Make the Consumer Stop. Turn concepts into striking visual assets – digital or print. Design is way more than just aesthetics; it is the visual language of a brand. It is the backbone of compelling brand communication ensuring every interaction is simply WOW!",
      offerings: {
        "Lookbooks, Catalogs & Pitch Decks":
          "Showcase your strengths and highlight your edge in a visually appealing and structured manner.",
        Illustrations:
          "Custom-designed graphics, artwork, and animations that enhance branding and storytelling.",
        "Amazon A+ Content":
          "Make every detail magnetic, irresistible – enhanced product descriptions on Amazon that include rich media, comparison charts, and storytelling.",
      },
    },
    Branding: {
      img: "https://ik.imagekit.io/8mbzq2hdl/digicots/icon-4.png ",
      description:
        "Carving the Alpha Identity. Craft the soul of your company – define an identity, shape user perception, and create an emotional connection. Branding is the art of ensuring that people don’t just buy products; they buy into a vision, a story, an experience.",
      offerings: {
        "Naming & Logo Development":
          "Your story, your mark – brand names and logos that reflect the company’s vision and values.",
        "Brand Matrix & Packaging Development":
          "Building an identity fortress that no one can trespass – brand positioning, tone, and packaging design.",
        "UI Creation (Adobe Figma)":
          "Precise, compelling designs – intuitive user interfaces to enhance digital experiences.",
      },
    },
    "Outdoor Advertising - Digicots OOH": {
      img: "https://ik.imagekit.io/8mbzq2hdl/digicots/icon-3.png ",
      description:
        "Marking Your Territory in the Real World. Regardless of the ever-changing digital landscape, outdoor advertising remains an unparalleled tool for massive brand visibility. We, at Digicots, ensure that advertising comes across as an experience rather than an interruption. While digital ads can be skipped, outdoor ads remain unmissable and serve as a constant, powerful reminder of a brand’s presence.",
      offerings: {
        "Hoardings & Unipoles":
          "Claim every corner yours with inescapable visuals – outdoor billboards placed in strategic positions.",
        "Kiosks & Outdoor Design":
          "Command attention and leave your mark – small advertising spaces in public areas.",
      },
    },
    "Website Development": {
      img: "https://ik.imagekit.io/8mbzq2hdl/digicots/icon-1.png ",
      description:
        "Your Digital Swarm. A website is more than an online address; it’s a brand’s digital storefront. Website development is a blend of technology, design, and user experience to create seamless, high-converting platforms with every element optimized for performance.",
      offerings: {
        "eCommerce Websites & Landing Pages":
          "Create the perfect trap – high-converting eCommerce platforms & landing pages fit for campaigning.",
        "Dynamic Website & CRO":
          "Adapt, evolve & dominate every visitor’s journey – interactive elements and website optimization.",
        "UX/UI Creation (Adobe Figma)":
          "Smooth. Instinctive. Seamless. – Wireframing and dictating mind-blowing user experiences.",
      },
    },
    "Artificial Reality (AR)": {
      img: "https://ik.imagekit.io/8mbzq2hdl/digicots/icon-2.png ",
      description:
        "Wildly Immersive Experiences. The future of marketing is immersive. AR brings products to life – allowing consumers to virtually experience near-real manifestations of products before purchasing them. This revolutionizes how brands interact with consumers making experiences richer, more engaging, and more impactful. Engage your audience with interactive tools that leave them hooked and coming back for more.",
      offerings: {},
    },
  };

  const serviceRef = useRef([]);
  const scrollContainerRef = useRef([]);

  useGSAP(() => {
    // Ensure refs are populated
    if (!serviceRef.current.length || !scrollContainerRef.current.length)
      return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".services", // Trigger element
        start: "top 40%", // Start when top of .services is 80% from viewport top
        end: "top -700%", // Extended end point for full animation
        scrub: 1, // Smooth scrubbing (adjustable)
        // // // markers: true, // Debugging // // markers (remove in production)
      },
    });

    tl.from(
      serviceRef.current,
      {
        y: "130%", // Slide in from below
        ease: "power3.inOut",
        duration: 5, // Duration of the slide-in
        stagger: 3.5, // Stagger between service elements,
      },
      "a"
    )
    .to(
      scrollContainerRef.current,
      {
        scrollTop: (i, target) => target.scrollHeight - target.clientHeight, // Scroll to bottom
        ease: "power2.out", // Smooth scrolling ease
        duration: 1, // Scroll duration
        stagger: 3.4, // Stagger scrolling of containers (optional)
        delay:4.5
        },
        "a"
      ) // Start 1s after "a" for sync
      .to(
        serviceRef.current,
        {
          scale: 0.9, // Scale down
          borderRadius: "30px", // Round corners
          backgroundColor: "#ffeada", // Change background
          ease: "power3.inOut",
          duration: 5, // Duration of scale animation
          delay: 2, // Delay after scroll
          stagger: 3.4, // Stagger between service elements
        },
        "a"
      ); // Start 3s after "a" for sync
  }, [serviceRef.current, scrollContainerRef.current]); // Dependencies

  return (
    <section className="relative min-h-[800vh]">
      <div className="services sticky top-0 min-h-screen w-full  ">
        {Object.entries(data).map(([title, service], index) => (
          <div
            ref={(el) => (serviceRef.current[index] = el)}
            key={index}
            className="service-box overflow-hidden shadow-2xl shadow-black h-screen absolute top-0 bg-[#FFC395] grid md:grid-cols-2 gap-10 md:gap-20 md:p-30 p-16"
          >
            {/* Left Side - Image and Title */}
            <div className="service-img">
              <h5 className="font-normal text-sm text-[#DF782B] font-inter">
                SOLUTION {index + 1}
              </h5>
              <h2 className="font-black text-4xl md:text-6xl text-black font-inter">
                {title}
              </h2>
              <img
                src={service.img}
                className="w-full max-w-[200px] md:max-w-[600px]"
                alt={title}
              />
            </div>

            {/* Right Side - Description and Offerings */}
            <div
              ref={(el) => (scrollContainerRef.current[index] = el)}
              className="service-text md:max-h-[400px] overflow-y-scroll md:pe-10"
            >
              <p className="font-inter text-xs md:text-sm text-black mb-3">
                {service.description}
              </p>

              {/* Offerings */}
              <div className="offerings mt-5 md:mt-20">
                {Object.entries(service.offerings).map(
                  ([offeringTitle, offeringDesc], i) => (
                    <div key={i} className="list mt-5">
                      <div className="font-inter text-sm md:text-2xl text-black capitalize">
                        {offeringTitle}
                      </div>
                      <p className="font-inter text-xs md:text-sm text-black my-3">
                        {offeringDesc}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AllService;
