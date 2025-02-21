import React from 'react'
// import homeHero from '../assets/home-hero.png'; // Adjust path as needed

function Hero({img}) {
  return (
    <section className='hero-home'>
        <img src={img} alt="" className='w-full' />
    </section>
  )
}

export default Hero