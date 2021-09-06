



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