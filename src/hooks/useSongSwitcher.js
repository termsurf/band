import { useEffect } from 'react'
import {
  useHistory
} from 'react-router-dom'

const songs = ['1', '2', '3', '4', '5', '6']

const getId = () => window.location.pathname.match(/\/tune\/([\w\-])/)[1]

const useSongSwitcher = () => {
  const history = useHistory()

  const navigateRight = () => {
    let id = getId()
    let i = songs.indexOf(id)
    if (i == -1) {
      i = 0
    } else if (i == songs.length - 1) {
      i = 0
    } else {
      i++
    }
    let song = songs[i]
    history.replace(`/tune/${song}`)
  }

  const navigateLeft = () => {
    let id = getId()
    let i = songs.indexOf(id)
    if (i == -1) {
      i = songs.length - 1
    } else if (i == 0) {
      i = songs.length - 1
    } else {
      i--
    }
    let song = songs[i]
    history.replace(`/tune/${song}`)
  }

  useEffect(() => {
    const handleKeypress = (e) => {
      let code = e.which
      if (code == 37) {
        navigateLeft()
      } else if (code == 39) {
        navigateRight()
      }
    }

    window.addEventListener('keydown', handleKeypress)

    return () => window.removeEventListener('keydown', handleKeypress)
  }, [])
}

export default useSongSwitcher
