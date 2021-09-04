function iqTest(numbers) {
    const arrNumbers = numbers.split(' ').filter((e) => {
        if (Number.isInteger(+e)) {
            return +e;
        }
    });
    const rules = [checkDublicate, checkEven];
    for (const rule of rules) {
        let n = rule(arrNumbers);
        if (n !== null)
            // return n;
            return arrNumbers.indexOf(n) + 1;
    }
    return 'No answer';
}

const checkDublicate = (arr) => {
    const gArr = arr.reduce((tally, value) => {
        tally[value] = (tally[value] || 0) + 1;
        return tally;
    }, {});
    if (gArr === undefined || gArr.length !== 2)
        return null;
    return gArr.find(n => n === 1);
}


const checkEven = (arr) => {
    const evens = arr.filter((e) => !(e % 2));
    const odds = arr.filter(x => !evens.includes(x));

    if ((evens.length > 1 && odds.length > 1) || (evens.length > 2 && odds.length > 2))
        return null;
    return evens.length > 1 ? odds.shift() : evens.shift();
}


console.log(iqTest("2 4 7 8 10"));
console.log(iqTest("1 2 2"));
console.log(iqTest("2 5 2 2"));
console.log(iqTest("2 5 5 2 2"));
