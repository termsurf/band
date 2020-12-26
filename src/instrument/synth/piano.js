
import * as Tone from 'tone'

const synth = new Tone.Synth({
  oscillator: {
    type: 'sine',
  },
  envelope: {
    attack: 0.005,
    decay: 0.2,
    sustain: 1,
    release: 0.8
  }
}).toDestination()

synth.volume.value -= 30

export default synth
