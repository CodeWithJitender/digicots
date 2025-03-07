import React from 'react'
import BlogSection from '../../components/BlogSection'
import BlogHeading from '../../components/BlogHeading'

function BlogList() {
  return (
    <div className='container-xxl'>
      <div className="bg-[#191919] rounded-2xl">
      <BlogHeading heading={'Changes in the Marketing Landscape'} link={'/see-all'} linkText={'See All'} />
      <BlogSection/>
      </div>
    </div>
  )
}

export default BlogList