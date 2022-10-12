const { Card, Land } = require('./manabase.js');

const plains = { name: 'Plains', mana_cost: '', colors: [], type_line: 'Basic Land — Plains', oracle_text: '({T}: Add {W}.)' };
const undergroundSea = { name: 'Underground Sea', mana_cost: '', colors: [], type_line: 'Land — Island Swamp', oracle_text: '({T}: Add {U} or {B}.)' };

const plazaOfHeroes = { name: 'Plaza of Heroes', type_line: 'Land', oracle_text: "{T}: Add {C}.\n{T}: Add one mana of any color. Spend this mana only to cast a legendary spell.\n{T}: Add one mana of any color among legendary permanents you control.\n{3}, {T}, Exile Plaza of Heroes: Target legendary creature gains hexproof and indestructible until end of turn." };

const ketriaTriome = { name: 'Ketria Triome', type_line: 'Land — Forest Island Mountain', oracle_text: '({T}: Add {G}, {U}, or {R}.)\nKetria Triome enters the battlefield tapped.\nCycling {3} ({3}, Discard this card: Draw a card.)' };

const ancientTomb = { name: 'Ancient Tomb', type_line: 'Land', oracle_text: '{T}: Add {C}{C}. Ancient Tomb deals 2 damage to you.' };

const drossforgeBridge = { name: 'Drossforge Bridge', type_line: 'Artifact Land', oracle_text: 'Drossforge Bridge enters the battlefield tapped.\nIndestructible\n{T}: Add {B} or {R}.' };

const bloodCrypt = { name: 'Blood Crypt', type_line: 'Land — Swamp Mountain', oracle_text: '({T}: Add {B} or {R}.)\nAs Blood Crypt enters the battlefield, you may pay 2 life. If you don\'t, it enters the battlefield tapped.' };

const denOfTheBugBear = { name: 'Den of the Bugbear', type_line: 'Land', oracle_text: "If you control two or more other lands, Den of the Bugbear enters the battlefield tapped.\n{T}: Add {R}.\n{3}{R}: Until end of turn, Den of the Bugbear becomes a 3/2 red Goblin creature with \"Whenever this creature attacks, create a 1/1 red Goblin creature token that's tapped and attacking.\" It's still a land." };

const blackcleaveCliffs = { name: 'Blackcleave Cliffs', type_line: 'Land', oracle_text: "Blackcleave Cliffs enters the battlefield tapped unless you control two or fewer other lands.\n{T}: Add {B} or {R}." }; 

const shipwreckMarsh = { name: 'Shipwreck Marsh', type_line: 'Land', oracle_text: "Shipwreck Marsh enters the battlefield tapped unless you control two or more other lands.\n{T}: Add {U} or {B}." };

const canopyVista = { name: 'Canopy Vista', type_line: "Land — Forest Plains", oracle_text: "({T}: Add {G} or {W}.)\nCanopy Vista enters the battlefield tapped unless you control two or more basic lands." };

const mysticSanctuary = { name: 'Mystic Sanctuary', type_line: "Land — Island", oracle_text: "({T}: Add {U}.)\nMystic Sanctuary enters the battlefield tapped unless you control three or more other Islands.\nWhen Mystic Sanctuary enters the battlefield untapped, you may put target instant or sorcery card from your graveyard on top of your library."};

const castleArdenvale = { name: 'Castle Ardenvale', type_line: 'Land', oracle_text: "Castle Ardenvale enters the battlefield tapped unless you control a Plains.\n{T}: Add {W}.\n{2}{W}{W}, {T}: Create a 1/1 white Human creature token."};

const sunpetalGrove = { name: 'Sunpetal Grove', type_line: 'Land', oracle_text: "Sunpetal Grove enters the battlefield tapped unless you control a Forest or a Plains.\n{T}: Add {G} or {W}."};

const morphicPool = { name: 'Morphic Pool', type_line: 'Land', oracle_text: "Morphic Pool enters the battlefield tapped unless you have two or more opponents.\n{T}: Add {U} or {B}."};

