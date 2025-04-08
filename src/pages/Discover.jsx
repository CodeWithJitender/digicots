import React from 'react'
import HeroDiscover from '../sections/discover/HeroDiscover'
import ServiceDiscover from '../sections/discover/ServiceDiscover'
import AllService from '../sections/discover/AllService'

function Discover() {
  return (
    <div className=''>
      <HeroDiscover/>
      {/* <ServiceDiscover/> */}
      <AllService/>
    </div>
  )
}

export default Discover