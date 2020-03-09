var Person = function(name){
    this.name = name;
};

Person.prototype.myFriends = function(ary){
    var newAry = ary.map(ele =>
        {
        return `${ele} is ${this.name} \'s friends.`
    });
    console.log(newAry)
}

var friends = ['eddie', 'peter'];

var john = new Person('john');
john.myFriends(friends);

