import React from 'react'
import { Link } from 'react-router-dom'

function BlogHeading({heading, linkText, link}) {
  return (
    <div className="pt-10 md:py-12 px-6 mb-10">
    <div className='blog-heading flex flex-col md:flex-row justify-between items-center gap-4'>
        <h3 className='font-bold text-xl text-center md:text-start md:text-3xl text-white max-w-80'>{heading}</h3>
        <Link to='' className='bg-white text-black px-4 py-2 rounded-full text-sm font-semibold flex items-center'>{linkText} <i class="far fa-arrow-right rotate-[-45deg] ms-3"></i></Link>
    </div>
    </div>
  )
}

export default BlogHeading