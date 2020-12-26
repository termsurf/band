
import React from 'react'

function computeLine({ rhythm, index, colors }) {
  const left = 30
  const points = rhythm.map((x, i) => {
    const r = i == index ? 20 : 10
    const cx = left + (60 * i)
    const color = colors[x]
    const cy = 40
    const key = `${cx}-${cy}`
    return { r, cx, cy, fill: color, key }
  })
  return points
}

const Line = ({ rhythm, position, colors }) => {
  const points = computeLine({
    rhythm: rhythm,
    index: position,
    colors: colors,
  })

  const elements = points.map(p => {
    return <circle {...p} />
  })

  return (
    <>
      {elements}
    </>
  )
}

export default Line
