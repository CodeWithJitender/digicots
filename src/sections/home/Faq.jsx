import React, { useState } from "react";
import { Link } from "react-router-dom";
import TextAnimation from "../../animation/text/TextAnimation";

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

  return (
    <section className="bg-black text-white">
      <div className="container-xxl">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:[grid-template-columns:40%_60%] gap-12">
          {/* Left Side - Heading */}
          <div className="flex flex-col h-full justify-between">
            <div>
              <TextAnimation
                animeStart="60%"
                className="h-[65px] overflow-hidden"
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight font-inter">
                  We are here to
                </h2>
              </TextAnimation>
              <TextAnimation
                animeStart="60%"
                className="h-[65px] overflow-hidden"
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight font-inter">
                  answer all of
                </h2>
              </TextAnimation>
              <TextAnimation
                animeStart="60%"
                className="h-[65px] overflow-hidden"
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight font-inter">
                  your questions<span className="text-[#DF782B]">.</span>
                </h2>
              </TextAnimation>
            </div>
            <div className="mt-10 text-sm">
              <TextAnimation animeStart="90%">
                <p className="font-semibold font-inter">Still Seeking help?</p>
              </TextAnimation>
              <TextAnimation animeStart="90%">
                <Link
                  to="/contact"
                  className="text-[#DF782B] font-semibold font-inter"
                >
                  Contact Our Representative.
                </Link>
              </TextAnimation>
            </div>
          </div>

          {/* Right Side - FAQ List */}
          <div>
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-t border-gray-600 border-dashed  last:border-b"
              >
                <button
                  className="w-full text-left py-4 flex justify-between items-center"
                  onClick={() => toggleFAQ(index)}
                >
                  <TextAnimation animeStart="90%">
                    <span className="text-lg font-semibold font-inter">
                      {faq.question}
                    </span>
                  </TextAnimation>
                  <span className="text-2xl font-inter">
                    {openIndex === index ? "-" : "+"}
                  </span>
                </button>
                {openIndex === index && faq.answer && (
                  <TextAnimation animeStart="90%">
                    <p className="text-gray-400 text-sm pb-4">{faq.answer}</p>
                  </TextAnimation>
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
