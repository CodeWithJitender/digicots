import React from 'react'
import HeadingWithLink from '../../components/HeadingWithLink'

function Solutions() {
  return (
    <section>
        <div className="container-xxl">
        <HeadingWithLink head="SOLUTIONS" per="Lorem ipsum dolor sit amet, consectetur adipiscing" link={'/contact'} linkh={"Contact Us"}/>
        </div>
    </section>
  )
}

export default Solutions