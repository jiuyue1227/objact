"use strict";

class User{
	constructor(name, age){
		this.name = name;
		this.age = age;
	}
	changeName(){
		let name = this.name;
		return new Promise(function(resolve, reject){
			if (name === 'leo') {
				resolve('your name is right');
			} else {
				reject('your name is wrong');
			} 
		})
	}
	changeAge(){
		let age = this.age;
		return new Promise(function(resolve, reject){
			if (age === 33) {
				resolve('your age is right');
			} else {
				reject('your age is wrong');
			}
		})
	}
}

var user = new User('leo9', 33);
user.changeName()
	.then(function(){ // 这里是正确的时候执行
		return user.changeAge();
	}, function(result){ // 这里捕获异常
		console.log('error1');
	})
	.then(function(result){
		console.log(result + '123');
		throw new Error('newerr');
	})
	.catch(function(result){ // 要是then本身没有捕获异常这里捕获异常
		console.log('error2');
	})
