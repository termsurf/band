
import React from 'react'
import { useParams } from 'react-router-dom'
import Song1 from './1'
import Song2 from './2'
import Song3 from './3'
import Song4 from './4'
import Song5 from './5'
import Song6 from './6'
import Song7 from './7'

export const SONGS = {
  1: Song1,
  2: Song2,
  3: Song3,
  4: Song4,
  5: Song5,
  6: Song6,
  7: Song7
}

const Song = ({ children }) => {
  const { id } = useParams()
  const Component = SONGS[id]
  return <Component />
}

export default Song
