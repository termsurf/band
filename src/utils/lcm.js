
// A measure in music is determined by the LCM.

function gcd(a, b){
  while (b != 0) {
    var temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function lcm(a, b) {
  return (a * b / gcd(a, b));
}

function lcmm(args){
  if (args.length == 2) {
    return lcm(args[0], args[1]);
  } else {
    var arg0 = args[0];
    args.shift();
    return lcm(arg0, lcmm(args));
  }
}

module.exports = lcmm
