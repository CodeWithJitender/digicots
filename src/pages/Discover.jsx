import React from 'react'
import HeroDiscover from '../sections/discover/HeroDiscover'
import ServiceDiscover from '../sections/discover/ServiceDiscover'
import AllService from '../sections/discover/AllService'

function Discover() {
  return (
    <div className=''>
        {/* <ScrollHandler /> ✅ should be inside Router and above Routes */}

      <HeroDiscover/>
      {/* <ServiceDiscover/> */}
      <AllService/>
    </div>
  )
}

export default Discover