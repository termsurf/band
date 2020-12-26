
import React, { useLayoutEffect } from 'react'

const CountAndPlayOnes = ({ synth, tick, play = true, numbers, colors, notes }) => {
  const count = numbers.filter(x => x == 1).length
  const points = (new Array(numbers.length + 1)).fill(1).map((x, i) => {
    const layoutWidth = 60 * (numbers.length)
    const totalWidth = 600
    const left = (totalWidth - layoutWidth) / 2
    const color = colors[i]
    return <circle r={i == count ? 20 : 10} cx={left + (60 * i)} fill={color} cy={40} key={`${i}`} />
  })

  useLayoutEffect(() => {
    if (play) {
      const note = notes[count]
      if (note) {
        synth.triggerAttackRelease(note, '8n', tick)
      }
    }
  }, [tick, play])

  return (
    <>{points}</>
  )
}

export default CountAndPlayOnes
