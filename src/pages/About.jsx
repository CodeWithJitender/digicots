import React from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import Hero from "../sections/about/Hero";
import HowWeWork from "../sections/about/HowWeWork";
import WhyChooseUs from "../sections/about/WhyChooseUs";
import OurVision from "../sections/about/OurVision";
import MeetThePack from "../sections/about/MeetThePack";

function About() {
  const location = useLocation(); // Get current location object

  return (
    <div key={location.key}> {/* Add key based on location */}
      <Hero />
      <MeetThePack />
      <HowWeWork />
      <WhyChooseUs />
      <OurVision />
    </div>
  );
}

export default About;