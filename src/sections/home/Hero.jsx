import React, { useRef } from 'react'
import HeroReelAnimation from '../../animation/home/HeroReelAnimation'
// import homeHero from '../assets/home-hero.png'; // Adjust path as needed

function Hero({img}) {
  const parentRef = useRef(null)
  console.log(parentRef)

  return (
    <div className='relative h-[200vh] w-full'>
      <section ref={parentRef} className='hero-home sticky top-0 h-screen w-full bg-black p-0 '>
         {/* <HeroReelAnimation parentRef={parentRef} /> */}
        {/* <img src={img} alt="" className='w-full h-full' /> */}
    </section>
    </div>
  )
}

export default Hero