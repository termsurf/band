
import chroma from 'chroma-js'
import React from 'react'

function computeCircle({ containerWidth, containerHeight, rhythm, index, displayRadius, circleRadius, colors }) {
  const n = rhythm.length
  const angle = (Math.PI * 2) / n
  const points = []
  for (var i = 0; i < n; i++) {
    const cx = (containerWidth / 2) + (displayRadius * Math.cos(angle * i))
    const cy = (containerHeight / 2) + (displayRadius * Math.sin(angle * i))
    const note = rhythm[i]
    const fill = colors[note]
    const r = i == index ? circleRadius * 2 : circleRadius
    points.push({ cx, cy, fill, r })
  }
  return points
}

function Polygon({
  width,
  height,
  rhythm,
  position,
  colors,
  radius = 50,
  nodeRadius = 10
}) {
  const points = computeCircle({
    containerWidth: width,
    containerHeight: height,
    rhythm: rhythm,
    index: position,
    displayRadius: radius,
    circleRadius: nodeRadius,
    colors: colors
  })

  const elements = points.map(p => {
    return <circle {...p} key={`${p.cx}-${p.cy}`} />
  })

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      {elements}
    </svg>
  )
}

export default Polygon
