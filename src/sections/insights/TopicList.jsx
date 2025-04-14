import React from 'react'
import BlogSection from '../../components/BlogSection'
import BlogHeading from '../../components/BlogHeading'
import TopicSection from '../../components/TopicSection'

function TopicList() {
  return (
    <div className='container-xxl'>
            <BlogHeading heading={'Topic'} size={''} link={'/see-all'} linkText={'See All'} />
            <TopicSection/>
    </div>
  )
}

export default TopicList