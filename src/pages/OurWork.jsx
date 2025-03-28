import React, { useEffect } from 'react'
import Header from '../components/Header'
import HeroHeading from '../sections/our-work/HeroHeading'
import BrandingGrid from '../sections/our-work/BrandingGrid'

function OurWork() {
  useEffect(() => {
    const hasReloaded = sessionStorage.getItem("hasReloaded");
  
    if (!hasReloaded) {
      sessionStorage.setItem("hasReloaded", "true");
      window.location.reload();
    }
  }, []);
  
  return (
    <div className='bg-black overflow-x-hidden'>
    <HeroHeading/>
    <BrandingGrid/>
    </div>
  )
}

export default OurWork