'use strict';
var Abstract = require('./abstract');

class Addpaper extends Abstract{
	constructor(error){
		super();
		this.error = error || {};
	}

	_render(){
		let titleError = this.error.title || '';
		let bodyError = this.error.body || '';
		return `
			<form action='/add' method='post'>
				<input type='text' name='title' value='标题'/>
				<div style='color:red;'>${titleError}</div>
				<br>
				<input type='text' name='body' value='内容'/>
				<div style='color:red;'>${bodyError}</div>
				<br>
				<button type='submit' value='submit'>提交</button>
			</form>
		`
	}
}

module.exports = Addpaper;