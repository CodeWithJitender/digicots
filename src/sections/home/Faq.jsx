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
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(0); // Default: first FAQ is open

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const blockRefs = useRef([]);
  const pointRef = useRef(null);
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
    tl.from(pointRef.current, { opacity: 0, y: 100, scaleY:0, transformOrigin:"top", delay:.5, duration: 1 },"a")
  },[])

  return (
    <section className="bg-black text-white">
      <div className="container-xxl">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:[grid-template-columns:40%_60%] gap-12">
          {/* Left Side - Heading */}
          <div className="flex flex-col h-full justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight font-inter">
                <TextAnimation1
                  animeStart="60%"
                  duration=".5"
                  className="h-[65px] overflow-hidden"
                >
                  We are here to
                </TextAnimation1>
              </h2>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight font-inter">
                <TextAnimation1
                  animeStart="60%"
                  duration=".5"
                  className="h-[65px] overflow-hidden"
                >
                  answer all of
                </TextAnimation1>
              </h2>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight font-inter">
                <TextAnimation1
                  animeStart="70%"
                  duration=".5"
                  className="h-[65px] overflow-hidden"
                >
                  your questions 
                </TextAnimation1>
                <span ref={pointRef} className="text-[#DF782B] inline-block relative">.</span>
                
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
                    <TextAnimation2 animeStart="90%" duration={.2}>
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