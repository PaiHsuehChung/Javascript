# Javascript Notebook
#### Version : ES5

---
## EVERY THING IS OBJECT(almost correct)
* PRIMITIVES
    * Numbers
    * Strings
    * Booleans
    * Undefined
    * Null

* EVERYTHING ELSE
    * Arrays
    * Functions
    * Objects
    * Dates
    * Wrappers for Numbers...
    * .....**IS AN OBJECT**

* Every JavaScript object has a prototype property, which makes inheritance possible in JavaScript.

* The prototype property of an object is where we put methods and properties that we want other objects to inherit.

* The Constructor's prototype property is **NOT** the prototype of the Constructor itself, it's the prototype of **ALL** instances that are created through it.

* When a certain method (of property) is called, the search starts in the object itself, and if it cannot be found, the search moves on to the object's prototypes. This continues until the method is found: **prototype chain**.

``` js
var Person = function(name, job){
    this.name = name;
    this.job = job;
    this.introduction = function(){
        console.log('Hello my name is '+this.name);
    };
};
Person.prototype.lastName = 'smith';

Person.prototype.calcuateAge = function(age){
    console.log(2020-age);
};

var eddie = new Person('eddie', 'Engineer')
eddie.introduction();

eddie.calcuateAge(25);
```
*OUTPUT:<br> Hello my name is eddie <br>1995*


``` js
eddie.__proto__ === Person.prototype
```
*OUTPUT:<br>true*


``` js
eddie.hasOwnProperty('job')
```
*OUTPUT:<br>true*

``` js
eddie.hasOwnProperty('lastName')
```
*OUTPUT:<br>false*

``` js
eddie instanceof Person
```
*OUTPUT:<br>true*



---

## Primitives vs Objects
---
#### Primitives
``` js
var a = 23;
var b= a;
a = 46;
console.log(a);
console.log(b);
```
*OUTPUT:<br>46<br>23*

---

#### Objects
``` js
var obj1 = {
    name:'eddie',
    age:26
};
var obj2 = obj1;
obj2.age = 30;
console.log(obj1.age);
console.log(obj2.age);
```
*OUTPUT:<br>30<br>30*

---

## Functions are also ojbects in JavaScript


**FIRST-CLASS-FUNCTIONS**
* A function is an instance of the Object type.
* A function behaves like any other object.
* We can store functions in avariable.
* We can pass a function as an argument to another function.
* We can return a function from a function.

``` js 
var years = [1,2,3,4,5];

function arrayCal(arry, fn){
    var newYears = [];

    for(var i=0; i<years.length; i++){
        newYear.push(fn(years[i]));
    }
    return newYears;
};

function addFive(el){
    return el+5;
};

var newY = arrayCal(years, addFive);
```

## Functions returning Functions
``` js
function interviewQuestion(job){
    if (job === 'teacher'){
        return function(age){
            console.log('How old are you?');
        }
    }else if (job === 'Engineer'){
        return function(age){
            console.log('Hello, are you SR or JR engineer?');
        }
    }
}
interviewQuestion('Engineer')(20);
```
*OUTPUT:<br>Hello, are you SR of JR engineer?*

---
## Immediately Invoked Function Expressions(IIFE)

#### Standard function expressions
``` js
function game(){
    var score = Math.random()*10;
    console.log(score >= 5);
}

game();
```
#### IIFE
``` js
(function game(){
    var score = Math.random()*10;
    console.log(score >= 5);
})();
```

---
## Closures
#### An inner function has always access to the variables and parameters of it's outer function. even after the outer function has returned.

``` js
function outerfunction(){
    var a = 'Outer';
    return function(inner){
        console.log(inner+a)
    }
}

outerfunction()('InnerFun');
```
---
## Bind, Call and Apply

``` js
// Call and Apply
var josh = {
    name:'josh';
    age:30;
    intro:function(date){
        console.log('Hello my name is '+this.name+'And I am '+this.age+' years old.'+'Today is '+date);
    }
}

var emily = {
    name:'emily';
    age:15;
}
josh.intro('Monday');
josh.intro.call(emily, 'Sunday');
josh.intro.apply(emily, ['Thuesday']);
```
*OUTPUTS:<br>Hello my name is josh And i am 30 years old. Today is Monday<br>Hello my name is emily And i am 15 years old. Today is Sunday<br>Hello my name is emily And i am 15 years old. Today is Thuesday<br>*


``` js
// Bind
var josh = {
    name:'josh';
    age:30;
    intro:function(date, emotion){
        console.log('Hello my name is '+this.name+'And I am '+this.age+' years old.'+'Today is '+date+'I am '+emotion);
    }
}

var emily = {
    name:'emily';
    age:15;
}

var joshFamily = josh.intro.bind(josh, data);
joshFamily('Happy');
```
*OUTPUT: <br>Hello my name is josh And i am 30 years old. Today is Monday I am Happy*