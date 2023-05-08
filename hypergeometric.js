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
    throw new Error(`${k} must be positive`);
  if (k > n)
    throw new Error(`${n} must be >= ${k}`);
  return factorial(n) / (factorial(k) * factorial(n - k));
}

function isBlank(arg) {
  return arg == null;
}

function hypergeometric(population, sampleSize, hits, target) {
  if (isBlank(population) || isBlank(sampleSize) || isBlank(hits) || isBlank(target)) {
    throw new Error('One or more args are blank.');
  }

  if (target > sampleSize) {
    throw new Error('Target cannot be larger than the sample size.');
  }
  if (sampleSize > population) {
    throw new Error('Sample size must be smaller than the population.');
  }
  if (hits > population) {
    throw new Error('Successes cannot be larger than the population.');
  }

  const top = (binomial(hits, target) * binomial((population - hits), (sampleSize - target)));
  const bottom = binomial(population, sampleSize);

  return top / bottom;
}


// for target number of successes k out of a pool of K with n draws, this should be
// the sum of all hypergeometric values from k to n or K, whichever is smaller
// something's weird with this, can return more than 100%...
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

/*
  general mana cost algorithm:

  cost
  manabase
    c, w, u, b, r, g
  
  in detail:
      for each possible number of (reliable) lands n >= cmc
        probability(n) * canPayCost(cost, n, manabase)
  

  for generic costs (3)
    probability of at least 3 mana producing lands by turn 3, 
    none of which are unreliable, none with delay greater than turn

    hypergeometric( deck_size - 1, 6 + total_cmc - 1 (on play), reliable_lands, total_cmc )

      hyper(99, 8, 38, 3) = 65.8%


  for simple colored costs

    2R, 3, 40-9-8

      one colored pip
      probability of at least one R producing land among n lands
      
      hyper( reliable_lands, n, r_producers, num_pips )
      atLeast( 17, 3, 9, 1 )

    1RR
      atLeast(17, 3, 9 2)

    if there's only one unique colored pip, can use atLeast()


  for complex costs
    1UR

    exactly one R * (at least one U of remaining) +
    exactly 2 R * (exactly one U in remaining or one of the R is U/R dual) +
    exactly 3 R * (at least one U/R dual among the 3)

    ugh... this sucks

    UR

      exactly 1 R and exactly U or
      UR dual and exactly U or
      UR dual and exactly R or
      two UR duals

    
*/
function chancePayCost(cost, numLands, manabase) {
  const genericTest = cost.match(/\d/);
  const generic = genericTest ? Number(genericTest[0]) : null;
  
  const colorTest = cost.match(/[CWUBRGS]/g);

  const colors = {};

  // generic cost only
  if (colorTest == null) {
    if (manabase.canPayGeneric.count >= generic) {
      return 1;
    } else return 0;
  }

  for (const color of colorTest) {
    if (colors[color]) {
      colors[color]++;
    } else {
      colors[color] = 1;
    }
  }

  if (Object.keys(colors).length === 1) {
    // mono colored spell
    const color = Object.keys(colors)[0];

    return atLeast(manabase.canPayGeneric.count, numLands, manabase.canReliablyProduce[color].count, colors[color]);
  } else {
    // uh oh...
    // return 0;

    // need to know about duals for 2-colored cards
    // for 3+... idk, seems rough
    
  }
}




module.exports.hypergeometric = hypergeometric;
module.exports.atLeast = atLeast;
module.exports.none = none;
module.exports.pretty = pretty;
module.exports.chancePayCost = chancePayCost;

// console.log(factorial(7)); // 5040
// console.log(binomial(7, 5)); // 21

// problem with 3 2 2 1, for the none/atLeast calculations
