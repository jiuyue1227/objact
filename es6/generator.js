function * fn(_name, _age){
	let name = yield _name;
	let age = yield _age;
	let message = name + '..' + age;
	return message;
}

let it = fn('aa', 22);

for (var i of it) {
	console.log(i);
}
