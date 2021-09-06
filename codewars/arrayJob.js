// Array(5).fill().map((x, i) => i);    // 0 1 2 3 4
// [...new Array(5).keys()]             // 0 1 2 3 4

// arr.filter(x => isNaN(x))    // удалить все цифры из массива





//_______________________________________________________________________________________
// Реализовать методы head-tail-init-and-last
/*
| HEAD | <----------- TAIL ------------> |
[  1,  2,  3,  4,  5,  6,  7,  8,  9,  10]
| <----------- INIT ------------> | LAST |
*/

const head = arr => arr[0];
const tail = arr => arr.slice(1);
const init = arr => arr.slice(0, arr.length - 1);
const last = arr => arr[arr.length - 1];

// const arr = [1, 2, 3, 4, 5];
// console.log(head(arr));          // 1
// console.log(tail(arr));          // [ 2, 3, 4, 5 ]
// console.log(init(arr));          // [ 2, 3, 4, 5 ]
// console.log(last(arr));          // 5






//_______________________________________________________________________________________
// Array Deep Count создать функцию, которая возвращает количество ВСЕХ элементов в массиве, 
// включая любые внутри массивов внутреннего уровня
function deepCount(a) {
    let sum = a.length;
    a.forEach(el => {
        if (el instanceof Array)
            sum += deepCount(el);
    });
    return sum;
}

// - вариант 1
const deepCount1 = a => a.reduce((s, e) => s + (Array.isArray(e) ? deepCount(e) : 0), a.length);

//- вариант 2
const deepCount2 = a => a.reduce((pre, val) => ++pre + (Array.isArray(val) && deepCount(val)), 0);

// - вариант 3
const deepCount3 = a => JSON.stringify(a).replace(/[^[,]|\[]/g, '').length;

// const arr = ["x", "y", ["z"]];
// console.log(deepCount(arr));






//####################################################################################
const arr = ["x", "y", ["z"]];
console.log(deepCount(arr));
