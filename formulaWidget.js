// const { karsten } = require('./karstenFormula.js');

function karsten(avgmv, draw, ramp, fast, mdfc1, mdfc2, format, commanders) {
    let output;

    switch (format) {
        case 'aus':
            return (19.59  + (1.90 * avgmv) - (0.28 * (ramp + draw)) - fast - (0.74 * mdfc1) - (0.38 * mdfc2) + (0.27 * (commanders || 0))).toPrecision(4);
        case 'edh':
            output = (((100 - commanders) / 60) * (19.59 + (1.90 * avgmv) + (0.27 * commanders)) - (0.28 * (ramp + draw)) - fast - (0.74 * mdfc1) - (0.38 * mdfc2) - 1.35).toPrecision(4);
            break;
        case 'can':
        case 'gla':
        case 'eur':
        default:
            return (32.65 + (3.16 * avgmv) - (0.28 * (ramp + draw)) - fast - (0.74 * mdfc1) - (0.38 * mdfc2)).toPrecision(4);
    }
    return output;
}

function calculate() {
    const output = document.getElementById('output');
    const format = document.getElementById('format-select').value;

    const args = [
        Number(document.getElementById('avgmv').value),
        Number(document.getElementById('draw').value),
        Number(document.getElementById('ramp').value),
        Number(document.getElementById('fast').value),
        Number(document.getElementById('mdfc1').value),
        Number(document.getElementById('mdfc2').value),
        format
    ];
    if (format === 'edh') {
        args.push(Number(document.getElementById('commanders').value));
    }
    if (format === 'aus') {
        args.push(Number(document.getElementById('companion').value));
    }

    output.innerText = `Recommended number of lands: ${karsten(...args)}`;
    output.hidden = false;
}

const button = document.getElementById('calc');
button.addEventListener('click', calculate, false);
