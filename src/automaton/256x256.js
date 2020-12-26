
const generate = () => (new Array(256 * 256)).fill(0)

const SIZE = 256
const NEIGHBOR_OFFSETS = [
  -SIZE - 1, -SIZE, -SIZE + 1,
  -1,                1,
   SIZE - 1,  SIZE,  SIZE + 1
]

class CA256x256 {
  constructor(match) {
    this.match = match
    this.main = generate()
    this.hint = generate()
  }

  surround(i, grid) {
    let out = []
    let k = 0
    let n = NEIGHBOR_OFFSETS.length
    while (k < n) {
      const v = NEIGHBOR_OFFSETS[k]
      const m = i + v
      if (m < 0) {
        out.push(grid[grid.length - 1 + m])
      } else if (m > grid.length - 1) {
        out.push(grid[m - grid.length - 1])
      } else {
        out.push(grid[m])
      }
      k++
    }
    return out
  }

  update0(number, size) {
    let u = 0
    while (u < size) {
      let v = 0
      while (v < size) {
        let i = (u * size) + v
        let input = i == number
        let area = this.surround(i, this.hint)
        let val = this.match({ input, area, i, u, v })
        this.main[i] = val
        v++
      }
      u++
    }
  }

  update1(size) {
    let u = 0
    while (u < size) {
      let v = 0
      while (v < size) {
        let i = (u * size) + v
        this.hint[i] = this.main[i]
        v++
      }
      u++
    }
  }

  update(number) {
    this.update0(number, SIZE)
    this.update1(SIZE)
  }

  draw(context, colors) {
    const layoutSize = 2 * (256 - 1)
    const totalWidth = 600
    const totalHeight = 600
    const left = (totalWidth - layoutSize) / 2
    const top = (totalHeight - layoutSize) / 2
    const grid = []
    context.clearRect(left, top, layoutSize, layoutSize)
    let u = 0
    while (u < SIZE) {
      let v = 0
      while (v < SIZE) {
        let i = (u * SIZE) + v
        let selected = this.main[i] == 1
        let color = selected ? colors[0] : colors[1]
        let cx = left + (2 * v)
        let cy = top + (2 * u)
        let r = 1
        let w = r * 2
        let h = r * 2
        context.fillStyle = color
        context.fillRect(cx, cy, w, h)
        v++
      }
      u++
    }
    return grid
  }
}

export default CA256x256
