import React from "react";
import Hero from "../sections/home/Hero";
import homeHero from "../assets/home-hero.png"; // Adjust path as needed
import HowItWorks from "../sections/home/HowItWorks";
import Solutions from "../sections/home/Solutions";
// import ContentSections from "../sections/home/ContentSlider";
import OurWork from "../sections/home/OurWork";
import Insights from "../sections/home/Insights";
import OurJourney from "../sections/home/OurJourney";
import Header from "../components/Header";
import Faq from "../sections/home/Faq";
import KeywordsSection from "../sections/home/KeywordsSection";
import Testimonials from "../sections/home/Testimonials";
import Footer from "../components/Footer";
import ContentSlider from "../sections/home/ContentSlider";

function Home() {
  return (
    <>
      <Hero img={homeHero} /> 
      <HowItWorks/> 
      {/* <Solutions/> */}
      <ContentSlider/>
      <OurWork/>
      <Insights/>
      <KeywordsSection/>
      <OurJourney/> 
      <Testimonials/>
      <Faq/>
      <Footer/>
    </>
  );
}

export default Home;
