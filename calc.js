const { hypergeometric, atLeast, none, pretty } = require("./hypergeometric");

let population = Number(process.argv[2]);
let sample = Number(process.argv[3]);
let hits = Number(process.argv[4]);
let target = Number(process.argv[5]);

const args = [population, sample, hits, target];

function calc(name, func, args) {
  try {
    const attempt = func(...args);
    const showTarget = (func === none) ? '' : ` ${target}`;
    console.log(`${name}${showTarget}: ${pretty(attempt)}`);
  } catch(err) {
    console.log(`${name} ${target}: Error: ${err.message}`);
  }
}
calc('exactly', hypergeometric, args);
calc('at least', atLeast, args);
calc('none', none, args);
 