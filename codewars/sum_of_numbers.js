// Вернуть сумму чисел между заданными значениями

function getSum(a, b) {
    const n = b > a ? b - a + 1 : a - b + 1;
    const arr = Array(n).fill().map((x, i) => b > a ? a + i : a - i);
    return arr.reduce((x, i) => x + i);
}


// Адаптированный вариант 1
const getSum3 = (a, b) => (Math.abs(a - b) + 1) * (a + b) / 2;


// Вариант 1 (класс!)
function GetSum1(a, b) {
    return (Math.abs(a - b) + 1) * (a + b) / 2;
}

// Вариант 2
function getSum2(a, b) {
    return Array.from({ length: b >= a ? b - a + 1 : a - b + 1 }, (_, i) => b >= a ? i + a : i + b).reduce((a, b) => a + b, 0)
}



// Array(5).fill().map((x, i) => i);    // 0 1 2 3 4

/* Значения по порядку от а до b
    let range = {
        from: a,
        to: b,
        *[Symbol.iterator]() { 	// краткая запись для [Symbol.iterator]: function*()
            for (let value = this.from; value <= this.to; value++) {
                yield value;
            }
        }
    };
    return [...range];
*/

// function* makeRangeIterator(start = 0, end = 100, step = 1) {
//     let iterationCount = 0;
//     for (let i = start; i < end; i += step) {
//         iterationCount++;
//         yield i;
//     }
//     return iterationCount;
// }



let sum1 = getSum(1, 5);
console.log(sum1);

let sum2 = getSum(2, -5);
console.log(sum2);

let sum3 = getSum3(2, -5);
console.log(sum3);