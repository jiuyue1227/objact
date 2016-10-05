"use strict";

let arr = ['a','b','c','a'];
let st = new Set(arr);
//console.log(st); // Set 对象可以自动去重

let keys = st.keys();
let values = st.values();
let entries = st.entries(); // 输出数组的形式［'a','a'］［'b','b'］［'c','c'］

let arr2 = ['3','5','7'];
st.add(arr2);
st.add('1');
st.delete(arr2);
console.log(st.size);
st.clear();
console.log(st.has('1'))
for (var i of keys) {
	console.log(i);
}
