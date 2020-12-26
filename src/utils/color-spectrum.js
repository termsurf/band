
import chroma from 'chroma-js'

const spectrum8 = chroma.scale('Spectral').colors(8)
const spectrum16 = chroma.scale('Spectral').colors(16)
const spectrum256 = chroma.scale('Spectral').colors(256)

export default {
  8: spectrum8,
  16: spectrum16,
  256: spectrum256
}
