'use strict';
var Abstract = require('./abstract');

class Mess extends Abstract{
	constructor(articalList){
		super();
		this.list = articalList;
	}
	_render(){
		var articalListString = this.list.map((artical, index)=>{
			return`
				<li>
					<h3>${artical.title}</h3>
					<p>${artical.body}</p>
					<a href='/del?id=${index}'>删除</a>
					<a href='/updata?id=${index}'>修改</a>
				</li>
			`
		}).join('');
		return `
			<ul>
				${articalListString}
			</ul>
		`;
	}
}

module.exports = Mess;