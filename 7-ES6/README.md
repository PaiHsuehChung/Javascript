# JavaScript Notebook
#### Version : ES6

## Lecture : Let and Const

``` js
// ES5
var name5 = 'Jane Smith';
var age5 = 23;

name5 = 'Jane Miller';
console.log(name5);
```
*OUTPUT : Jane Miller* 

``` js 
// ES6
const name6 = 'Jane Smith';
let age6 = 23;

name6 = 'Jane Miller';
console.log(name6);
```
*OUTPUT : TypeError : Assignment to constant variable.*

``` js
// ES5
// var is Function scope
function driversLicence(passedTest){
    if (passedTest){
        var firstName = 'john';

    }
    console.log(firstName)
};
driversLicence(true);
```
*OUTPUT : Jahn*


``` js
// ES6
// let and const are block scope. 
function driversLicence(passedTest){
    if (passedTest){
        let firstName = 'john';

    }
    console.log(firstName)
};
driversLicence(true);
```
*OUTPUT : ReferenceError : firstName is not defined.*

``` js
// ES5
var i = 20;

for (var i=0; i<=10; i++){
    console.log(i);
};

console.log(i);
```
*OUTPUT : 11*

``` js
// ES6
// let and const are block scope. 
let i = 20;

for (let i=0; i<=10; i++){
    console.log(i);
};

console.log(i);
```
*OUTPUT : 20*

---
## Lecture : Blocks and IIFEs

``` js
// ES6
// Block scope
{
    const a = 1;
    let b = 2;
}
console.log(b);
```
*OUTPUTS : ReferenceError: b is not defined.*

``` js
// ES5
// Function scope(Use IIFE to protect variable)
{
    var a = 1;
}
console.log(a);

/* 

(function(){
    var a = 1;
})();
console.log(a);

*/
```
*OUTPUTS : 1*

---
## Lecture : Strings

``` js
// ES6
let firstName = 'John';
let lastName = 'Smith';
const yearOfBirth = 1990;

function calcAge(year){
    return 2020 - yearOfBirth;
}

console.log(`This is ${firstName}. He is born in ${yearOfBirth}.`)
```
---

## Lecture : Arrow Functions
``` js 
const years = [1990, 1985, 1993];

// ES5
var age5 = years.map(function(el){
    return 2020-el;
})

// ES6
var age6 = years.map(el => 2020-el);
```


``` js
var friends = ['eddie', 'peter', 'sean'];

var Person = function(name){
    this.name = name
}

// ES5
Person.prototype.myFriends5 = function(friends){
    var newAry = firends.map(function(el){
        return 'el is '+this.name+' \'s friend';
    }.bind(this))
    console.log(newAry);
}

// ES6
Person.prototype.myFriends6 = function(friends){
    var newAry = friends.map(el => {
        return `${el} is this.name \'s name`;
    })
    console.log(newAry)
}

new Person('Eddie').myFriends6(friends);

```
## Lecture : Destructuring

``` js
// ES5
var john = ['John', 26];
var name = john[0];
var age = john[1];

// ES6
const [firstName, lastName] = ['Eddie', 'Pai'];

const obj = {
    firstName:'eddie',
    lastName : 'Pai'
}
const {firstName:a, lastName:b} = obj;

console.log(a);
console.log(b); 

```
## Lecture : Arrays

``` js
// ES6
// Select all box(Node List)
const boxes = document.querySelectorAll('.box');

const boxesArr = Array.from(boxes);

boxesArr.forEach(cur => cur.style.backgroundColor = 'dodgerblue')
```


## Lecture : Spread Operator

``` js
function addAge(a,b,c){
    return a+b+c;
}

var ages = [20,25,30];

const sum = addAge(...ages);
console.log(sum);
```
*OUTPUT: 75*

``` js
const familySmith = ['John', 'Jane', 'Mark'];
const familyMiller = ['Mary', 'Bob', 'Ann'];

const bigFamily = [...familySmith, ...familyMiller];
```
*OUTPUT : ["John", "Jane", "Mark", "Mary", "Bob", "Ann"]*

``` js 
// Select HTML element
const h = document.querySelector('h1');
// boxes1 were Node List
const boxes1 = document.querySelectorAll('.box');

const all = [h, ...boxes1];
Array.from(all).forEach(cur => cur.style.color = 'purple');
```

## Lecture : Rest Parameters

``` js
// Output Array type
function isFullAge(...years){
    console.log(years);
}

isFullAge(1993,2000,2008);
```
*OUTPUT : [1993, 2000, 2008]*


``` js
// Output Array type
function isFullAge(limit, ...years){
    years.forEach(
    cur => console.log((2020-cur)>=limit)
    );
}

isFullAge(15, 1993, 2000, 2008);
```
*OUTPUT :<br>true<br>true<br>false*


## Lecture : Default Parameters
``` js
// Default Parameters
function SmithPerson(firstName, yearOfBirth, lastName='smith'){
    this.firstName = firstName;
    this.yearOfBirth = yearOfBirth;
    this.lastName = lastName;
}

var john = new SmithPerson('John', 1990);
```

## Lecture : Maps
``` js
var mapObj = new Map();
// Map is iteable. So can use for each function.
mapObj.set('name', 'eddie');
mapObj.set('age', 20);

// Note: value is first parameters, key is after.
mapObj.forEach((value, key) => console.log(`This is key : ${key}`));

// Get value use key.
console.log(mapObj.get('name'));
```

## Lecture : Classes
``` js
class Person6 {
    constructor(name, age){
        this.name = name;
        this.age = age;
    }

    greeting(){
        console.log(`My name is ${this.name} and i am ${this.age} years old.`)
    }
}

var eddie = new Person6('eddie', 27);
```
## Lecture : Class and Subclass

``` js
// Parent Class
class Person6 {
    constructor(name, age){
        this.name = name;
        this.age = age;
    }

    greeting(){
        console.log(`My name is ${this.name} and i am ${this.age} years old.`)
    }
}
// Children Class
class Athlete extends Person6{
    constructor(name, age, gender, medals){
        super(name, age);
        this.gender = gender;
        this.medals = medals;
    }

    wonMedals(){
        this.medals += 1;
        console.log(`Total medals ${this.medals}`);
    }
}

var eddie = new Person6('eddie', 27);

var peter = new Athlete('peter', 30, 'male', 10);

eddie.greeting();
peter.greeting();
peter.wonMedals();
```
*OUTPUT : <br>My name is eddie and i am 27 years old.<br>My name is peter and i am 30 years old.<br>Total medals 11*





