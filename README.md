# Overview

A model for representing manabases in Magic: the Gathering decks with tools to calculate the probability of casting spells of certain mana costs on curve.

## hypergeometric.js

A collection of functions for performing hypergeometric calculations.

## calc.js

A command line hypergeometric calculator.

### Usage

```
> node trial.js 100 7 36 2

exactly 2: 30.01%
at least 2: 79.26%
none 2: 3.881%
```

**Arguments**

`population`: `<number>` the population to sample from  
`sample`: `<number>` the sample size  
`hits`: `<number>` how many successes are in the population  
`target`: `<number>` the desired number of successes in the sample  

**Output**

exactly `target`: the probability of exactly `target` successes  
at least `target`: the probability of at least `target` successes  
none: the probability of no successes  

## trial.js

A command line tool to run a large number of samples against a population and output a percentage spread of the results.

### Usage

```
> node trial.js 100 7 36 100000

0: 4.866%
1: 19.15%
2: 31.55%
3: 26.96%
4: 13.20%
5: 3.680%
6: 0.5590%
7: 0.03700%
expected value: 2.379
```

**Arguments**

`population`: `<number>` the population to sample from  
`sample`: `<number>` the sample size  
`hits`: `<number>` how many successes are in the population  
`runs`: `<number>` how many times the trial should run  

**Output**

A spread from 0 to `sample` of the percentage of results landed in each number, along with the expected value.

## spread.js

A command line tool to calculate and compare the probabilities of multiple success sizes and targets.

### Usage

```
> node spread.js 100 7 33,36 2,3

33 targets 
2: 31.86%  
3: 26.12%  
2-3: 57.98%


34 targets 
2: 31.32%  
3: 26.94%  
2-3: 58.26%


35 targets
2: 30.70%
3: 27.68%
2-3: 58.38%


36 targets
2: 30.01%
3: 28.34%
2-3: 58.35%
```

**Arguments**

`population`: `<number>` the population to sample from  
`sample`: `<number>` the sample size  
`hitSpread`: `<string>` comma-separated string of numbers representing the start and end of a range of successes in the population  
`range`: `<string>` comma-separated string of numbers representing targets to track  
`weights`: `<string>` comma-separated string of numbers representing the weighted value of each target. Defaults to 1  

**Output**

For each value in the hit spread, a breakdown of the probabilities of each target in range is presented, along with the cumulative probability of all the targets.
