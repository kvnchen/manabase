
const PLAINS = 'Plains';
const ISLAND = 'Island';
const SWAMP = 'Swamp';
const MOUNTAIN = 'Mountain';
const FOREST = 'Forest';

const BASIC_TYPES = [PLAINS, ISLAND, SWAMP, MOUNTAIN, FOREST];

const TYPE_MAP = {
    Plains: 'W',
    Island: 'U',
    Swamp: 'B',
    Mountain: 'R',
    Forest: 'G'
};

const TYPE_GROUP = `(${PLAINS}|${ISLAND}|${SWAMP}|${MOUNTAIN}|${FOREST})`;
const ALL_GROUP_PLURAL = `(lands|${PLAINS}|${ISLAND}s|${SWAMP}s|${MOUNTAIN}s|${FOREST}s)`;

function TestCase(str, delay, func) {
    this.pattern = str;
    this.d = delay;
    this.f = func;
}

// WARNING: type lines use the em dash "—" instead of en dash or the hyphen "-"
exports.parseTypes = function(typeLine) {
    let types, subTypes = null;

    if (typeLine.match(/—/) === null) {
        types = typeLine.split(' ');
        return { types, subTypes };
    }

    const subtypePattern = new RegExp(/(?<=—\s).+/g);
    subTypes = typeLine.match(subtypePattern)[0].split(' ');

    const typePattern = new RegExp(/.*(?=\s—\s)/g);
    types = typeLine.match(typePattern)[0].split(' ');

    return { types, subTypes };
};

exports.getBasicTypes = function(types) {
    const basics = {
        Plains: false,
        Island: false,
        Swamp: false,
        Mountain: false,
        Forest: false
    };

    if (types === null)
        return basics;

    types.map((type) => {
        if (Object.hasOwn(basics, type)) {
            basics[type] = true;
        }
    });

    return basics;
};

// parsing mana abilities
/*
    Add one mana of any color
    {T}: Add {X}
         Add {X} or {Y}
         Add {X}, {Y} or {Z}
         Add {C}{C}
         Add {X}. Activate only if you control
 */

// probably unnecessary, as the mana abilities are still included in oracle
exports.colorsProduced = function(basicTypes) {
    const colors = {
        C: false,
        W: false,
        U: false,
        B: false,
        R: false,
        G: false
    };

    for (const type in basicTypes) {
        const key = TYPE_MAP[type];
        colors[key] = basicTypes[type];
    }

    return colors;
};

exports.parseOracle = function(oracle, name) {
    const [canProduce, colorDelay, colorUnreliability] = parseManaAbilities(oracle, name);
    const delay = parseDelay(oracle, name);

    return { canProduce, colorDelay, delay, colorUnreliability };
};

