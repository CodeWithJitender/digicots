import React from 'react';
import Hero from '../sections/home/hero';
import Showreel from '../sections/home/Showreel';
import homeHero from '../assets/home-hero.png'; // Adjust path as needed
import showreel from '../assets/showreels.mp4'; // Adjust path as needed
import HowItWorks from '../sections/home/HowItWorks';
import Solutions from '../sections/home/Solutions';
import OurWork from '../sections/home/OurWork';
import Insights from '../sections/home/Insights';
import OurJourney from '../sections/home/OurJourney';

function Home() {
  return (
    <>
      <Hero img={homeHero} /> {/* Done animation*/}
      
      
      <HowItWorks/>
      <Solutions/>
      <OurWork/>
      <Insights/>
      <OurJourney/>
    </>
  );
}

export default Home;
