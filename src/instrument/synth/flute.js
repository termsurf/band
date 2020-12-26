
import * as Tone from 'tone'

const synth = new Tone.Synth({
  oscillator: {
    type: 'sine',
  },
  envelope: {
    attack: 0.005,
    decay: 0,
    sustain: 1,
    release: 0.8
  }
}).toDestination()

export default synth
