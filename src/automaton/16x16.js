
const generate = () => (new Array(16 * 16)).fill(0)

const SIZE = 16
const NEIGHBOR_OFFSETS = [
  -SIZE - 1, -SIZE, -SIZE + 1,
  -1,                1,
   SIZE - 1,  SIZE,  SIZE + 1
]

class CA16x16 {
  constructor(match) {
    this.match = match
    this.main = generate()
    this.hint = generate()
  }

  surround(i, grid) {
    let sum = 0
    let k = 0
    let n = NEIGHBOR_OFFSETS.length
    while (k < n) {
      let m = i + NEIGHBOR_OFFSETS[k]
      if (m < 0) {
        sum += grid[grid.length - 1 + m]
      } else if (m > grid.length - 1) {
        sum += grid[m - grid.length - 1]
      } else {
        sum += grid[m]
      }
      k++
    }
    return sum
  }

  update0(number, size) {
    let u = 0
    while (u < size) {
      let v = 0
      while (v < size) {
        let i = (u * size) + v
        if (i == number) {
          this.main[i] = 1
        } else {
          let sum = this.surround(i, this.hint)
          if (this.match(sum)) {
            this.main[i] = this.hint[i] ? 0 : 1
          } else {
            this.main[i] = 0
          }
        }
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
    const layoutWidth = 36 * (colors.length - 1)
    const totalWidth = 600
    const left = (totalWidth - totalWidth) / 2
    const grid = []
    let u = 0
    while (u < SIZE) {
      let v = 0
      while (v < SIZE) {
        let i = (u * SIZE) + v
        let selected = this.main[i] == 1
        let color = colors[v]
        let cx = 36 + (36 * v)
        let cy = 36 + (36 * u)
        let r = selected ? 16 : 8
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

export default CA16x16
