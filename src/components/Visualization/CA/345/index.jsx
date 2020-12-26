
import React, { useLayoutEffect, useMemo } from 'react'
import spectrum from '../../../../utils/color-spectrum'
import CA from '../../../../automaton/8x8'

const CA345 = ({ tick, number, match }) => {
  const automaton = useMemo(() => new CA(match), [])

  useLayoutEffect(() => {
    automaton.update(number)
  }, [tick])

  const grid = automaton.draw(spectrum[8])
    .map(props => <circle {...props} />)

  return (
    <>{grid}</>
  )
}

export default CA345
