import React, { useState } from "react";

export default function Footer() {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    countryCode: "+91",
    contactNumber: "",
  });

  const [message, setMessage] = useState("");

  const validateForm = () => {
    const requiredFields = ["fullName", "companyName", "email", "contactNumber"];
    
    for (const field of requiredFields) {
      if (!formData[field] || formData[field].trim() === "") {
        const formattedField = field
          .replace(/([A-Z])/g, " $1") // Add space before capital letters
          .replace("_", " ")          // In case there's any underscore
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
    <footer className="bg-black text-white py-16 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Top Section - Join the Pack */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="md:w-[25%] text-center md:text-left">
            <h2 className="text-5xl sm:text-8xl font-inter font-bold leading-tight text-white">
              Join the Pack
            </h2>
            <p className="text-gray-400 mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore.
            </p>
          </div>

          {/* Right - Form */}
          <div className="md:w-[65%] w-full">
            <form
              onSubmit={handleSubmit}
              action="https://formsubmit.co/Dominance@digicots.com"
              method="POST"
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_next" value="/thankyou" />

              <input
                type="text"
                placeholder="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="bg-[#3A3A3A] text-[#737373] p-4 sm:p-5 rounded-[14px] w-full focus:outline-none"
              />
              <input
                type="text"
                placeholder="Company Name"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="bg-[#3A3A3A] text-[#737373] p-4 sm:p-5 rounded-[14px] w-full focus:outline-none"
              />
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-[#3A3A3A] text-[#737373] p-4 sm:p-5 rounded-[14px] w-full focus:outline-none"
              />
              <div className="flex">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  className="bg-[#3A3A3A] text-[#737373] p-4 sm:p-5 rounded-l-[14px] focus:outline-none"
                >
                  <option value="+1">+1</option>
                  <option value="+91">+91</option>
                  <option value="+44">+44</option>
                </select>
                <input
                  type="text"
                  placeholder="Contact Number"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="bg-[#3A3A3A] text-[#737373] p-4 sm:p-5 w-full rounded-r-[14px] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="md:col-span-2 bg-[#DF782B] hover:bg-orange-600 transition-all text-white font-bold p-4 sm:p-5 rounded-[14px] cursor-pointer"
              >
                Let's Talk about the Future
              </button>
            </form>
            {message && (
              <p className="text-sm text-white mt-2 font-semibold">
                {message}
              </p>
            )}
          </div>
        </div>

        {/* Bottom part of the footer remains unchanged */}
        {/* You can paste your bottom section here like before if needed */}
      </div>
    </footer>
  );
}
