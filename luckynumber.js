function paddingZeros (str, amount) {
  return str.length > amount ? str : Array(amount - str.length).fill('0').concat(str).join('');
}

function pow (n, r) {
  return Array(r).fill(n).reduce((p, c) => p * c);
}

function countZeros (str) {
  return str.length - str.split('').map((x) => parseInt(x)).reduce((p, c) => p + c);
}
