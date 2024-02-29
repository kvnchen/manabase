const { pretty } = require("./hypergeometric");

const population = Number(process.argv[2]);
const sample = Number(process.argv[3]);
const hits = Number(process.argv[4]);
const runs = Number(process.argv[5]);

function run(p,s,h) {
    let population = p,
        sample = s,
        hits = h,
        result = 0;

    for (let i = 0; i < sample; i++) {
        const draw = Math.random() * population;

        if (draw <= hits) {
            result++;
            hits--;
        }
        population--;
    }

    return result;
}

function trial(population, sample, hits, runs) {
    const resultArr = [0,0,0,0,0,0,0,0];
    const blob = [];
    let expectedValue = 0;

    for (let i = 0; i < runs; i++) {
        const r = run(population, sample, hits);
        resultArr[r]++;
    }

    for (let n = 0; n < resultArr.length; n++) {
        blob.push(`${n}: ${pretty(resultArr[n] / runs)}`);
        expectedValue += (resultArr[n] / runs) * n;
    }

    blob.push(`expected value: ${expectedValue.toPrecision(4)}`);

    console.log(blob.join('\n'));
}

trial(population, sample, hits, runs);
