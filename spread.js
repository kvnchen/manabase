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
        const group = [];

        group.push(i);
        group.push([targetRange[0], pretty(n)]);

        if (Array.isArray(weights)) {
            n = n * weights[0];
        }
        
        if (targetRange.length > 1) {
            let sum = n;
            for (let j = 1; j < targetRange.length; j++) {
                let m = hypergeometric(population, sample, i, targetRange[j]);
                group.push([targetRange[j], pretty(m)]);

                if (Array.isArray(weights)) {
                    sum += (m * weights[j]);
                } else {
                    sum += m;
                }
            }
            group.push([`${targetRange[0]}-${targetRange[targetRange.length - 1]}`,pretty(sum)]);
        }

        blob.push(group);
    }

    return blob;
}

function textFormatter(data) {
    const blob = [];

    for (const row of data) {
        blob.push(`${row[0]} targets`);

        for (let i = 1; i < row.length; i++) {
            blob.push(`${row[i][0]}: ${row[i][1]}`);
        }
        blob.push('\n');
    }
    console.log(blob.join('\n'));
}

function tableMarkdownFormatter(data) {
    const blob = [];
    
    for (const row of data) {
        blob.push('<tr>');
        blob.push(`<td>${row[0]}</td>`);
        
        for (let i = 1; i < row.length; i++) {
            blob.push(`<td>${row[i][1]}</td>`);
        }
        blob.push('</tr>');
    }
    console.log(blob.join('\n'));
}
  
textFormatter(spread(population, sample, hitSpread, range, weights));
// tableMarkdownFormatter(spread(population, sample, hitSpread, range, weights));
  