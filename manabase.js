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
        
        ({
            canProduce: this.colorsProduced,
            colorDelay: this.colorDelay,
            delay: this.delay,
            colorUnreliability: this.colorUnreliability
        } = parseOracle(this.oracle_text, this.name));
    }
}

exports.Card = Card;
exports.Land = Land;
