import React from 'react'
import MainHeading from './MainHeading'
import { Link } from 'react-router-dom'


function HeadingWithLink({head, per, linkh, link}) {
  return (
    <div className='flex align-middle'>
        <div className="left text-start"><MainHeading heading={head} pera={per} cl={'text-start'} /></div>
        <div className="right"><Link to={link} className='flex'>{linkh} <i class="fal fa-arrow-up"></i></Link></div>
    </div>
  )
}

export default HeadingWithLink