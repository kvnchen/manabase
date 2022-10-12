const { parseTypes, getBasicTypes, parseOracle } = require('./utils.js');

class Card {
    constructor(props) {
        ({
            name: this.name,
            mana_cost: this.mana_cost,
            colors: this.colors,
            type_line: this.type_line,
            oracle_text: this.oracle_text
        } = props);
    }
}

class Land extends Card {

    constructor(props) {
        super(props);
        
        const typeData = parseTypes(this.type_line);
        // console.log(typeData);
        this.basicTypes = getBasicTypes(typeData.subTypes);
        this.isBasic = typeData.types.includes('Basic');
        
        const parsedOracle = parseOracle(this.oracle_text, this.name);
        this.colorsProduced = parsedOracle.canProduce;
        this.colorDelay = parsedOracle.colorDelay;
        this.delay = parsedOracle.delay;
    }
}

exports.Card = Card;
exports.Land = Land;