const templeOfTheDragonQueen = { name: 'Temple of the Dragon Queen', type_line: 'Land', oracle_text: "As Temple of the Dragon Queen enters the battlefield, you may reveal a Dragon card from your hand. Temple of the Dragon Queen enters the battlefield tapped unless you revealed a Dragon card this way or you control a Dragon.\nAs Temple of the Dragon Queen enters the battlefield, choose a color.\n{T}: Add one mana of the chosen color."};

const evolvingWilds = { name: 'Evolving Wilds', type_line: 'Land', oracle_text: "{T}, Sacrifice Evolving Wilds: Search your library for a basic land card, put it onto the battlefield tapped, then shuffle."};

const aridMesa = { name: 'Arid Mesa', type_line: 'Land', oracle_text: "{T}, Pay 1 life, Sacrifice Arid Mesa: Search your library for a Mountain or Plains card, put it onto the battlefield, then shuffle."};

const prismaticVista = { name: 'Prismatic Vista', type_line: 'Land', oracle_text: "{T}, Pay 1 life, Sacrifice Prismatic Vista: Search your library for a basic land card, put it onto the battlefield, then shuffle."};

const brokersHideout = { name: 'Brokers Hideout', type_line: 'Land', oracle_text: "When Brokers Hideout enters the battlefield, sacrifice it. When you do, search your library for a basic Forest, Plains, or Island card, put it onto the battlefield tapped, then shuffle and you gain 1 life."};

const rithsGrove = { name: 'Rith\'s Grove', type_line: 'Land', oracle_text: "When Rith's Grove enters the battlefield, sacrifice it unless you return a non-Lair land you control to its owner's hand.\n{T}: Add {R}, {G}, or {W}."};

const lakeOfTheDead = { name: "Lake of the Dead", type_line: 'Land', oracle_text: "If Lake of the Dead would enter the battlefield, sacrifice a Swamp instead. If you do, put Lake of the Dead onto the battlefield. If you don't, put it into its owner's graveyard.\n{T}: Add {B}.\n{T}, Sacrifice a Swamp: Add {B}{B}{B}{B}."};

const shelteredValley = { name: "Sheltered Valley", type_line: 'Land', oracle_text: "If Sheltered Valley would enter the battlefield, instead sacrifice each other permanent named Sheltered Valley you control, then put Sheltered Valley onto the battlefield.\nAt the beginning of your upkeep, if you control three or fewer lands, you gain 1 life.\n{T}: Add {C}."};

const lotusVale = { name: "Lotus Vale", type_line: 'Land', oracle_text: "If Lotus Vale would enter the battlefield, sacrifice two untapped lands instead. If you do, put Lotus Vale onto the battlefield. If you don't, put it into its owner's graveyard.\n{T}: Add three mana of any one color."};

const lotusField = { name: "Lotus Field", type_line: 'Land', oracle_text: "Hexproof\nLotus Field enters the battlefield tapped.\nWhen Lotus Field enters the battlefield, sacrifice two lands.\n{T}: Add three mana of any one color."};

const templeOfTheFalseGod = { name: 'Temple of the False God', type_line: 'Land', oracle_text: "{T}: Add {C}{C}. Activate only if you control five or more lands."};

const azoriusChancery = { name: 'Azorius Chancery', type_line: 'Land', oracle_text: "Azorius Chancery enters the battlefield tapped.\nWhen Azorius Chancery enters the battlefield, return a land you control to its owner's hand.\n{T}: Add {W}{U}."};

function makeLandObj(name, type_line, oracle_text) {
    return {
        name,
        type_line: type_line || 'Land',
        oracle_text
    };
}

