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






