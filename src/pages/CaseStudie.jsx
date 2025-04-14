import React from 'react'
import Header from '../components/Header'
import SimpleSlider from '../sections/case-studies/SimpleSlider'
import Scene from '../animation/case-studies/CardsScene'

function CaseStudie() {
  return (
    <div className='h-screen w-full'>
      <Scene />

      {/* <SimpleSlider/> */}
    </div>
  )
}

export default CaseStudie