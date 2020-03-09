# Javascript Notebook 

## Version: **ES5**
***


## Execution Context
* Code that is not inside any function
* Associated with the global object
* In the browser, that's the window object.
#### Example:
```js
var eddie = 'eddie'

function job(){
    var job = 'Engineer';
    age();
    console.log(eddie+'\'s '+job);
}

function age(){
    var age = 30;
    console.log(eddie+'\'s '+age);
}

job();
```
>EXECUTION ON STACK
>>GLOBAL EXECUTION CONTEXT
>>>EXECUTION CONTEXT  
job()
>>>>EXECUTION CONTEXT  
age()

***

1. Creation phase 
    * Creation of the Variable Object
    * Creation of the scope chain
    * Determine value of the 'this' variable


2. Execution phase
    * The code of the function that generated the current execution context is ran line by line.


## Variable Object(VO)
* The arguent object is created, containing all the arguments that were passed into the function.

##### HOISTING
* Code is scanned for **function declarations** : for each function, a property is created in the Variable Object, **pointing to the function**

* Code is scanned for **varible declarations** : for each variable, a property is created in the Variable Object, **and set to undefined.**

***

#### Positive Example:
* Before create function execution.
```js
calculateAge(1990)

function calculateAge(year){
    console.log(2016-year);
};
```
*OUTPUT : 26*  

```js
console.log(age)
var age = 10
```
*OUTPUT : undefined* 


#### Negative Example:
* Variable can't execute before assign.

```js
retirement(1990);
var retirement = function calculateAge(year){
    console.log(2016-year);
};
```

*OUTPUT : Uncaught TypeError: Retirement is not a function* 

***

## Scoping and Scoping Chain
* Scoping answers the question **where can we access a certain variable?**

* **Each new function creates a scope:** the space/environment, in which the variables it defines are accessible.

* **Lexical scoping:** a function that is lexically within another function gets access to the scope of the outer function.

``` js
var a = 'Hello';

function first(){
    var b = 'This is b';
    second();

    function second(){
        vat c = 'This is c';
        console.log(a+b)
    };
}

function third(){
    var d = 'This is d';
    console.log(c);
}
```
*OUTPUT : Uncught ReferenceError: c is not defined* 

---

## The 'this' Variable
* **Regular function call:** the this keyword points at the global object, (the window object, in the browser).
* **Method call:** the this variable points to the object that is calling the method.

* The this keyword is not assigned a value until a function where it is defined is actually called.

## Example:
``` js
var john = {
    name:'john',
    yearOfBirth: 1990,
    calculateAge: function(){
        console.log(this);

        function innerFunction(){
            console.log(this);
        }
        innerFunction();
    }
}
john.calculateAge();
```

*OUTPUT: <br>OBJECT{name:'eddie', yearOfBirth:1990}<br>Window*