const urborg = makeLandObj('Urborg, Tomb of Yawgmoth', 'Legendary Land', "Each land is a Swamp in addition to its other land types.");
const cliffgate = makeLandObj('Cliffgate', null, "Cliffgate enters the battlefield tapped.\nAs Cliffgate enters the battlefield, choose a color other than red.\n{T}: Add {R} or one mana of the chosen color.");
const thranPortal = makeLandObj('Thran Portal', null, "Thran Portal enters the battlefield tapped unless you control two or fewer other lands.\nAs Thran Portal enters the battlefield, choose a basic land type.\nThran Portal is the chosen type in addition to its other types.\nMana abilities of Thran Portal cost an additional 1 life to activate.");
const meteorCrater = makeLandObj('Meteor Crater', null, "{T}: Choose a color of a permanent you control. Add one mana of that color.");
const nykthos = makeLandObj('Nykthos, Shrine to Nyx', 'Legendary Land', "{T}: Add {C}.\n{2}, {T}: Choose a color. Add an amount of mana of that color equal to your devotion to that color. (Your devotion to a color is the number of mana symbols of that color in the mana costs of permanents you control.)");
const reflectingPool = makeLandObj('Reflecting Pool', 'Land', "{T}: Add one mana of any type that a land you control could produce.");

const template = {
    basicTypes: {
        Plains: false,
        Island: false,
        Swamp: false,
        Mountain: false,
        Forest: false
    },
    isBasic: false,
    colorsProduced: { C: false, W: false, U: false, B: false, R: false, G: false },
    colorDelay: { C: 0, W: 0, U: 0, B: 0, R: 0, G: 0 },
    delay: 0
};


