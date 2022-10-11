/*
  desired information:

  % chance of X or more (at least X)
  % chance of exactly X
  % chance of fewer than X
  % chance of 0
*/

function factorial(n) {
  if (n < 0)
    throw new Error('n must be positive');

  if (n <= 1)
    return 1;

  let product = 1;
  for (let i = 2; i <= n; i++) {
    product *= i;
  }

  return product;
}


function binomial(n, k) {
  if (k < 0)
    throw Error('k must be positive');
  if (k > n)
    throw Error('n must be greater than k');
  return factorial(n) / (factorial(k) * factorial(n - k));
}

function hypergeometric(population, sampleSize, hits, target) {
  const top = (binomial(hits, target) * binomial((population - hits), (sampleSize - target)));
  const bottom = binomial(population, sampleSize);

  return top / bottom;
}


// for target number of successes k out of a pool of K with n draws, this should be
// the sum of all hypergeometric values from k to n or K, whichever is smaller
function atLeast(N, n, K, k) {
  let ceiling = n >= K ? K : n;
  let cumulative = 0;

  for (let i = k; i <= ceiling; i++) {
    cumulative += hypergeometric(N, n, K, i);
  }
  return cumulative;
}

function none(N, n, K) {
  return hypergeometric(N, n, K, 0);
}

function pretty(n) {
  return `${(n * 100).toPrecision(4)}%`;
}

module.exports.hypergeometric = hypergeometric;
module.exports.atLeast = atLeast;
module.exports.pretty = pretty;


// console.log(factorial(7)); // 5040
// console.log(binomial(7, 5)); // 21

let population = Number(process.argv[2]) || 100;
let sample = Number(process.argv[3]) || 7;
let hits = Number(process.argv[4]) || 38;
let target = Number(process.argv[5]) || 2;

const args = [population, sample, hits, target];

let exactly = hypergeometric(...args);
let kOrMore = atLeast(...args);
let miss = none(...args);
console.log(`at least ${target}: ${pretty(kOrMore)}`); // at least 2 lands -> 82.3%
console.log(`exactly ${target}: ${pretty(exactly)}`); // exactly 2 lands -> 28.4%
console.log(`none ${target}: ${pretty(miss)}`); // none -> 3.07%

