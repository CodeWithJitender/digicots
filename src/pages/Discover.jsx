import React from 'react'
import Header from '../components/Header'
import HeroDiscover from '../sections/discover/HeroDiscover'
import ServiceDiscover from '../sections/discover/ServiceDiscover'
import AllService from '../sections/discover/AllService'

function Discover() {
  return (
    <div>
      <Header/>
      <HeroDiscover/>
      <ServiceDiscover/>
      <AllService/>
    </div>
  )
}

export default Discover