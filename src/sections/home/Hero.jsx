import React from 'react'

function Hero({img}) {
  return (
    <section className='hero-home'>
        <img src={img} alt="" className='w-full' />
    </section>
  )
}

export default Hero