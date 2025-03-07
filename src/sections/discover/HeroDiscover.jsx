import React from 'react'

function HeroDiscover() {
  return (
    <section className='hero-discover'>
      <div className="hero-container relative text-center">
        <div className="hero-img"><img src="discover-1.png" alt="" className="" /></div>
        <div className="hero-text absolute bottom-0 w-full px-4">
          <h1 className='font-bold text-inter text-5xl sm:text-7xl lg:text-9xl text-center text-white mb-20 md:mb-40'>DIGICOTS</h1>
          <p className='text-inter text-lg text-center text-white mb-5'>SCROLL TO KNOW HOWL CAN WE HELP YOU?</p>
          <img src="arrow-down.png" alt="" className="w-16 m-auto mb-5" />
        </div>
      </div>
    </section>
  )
}

export default HeroDiscover