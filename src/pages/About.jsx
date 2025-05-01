import React from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import Hero from "../sections/about/Hero";
import HowWeWork from "../sections/about/HowWeWork";
import WhyChooseUs from "../sections/about/WhyChooseUs";
import OurVision from "../sections/about/OurVision";
import MeetThePack from "../sections/about/MeetThePack";
import Loading from "../components/Loading";

function About() {
  const location = useLocation(); // Get current location object

  return (
    <>
    {/* <Loading /> */}
    <div key={location.key}> {/* Add key based on location */}
      <Hero />
      {/* <MeetThePack /> */}
      <HowWeWork />
      <WhyChooseUs />
      <OurVision />
    </div>
    </>
  );
}

export default About;