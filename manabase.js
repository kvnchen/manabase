const { parseTypes, getBasicTypes, parseOracle, mergeObjects, canPayGeneric } = require('./utils.js');

class Card {
    constructor(props) {
        ({
            name: this.name,
            mana_cost: this.mana_cost,
            colors: this.colors,
            type_line: this.type_line,
            oracle_text: this.oracle_text,
            card_faces: this.card_faces
        } = props);
    }
}

class Land extends Card {

    constructor(props) {
        super(props);
        
        const typeData = parseTypes(this.type_line);
        this.basicTypes = getBasicTypes(typeData.subTypes);
        this.isBasic = typeData.types.includes('Basic');
        this.isLegendary = typeData.types.includes('Legendary');
        
        if (this.oracle_text) {
            ({
                colorsProduced: this.colorsProduced,
                colorDelay: this.colorDelay,
                delay: this.delay,
                colorUnreliability: this.colorUnreliability,
                isFetch: this.isFetch
            } = parseOracle(this.oracle_text, this.name));
        } else if (Array.isArray(this.card_faces) && this.card_faces.length > 0) {
            // parse each side of a dfc that's a land, combine their metadata?
            this.colorsProduced = { C: false, W: false, U: false, B: false, R: false, G: false };
            this.colorDelay = { C: 0, W: 0, U: 0, B: 0, R: 0, G: 0 };
            this.colorUnreliability = null;
            this.delay = 0;
            this.isFetch = false;

            for (const face of this.card_faces) {
                const faceTypes = parseTypes(this.type_line);
                if (faceTypes.types.includes('Land')) {
                    const parsed = parseOracle(face.oracle_text, face.name);
                    mergeObjects(this, parsed);
                }
            }
        }
        this.canPayGenericReliably = canPayGeneric(this.isBasic, this.basicTypes, this.colorsProduced, this.colorUnreliability, this.isFetch);
    }
}

class countMap {
    constructor() {
        this.data = {};
        this.count = 0;
    }

    add(key) {
        if (this.data[key] === undefined) {
            this.data[key] = 1;
        } else {
            this.data[key]++;
        }
        this.count++;
    }
}

class Manabase {
    constructor() {
        // map of land name to object
        this.landMap = {};

        // map of land names that can produce that color reliably (colorsProduced && !colorUnreliability)
        // colors are maps of { name: count }?
        // do we care about specifics? I guess for highlighting purposes, yes?
        this.canReliablyProduce = { C: new countMap(), W: new countMap(), U: new countMap(), B: new countMap(), R: new countMap(), G: new countMap() };
        
        // kind of want something that tracks all lands that can pay for generic costs.
        this.canPayGeneric = new countMap();

        // duals fall in multiple maps
        this.basicTypes = { Plains: new countMap(), Island: new countMap(), Swamp: new countMap(), Mountain: new countMap(), Forest: new countMap() };

        // should be ignored in final calc
        // maybe what we care about is reliable production, if we're going to ignore unreliable sources
        // that and delay
        // this.isUnreliable = { C: null, W: null, U: null, B: null, R: null, G: null };
    }

    // in practice we're gonna be parsing from a text blob of format:
    // <count> <name>
    addLands(lands) {
        for (const land of lands) {
            if (this.landMap[land.name] == null) {
                this.landMap[land.name] = land;
            }

            if (land.canPayGenericReliably) {
                this.canPayGeneric.add(land.name);
            }
            
            for (const color in land.colorsProduced) {
                if (land.colorsProduced[color] && (!land.colorUnreliability || !land.colorUnreliability[color])) {
                    this.canReliablyProduce[color].add(land.name);
                }
            }

            for (const type in land.basicTypes) {
                if (land.basicTypes[type]) {
                    this.basicTypes[type].add(land.name);
                }
            }
        }
    }

    // todo: function to eval fetchlands based on fetchable sources
}

exports.Card = Card;
exports.Land = Land;
exports.Manabase = Manabase;
