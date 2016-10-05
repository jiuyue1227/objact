'use strict';

let fs = require('fs');
let list;
let filePath = __dirname + '/data.json';
try{
	list = JSON.parse(fs.readFileSync(filePath));
} catch(e) {
	list = [];
}


module.exports = {
	add(article){
		list.push(article);
	},
	del(index){
		list.splice(index, 1);
	},
	updata(index, article){
		list.splice(index, 1, article);
	},
	get list(){
		return list;
	},
	
	store(callback){
		fs.readFile(filePath, JSON.stringify(list), callback);
	}
}