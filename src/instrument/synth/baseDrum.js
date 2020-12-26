
import * as Tone from 'tone'

const synth = new Tone.Synth({
  oscillator: {
    type: 'sine',
  },
  envelope: {
    attack: 0.005,
    decay: 0.1,
    sustain: 0,
    release: 0
  }
}).toDestination()

export default synth
