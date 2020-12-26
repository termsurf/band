
import React from 'react'
import Section from '../Section'
import { Link } from 'react-router-dom'
import TEXT from '../../config/text'

const Footer = () => {
  return (
    <Section>
      <Link to={'/'}>{TEXT.home}</Link>
    </Section>
  )
}

export default Footer
