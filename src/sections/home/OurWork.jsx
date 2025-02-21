import React from 'react'
import MainHeading from '../../components/MainHeading'
import OurWorkSlider from '../../components/OurWorkSlider'


function OurWork() {
  return (
    <section className='our-work bg-black'>
        <div className="container-xxl">
        <MainHeading heading={'OUR WORK'} pera={'We specialize in personalized and conversational marketing, crafting tailored experiences for every business.'} cl={"text-center"} tColor={'text-white'}/>
        <div className="mt-10"></div>
        <OurWorkSlider/>
        </div>
    </section>
  )
}

export default OurWork