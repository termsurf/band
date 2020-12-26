
import * as Tone from 'tone'
import { useEffect } from 'react'

const useToneJS = () => {
  useEffect(() => {
    const handleClick = async () => Tone.start()
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])
}

export default useToneJS
