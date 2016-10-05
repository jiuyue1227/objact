// generator 函数特点是在function 跟函数名中间加一个＊号
// 它支持内部使用yield，yield可以将generator函数分段执行
// generator函数本身具有Symbol.iterator的接口，所以可以用for..of 去遍历执行yield
// ...
// ...
// ...
// ...
// ...

function asyncFun(arg1, arg2){
	return new Promise(function(resolve, reject){
		resolve(arg1 + arg2);
	})
}

function * fn(n, m) {
	console.log(yield asyncFun(n, m));
}


function exec(a, b){
	let it = fn(a, b);
	let fg = it.next();
	console.log(fg);
	if (!fg.done) {
		if (fg.value instanceof Promise) {
			fg.value.then(function(result){
				if (result < 20) {
					exec(result, 3);
				}
			})
		}
	}
}

exec(1, 2);
