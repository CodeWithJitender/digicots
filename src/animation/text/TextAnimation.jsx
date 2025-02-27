import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import React, { useRef } from 'react'

const TextAnimation = ({ children, className="", animeStart="50%" }) => {
  const parentRef = useRef(null)
  const childRef = useRef(null) // Child ka reference

  gsap.registerPlugin(ScrollTrigger)

  useGSAP(() => {
    if (!childRef.current) return // Ensure child exists

    gsap.from(childRef.current, {
      y: 100,
      duration: 1,
      scaleY:0,
      scaleX:.8,
      scrollTrigger: {
        trigger: parentRef.current,
        start: `top ${animeStart}`,
      },
    })
  })

  return (
    <div ref={parentRef} className={`${className} w-full overflow-hidden`}>
      <div ref={childRef}>{children}</div> {/* Child ko wrap kiya aur ref diya */}
    </div>
  )
}

export default TextAnimation
