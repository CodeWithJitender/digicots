import React from "react";
import Hero from "../sections/home/hero";
import Showreel from "../sections/home/Showreel";
import homeHero from "../assets/home-hero.png"; // Adjust path as needed
import showreel from "../assets/showreels.mp4"; // Adjust path as needed
import HowItWorks from "../sections/home/HowItWorks";
import Solutions from "../sections/home/Solutions";
import OurWork from "../sections/home/OurWork";
import Insights from "../sections/home/Insights";
import OurJourney from "../sections/home/OurJourney";
import Header from "../components/Header";
import Faq from "../sections/home/Faq";
import KeywordsSection from "../sections/home/KeywordsSection";

function Home() {
  return (
    <>
      <Header />
      <Hero img={homeHero} />
      <Showreel reel={showreel} />
      <HowItWorks />
      <Solutions />
      <OurWork />
      <Insights />
      <KeywordsSection/>
      <OurJourney />
      <Faq/>
    </>
  );
}

export default Home;
