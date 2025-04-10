import React, { useRef } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const contentData = [
  {
    heading: "Content Production",
    p: "Crafting your howl in seamless harmony with the consumer’s voice. The art of storytelling by transforming ideas into captivating visual narratives that engage, inform, and persuade. Content production is the bridge between creativity and commerce – making brands not just visible, but rather unforgettable.",
    link: "/content-production",
    img: "icon-9.png",
    thumbnail: "icon-9.png",
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
    p: "Exploring the Unknown; Making Your Mark. Extend brand awareness beyond traditional channels by leveraging trusted voices in the industry to authentically engage with niche groups. Reaching the right audience requires more than just good content – it demands strategic outreach that ensures maximum impact.",
    link: "/marketing-strategy",
    img: "icon-8.png",
    thumbnail: "icon-8.png",
    tag: [
      "Influencer Marketing",
      "Inter-Brand Collaborations",
      "WhatsApp Marketing & Email Campaigns",
      "Regional Amplification",
    ],
  },
  {
    heading: "Public Relations",
    p: "Making your vision echo across the globe! This is the art of shaping and maintaining a brand’s reputation – its most valuable asset. PR strategies go way beyond publicity; they help in establishing credibility, authority, and trust. Effective PR creates a wave that turns mere businesses into industry icons.",
    link: "/web-development",
    img: "icon-4.png",
    thumbnail: "icon-4.png",
    tag: [
      "Press Releases & Editorial Articles",
      "Authored Articles",
      "Reputation Management",
    ],
  },
  {
    heading: "Digital Marketing",
    p: "Hunt Smarter. Hunt Harder. It’s not just about posting on social media; it’s about formulating impactful, data-driven strategies. A strong, consistent online presence helps garner engagement and brand loyalty. Digital marketing is the ultimate blend of creativity, analytics, and strategy delivering quantifiable results that drive growth.",
    link: "/web-development",
    img: "icon-6.png",
    thumbnail: "icon-6.png",
    tag: [
      "Social Media Management & Evergreen Strategies",
      "Campaign-level Strategy & SEO",
    ],
  },
  {
    heading: "Performance Marketing",
    p: "Unmatched Precision. Uncaged Results. Maximize ROI through hyper-targeted advertising and conversion-focused strategies. Every click, every impression, every interaction is counted for to ensure the highest possible return. It isn’t about spending more; it’s about spending smart, leveraging data, and strategizing growth.",
    link: "/web-development",
    img: "icon-5.png",
    thumbnail: "icon-5.png",
    tag: [
      "eCommerce Revenue & Brand Awareness Campaigns",
      "Lead Generation & Remarketing Funnels",
      "Conversion Rate Optimization (CRO)",
    ],
  },
  {
    heading: "Creative Designing",
    p: "Visuals that Make the Consumer Stop. Turn concepts into striking visual assets – digital or print. Design is way more than just aesthetics; it is the visual language of a brand. It is the backbone of compelling brand communication ensuring every interaction is simply WOW!",
    link: "/web-development",
    img: "icon-7.png",
    thumbnail: "icon-7.png",
    tag: [
      "Lookbooks, Catalogs & Pitch Decks",
      "Illustrations",
      "Amazon A+ Content",
    ],
  },
  {
    heading: "Branding",
    p: "Carving the Alpha Identity. Craft the soul of your company – define an identity, shape user perception, and create an emotional connection. Branding is the art of ensuring that people don’t just buy products; they buy into a vision, a story, an experience.",
    link: "/web-development",
    img: "icon-4.png",
    thumbnail: "icon-4.png",
    tag: [
      "Naming & Logo Development",
      "Brand Matrix & Packaging Development",
      "UI Creation (Adobe Figma)",
    ],
  },
  {
    heading: "Outdoor Advertising",
    p: "Marking Your Territory in the Real World. Regardless of the ever-changing digital landscape, outdoor advertising remains an unparalleled tool for massive brand visibility. We, at Digicots, ensure that advertising comes across as an experience rather than an interruption.",
    link: "/web-development",
    img: "icon-3.png",
    thumbnail: "icon-3.png",
    tag: ["Hoardings & Unipoles", "Kiosks & Outdoor Design"],
  },
  {
    heading: "Website Development",
    p: "Your Digital Swarm. A website is more than an online address; it’s a brand’s digital storefront. Website development is a blend of technology, design, and user experience to create seamless, high-converting platforms with every element optimized for performance.",
    link: "/web-development",
    img: "icon-1.png",
    thumbnail: "icon-1.png",
    tag: [
      "eCommerce Websites & Landing Pages",
      "Dynamic Website & CRO",
      "UX/UI Creation (Adobe Figma)",
    ],
  },
  {
    heading: "Artificial Reality (AR)",
    p: "Wildly Immersive Experiences. The future of marketing is immersive. AR brings products to life – allowing consumers to virtually experience near-real manifestations of products before purchasing them. This revolutionizes how brands interact with consumers making experiences richer, more engaging, and more impactful.",
    link: "/web-development",
    img: "icon-2.png",
    thumbnail: "icon-2.png",
    tag: ["", "", ""],
  },
];

const ContentSlider = () => {
  const mainSlider = useRef();
  const thumbSlider = useRef();

  const mainSettings = {
    asNavFor: thumbSlider.current,
    arrows: false,
    // autoplay: true,
    // autoplaySpeed: 2000,
    ref: (slider) => (mainSlider.current = slider),
    slidesToShow: 1,
    slidesToScroll: 1,
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
    // autoplay: true,
    // autoplaySpeed: 2000, // 2 seconds
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <div className="flex flex-col lg:flex-col-reverse max-w-[1600px] mx-auto px-5 md:px-10 py-20">
      {/* Thumbnails */}
      <div className="slider-thumb mb-10">
        <Slider {...thumbSettings}>
          {contentData.map((item, index) => (
            <div key={index} className="px-2">
              <div className="border-2 border-[#ED510C] rounded-lg overflow-hidden cursor-pointer  ">
                <img
                  src={item.thumbnail}
                  alt={item.heading}
                  className="w-full hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div className="md:col-start-2 md:col-span-2">
        <Slider {...mainSettings} className="">
          {contentData.map((data, index) => (
            <div key={index}>
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
                    <p className="font-inter text-white my-4">{data.p}</p>
                    <Link to={data.link} className="text-white">
                      Explore More{" "}
                      <i className="far fa-arrow-right rotate-[-45deg] text-[#ED510C]"></i>
                    </Link>
                    <div className="flex flex-wrap gap-4 mt-4 lg:hidden">
                      {data.tag.map((text, index) => (
                        <button
                          key={index}
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
                      alt=""
                    />
                  </div>

                  {/* Tags */}
                  <div className="solution-tag bg-[#202020] rounded-[24px] p-6 lg:p-8 hidden lg:block md:col-start-3">
                    <div className="flex flex-wrap gap-4 text-start">
                      {data.tag.map((text, index) => (
                        <button
                          key={index}
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
  );
};

export default ContentSlider;
