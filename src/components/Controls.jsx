
import React, { useEffect } from 'react'

const Controls = () => {
  useEffect(() => {
    Tone.Transport.bpm.value = tempo
  }, [tempo])
}

export default Controls