const expected = {
    'Plains': {
        basicTypes: {
            Plains: true,
            Island: false,
            Swamp: false,
            Mountain: false,
            Forest: false
        },
        isBasic: true,
        colorsProduced: { C: false, W: true, U: false, B: false, R: false, G: false },
        colorDelay: { C: 0, W: 0, U: 0, B: 0, R: 0, G: 0 },
        delay: 0
    },
    'Ketria Triome': {
        basicTypes: {
            Plains: false,
            Island: true,
            Swamp: false,
            Mountain: true,
            Forest: true
        },
        isBasic: false,
        colorsProduced: { C: false, W: false, U: true, B: false, R: true, G: true },
        colorDelay: { C: 0, W: 0, U: 0, B: 0, R: 0, G: 0 },
        delay: 1
    },
    'Plaza of Heroes': {
        basicTypes: {
            Plains: false,
            Island: false,
            Swamp: false,
            Mountain: false,
            Forest: false
        },
        isBasic: false,
        colorsProduced: { C: true, W: true, U: true, B: true, R: true, G: true },
        colorDelay: { C: 0, W: 0, U: 0, B: 0, R: 0, G: 0 },
        delay: 0
    },
    'Lotus Field': {
        basicTypes: {
            Plains: false,
            Island: false,
            Swamp: false,
            Mountain: false,
            Forest: false
        },
        isBasic: false,
        colorsProduced: { C: false, W: true, U: true, B: true, R: true, G: true },
        colorDelay: { C: 0, W: 0, U: 0, B: 0, R: 0, G: 0 },
        delay: 3
    },
    'Azorius Chancery': {
        basicTypes: {
            Plains: false,
            Island: false,
            Swamp: false,
            Mountain: false,
            Forest: false
        },
        isBasic: false,
        colorsProduced: { C: false, W: true, U: true, B: false, R: false, G: false },
        colorDelay: { C: 0, W: 0, U: 0, B: 0, R: 0, G: 0 },
        delay: 2
    },
    'Drossforge Bridge': {
        basicTypes: {
            Plains: false,
            Island: false,
            Swamp: false,
            Mountain: false,
            Forest: false
        },
        isBasic: false,
        colorsProduced: { C: false, W: false, U: false, B: true, R: true, G: false },
        colorDelay: { C: 0, W: 0, U: 0, B: 0, R: 0, G: 0 },
        delay: 1
    },
    'Blood Crypt': {
        basicTypes: {
            Plains: false,
            Island: false,
            Swamp: true,
            Mountain: true,
            Forest: false
        },
        isBasic: false,
        colorsProduced: { C: false, W: false, U: false, B: true, R: true, G: false },
        colorDelay: { C: 0, W: 0, U: 0, B: 0, R: 0, G: 0 },
        delay: 0
    },
    'Den of the Bugbear': {
        basicTypes: {
            Plains: false,
            Island: false,
            Swamp: false,
            Mountain: false,
            Forest: false
        },
        isBasic: false,
        colorsProduced: { C: false, W: false, U: false, B: false, R: true, G: false },
        colorDelay: { C: 0, W: 0, U: 0, B: 0, R: 0, G: 0 },
        delay: 0
    },
    'Blackcleave Cliffs': {
        basicTypes: {
            Plains: false,
            Island: false,
            Swamp: false,
            Mountain: false,
            Forest: false
        },
        isBasic: false,
        colorsProduced: { C: false, W: false, U: false, B: true, R: true, G: false },
        colorDelay: { C: 0, W: 0, U: 0, B: 0, R: 0, G: 0 },
        delay: 0
    },
    'Shipwreck Marsh': {
        basicTypes: {
            Plains: false,
            Island: false,
            Swamp: false,
            Mountain: false,
            Forest: false
        },
        isBasic: false,
        colorsProduced: { C: false, W: false, U: true, B: true, R: false, G: false },
        colorDelay: { C: 0, W: 0, U: 0, B: 0, R: 0, G: 0 },
        delay: 1
    },
    'Mystic Sanctuary': {
        basicTypes: {
            Plains: false,
            Island: true,
            Swamp: false,
            Mountain: false,
            Forest: false
        },
        isBasic: false,
        colorsProduced: { C: false, W: false, U: true, B: false, R: false, G: false },
        colorDelay: { C: 0, W: 0, U: 0, B: 0, R: 0, G: 0 },
        delay: 1
    },
    'Castle Ardenvale': {
        basicTypes: {
            Plains: false,
            Island: false,
            Swamp: false,
            Mountain: false,
            Forest: false
        },
        isBasic: false,
        colorsProduced: { C: false, W: true, U: false, B: false, R: false, G: false },
        colorDelay: { C: 0, W: 0, U: 0, B: 0, R: 0, G: 0 },
        delay: 1
    },
    'Sunpetal Grove': {
        basicTypes: {
            Plains: false,
            Island: false,
            Swamp: false,
            Mountain: false,
            Forest: false
        },
        isBasic: false,
        colorsProduced: { C: false, W: true, U: false, B: false, R: false, G: true },
        colorDelay: { C: 0, W: 0, U: 0, B: 0, R: 0, G: 0 },
        delay: 1
    },
    'Morphic Pool': {
        basicTypes: {
            Plains: false,
            Island: false,
            Swamp: false,
            Mountain: false,
            Forest: false
        },
        isBasic: false,
        colorsProduced: { C: false, W: false, U: true, B: true, R: false, G: false },
        colorDelay: { C: 0, W: 0, U: 0, B: 0, R: 0, G: 0 },
        delay: 0
    },
    'Temple of the Dragon Queen': {
        basicTypes: {
            Plains: false,
            Island: false,
            Swamp: false,
            Mountain: false,
            Forest: false
        },
        isBasic: false,
        colorsProduced: { C: false, W: true, U: true, B: true, R: true, G: true },
        colorDelay: { C: 0, W: 0, U: 0, B: 0, R: 0, G: 0 },
        delay: 0
    },

    'Evolving Wilds': {
        basicTypes: {
            Plains: false,
            Island: false,
            Swamp: false,
            Mountain: false,
            Forest: false
        },
        isBasic: false,
        colorsProduced: { C: false, W: false, U: false, B: false, R: false, G: false },
        colorDelay: { C: 0, W: 0, U: 0, B: 0, R: 0, G: 0 },
        delay: 1
    },
    'Arid Mesa': {
        basicTypes: {
            Plains: false,
            Island: false,
            Swamp: false,
            Mountain: false,
            Forest: false
        },
        isBasic: false,
        colorsProduced: { C: false, W: false, U: false, B: false, R: false, G: false },
        colorDelay: { C: 0, W: 0, U: 0, B: 0, R: 0, G: 0 },
        delay: 0
    },
    'Prismatic Vista': {
        basicTypes: {
            Plains: false,
            Island: false,
            Swamp: false,
            Mountain: false,
            Forest: false
        },
        isBasic: false,
        colorsProduced: { C: false, W: false, U: false, B: false, R: false, G: false },
        colorDelay: { C: 0, W: 0, U: 0, B: 0, R: 0, G: 0 },
        delay: 0
    },

    'Brokers Hideout': {
        basicTypes: {
            Plains: false,
            Island: false,
            Swamp: false,
            Mountain: false,
            Forest: false
        },
        isBasic: false,
        colorsProduced: { C: false, W: false, U: false, B: false, R: false, G: false },
        colorDelay: { C: 0, W: 0, U: 0, B: 0, R: 0, G: 0 },
        delay: 1
    },
    'Rith\'s Grove': {
        basicTypes: {
            Plains: false,
            Island: false,
            Swamp: false,
            Mountain: false,
            Forest: false
        },
        isBasic: false,
        colorsProduced: { C: false, W: true, U: false, B: false, R: true, G: true },
        colorDelay: { C: 0, W: 0, U: 0, B: 0, R: 0, G: 0 },
        delay: 1
    },

    'Lake of the Dead': {
        basicTypes: {
            Plains: false,
            Island: false,
            Swamp: false,
            Mountain: false,
            Forest: false
        },
        isBasic: false,
        colorsProduced: { C: false, W: false, U: false, B: true, R: false, G: false },
        colorDelay: { C: 0, W: 0, U: 0, B: 0, R: 0, G: 0 },
        delay: 1
    },
    'Sheltered Valley': {
        basicTypes: {
            Plains: false,
            Island: false,
            Swamp: false,
            Mountain: false,
            Forest: false
        },
        isBasic: false,
        colorsProduced: { C: true, W: false, U: false, B: false, R: false, G: false },
        colorDelay: { C: 0, W: 0, U: 0, B: 0, R: 0, G: 0 },
        delay: 0
    },
    'Lotus Vale': {
        basicTypes: {
            Plains: false,
            Island: false,
            Swamp: false,
            Mountain: false,
            Forest: false
        },
        isBasic: false,
        colorsProduced: { C: false, W: true, U: true, B: true, R: true, G: true },
        colorDelay: { C: 0, W: 0, U: 0, B: 0, R: 0, G: 0 },
        delay: 2
    },

    'Temple of the False God': {
        basicTypes: {
            Plains: false,
            Island: false,
            Swamp: false,
            Mountain: false,
            Forest: false
        },
        isBasic: false,
        colorsProduced: { C: true, W: false, U: false, B: false, R: false, G: false },
        colorDelay: { C: 0, W: 0, U: 0, B: 0, R: 0, G: 0 },
        delay: 4
    },

    'Urborg, Tomb of Yawgmoth': {
        basicTypes: {
            Plains: false,
            Island: false,
            Swamp: false,
            Mountain: false,
            Forest: false
        },
        isBasic: false,
        colorsProduced: { C: false, W: false, U: false, B: true, R: false, G: false },
        colorDelay: { C: 0, W: 0, U: 0, B: 0, R: 0, G: 0 },
        delay: 0
    },
    'Cliffgate': {
        basicTypes: {
            Plains: false,
            Island: false,
            Swamp: false,
            Mountain: false,
            Forest: false
        },
        isBasic: false,
        colorsProduced: { C: false, W: true, U: true, B: true, R: true, G: true },
        colorDelay: { C: 0, W: 0, U: 0, B: 0, R: 0, G: 0 },
        delay: 1
    },

    'Thran Portal': {
        basicTypes: {
            Plains: false,
            Island: false,
            Swamp: false,
            Mountain: false,
            Forest: false
        },
        isBasic: false,
        colorsProduced: { C: false, W: true, U: true, B: true, R: true, G: true },
        colorDelay: { C: 0, W: 0, U: 0, B: 0, R: 0, G: 0 },
        delay: 0
    },
    'Meteor Crater': {
        basicTypes: {
            Plains: false,
            Island: false,
            Swamp: false,
            Mountain: false,
            Forest: false
        },
        isBasic: false,
        colorsProduced: { C: false, W: true, U: true, B: true, R: true, G: true },
        colorDelay: { C: 0, W: 1, U: 1, B: 1, R: 1, G: 1 },
        delay: 0
    },
    'Nykthos, Shrine to Nyx': {
        basicTypes: {
            Plains: false,
            Island: false,
            Swamp: false,
            Mountain: false,
            Forest: false
        },
        isBasic: false,
        colorsProduced: { C: true, W: true, U: true, B: true, R: true, G: true },
        colorDelay: { C: 0, W: 1, U: 1, B: 1, R: 1, G: 1 },
        delay: 0
    },
    'Reflecting Pool': {
        basicTypes: {
            Plains: false,
            Island: false,
            Swamp: false,
            Mountain: false,
            Forest: false
        },
        isBasic: false,
        colorsProduced: { C: true, W: true, U: true, B: true, R: true, G: true },
        colorDelay: { C: 1, W: 1, U: 1, B: 1, R: 1, G: 1 },
        delay: 0
    }
};

