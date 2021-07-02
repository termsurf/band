
import * as Tone from 'tone'

const notes = {}

const files = `Fs2
As3
As4
A2
A3
A4
B2
B3
B4
Bb2
Cs3
Cs4
Cs5
C3
C4
C5
Ds2
Ds3
Ds4
D2
D3
D4
D5
E2
E3
E4
Fs3
Fs4
F2
F3
F4
Gs2
Gs3
Gs4
G2
G3
G4`.split(/\n+/)
  .forEach(note => {
    notes[note] = new Tone.Player(`/guitar/${note}.wav`).toDestination()
  })

const synth = {
  triggerAttackRelease(note, tempo, tick) {
    if (notes[note].loaded) {
      notes[note].start(tick, 0, 10000)
    }
  }
}

export default synth
