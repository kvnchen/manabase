
const avgmv = Number(process.argv[2]);
const draw = Number(process.argv[3]);
const ramp = Number(process.argv[4]);
const fast = Number(process.argv[5]);
const mdfc1 = Number(process.argv[6]);
const mdfc2 = Number(process.argv[7]);
const format = process.argv[8];
const commanders = Number(process.argv[9]);


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
        case 'euro':
        default:
            return (32.65 + (3.16 * avgmv) - (0.28 * (ramp + draw)) - fast - (0.74 * mdfc1) - (0.38 * mdfc2)).toPrecision(4);
    }
    return output;
}

module.exports.karsten = karsten;

console.log(karsten(avgmv, draw, ramp, fast, mdfc1, mdfc2, format, commanders));
