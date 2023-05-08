const { hypergeometric, pretty } = require("./hypergeometric");

let population = Number(process.argv[2]);
let sample = Number(process.argv[3]);
let hitSpread = process.argv[4].split(',').map((s) => { return Number(s) });
let range = process.argv[5].split(',').map((s) => { return Number(s) });
let weights = process.argv[6] ? process.argv[6].split(',').map((s) => { return Number(s) }) : null;

function spread(population, sample, hitRange, targetRange, weights) {
    const [lower, upper] = hitRange;
    let blob = [];

    for (let i = lower; i <= upper; i++) {
        let n = hypergeometric(population, sample, i, targetRange[0]);

        blob.push(`${i} targets`);
        blob.push(`${targetRange[0]} targets: ${pretty(n)}`);

        if (Array.isArray(weights)) {
            n = n * weights[0];
        }
        
        if (targetRange.length > 1) {
            let sum = n;
            for (let j = 1; j < targetRange.length; j++) {
                let m = hypergeometric(population, sample, i, targetRange[j]);
                blob.push(`${targetRange[j]} targets: ${pretty(m)}`);

                if (Array.isArray(weights)) {
                    sum += (m * weights[j]);
                } else {
                    sum += m;
                }
            }
            blob.push(`${targetRange[0]} through ${targetRange[targetRange.length - 1]}: ${pretty(sum)}`);
        }

        blob.push('\n');
    }

    console.log(blob.join('\n'));
}
  
spread(population, sample, hitSpread, range, weights);
  