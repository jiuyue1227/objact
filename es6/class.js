'use strict';

// 通过class创建的方法是不可枚举的
// 通过prototype原型链创建的方法是可枚举的
class obj1{
	constructor(){
		this.name = 'lucy';
	}

	getName(){
		console.log(this.name);
	}
}

class obj2 extends obj1{
	constructor(){
		super();
		this.age = 23;
	}
	getAge(){
		console.log(this.age);
	}
}

var newObj = new obj2();

// 可以遍历对象的可枚举属性，不可遍历不可枚举属性，
console.log(Object.keys(newObj));

// 可以遍历对象的属性，包括不可枚举的属性
console.log(Object.getOwnPropertyNames(newObj));









