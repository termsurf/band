
class Metronome {
  constructor({ synth, beat, notes, colors }) {
    this.synth = synth
    this.beat = beat
    this.position = 0
    this.notes = notes
    this.colors = colors
  }

  update() {
    if (this.position == this.beat.length - 1) {
      this.position = 0
    } else {
      this.position++
    }
  }

  play(time) {
    const beat = this.beat[this.position]
    if (beat) {
      const note = this.notes[beat - 1]
      this.synth.triggerAttackRelease(note, '8n', time)
    }
  }
}

export default Metronome
