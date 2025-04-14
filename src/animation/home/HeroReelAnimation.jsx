import React, { useRef } from 'react'
import Showreel from '../../sections/home/Showreel'
import showreel from '../../assets/showreels.mp4'; // Adjust path as needed
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

const HeroReelAnimation = ({parentRef}) => {

    const reelRef = useRef(null);

    gsap.registerPlugin(ScrollTrigger) 
    useGSAP(()=>{
        const tl = gsap.timeline({
            scrollTrigger:{
                trigger:parentRef.current,
                start:"top 0%",
                end:"top -120%",
                scrub:1,
                // snap:[0,.76,1]
            }
        })
        tl.from(reelRef.current, {
            duration: 2,
            scale: window.innerWidth > 450 ?  .1 : .2,
            bottom: window.innerWidth > 405 ?  "-40%" : "-35%",
            right: window.innerWidth > 405 ? "-40%" :"-35%",
            borderRadius:"32px",
        })
        .to(reelRef.current, {
            scale:.95,
            borderRadius:"22px"
        })
    },[])
    

  return (
    <div className="absolute h-full w-full right-0.5 bottom-0.5 -translate-0.5 rounded-none overflow-hidden z-1" ref={reelRef}>
        <Showreel  reel={showreel} />
    </div>

  )
}

export default HeroReelAnimation