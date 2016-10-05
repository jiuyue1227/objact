// Symbol 是一个值，用它创建的值是不会重复的
// let name = Symbol('my name'); obj[name] = 'is lucy';
// console.log(obj) 打印出来的值是 {'my name':'is lucy'}
//
// 数组具有Symbol.iterator属性 能用for..of遍历
// arr[Symbol.iterator]()这个方法下有一个next()方法，调用下一个
// 输出的值是一个对象{value:arr[i],done:true/false} value输出对象的值，done是表示是否完成遍历
// 在对象中布置了Symbol.iterator 接口后，才可以用for(let i of obj)来遍历对象；
// 用for .. of可以随时中断跳出
//
// 类数组对象可以直接借用数组的Symbol.iterator接口
// obj[Symbol.iterator] = [][Symbol.iterator];

'use strict';

var obj = {'zhang':'100','wang':'200','liu':'300'}


obj[Symbol.iterator] = function(){
	let i = 0;
	let self = this;
	const names = Object.keys(obj);   // ['wang','liu']
	const length = names.length; 
	return {
		next(){
			let name = names[i++];
			let age = obj[name];
			return {value:{name,age}, done: i > length};
		}
	}
}
for (let u of obj) {
	console.log(u);
} 
