
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

    const typeMap = {
        Plains: 'W',
        Island: 'U',
        Swamp: 'B',
        Mountain: 'R',
        Forest: 'G'
    };

    for (const type in basicTypes) {
        const key = typeMap[type];
        colors[key] = basicTypes[type];
    }

    return colors;
};

exports.parseOracle = function(oracle, name) {
    // mana ability regex
    const manaAbilityPattern = new RegExp(/.*{T}.*:\sAdd[{\w}\s,]+\./g);
    const manaAbilities = oracle.match(manaAbilityPattern);

    // console.log(manaAbilities);
    // return manaAbilities;

    const canProduce = parseManaAbilities(manaAbilities);
    const delay = parseDelay(oracle, name);

    return { canProduce, delay };
};

// what colors could this land produce?
/* 
    todo: 
        lands that gain land types in oracle
        fetchlands
        gaining mana abilities (Urza's Saga...)

    Restricted circumstances:

        Add {U}. If you've played a land this turn, add {B} instead.
            River of Tears

        Add one mana of any color. Spend this mana only to cast <type>
            Cavern of Souls

        Add one mana of any color <condition>
            Command Tower
            Exotic Orchard
            Plaza of Heroes
            Reflecting Pool

        Add <type> for each <thing> you control
            Tolarian Academy

        As ~ enters the battlefield, choose a color

        DFC cards
*/
function parseManaAbilities(tapAbilities) {
    // bools? ints representing turn it could produce? this is awkward
    const canProduce  = {
        C: false,
        W: false,
        U: false,
        B: false,
        R: false,
        G: false
    };

    if (!Array.isArray(tapAbilities)) {
        return canProduce;
    }

    const symbolPattern = /{[CWUBRG]}/g;
    const anyColorPattern = /Add (one|two|three) mana of any (one )?color/g;
    const anyTypePattern = /Add (one|two|three) mana of any type/g;
    for (const ability of tapAbilities) {
        if (ability.match(anyTypePattern)?.length > 0) {
            for (const color in canProduce) {
                canProduce[color] = true;
            }
        } else {
            if (ability.match(anyColorPattern)?.length > 0) {
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

    return canProduce;
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

    function TestCase(str, d) {
        this.pattern = str;
        this.d = d;
    }
    
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
            new TestCase(`${unlessPrefix} control (two|three) or more (basic|other) (lands|Plains|Islands|Swamps|Mountains|Forests)\\.$`, 1),

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
            new TestCase(`${ifWouldPrefix}, sacrifice an? (untapped )?(Plains|Island|Swamp|Mountain|Forest) instead\\.`, 1),

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