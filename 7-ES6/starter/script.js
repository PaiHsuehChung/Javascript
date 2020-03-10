function toArray(...years){
    const adult = [];
    console.log(years);
    Array.from(years).forEach(function(cur){
        if(2020-cur >= 16){
            adult.push(cur);
        }
    })
    console.log(adult);
}

toArray(1993, 2000, 2008);


var obj = {
    name:'eddie',
    age : 20
}


var mapObj = new Map();

mapObj.set('name', 'eddie');
mapObj.set('age', 20);


mapObj.forEach((value, key) => console.log(`This is key : ${key}`))
console.log()

class Person6 {
    constructor(name, age){
        this.name = name;
        this.age = age;
    }

    greeting(){
        console.log(`My name is ${this.name} and i am ${this.age} years old.`)
    }
}


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