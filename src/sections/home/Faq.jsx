import React, { useState } from "react";
import { Link } from "react-router-dom";
import TextAnimation1 from "../../animation/text/TextAnimation1";
import TextAnimation2 from "../../animation/text/TextAnimation2";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

const faqs = [
  {
    question: "Why use a marketing agency?",
    answer:
      "A marketing agency is your team of maestros – hunting success stories, crafting systems and making your voice echo around the globe. They save time, deliver expert knowledge and provide tools & systems for better targeting, creativity and ROI. With our pack of wolves – Digicots – you get precision, agility and otherworldly results.",
  },
  {
    question: "What is the function of a marketing agency?",
    answer:
      "A marketing agency knows your brand’s strengths, understands your audience and sets your vision into motion. We, at Digicots, drive growth, build awareness, generate leads and foster loyalty – all while making you leap out from the swarmed locus of your competition.",
  },
  {
    question: "What are the types of marketing?",
    answer:
      "There are 8 niches of marketing – branding, digital media marketing, advertising, public relations, performance marketing, print media, charity and promotions. We, at Digicots, have an extensive understanding of all these arenas and craft exceptional strategies in order to make your story echo till eternity.",
  },
  {
    question: "What does STP stand for in marketing?",
    answer:
      "Segmentation. Targeting. Positioning. Break your audience into segments, target niche groups and position yourself as their go-to service/product. Digicots ensures that your strategy is as precise as a wolf’s bite.",
  },
  {
    question: "What does a branding service include?",
    answer:
      "Branding is, in simple words, authoring your own story in order to make your vision, mission and character spread around the globe. It involves logo design, setting the right tone, harmonizing with the consumer’s voice, visual identity and crafting systems that ensure your brand is engraved in everyone’s souls.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(0); // Default: first FAQ is open

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const blockRefs = useRef([]);
  gsap.registerPlugin(ScrollTrigger)
  useGSAP(()=>{
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: blockRefs.current,
        start: "top 80%",
        end: "top 0%",
        // scrub: 1,
      },
    });
    tl.from(blockRefs.current, { opacity: 0, y: 100, duration: 1,stagger:.3 },"a")
  },[])

  return (
    <section className="bg-black text-white">
      <div className="container-xxl">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:[grid-template-columns:40%_60%] gap-12">
          {/* Left Side - Heading */}
          <div className="flex flex-col h-full justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight font-inter overflow-hidden">
                <TextAnimation1
                  animeStart="100%"
                  duration="1.5"
                  className="overflow-hidden"
                >
                  We are here to
                </TextAnimation1>
              </h2>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight font-inter overflow-hidden">
                <TextAnimation1
                  animeStart="100%"
                  duration="1.5"
                  className="overflow-hidden"
                >
                  answer all of
                </TextAnimation1>
              </h2>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight font-inter overflow-hidden">
                <TextAnimation1
                  animeStart="100%"
                  duration="1.5"
                  className="overflow-hidden"
                >
                  your questions 
                <span className="text-[#DF782B] inline-block relative">.</span>
                </TextAnimation1>
              </h2>
            </div>
            <div className="mt-10 text-sm">
              <p className="font-semibold font-inter">
                {/* <TextAnimation1 animeStart="90%" duration=".5"> */}
                  Still Seeking help?
                {/* </TextAnimation1> */}
              </p>
              <Link
                to="/contact"
                className="text-[#DF782B] font-semibold font-inter"
              >
                {/* <TextAnimation1 animeStart="90%" duration=".5"> */}
                  Contact Our Representative.
                {/* </TextAnimation1> */}
              </Link>
            </div>
          </div>

          {/* Right Side - FAQ List */}
          <div>
            {faqs.map((faq, index) => (
              <div
              ref={(el) => (blockRefs.current[index] = el)}
                key={index}
                className="border-t border-gray-600 border-dashed  last:border-b"
              >
                <button
                  className="w-full text-left py-4 flex justify-between items-center"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="text-lg font-semibold font-inter">
                      {faq.question}
                  </span>
                  <span className="text-2xl font-inter">
                    {openIndex === index ? "-" : "+"}
                  </span>
                </button>
                {openIndex === index && faq.answer && (
                  <p className="text-gray-400 text-sm pb-4">
                    <TextAnimation2 animeStart="90%" duration={.6}>
                      {faq.answer}
                    </TextAnimation2>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;