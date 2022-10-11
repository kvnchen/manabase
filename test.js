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

// let test = new Land(plains);

const expected = {
    'Lotus Field': 3,
    'Azorius Chancery': 2,

    'Drossforge Bridge': 1,
    'Blood Crypt': 0,
    'Den of the Bugbear': 0,
    'Blackcleave Cliffs': 0,
    'Shipwreck Marsh': 1,
    'Mystic Sanctuary': 1,
    'Castle Ardenvale': 1,
    'Sunpetal Grove': 1,
    'Morphic Pool': 0,
    'Temple of the Dragon Queen': 0,

    'Evolving Wilds': 1,
    'Arid Mesa': 0,
    'Prismatic Vista': 0,

    'Brokers Hideout': 1,
    'Rith\'s Grove': 1,

    'Lake of the Dead': 1,
    'Sheltered Valley': 0,
    'Lotus Vale': 2,

    'Temple of the False God': 4
};

function runBatch(batch) {
    let failed = 0;
    for (const land of batch) {
        if (expected[land.name] !== land.delay) {
            console.warn(`${land.name} expected: ${expected[land.name]}, actual: ${land.delay}`);
            failed++;
        }
    }
    console.log('failed: ', failed);
}

const allTests = [
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

    new Land(templeOfTheFalseGod)
];
runBatch(allTests);

console.log(new Land(azoriusChancery));

// const fetchlandTests = [
//     new Land(evolvingWilds),
//     new Land(aridMesa),
//     new Land(prismaticVista)
// ];
// runBatch(fetchlandTests);

// const etbEffectTests = [
//     new Land(brokersHideout),
//     new Land(rithsGrove)
// ];
// runBatch(etbEffectTests);

// const etbSacTests = [
//     new Land(lakeOfTheDead),
//     new Land(shelteredValley),
//     new Land(lotusVale)
// ];
// runBatch(etbSacTests);
