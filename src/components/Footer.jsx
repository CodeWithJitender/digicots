import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";

// Animation variants for sections
const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

// Variants for staggered children (form inputs, links, social icons)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, scale: 1.2, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

// Social icons slide from left
const socialIconVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function Footer() {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.2 }); // Trigger when 20% visible

  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    countryCode: "+91",
    contactNumber: "",
  });

  const [message, setMessage] = useState("");

  const validateForm = () => {
    const requiredFields = [
      "fullName",
      "companyName",
      "email",
      "contactNumber",
    ];

    for (const field of requiredFields) {
      if (!formData[field] || formData[field].trim() === "") {
        const formattedField = field
          .replace(/([A-Z])/g, " $1") // Add space before capital letters
          .replace("_", " ") // In case there's any underscore
          .replace(/\b\w/g, (l) => l.toUpperCase()); // Capitalize each word
        return `❌ Please fill out "${formattedField}"`;
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return "❌ Please enter a valid email address.";
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.contactNumber)) {
      return "❌ Contact number must be exactly 10 digits.";
    }

    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    const error = validateForm();
    if (error) {
      e.preventDefault();
      setMessage(error);
    } else {
      setMessage("✅ Submitting...");
    }
  };

  return (
    <footer
      ref={footerRef}
      className="bg-black backdrop-blur-xl text-white py-16 px-6 relative z-[999] overflow-hidden"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Top Section - Join the Pack */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          {/* Left - Text */}
          <motion.div
            className="md:w-[25%] text-center md:text-left"
            variants={sectionVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h2 className="text-5xl sm:text-8xl font-inter font-bold leading-tight text-white">
              Join the Pack
            </h2>
            <p className="text-gray-400 mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore.
            </p>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            className="md:w-[65%] w-full"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              action="https://formsubmit.co/jitender@digicots.com"
              method="POST"
            >
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input
                type="hidden"
                name="_next"
                value="http://localhost:5173/thankyou"
              />
              <motion.input
                onChange={handleChange}
                type="text"
                placeholder="Full Name"
                className="bg-[#3A3A3A] text-[#737373] p-4 sm:p-5 rounded-[14px] w-full focus:outline-none"
                name="Full_Name"
                variants={childVariants}
              />
              <motion.input
                onChange={handleChange}
                type="text"
                placeholder="Company Name"
                className="bg-[#3A3A3A] text-[#737373] p-4 sm:p-5 rounded-[14px] w-full focus:outline-none"
                name="Company_Name"
                variants={childVariants}
              />
              <motion.input
                onChange={handleChange}
                type="email"
                placeholder="Email Address"
                className="bg-[#3A3A3A] text-[#737373] p-4 sm:p-5 rounded-[14px] w-full focus:outline-none"
                name="Email"
                variants={childVariants}
              />
              <motion.div className="flex" variants={childVariants}>
                <select
                  onChange={handleChange}
                  className="bg-[#3A3A3A] text-[#737373] p-4 sm:p-5 rounded-l-[14px] focus:outline-none"
                >
                  <option value="+1">+1</option>
                  <option value="+91">+91</option>
                  <option value="+44">+44</option>
                </select>
                <input
                  type="text"
                  onChange={handleChange}
                  placeholder="Contact Number"
                  className="bg-[#3A3A3A] text-[#737373] p-4 sm:p-5 w-full rounded-r-[14px] focus:outline-none"
                  name="Contact_Number"
                />
              </motion.div>
              <motion.button
                className="md:col-span-2 bg-[#DF782B] hover:bg-orange-600 transition-all text-white font-bold p-4 sm:p-5 rounded-[14px] cursor-pointer"
                variants={childVariants}
              >
                Let's Talk about the Future
              </motion.button>
            </form>
            {message && (
              <p className="text-sm text-white mt-2 font-semibold">{message}</p>
            )}
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          className="border-t border-gray-700 my-12"
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        ></motion.div>

        {/* Bottom Section - Footer Content */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Branding */}
          <div className="flex flex-col items-center md:items-start col-span-2 md:col-span-1">
            <motion.h3
              className="text-4xl font-bold text-[#DF782B]"
              variants={childVariants}
            >
              <Link to={"/"}>
                <img
                  src="https://ik.imagekit.io/8mbzq2hdl/digicots/logo-white.png?updatedAt=1744631774835"
                  className="max-w-[200px]"
                  alt=""
                />
              </Link>
            </motion.h3>
            <motion.div
              className="flex space-x-3 mt-4"
              variants={containerVariants}
            >
              {["facebook-f", "instagram", "linkedin-in", "twitter"].map(
                (icon) => (
                  <motion.div
                    key={icon}
                    className="w-8 h-8 bg-gray-800 rounded-md flex justify-center items-center"
                    variants={socialIconVariants}
                  >
                    <a href="#">
                      <i className={`fab fa-${icon}`}></i>
                    </a>
                  </motion.div>
                )
              )}
            </motion.div>
          </div>

          {/* Address */}
          <motion.div
            className="sm:text-left sm:max-w-[250px] col-span-2 sm:col-span-1"
            variants={childVariants}
          >
            <h4 className="text-lg font-semibold">India</h4>
            <p className="text-gray-400 mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore.
            </p>
            <p className="mt-2 font-semibold">+91 987 987 5632</p>
          </motion.div>

          {/* Links */}
          <motion.div
            className="flex sm:justify-end gap-5 md:gap-10 lg:gap-20  md:justify-around md:text-left"
            variants={containerVariants}
          >
            {["Quick Links"].map((header, idx) => (
              <div key={idx}>
                <motion.h4 className="font-semibold" variants={childVariants}>
                  {header}
                </motion.h4>
                <motion.ul
                  className="text-gray-400 mt-2 space-y-1"
                  variants={containerVariants}
                >
                  {[
                    {
                      title: "About Us",
                      id: "about",
                    },
                    {
                      title: "Insights",
                      id: "insights",
                    },
                    {
                      title: "Our Work",
                      id: "our-work",
                    },
                    {
                      title: "Case Study",
                      id: "case-study",
                    },
                    {
                      title: "Let's Talk",
                      id: "contact",
                    },
                  ].map((link, i) => (
                    <motion.li key={i} variants={childVariants}>
                      <Link to={`/${link.id}`} className="hover:text-white">
                        {link.title}
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            ))}
            {["Services"].map((header, idx) => (
              <div key={idx}>
                <motion.h4 className="font-semibold" variants={childVariants}>
                  {header}
                </motion.h4>
                <motion.ul
                  className="text-gray-400 mt-2 space-y-1"
                  variants={containerVariants}
                >
                  {[
                    {
                      title: "Website Development",
                      id: "website-development",
                    },
                    {
                      title: "Artificial Reality (AR)",
                      id: "artificial-reality",
                    },
                    {
                      title: "Outdoor Advertising",
                      id: "outdoor-advertising",
                    },
                    {
                      title: "Public Relations",
                      id: "public-relations",
                    },
                    {
                      title: "Performance Marketing",
                      id: "performance-marketing",
                    },
                    {
                      title: "Digital Marketing",
                      id: "digital-marketing",
                    },
                    {
                      title: "Creative Designing",
                      id: "creative-designing",
                    },
                    {
                      title: "Outreach Solutions",
                      id: "outreach-solutions",
                    },
                    {
                      title: "Content Production",
                      id: "content-production",
                    },
                    {
                      title: "Performance Marketing",
                      id: "performance-marketing",
                    },
                  ].map((link, i) => (
                    <motion.li key={i} variants={childVariants}>
                      <Link
                        to={`discover#${link.id}`}
                        className="hover:text-white"
                      >
                        {link.title}
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          className="mt-12 text-gray-400 flex flex-col sm:flex-row justify-between align-middle"
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div>
            <p className="text-center sm:text-start">
              Designed by{" "}
              <a href="#" className="text-[#DF782B]">
                Aishwary Sinha
              </a>
            </p>
          </div>
          <div className="text-center sm:text-end">
            <p className="mt-1">Auuuuu... Created Proudly in India</p>
            <p className="mt-1">Copyright 2025 ©</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
