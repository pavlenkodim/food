'use strict';

// filter

const names = ['Ivan', 'Ann', 'Ksenia', 'Voldemar']

const shortNames = names.filter(name => {
    return name.length < 5;
});

console.log(shortNames);

// map

const answers = ['IvAn', 'AnnA', 'Hello'];
const result = answers.map(item => item.toLowerCase());
console.log(result);

// every/some

const some = [4, 'qwq', 'sometext'];
console.log(some.some(item => typeof(item) === 'number'));
console.log(some.every(item => typeof(item) === 'number'));

// reduse

const arr = [4, 3, 1, 5, 2, 6];

const res = arr.reduce((sum, current) => sum + current, 3);
console.log(res);

const array = ['apple', 'pear', 'plum'];

const resAr = array.reduce((sum, current) => `${sum}, ${current}`);
console.log(resAr);

const obj = {
    ivan: 'persone',
    ann: 'persone',
    dog: 'animal',
    cat: 'animal'
};

const newArr = Object.entries(obj)
.filter(item => item[1] === 'persone')
.map(item => item[0]);

console.log(newArr);