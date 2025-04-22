import React from 'react'
import Header from '../components/Header'
import ContactForm from '../sections/lets-talk/ContactForm'
import ThankyouPopUp from '../components/ThankyouPopUp'
import { useState } from 'react'

function LetsTalk() {
  const [popActive, setPopActive] = useState(true);

  return (
    <div>
      <ContactForm/>
    </div>
  )
}

export default LetsTalk