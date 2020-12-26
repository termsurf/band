
import styled from '@emotion/styled'
import React from 'react'
import Section from '../Section'
import TEXT from '../../config/text'

const Title = styled.h1`
  top: -15px;
`
const Subtitle = styled.h2`
  top: -15px;
`

const Header = () => {
  return (
    <Section>
      <Title>{TEXT.clickToStartAudio}</Title>
      <Subtitle>{TEXT.clickToStartAudioFollowUp}</Subtitle>
      <p>▼</p>
      <p>▼</p>
      <p>▼</p>
    </Section>
  )
}

export default Header
