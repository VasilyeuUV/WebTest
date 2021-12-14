//_______________________________________________________________________________________
// Количество указанных букв в строке
const getCount = str => (arr = str.match(/[aeiou]/gi)) ? arr.length : 0;




//_______________________________________________________________________________________
// С двух слов выбрать все уникальные буквы и отсортировать по возрастанию
const longest = (s1, s2) => (str = `${s1}${s2}`)
    .split('')
    .filter((v, i, arr) => arr.indexOf(v) === i)
    .sort()
    .join('');

// - вариант 1
const longest1 = (s1, s2) => [...new Set(s1 + s2)].sort().join('')

// - вариант 2
const longest2 = ($1, $2) => [...new Set([...$1, ...$2])].sort().join('')




//_______________________________________________________________________________________
// Absent vowel (найти номер буквы, отсутствуещей в слове)
function absentVowel(x) {
    const vowelArr = ['a', 'e', 'i', 'o', 'u'];
    const strVowelArr = [...new Set(x.match(/[aeiou]/gi))];
    const arr = vowelArr.filter(x => !strVowelArr.includes(x));
    return vowelArr.indexOf(arr[0]);
}

// - вариант 1
const absentVowel1 = x => {
    for (var v in 'aeiou')
        if (x.indexOf('aeiou'[v]) == -1)
            return +v
}

// - вариант 2 (!!!)
const absentVowel2 = x =>
    [...`aeiou`].findIndex(val => !x.includes(val));






//_______________________________________________________________________________________
// Get the Middle Character (найти средние символы в слове)
const getMiddle = s => s.substr(Math.ceil(s.length / 2) - 1, s.length % 2 ? 1 : 2);

// - вариант 1
const getMiddle1 = s => s.slice((s.length - 1) / 2, s.length / 2 + 1);

// - вариант 2
const getMiddle2 = s => s.substring(Math.ceil(s.length / 2) - 1, Math.floor(s.length / 2) + 1)

// - вариант 3
const getMiddle3 = s => s.substr(s.length - 1 >>> 1, (~s.length & 1) + 1);





//_______________________________________________________________________________________
// Jaden Casing Strings (каждое слово с заглавной буквы)
String.prototype.toJadenCase = function () {
    return this.split(' ').map(w => `${w[0].toUpperCase()}${w.substr(1)}`).join(' ');
};

// - вариант 1 
String.prototype.toJadenCase1 = function () {
    return this.split(' ').map(item => item[0].toUpperCase() + item.slice(1)).join(' ')
};





//_______________________________________________________________________________________
// Disemvowel Trolls (удалить определённые символы из строки)
const disemvowel = str => str.replace(/[aeiou]/gi, '');
// let str = "This website is for losers LOL!";   disemvowel(str);





//_______________________________________________________________________________________
// isIsogram (Изограмма - это слово, в котором нет повторяющихся букв, последовательных или непоследовательных.)
const isIsogram = str => [...new Set(str.toLowerCase())].length === str.length;
// варианты:
// => new Set(str.toUpperCase()).size == str.length;
// => !str || (str.length === new Set(str.toLowerCase()).size);

// вариант 1
const isIsogram1 = str => !/(\w).*\1/i.test(str);

// вариант 2
const isIsogram2 = str => !str.match(/([a-z]).*\1/i);

// var str = "Dermatoglyphics";
// str = "moOse";
// console.log(isIsogram(str));





//_______________________________________________________________________________________
// Nickname Generator (генерация 3-4х буквенного ника из имени (по согласным))
const nicknameGenerator = name => name.length > 3
    ? [...`aeiou`].includes(name[2].toLowerCase()) ? name.substr(0, 4) : name.substr(0, 3)
    : "Error: Name too short";

// вариант 1
const nicknameGenerator1 = (name) => name.length > 3
    ? name.slice(0, 3 + 'aeiou'.includes(name[2]))
    : 'Error: Name too short'

// вариант 2
const nicknameGenerator2 = name => (name.match(/^..[aeiou]?.(?!$)/gi) || ['Error: Name too short'])[0]

// let str = "Douglas";
// str = "Kimberly";
// console.log(nicknameGenerator(str));






//_______________________________________________________________________________________
// Valid string (может ли быть сформировано word из слов, содержащихся в dictionary)

// const validWord = function (dictionary, word) {
//     let res = true;
//     for (let index = 0; index < dictionary.length; index++) {
//         const element = dictionary[index];
//         if (word.indexOf(element) < 0) {
//             res = false;
//             break;
//         }
//     }
//     return res;
// };

const validWord = function (dictionary, word) {
    if (dictionary.length === 0) {
        return false;
    }

    let unused = [];
    while (dictionary.length > 0) {
        let el = dictionary.shift();

        if (word.indexOf(el) < 0) {
            unused.push(el);
        }
        word = word.replace(el, "");
    }
    console.log(word.length + " - " + unused.length);
    return word.length === 0 ? true : unused.length === 0;
};

//const validWord = (dictionary, word) => dictionary.some(el => word.replace(el, "").length == 0);








//####################################################################################

console.log(validWord(['ab', 'a', 'bc'], 'abc'));   // true