'use strict';
var Abstract = require('./abstract');

class Updata extends Abstract{
	constructor(id, data){
		super();
		this.id = id;
		this.data = data;
	}

	_render(){
		
		return `
			<form action='/updata' method='post'>
				<input type='hidden' name='id' value='${this.id}'>
				<input type='text' name='title' id='title' value='${this.data.title}'/>
				
				<br>
				<input type='text' name='body' id='body' value='${this.data.body}'/>
				
				<br>
				<button type='submit' value='submit'>修改</button>
			</form>
		`
	}
}

module.exports = Updata;