// what colors could this land produce?
/* 
    todo: 
        lands that gain land types in oracle
        fetchlands
            depends on other lands in deck... can't determine independently
        gaining mana abilities (Urza's Saga...)

    Restricted circumstances:

        [x] Add {U}. If you've played a land this turn, add {B} instead.
            River of Tears

        Add one mana of any color. Spend this mana only to cast <type>
            Cavern of Souls

        [x] Add one mana of any color <condition>
            Reflecting Pool

        Add <type> for each <thing> you control
            Tolarian Academy

        [x] As ~ enters the battlefield, choose a color/basic

        Remove a counter

        DFC cards

*/
function parseManaAbilities(oracle, name) {
    // bools? ints representing turn it could produce? this is awkward
    const canProduce = {
        C: false,
        W: false,
        U: false,
        B: false,
        R: false,
        G: false
    };

    // color-specific delay for annoying special cases
    // meant to be summed with general delay
    let colorDelay = {
        C: 0,
        W: 0,
        U: 0,
        B: 0,
        R: 0,
        G: 0
    };

    // if the condition to produce mana can't reliably be met through basic actions
    let colorUnreliability = null;

    const manaAbilityPattern = new RegExp(/.*{T}.*:\sAdd[^\n]+/g);
    const manaAbilities = oracle.match(manaAbilityPattern);

    if (Array.isArray(manaAbilities)) {
        const symbolPattern = /{[CWUBRG]}/g;
        const anyColorPattern = /Add (one|two|three) mana of any (one )?color/g;
        const anyTypePattern = /Add (one|two|three) mana of any type/g;
        const anAmount = /Add an amount of mana of that color/;
        for (const ability of manaAbilities) {
            if (ability.match(anyTypePattern)?.length > 0) {
                for (const color in canProduce) {
                    canProduce[color] = true;
                }
            } else {
                if (ability.match(anyColorPattern) !== null || ability.match(anAmount) !== null) {
                    for (const color in canProduce) {
                        if (color !== 'C')
                            canProduce[color] = true;
                    }
                }
                const test = ability.match(symbolPattern);
                if (test?.length > 0) {
                    const symbols = new Set(test.join('').match(/\w/g));
                    for (const s of symbols) {
                        if (Object.hasOwn(canProduce, s))
                            canProduce[s] = true;
                    }
                }
            }
        }
    }

    function testAndApply({base, subpatterns, func}) {
        const test = oracle.match(new RegExp(base, 'i'));
        if (test !== null) {
            func(test[0], subpatterns);
        }
    }

    const urborg = {
        base: `^Each land is a ${TYPE_GROUP} in addition to its other land types\\.$`,
        subpatterns: null,
        func: (match) => {
            for (const type of BASIC_TYPES) {
                if (match.includes(type)) {
                    canProduce[TYPE_MAP[type]] = true;
                }
            }
        }
    };

    const chooseAType = {
        base: `.*choose a (basic|color).+`,
        subpatterns: [
            // meteor crater, assumed near impossible turn 1
            new TestCase(
                `Choose a color of a permanent you control\\. Add one mana of that color\\.$`, 
                { C: 0, W: 1, U: 1, B: 1, R: 1, G: 1 }
            ),

            // nykthos, also assumed nearly impossible t1
            new TestCase(
                `Choose a color\\. Add an amount of mana of that color equal to your devotion to that color\\.`, 
                { C: 0, W: 1, U: 1, B: 1, R: 1, G: 1 }
            ),
        ],
        func: (text, subpatterns) => {
            for (const type of BASIC_TYPES) {
                canProduce[TYPE_MAP[type]] = true;
            }
            for (const sub of subpatterns) {
                if (text.match(sub.pattern) && sub.d !== null) {
                    colorDelay = sub.d;
                }
            }
        }
    };
    const anyType = {
        base: `Add one mana of any type that a (land|Gate) you control could produce\\.$`,
        subpatterns: [
            // reflecting pool
            new TestCase(
                `land`, 
                { C: 1, W: 1, U: 1, B: 1, R: 1, G: 1 }
            ),
            // plaza of harmony
            new TestCase(
                `Gate`, 
                { C: 0, W: 1, U: 1, B: 1, R: 1, G: 1 }
            )
        ],
        func: (text, subpatterns) => {
            for (const sub of subpatterns) {
                if (text.match(sub.pattern) && sub.d !== null) {
                    colorDelay = sub.d;
                }
            }
        }
    };

    const addInstead = {
        base: '.+add {\\w} instead\\.',
        subpatterns: [`(?<={T}: Add {)\\w`], // river of tears
        func: (text, subpatterns) => {
            for (const sub of subpatterns) {
                if (text.match(sub)) {
                    colorDelay[text.match(sub)[0]] = 1;
                }
            }
        }
    };
    
    // cloudpost counts itself, so it doesn't need to be directly addressed here
    const forEach = {
        base: `.*add.+for each.+`,
        subpatterns: [
            new TestCase(
                // fallen empires + masques storage lands
                `Remove any number of storage counters from ${name}: Add {\\w} for each storage counter removed this way\\.`, 
                null, 
                (str) => {
                    const symbol = str[0].match(/(?<=Add {)\w/);
                    // console.log('canary 2');
                    if (symbol)
                        colorDelay[symbol[0]] = 1;
                }
            ),
            new TestCase(
                `{\\d}, {T}: Add {B} for each (basic )?Swamp you control`,
                null,
                (str) => {
                    const cost = str[0].match(/(?<={)\d/);
                    if (cost) {
                        colorDelay['B'] = Number(cost[0]);
                        colorUnreliability = { B: true };
                    }
                }
            ),
            new TestCase(
                // city of shadows
                `Add {\\w} for each storage counter on ${name}\\.`,
                null,
                (str) => {
                    const cost = str[0].match(/(?<={)\w/);
                    if (cost) {
                        colorDelay[cost[0]] = 1;
                        colorUnreliability = { C: true };
                    }
                }
            )
        ],
        func: (text, subpatterns) => {
            // console.log('canary 1');
            for (const sub of subpatterns) {
                const match = text.match(sub.pattern);
                if (match) {
                    sub.f(match);
                }
            }
        }
    };

    // tainted lands + nimbus maze

    [
        urborg,
        chooseAType,
        anyType,
        addInstead,
        forEach
    ].forEach(testAndApply);

    return [canProduce, colorDelay, colorUnreliability];
}

/*
    tapped/can't produce immediately:

        [x] put it onto the battlefield tapped
            <without another mana ability>
            Evolving Wilds

        [x] ~ enters the battlefield tapped.
            Contaminated Aquifer

        enters the battlefield tapped unless <impossible condition>
            [x] you control a <thing>
                Castle Ardenvale <basic land type>
                Dragonskull Summit
            [x] you control <two> or more <stuff>
                Shipwreck Marsh
                Sunken Hollow

        [x] If ~ would enter the battlefield
            alliances cycle
            lotus vale, scorched ruins

    untapped/unrestricted:

        [x] If you control <condtition>, ~ enters the battlefield tapped.
            Den of the Bugbear

        [x] if you don't, ~ enters the battlefield tapped
            Blood Crypt <pay life>
            Choked Estuary <reveal>

        enters the battlefield tapped unless <possible condition>
            [x] you control two or fewer
                Blackcleave Cliffs

            [x] you have two or more opponents
                Morphic Pool

    other
        [x] bounce lands
            rav bounces
            guildless commons
*/
function parseDelay(oracle, name) {
    // the number of turns it takes for the land to become active. 0 indicates enters untapped with no restrictions
    // lands that enter tapped have delay 1. Garbage like Temple of the False God have delay of 4 (needs 4 other lands)
    // intention is you can add 1 to the delay to determine the "normal" active turn.
    let delay = 0;

    
    
    function applyDelay(str, { pattern, d }) {
        const regex = new RegExp(pattern);
        if (str.match(regex) !== null) {
            return d;
        } else return null;
    }

    function applyTests({ base, subpatterns }) {
        const baseMatch = oracle.match(new RegExp(base));
        // console.log('base: ', base);
        // console.log('match?', baseMatch);

        if (baseMatch !== null) {
            for (const test of subpatterns) {
                const applied = applyDelay(baseMatch[0], test);
                // console.log(applied);
                if (applied !== null)
                    return applied;
            }
        } else return null;
    }

    const etbTappedAndEtbEffectPrefix = `${name} enters the battlefield tapped\\.\\nWhen ${name} enters the battlefield.*`;
    const etbTappedAndEtbEffect = {
        base: etbTappedAndEtbEffectPrefix,
        subpatterns: [
            // lotus field
            new TestCase(`${etbTappedAndEtbEffectPrefix}, sacrifice two lands\\.$`, 3),

            // rav bounce lands
            new TestCase(`${etbTappedAndEtbEffectPrefix}, return a land you control to its owner's hand\\.$`, 2),
        ]
    };

    const etbTapped = {
        base: /.+enters the battlefield tapped\./,
        subpatterns: [
            // simple etb tapped
            new TestCase(`^${name} enters the battlefield tapped\.$`, 1),

            // shocks, reveal
            new TestCase(`^As ${name} enters the battlefield, you may.+If you don't.+enters the battlefield tapped\.$`, 0),
            
            // afr manlands
            new TestCase(`^If you control two or more other lands, ${name} enters the battlefield tapped\.$`, 0),
        ]
    };

    const unlessPrefix = `${name} enters the battlefield tapped unless you`;
    const etbTappedUnless = {
        base: /.+enters the battlefield tapped unless[\w\s]+\./,
        subpatterns: [
            // fast lands and thran portal
            new TestCase(`${unlessPrefix} control two or fewer other lands\\.$`, 0),

            // slow, bfz lands, mystic sanctuary cycle
            new TestCase(`${unlessPrefix} control (two|three) or more (basic|other) ${ALL_GROUP_PLURAL}\\.$`, 1),

            // eldraine castles and m10 buddy
            new TestCase(`${unlessPrefix} control a [\\w\\s]+.`, 1),

            // commander lands
            new TestCase(`${unlessPrefix} have two or more opponents\\.$`, 0),

            // temple of the dragon queen...
            new TestCase(`${unlessPrefix} revealed a [\\w\\s]+\\.$`, 0)
        ]
    };

    const fetchlandPattern = `^{T}.+Sacrifice ${name}: Search your library for (a|an).+, put it onto the battlefield.+`;
    const fetchlands = {
        base: fetchlandPattern,
        subpatterns: [
            // evolving, terraforming, fabled
            new TestCase(`${fetchlandPattern}tapped, then shuffle\\.$`, 1),

            // ons + zen fetchlands
            new TestCase(`${fetchlandPattern} then shuffle\\.$`, 0)
        ]
    };

    const etbEffectPrefix = `^When ${name} enters the battlefield, sacrifice.*`;
    const etbEffect = {
        base: etbEffectPrefix,
        subpatterns: [
            // new capena evolving wilds
            new TestCase(`${etbEffectPrefix} it\\. When you do, search your library for a.+put it onto the battlefield tapped.+`, 1),

            // planeshift lairs
            new TestCase(`${etbEffectPrefix} it unless you return a.+you control to its owner's hand\\.$`, 1)
        ]
    };

    const ifWouldPrefix = `^If ${name} would enter the battlefield.*`;
    const ifWould = {
        base: ifWouldPrefix,
        subpatterns: [
            // alliance basic cycle
            new TestCase(`${ifWouldPrefix}, sacrifice an? (untapped )?${TYPE_GROUP} instead\\.`, 1),

            // sheltered valley
            new TestCase(`${ifWouldPrefix}, instead sacrifice each other permanent named ${name} you control, then put ${name} onto the battlefield\\.$`, 0),
            
            // lotus vale scorched ruins
            new TestCase(`${ifWouldPrefix}, sacrifice two untapped lands instead\\.`, 2)
        ]
    };

    // only temple of the false god is totally locked by this
    // the tainted cycle and nimbus maze can make colorless without delay
    const activateOnlyPrefix = `^{T}.+Add.+Activate only if.*`;
    const activateOnly = {
        base: activateOnlyPrefix,
        subpatterns: [
            new TestCase(`${activateOnlyPrefix} you control five or more lands\\.$`, 4)
        ]
    };

    const allTests = [
        etbTappedAndEtbEffect,
        etbTapped, 
        etbTappedUnless, 
        fetchlands,
        etbEffect,
        ifWould,
        activateOnly
    ];

    for (const batch of allTests) {
        const result = applyTests(batch);

        if (result !== null)
            return result;
    }

    return delay;
}