
import React from 'react'
import spectrum from '../../utils/color-spectrum'

const ColorList8 = ({ index }) => {
  const points = spectrum[8].map((color, i) => {
    const layoutWidth = 60 * 7
    const totalWidth = 600
    const left = (totalWidth - layoutWidth) / 2
    return <circle r={i == index ? 20 : 10} cx={left + (60 * i)} fill={color} cy={40} key={`${i}`} />
  })

  return <>{points}</>
}

export default ColorList8
