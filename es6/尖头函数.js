/*
var fn = ()=>{}

这里面的this指向的永远都是一个对象，即fn函数本身


fn = n => {
	console.log(argments[0]);
}
fn(12);
这个函数里面不能用argments,这里将会返回一个对象,
但是console.log(n)就可以返回12


fn = n => n*3;
这种函数体内只有一行语句的可以这样写，在这里将会省略return
只有在有｛｝的时候才需要用return返回
*/