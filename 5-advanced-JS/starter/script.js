/*
1. Every JavaScript object has a prototype property, which makes inheritance possible ins JavaScript.

2. The Constructor's prototype property is NOT the prototype of the Constructor itself, it's the prototype of ALL
instances that are created through it.

*/



// var Person = function(name, yearOfBirth, job){
//     this.name = name;
//     this.yearOfBirth = yearOfBirth;
//     this.job = job;
// }

// Person.prototype.calcuateAge = function(){
//     console.log(2020-this.yearOfBirth);
// };

// Person.prototype.lastName = 'Cool';

// var eddie = new Person('eddie', 1993, 'Engineer');

// console.log(eddie)
// console.log(eddie.name);
// console.log(eddie.__proto__)

// eddie.calcuateAge();


// var personProto = {
//     calcuateAgeProto: function(){
//         console.log(2020-this.yearOfBirth)
//     }
// }

// var steven = Object.create(personProto, {
//     name: {value: 'Steven'},
//     yearOfBirth: {value: 1993},
//     job: {value: 'Engineer'}
// });

// console.log(steven)
// console.log(steven.calcuateAgeProto())
// console.log(steven.__proto__ === personProto.prototype)



// function interactive(job){
//     if (job === 'Engineer'){
//         return function(name){
//             console.log('Hello My name is'+name)
//         }
//     }else{
//         return function(name){
//             console.log('Get out off here'+name)
//         }
//     }
// }

// interactive('Engin')('eddie');


// (function(){
//     console.log('eddie')
// })();

(function(){
    function Question_DB(question, answer, correct){
        this.question = question;
        this.answer = answer;
        this.correct = correct;
    };
    
    Question_DB.prototype.displayQuestion = function(){
        console.log(this.question);
    
        for (var i=0; i<this.answer.length; i++){
            console.log(i+': '+this.answer[i]);
        };
    };
    
    Question_DB.prototype.displayAnswer = function(ans){
        if (ans === this.correct){
            console.log('Correct answer.')
            score++;
        }else{
            console.log('Wrong answer.')
        }

        console.log(score)
    };
    
    var q1 = new Question_DB(
        'What is author\'s genger ?', 
        ['Male', 'Female'],
        0
    );
    
    var q2 = new Question_DB(
        'What is author\'s age ? ',
        ['20', '25'],
        1
    );
    
    var score = 0;
    var question = [q1, q2];

    function nextQuestion(){
        
        var n = Math.floor(Math.random()*question.length);
        question[n].displayQuestion();
        var user = prompt('Input the answer : ');

        if (user !== 'exit'){

            question[n].displayAnswer(parseInt(user));

            nextQuestion();
        };
    };

    nextQuestion();
    
})();



var Person = function(name, job){
    this.name = name;
    this.job = job;
    this.introduction = function(){
        console.log('Hello my name is '+this.name);
    };
};

var eddie = new Person('eddie', 'Engineer')
eddie.introduction()































