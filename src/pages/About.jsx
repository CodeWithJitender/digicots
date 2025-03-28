import React from 'react'
import Hero from '../sections/about/Hero'
import HowWeWork from '../sections/about/HowWeWork'
import WhyChooseUs from '../sections/about/WhyChooseUs'
import OurVision from '../sections/about/OurVision'
import Header from '../components/Header'
import MeetThePack from '../sections/about/MeetThePack'

function About() {
  return (
    <div>
      <Hero/>
      <MeetThePack/>
      <HowWeWork/>
      <WhyChooseUs/>
      <OurVision/>
    </div>
  )
}

export default About
