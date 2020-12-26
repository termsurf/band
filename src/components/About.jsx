
import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import TEXT from '../config/text'

const Message = styled.p`
  margin-bottom: 30px;
  text-align: center;
  max-width: 600px;
`

const Section = styled.section`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const About = () => {
  return (
    <>
      <Section>
        <Message>{TEXT.about.description}</Message>
      </Section>
      <Section>
        <Link to='/'>{TEXT.home}</Link>
      </Section>
    </>
  )
}

export default About
