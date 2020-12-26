
import * as Tone from 'tone'

const notes = {}

const files = `kick
kick2
snare-free
stick
hat-closed-4
hat-closed-5`.split(/\n+/)
  .forEach(note => {
    notes[note] = new Tone.Player(`/drum/${note}.wav`).toDestination()
  })

const synth = {
  triggerAttackRelease(note, tempo, tick) {
    notes[note].start(tick, 0, 10000)
  }
}

export default synth
