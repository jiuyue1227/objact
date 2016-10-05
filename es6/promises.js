// return new Promise(function(resolve, reject){});
// Promise是一个对象 它返回一个函数 函数中有俩个方法
// resolve('is seccuss') 是成功状态下输出的
// reject('is error') 抛出错误
// 
// .then(function(){},function(){})这个方法接受俩个参数，
// 一个是执行成功的处理函数，一个是执行失败的处理函数（这个参数是可选的）
// .catch(()=>{})这个方法是捕获错误的方法
// 如果.then有执行异常的处理函数，那么catch将不会被执行，
// 但是如果then中有抛出错误的语句，那么catch将继续捕获异常
//
// 也可以直接调用Promise.resolve('is seccuss'),Promise.reject('is error')
//
// Promise.all([fun(1,2),fun(2,3)...fun(n,m)]);
// Promise.race([fun(1,2), fun(2,3)...fun(n,m)]);
// Promise有俩个方法都是解决多个函数逻辑嵌套应用的，
// all()方法是按照数组的顺序执行;
// race()方法是只要Promise对象的状态发生变化时就返回执行结果；
// 这俩个方法中一般是不会抛出错误的



'use strict';
class User{
	constructor(name, age){
		this.name = name;
		this.age = age;
	}	
	setMessage(cd){
		let name = this.name;
		return new Promise(function(resolve, reject){
			if (name === 'lily') {
				resolve('name is right');
			} else {
				reject('you name is wrong');
			}
		});
		
	}
	setAge(){
		let age = this.age;
		return new Promise(function(resolve, reject){
			if (age === 33) {
				resolve('age is right');
			} else {
				reject('age is wrong')
			}
		})
	}
}

var user = new User('lily', 3993);
user.setMessage()
	.then(function(result){
		return user.setAge();		
	})
	.then(function(result){
		console.log(result);
	})
	.catch(function (err){
		console.log(err);
	});
