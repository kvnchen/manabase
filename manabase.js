const { parseTypes, getBasicTypes, parseOracle, mergeObjects } = require('./utils.js');

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
        
        if (this.oracle_text) {
            ({
                colorsProduced: this.colorsProduced,
                colorDelay: this.colorDelay,
                delay: this.delay,
                colorUnreliability: this.colorUnreliability
            } = parseOracle(this.oracle_text, this.name));
        } else if (Array.isArray(this.card_faces) && this.card_faces.length > 0) {
            // parse each side of a dfc that's a land, combine their metadata?
            this.colorsProduced = { C: false, W: false, U: false, B: false, R: false, G: false };
            this.colorDelay = { C: 0, W: 0, U: 0, B: 0, R: 0, G: 0 };
            this.colorUnreliability = null;
            this.delay = 0;

            for (const face of this.card_faces) {
                const faceTypes = parseTypes(this.type_line);
                if (faceTypes.types.includes('Land')) {
                    const parsed = parseOracle(face.oracle_text, face.name);
                    mergeObjects(this, parsed);
                }
            }
            // console.log(typeof this.colorUnreliability);
            // console.log(this.colorUnreliability);
        }
    }
}

exports.Card = Card;
exports.Land = Land;
