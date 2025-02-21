import React from 'react';
import Hero from '../sections/home/hero';
import Showreel from '../sections/home/Showreel';
import homeHero from '../assets/home-hero.png'; // Adjust path as needed
import showreel from '../assets/showreels.mp4'; // Adjust path as needed
import HowItWorks from '../sections/home/HowItWorks';
import Solutions from '../sections/home/Solutions';

function Home() {
  return (
    <>
      <Hero img={homeHero} />
      <Showreel reel={showreel} />
      <HowItWorks/>
      <Solutions/>
    </>
  );
}

export default Home;
