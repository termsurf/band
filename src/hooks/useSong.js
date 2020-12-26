
import * as Tone from 'tone'
import { useRef, useState, useCallback, useEffect } from 'react'

const useSong = () => {
  const [tick, setTick] = useState(0)
  const [tempo, setTempo] = useState(240)
  const [isInitialized, setIsInitialized] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const loop = useRef()

  const start = useCallback(async () => {
    if (!isInitialized) {
      await Tone.start()

      if (!loop.current) {
        loop.current = new Tone.Loop(time => {
          setTick(time)
        }, '4n').start(0)

        Tone.Transport.start()
      }

      setIsPlaying(true)
      setIsInitialized(true)
    } else if (isPlaying) {
      Tone.Transport.stop()
      setIsPlaying(false)
    } else {
      Tone.Transport.start()
      setIsPlaying(true)
    }

  }, [isInitialized, setIsInitialized, isPlaying, setIsPlaying])

  useEffect(() => {
    Tone.Transport.bpm.value = tempo
  }, [tempo])

  useEffect(() => {
    return () => loop.current.stop()
  }, [])

  return { tick, start, isPlaying, setTempo }
}

export default useSong
