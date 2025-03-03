import React, { useState } from "react";

const ContactForm = () => {
  const [activeTab, setActiveTab] = useState("dominance");
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input changes dynamically
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("https://your-api-endpoint.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, type: activeTab }),
      });

      if (!response.ok) throw new Error("Failed to submit. Try again!");

      setMessage("✅ Form submitted successfully!");
      setFormData({});
    } catch (error) {
      setMessage("❌ Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#1a1a1a] min-h-screen flex flex-col lg:flex-row items-center justify-center px-6 lg:px-20 py-12">
      {/* Left Section - Fox Image & Addresses */}
      <div className="w-full lg:w-1/2 flex flex-col items-start">
        <img src="lets-talk.png" alt="Fox" className="w-full max-w-md " />
        <div className="mt-8 text-white grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { country: "India", address: "14, Near Mahavir Pharmacy, Diu", phone: "+91 9876 812 3791", addLink:'https://www.google.com/', phoneLink:'+91 9876 812 3791' },
            { country: "USA", address: "47 W 13th St, New York, NY 10011", phone: "(+1) 230-528-5548", addLink:'https://www.google.com/', phoneLink:'(+1) 230-528-5548' },
            { country: "Singapore", address: "8 Temasek Boulevard, Suntec Tower 3", phone: "(+65) 528-5548", addLink:'https://www.google.com/', phoneLink:'(+65) 528-5548' },
            { country: "Canada", address: "201 James St N, Hamilton, Ontario", phone: "(905) 528-5548", addLink:'https://www.google.com/', phoneLink:'(905) 528-5548' }
          ].map((item, index) => (
            <div key={index}>
              <h3 className="text-2xl mb-3 font-black font-inter">{item.country}</h3>
              <div className="h-[60px] flex flex-col justify-between">
              <p> <a href={item.addLink} target="_blank" className="text-white font-inter">{item.address}</a></p>
              <p> <a href={`tel:${item.phoneLink}`} target="_blank" className="text-white font-inter">{item.phone}</a></p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section - Multi-Tab Form */}
      <div className="w-full lg:w-1/2 bg-[#1a1a1a] px-8 py-8">
        <h1 className="text-white text-4xl font-bold">Let’s Talk</h1>

        {/* Tabs */}
        <div className="flex justify-between mt-4 bg-[#FFFFFF33] rounded-md p-3">
          {[
            { id: "dominance", label: "Let’s Talk Dominance!" },
            { id: "help", label: "Howl for Help" },
            { id: "pack", label: "Join the Pack!" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-md font-semibold ${
                activeTab === tab.id ? "bg-orange-500 text-white" : " text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form Fields - Different for Each Tab */}
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {/* Let’s Talk Dominance */}
          {activeTab === "dominance" && (
            <>
              <input name="fullName" type="text" placeholder="Full Name" onChange={handleChange} className="w-full bg-[#3A3A3A] font-inter text-white p-3 rounded-md focus:outline-none" />
              <div className="flex space-x-2">
                <select name="countryCode" onChange={handleChange} className="bg-[#3A3A3A] font-inter text-white p-3 rounded-md">
                  <option>+1</option>
                  <option>+91</option>
                  <option>+65</option>
                </select>
                <input name="contactNumber" type="text" placeholder="Contact Number" onChange={handleChange} className="flex-1 bg-[#3A3A3A] font-inter text-white p-3 rounded-md focus:outline-none" />
              </div>
              <input name="email" type="email" placeholder="Email Address" onChange={handleChange} className="w-full bg-[#3A3A3A] font-inter text-white p-3 rounded-md focus:outline-none" />
              <textarea name="additionalInfo" placeholder="Additional Information" onChange={handleChange} className="w-full bg-[#3A3A3A] font-inter text-white p-3 rounded-md focus:outline-none" />
            </>
          )}

          {/* Howl for Help */}
          {activeTab === "help" && (
            <>
              <input name="fullName" type="text" placeholder="Full Name" onChange={handleChange} className="w-full bg-[#3A3A3A] font-inter text-white p-3 rounded-md focus:outline-none" />
              <input name="phone" type="text" placeholder="Phone" onChange={handleChange} className="w-full bg-[#3A3A3A] font-inter text-white p-3 rounded-md focus:outline-none" />
              <input name="email" type="email" placeholder="Email" onChange={handleChange} className="w-full bg-[#3A3A3A] font-inter text-white p-3 rounded-md focus:outline-none" />
              <textarea name="message" placeholder="Message" onChange={handleChange} className="w-full bg-[#3A3A3A] font-inter text-white p-3 rounded-md focus:outline-none" />
            </>
          )}

          {/* Join the Pack */}
          {activeTab === "pack" && (
            <>
              <input name="firstName" type="text" placeholder="First Name" onChange={handleChange} className="w-full bg-[#3A3A3A] font-inter text-white p-3 rounded-md focus:outline-none" />
              <input name="lastName" type="text" placeholder="Last Name" onChange={handleChange} className="w-full bg-[#3A3A3A] font-inter text-white p-3 rounded-md focus:outline-none" />
              <input name="phone" type="text" placeholder="Phone" onChange={handleChange} className="w-full bg-[#3A3A3A] font-inter text-white p-3 rounded-md focus:outline-none" />
              <input name="email" type="email" placeholder="Email" onChange={handleChange} className="w-full bg-[#3A3A3A] font-inter text-white p-3 rounded-md focus:outline-none" />
              <textarea name="message" placeholder="Message" onChange={handleChange} className="w-full bg-[#3A3A3A] font-inter text-white p-3 rounded-md focus:outline-none" />
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-md font-semibold hover:bg-orange-600"
            disabled={loading}
          >
            {loading ? "Submitting..." : activeTab === "dominance" ? "Let’s talk about dominance" : activeTab === "help" ? "Request Help" : "Join the Pack"}
          </button>
        </form>

        {/* Success/Error Message */}
        {message && <p className="mt-4 text-white">{message}</p>}
      </div>
    </div>
  );
};

export default ContactForm;
