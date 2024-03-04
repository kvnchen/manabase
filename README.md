# Overview

A model for representing manabases in Magic: the Gathering decks with tools to calculate the probability of casting spells of certain mana costs on curve.

## hypergeometric.js

A collection of functions for performing hypergeometric calculations, used as a module for other files.

## calc.js

A command line hypergeometric calculator.

### Usage

```
> node trial.js 100 7 36 2

exactly 2: 30.01%
at least 2: 79.26%
none: 3.881%
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


## manabase.js

### Class Card

The `Card` object contains the basic properties that comprise a Magic: the Gathering card. Derrived from Scryfall's [card](https://scryfall.com/docs/api/cards) API.

**Constructor**

`new Card({ name, mana_cost, colors, type_line, oracle_text, card_faces })`

Arguments

`props`: An `<object>` containing properties.  
- `name`: `<string>` The name of the card.
- `mana_cost`: `<string>` The mana cost of the card. Mana symbols are wrapped in {} brackets. E.g. `{B}{B}{B}` for Doomsday.
- `colors`: `<Array>` An array of color strings composing the card's colors. E.g. `['W', 'U']` for No More Lies.
- `type_line`: `<string>` The type line of this card.
- `oracle_text`: `<string>` The oracle text of this card.
- `card_faces`: `<Array>` An array of Card Face objects.

### Class Land

A subclass of `Card`. `Land` objects contain various properties of lands, mostly regarding what kinds of mana they can produce.

**Constructor**

`new Land(props)`

Same as Card.

**Properties**

- `basicTypes`: `<object>` An object of the shape:
  - `{ Plains: true, Island: false, Swamp: false, Mountain: false, Forest: false }`
  - Maps land types to boolean values if the land has that type.
- `isBasic`: `<boolean>` `true` if this is a Basic land.  
- `isLegendary`: `<boolean>` `true` if the land is legendary.  
- `colorsProduced`: `<object>` An object of shape :
  - `{ C: false, W: false, U: false, B: false, R: false, G: false }`
  - Maps a symbol representation of a type of mana to a boolean value of if the land can produce that kind of mana.

### Class countMap

todo

### Class Manabase

The `Manabase` object contains a collection of `Land`s and tracks what kinds of mana the collection can produce.

**Constructor**

`new Manabase()`

**Properties**

- `landMap`: `<object>` maps the name of a `Land` to the object
- `canReliablyProduce`: `<object>` an object of shape:
  - `{ C: countMap, W: countMap, U: countMap, B: countMap, R: countMap, G: countMap }`
  - for a given type of mana, maps to a `countMap` object representing lands that can produce that type of mana 
- `canPayGeneric`: `<countMap>` map to track lands capable of producing colorless mana
- `basicTypes`: `<object>` an object of shape:
  - `{ Plains: countMap, Islands: countMap, Swamp: countMap, Mountain: countMap, Forest: countMap }`
  - maps basic land types to `countMap`s tracking which lands are that type and how many are in the manabase

**Methods**

Manabase.prototype.addLands()

`addLands()` iterates over an array of `Land`s and updates the maps in `Manabase` to track what kinds of mana and land types are contained.

Parameters

- `lands`: `<Array>` an array of `Land`s to process

Return value

None.