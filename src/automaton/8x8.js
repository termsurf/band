
const generate = () => ([
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0,
])

const SIZE = 8
const NEIGHBOR_OFFSETS = [
  -SIZE - 1, -SIZE, -SIZE + 1,
  -1,       0,         1,
   SIZE - 1,  SIZE,  SIZE + 1
]

class CA8x8 {
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

  draw(colors) {
    const layoutSize = 60 * (colors.length - 1)
    const totalWidth = 600
    const totalHeight = 600
    const left = (totalWidth - layoutSize) / 2
    const top = (totalHeight - layoutSize) / 2
    const grid = []
    let u = 0
    while (u < SIZE) {
      let v = 0
      while (v < SIZE) {
        let i = (u * SIZE) + v
        let selected = this.main[i] == 1
        let color = colors[v]
        let cx = left + (60 * v)
        let cy = top + (60 * u)
        let r = selected ? 20 : 10
        grid.push({
          fill: color,
          cx: cx,
          cy: cy,
          r: r,
          key: `${cx}-${cy}`,
        })
        v++
      }
      u++
    }
    return grid
  }
}

export default CA8x8
