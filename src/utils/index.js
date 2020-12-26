
function recursivelySumNumbers(values) {
  let sum = 0
  values.forEach(value => {
    sum += value
  })
  if (sum > 9) {
    return recursivelySumNumbers(String(sum).split('').map(x => parseInt(x, 10)))
  } else {
    return sum
  }
}
