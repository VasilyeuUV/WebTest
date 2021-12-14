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




//_______________________________________________________________________________________
// Преобразовать массив N х N в одинарный, возвращая значения 
// с левого верхнего угла по часовой стрелке
const snail = function (array) {
    const arr2 = [];
    while (true) {
        arr2.push(array.shift());
        if (array.length < 1)
            break;
        array = array[0].map((col, i) => array.map(row => row[row.length - i - 1]));
    }
    return [].concat(...arr2);
}
// let arr = [[1, 2, 3, 4, 5], [16, 17, 18, 19, 6], [15, 24, 25, 20, 7], [14, 23, 22, 21, 8], [13, 12, 11, 10, 9]];
// console.log(snail(arr));

// - вариант 1
function snail1(array) {
    var vector = [];
    while (array.length) {
        vector.push(...array.shift());
        array.map(row => vector.push(row.pop()));
        array.reverse().map(row => row.reverse());
    }
    return vector;
}



//_______________________________________________________________________________________
// сумма-разность массива 
function tickets(peopleInLine) {

    return peopleInLine.every(bill => cashbox.sellTicket(bill))
        ? "YES" : "NO";
}

const cashbox = {
    priсe: 25,
    count25: 0,
    count50: 0,
    count100: 0,

    sellTicket(bill) {

        console.log('bill: ' + bill);
        console.log('count25: ' + this.count25);
        console.log('count50: ' + this.count50);
        console.log('count100: ' + this.count100);
        console.log('-----------');


        switch (bill / this.priсe) {
            case 1: ++this.count25; break;
            case 2:
                if (this.count25 > 0) {
                    --this.count25;
                    ++this.count50;
                }
                else return false;
                break;
            case 4:
                if (this.count50 > 0 && this.count25 > 0) {
                    --this.count25;
                    --this.count50;
                    ++this.count100;
                }
                else if (this.count25 > 2) {
                    this.count25 = this.count25 - 3;
                    ++this.count100;
                }
                else return false;
                break;
            default: return false;
        }
        console.log('count25: ' + this.count25);
        console.log('count50: ' + this.count50);
        console.log('count100: ' + this.count100);
        console.log('-----------');
        return true;
    }
}

// вариант 1
const tickets1 = (peopleInLine) => {
    let bill25 = 0,
        bill50 = 0,
        bill100 = 0

    return peopleInLine.every(person => {
        switch (person) {
            case 25:
                bill25 += 1
                return true
            case 50:
                bill50 += 1
                bill25 -= 1
                return bill25 >= 0
            case 100:
                bill100 += 1
                if (bill50 >= 1) {
                    bill50 -= 1
                    bill25 -= 1
                } else bill25 -= 3
                return bill50 >= 0 && bill25 >= 0
        }
    }) ? 'YES' : 'NO'
}


// let arr = [25, 100];
// console.log(tickets(arr));







//####################################################################################
let arr = [25, 100];
console.log(tickets(arr));
