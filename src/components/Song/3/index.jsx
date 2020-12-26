
import React, { useLayoutEffect, useMemo } from 'react'
import synths from '../../../instrument/synth'
import Container from '../../Container'
import Section from '../../Section'
import useSong from '../../../hooks/useSong'
import useSongSwitcher from '../../../hooks/useSongSwitcher'
import Metronome from '../../../instrument/metronome'
import CA345 from '../../Visualization/CA/345'
import CA256 from '../../Visualization/CA/256'
import spectrumMap from '../../../utils/color-spectrum'
import SongHeader from '../Header'
import Beats from '../../Visualization/Beats'
import SongFooter from '../Footer'

const sum = (arr) => arr.reduce((o, i) => o + i, 0)

const Song1 = () => {
  useSongSwitcher()

  const { start, tick } = useSong()

  const spectrum = spectrumMap[8]

  const baseDrum = useMemo(() => (
    new Metronome({
      synth: synths.baseDrum,
      beat: [ 1, 0 ],
      notes: ['D1'],
      colors: [spectrum[7], spectrum[5]]
    })
  ), [])

  const metronomes = useMemo(() => [baseDrum], [])

  const play = (tick) => {
    metronomes.forEach(metronome => metronome.play(tick))
    metronomes.forEach(metronome => metronome.update())
  }

  const playNumbersDigit = baseDrum.beat[baseDrum.position]

  useLayoutEffect(() => {
    play(tick)
  }, [tick])

  const caMatchers = {
    1: ({ area, input }) => {
      if (input) {
        return 1
      } else {
        if (area[0] || area[2]) {
          return area[4] ? 0 : 1
        } else {
          return 0
        }
      }
    },
    2: ({ area, input }) => {
      if (input) {
        return 1
      } else {
        if (area[0] || area[7]) {
          return area[4] ? 0 : 1
        } else {
          return 0
        }
      }
    },
    3: ({ area, input }) => {
      if (input) {
        return 1
      } else {
        if (area[9] || area[7]) {
          return area[4] ? 0 : 1
        } else {
          return 0
        }
      }
    },
    4: ({ area, input }) => {
      if (input) {
        return 1
      } else {
        if (sum([area[0],area[2],area[6],area[8]]) == 4) {
          return 1
        } else {
          return area[4] ? 0 : 1
        }
      }
    },
    5: ({ area, input }) => {
      if (input) {
        return 1
      } else if (sum(area) > 3) {
        return area[4] ? 0 : 1
      } else if (area[0] || area[2]) {
        return 1
      } else {
        return 0
      }
    }
  }

  return (
    <Container onClick={start}>
      <SongHeader />
      <Beats metronomes={[baseDrum]} />
      <Section>
        <div style={{height: '600px', width: '600px'}}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
            <CA345 match={caMatchers[1]} tick={tick} number={playNumbersDigit} />
          </svg>
        </div>
      </Section>
      <Section>
        <div style={{height: '600px', width: '600px'}}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
            <CA345 match={caMatchers[2]} tick={tick} number={playNumbersDigit} />
          </svg>
        </div>
      </Section>
      <Section>
        <div style={{height: '600px', width: '600px'}}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
            <CA345 match={caMatchers[3]} tick={tick} number={playNumbersDigit} />
          </svg>
        </div>
      </Section>
      <Section>
        <div style={{height: '600px', width: '600px'}}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
            <CA345 match={caMatchers[4]} tick={tick} number={playNumbersDigit} />
          </svg>
        </div>
      </Section>
      <Section>
        <div style={{height: '600px', width: '600px'}}>
          <CA256 match={caMatchers[5]} tick={tick} number={playNumbersDigit} />
        </div>
      </Section>
      <SongFooter />
    </Container>
  )
}

export default Song1
