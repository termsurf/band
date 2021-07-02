
import React, { useLayoutEffect, useMemo } from 'react'
import physicals from '../../../instrument/physical'
import Polygon from '../../Polygon'
import Container from '../../Container'
import Section from '../../Section'
import SectionRow from '../../SectionRow'
import useSong from '../../../hooks/useSong'
import CountAndPlayOnes from '../../Visualization/CountAndPlayOnes'
import useSongSwitcher from '../../../hooks/useSongSwitcher'
import Metronome from '../../../instrument/metronome'
import CA345 from '../../Visualization/CA/345'
import CA256 from '../../Visualization/CA/256'
import ColorList8 from '../../Visualization/ColorList8'
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
      synth: physicals.baseDrum,
      beat: [ 1, 2, 2 ],
      notes: ['hat-closed-5', 'hat-closed-4'],
      colors: [null, spectrum[5], spectrum[7]]
    })
  ), [])

  const hiHat = useMemo(() => (
    new Metronome({
      synth: physicals.baseDrum,
      beat: [1, 0, 0, 0],
      notes: ['snare-free'],
      colors: [spectrum[7], spectrum[5]],
    })
  ), [])

  const flute = useMemo(() => (
    new Metronome({
      synth: physicals.baseDrum,
      beat: [1, 0, 1, 0, 0],
      notes: ['kick2'],
      colors: [spectrum[7], spectrum[5]],
    })
  ), [])

  const metronomes = useMemo(() => [baseDrum, hiHat, flute], [])

  const play = (tick) => {
    metronomes.forEach(metronome => metronome.play(tick))
    metronomes.forEach(metronome => metronome.update())
  }

  useLayoutEffect(() => {
    play(tick)
  }, [tick])

  const playNumbers = [
    baseDrum.beat[baseDrum.position],
    hiHat.beat[hiHat.position] - 1 == 0 ? 1 : 0,
    flute.beat[flute.position],
  ]

  const playNumbersDigit = parseInt(playNumbers.join(''), 2)

  const binaryPoints = playNumbers.map((x, i) => {
    const layoutWidth = 60 * (playNumbers.length - 1)
    const totalWidth = 600
    const left = (totalWidth - layoutWidth) / 2
    const color = i == 0
      ? spectrum[1]
      : i == 1
        ? spectrum[4]
        : spectrum[5]
    return <circle r={x == '1' ? 20 : 10} cx={left + (60 * i)} fill={color} cy={40} key={`${i}`} />
  })

  const caMatchers = {
    1: ({ area, input, i }) => {
      if (area[0] == 1) {
        return area[4] ? 0 : 1
      } else if (input) {
        return 1
      } else {
        return 0
      }
    },
    2: ({ area, input, i, u, v }) => {
      if (v % 2 == 0) {
        if (area[0] == 1) {
          return area[4] ? 0 : 1
        } else if (input) {
          return 1
        } else {
          return 0
        }
      } else {
        if (area[2] == 1) {
          return area[4] ? 0 : 1
        } else if (input) {
          return 1
        } else {
          return 0
        }
      }
    },
    3: ({ area, input, i, u, v }) => {
      if (v % 2 == 0) {
        if (area[0] == 1 || area[7] == 1) {
          return area[4] ? 0 : 1
        } else if (input) {
          return 1
        } else {
          return 0
        }
      } else {
        if (area[2] == 1 || area[5] == 1) {
          return area[4] ? 0 : 1
        } else if (input) {
          return 1
        } else {
          return 0
        }
      }
    },
    4: ({ area, input, i, u, v }) => {
      if (v % 2 == 0) {
        return area[6] ? 0 : 1
      } else {
        if (area[2] == 1 || area[5] == 1) {
          return area[4] ? 0 : 1
        } else if (input) {
          return 1
        } else {
          return 0
        }
      }
    },
    5: ({ area, input, i, u, v }) => {
      if (v % 2 == 0) {
        if (area[3] || area[2]) {
          return 1
        } else {
          return input ? 1 : 0
        }
      } else {
        if (input) {
          return 1
        } else {
          if (area[1] && area[5]) {
            return 1
          }
          return area[4] ? 0 : 1
        }
      }
    },
    6: ({ area, input, i, u, v }) => {
      if (input) {
        return 1
      } else if (v % 2 == 0) {
        if (sum(area) < 3) {
          return 1
        } else {
          return 0
        }
      } else {
        if (area[1] && area[5]) {
          return 1
        }
        return area[4] ? 0 : 1
      }
    },
    7: ({ area, input }) => {
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
      <Beats metronomes={[baseDrum, hiHat, flute]} />
      <Section>
        <div style={{height: '50px', width: '600px'}}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 200">
            <CountAndPlayOnes
              synth={physicals.guitar}
              numbers={playNumbers}
              tick={tick}
              colors={[spectrum[1], spectrum[4], spectrum[5], spectrum[7]]}
              notes={['D4', null, 'F4', 'E4']}
            />
          </svg>
        </div>
      </Section>
      <Section>
        <div style={{height: '50px', width: '600px'}}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 200">
            {binaryPoints}
          </svg>
        </div>
      </Section>
      <Section>
        <SectionRow>
          <div style={{width: '200px', height: '160px'}}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
              <Polygon
                width={200}
                height={200}
                rhythm={baseDrum.beat}
                position={baseDrum.position}
                colors={baseDrum.colors}
              />
            </svg>
          </div>

          <div style={{width: '200px', height: '160px'}}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
              <Polygon
                width={200}
                height={200}
                rhythm={hiHat.beat}
                position={hiHat.position}
                colors={hiHat.colors}
              />
            </svg>
          </div>

          <div style={{width: '200px', height: '160px'}}>
            <Polygon
              width={200}
              height={200}
              rhythm={flute.beat}
              position={flute.position}
              colors={flute.colors}
            />
          </div>
        </SectionRow>
      </Section>
      <Section>
        <div style={{height: '50px', width: '600px'}}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 200">
            <ColorList8 index={playNumbersDigit} />
          </svg>
        </div>
      </Section>
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
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
            <CA345 match={caMatchers[5]} tick={tick} number={playNumbersDigit} />
          </svg>
        </div>
      </Section>
      <Section>
        <div style={{height: '600px', width: '600px'}}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
            <CA345 match={caMatchers[6]} tick={tick} number={playNumbersDigit} />
          </svg>
        </div>
      </Section>
      <Section>
        <div style={{height: '600px', width: '600px'}}>
          <CA256 match={caMatchers[7]} tick={tick} number={playNumbersDigit} />
        </div>
      </Section>
      <SongFooter />
    </Container>
  )
}

export default Song1