function runBatch(batch) {
    function doPropsMatch(expected, actual) {
        for (const prop in expected) {
            if (expected[prop] !== actual[prop])
                return false;
        }
        return true;
    }

    let failed = 0;
    for (const land of batch) {
        const e = expected[land.name];

        let hasFailed = false;
        const failedProps = [];
        for (const prop in e) {
            if (typeof e[prop] === 'object') {
                if (!doPropsMatch(e[prop], land[prop])) {
                    failedProps.push(prop);
                    hasFailed = true;
                }
            } else if (e[prop] !== land[prop]) {
                failedProps.push(prop);
                hasFailed = true;
            }
        }
        if (hasFailed) {
            console.warn('\n' + land.name + ' fields:');
            for (const prop of failedProps) {
                console.warn(`  ${prop}:`);
                console.warn('    expected: ', e[prop]);
                console.warn('    actual: ', land[prop]);
            }
            failed++;
        }
    }
    if (failed === 0) {
        console.log('\nAll passed!');
    } else {
        console.log('\nfailed: ', failed);
    }
}

const allTests = [
    new Land(plains),
    new Land(ketriaTriome),
    new Land(plazaOfHeroes),
    new Land(lotusField),
    new Land(azoriusChancery),

    new Land(drossforgeBridge),
    new Land(bloodCrypt),
    new Land(denOfTheBugBear),
    new Land(blackcleaveCliffs),
    new Land(shipwreckMarsh),
    new Land(mysticSanctuary),
    new Land(castleArdenvale),
    new Land(sunpetalGrove),
    new Land(morphicPool),
    new Land(templeOfTheDragonQueen),

    new Land(evolvingWilds),
    new Land(aridMesa),
    new Land(prismaticVista),

    new Land(brokersHideout),
    new Land(rithsGrove),

    new Land(lakeOfTheDead),
    new Land(shelteredValley),
    new Land(lotusVale),

    new Land(templeOfTheFalseGod),

    new Land(urborg),
    new Land(cliffgate),
    
    new Land(thranPortal),
    new Land(meteorCrater),
    new Land(nykthos),
    new Land(reflectingPool),
];
runBatch(allTests);

// console.log(new Land(thranPortal));
// console.log(new Land(cliffgate));
// console.log(new Land(meteorCrater));
