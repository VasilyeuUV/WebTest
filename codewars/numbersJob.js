//_______________________________________________________________________________________
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




//_______________________________________________________________________________________
// Найти следующий правильный квадратный корень
const findNextSquare = (sq) => Math.sqrt(sq) === Math.trunc(Math.sqrt(sq)) ? Math.pow(Math.sqrt(sq) + 1, 2) : -1;

// Вариант 2:
const findNextSquare3 = sq => (sq = Math.sqrt(sq)) % 1 ? -1 : Math.pow(++sq, 2)





//_______________________________________________________________________________________
// Highest and Lowest
const highAndLow = numbers => {
    arr = numbers.split(' ').map(Number);
    return `${Math.max(...arr)} ${Math.min(...arr)}`;
}





//_______________________________________________________________________________________
// Digits explosion (вернуть столько цифр, сколько оно значит)
const explode = s => [...s].map(n => n.repeat(new Number(n))).join('');

// - вариант 1
explode1 = s => [...s].map(n => n.repeat(n)).join``;

// let str = "102269";
// console.log(explode(str));







//_______________________________________________________________________________________
// Handshake problem (Посчитать людей по количеству рукопожатий: пара пожимает руки только один раз) 
const getParticipants = handshakes => Math.ceil(1 + (Math.sqrt(1 - 8 * (-handshakes)) - 1) / 2);
//- варианты:
// Math.ceil((1+Math.sqrt(1+8*h))/2)
// => Math.round(Math.sqrt(handshakes * 2) + 1); 

// - вариант 1
function getParticipants1(h) {
    for (var i = 0, k = 1; i < h; i += k++) { }
    return k;
}

// let str = "7";
// console.log(getParticipants(str));





//_______________________________________________________________________________________
// Reverse or rotate? (Разрежьте строку на куски (здесь подстрока исходной строки) размером sz (игнорируйте последний кусок, если его размер меньше sz)
// Если фрагмент представляет собой целое число? например, сумма кубов его цифр делится на 2, переверните этот фрагмент; 
// в противном случае поверните его влево на одну позицию.
// Соедините эти измененные фрагменты и верните результат в виде строки.
// sz <= 0, или если str пуста, верните ""
// sz больше (>), чем длина str, невозможно взять кусок размером sz, поэтому верните "".
function revrot(str, sz) {
    if (str === "" || sz <= 0 || sz > str.length)
        return "";
    const arr = str.match(new RegExp(`(.{1,${sz}})`, 'g')).filter(s => s.length === sz);
    return arr.map(x => (part = [...x]).map(n => Math.pow(n, 3)).reduce((a, b) => a + b) % 2 === 0
        ? part.reverse().join("")
        : part.concat(part.splice(0, 1)).join("")
    ).join("");
}

// лучше делать через методы для каждой операции
/*
  let reverse = s => s.split('').reverse().join('');
  let rotate  = s => s.slice(1) + s.slice(0, 1);
  let sum_cubes = c => c.split('').reduce((a, b) => a + +b ** 3, 0); 

  return str
    .match(new RegExp('.{' + sz + '}', 'g'))
    .map(c => sum_cubes(c) % 2 ? rotate(c) : reverse(c))
    .join('');
*/

// console.log(revrot("123456987654666", 6));





//_______________________________________________________________________________________
// Multiples of 3 or 5 (сумма натуральных чисел, кратных 3 или 5, 
// если число отрицательное, вернуть 0. Если кратно и 3 и 5 считать один раз) 
const solution = number => number > 3
    ? Array(number - 1).fill().map((x, i) => i + 1)
        .filter(x => !(x % 3) || !(x % 5))
        .reduce((a, b) => a + b)
    : 0;

// - вариант 1
function solution1(number) {
    var sum = 0;

    for (var i = 1; i < number; i++) {
        if (i % 3 == 0 || i % 5 == 0) {
            sum += i
        }
    }
    return sum;
}

// - вариант 2
function solution2(number) {
    var n3 = Math.floor(--number / 3), n5 = Math.floor(number / 5), n15 = Math.floor(number / 15);
    return (3 * n3 * (n3 + 1) + 5 * n5 * (n5 + 1) - 15 * n15 * (n15 + 1)) / 2;
}

// - вариант 3
const solution3 = number => number < 1 ? 0 : [...new Array(number).keys()].filter(n => n % 3 == 0 || n % 5 == 0).reduce((a, b) => a + b);


// console.log(solution(10));




//####################################################################################
//let str = "7";
console.log();
