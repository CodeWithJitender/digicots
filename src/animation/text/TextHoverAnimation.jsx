import gsap from 'gsap'
import React from 'react'

const TextHoverAnimation = ({children,className}) => {

    const textRef = React.useRef([])


    const handleEnter = ()=>{
        gsap.to(textRef.current,{
            y: "-110%",
            duration: .3,
            ease: "power1.out",
        })
    }
    const handleLeave = ()=>{
        gsap.to(textRef.current,{
            y: "0%",
            duration: .3,
            ease: "power1.out",
        })
    }

  return (
    <div className={`${className}  w-full `} onMouseEnter={handleEnter} onMouseLeave={handleLeave} >
    <div ref={(el)=> textRef.current[0] = el}>{children}</div>
    <div ref={(el)=> textRef.current[1] = el}>{children}</div>
    </div>
  )
}

export default TextHoverAnimation