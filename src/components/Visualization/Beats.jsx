
import React from 'react'
import Section from '../Section'
import Line from '../Line'

const Beats = ({ metronomes }) => {
  const elements = metronomes.map((metronome, i) => (
    <div style={{height: '50px', width: '600px'}} key={`key-${i}`}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 200">
        <Line rhythm={metronome.beat} position={metronome.position} colors={metronome.colors} />
      </svg>
    </div>
  ))
  return (
    <Section>
      {elements}
    </Section>
  )
}

export default Beats
