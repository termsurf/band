
import React, { useLayoutEffect, useMemo, useRef } from 'react'
import spectrum from '../../../../utils/color-spectrum'
import CA from '../../../../automaton/256x256'

const CA256 = ({ tick, number, match }) => {
  const ref = useRef(null)
  const automaton = useMemo(() => new CA(match), [])

  useLayoutEffect(() => {
    automaton.draw(ref.current.getContext('2d'), [spectrum[8][5], spectrum[8][7]])
    automaton.update(number)
  }, [tick])

  return (
    <canvas width={600} height={600} ref={ref} />
  )
}

export default CA256
