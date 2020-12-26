
import * as Tone from 'tone'

const synth = new Tone.Synth({
  oscillator: {
    type: 'sine',
  },
  envelope: {
    attack: 0.005,
    decay: 0.1,
    sustain: 0,
    release: 1
  }
}).toDestination()

synth.volume.value -= 40

export default synth
