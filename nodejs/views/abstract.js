'use strict';

class Abstract{
	contructor(name){
		this.name = name;
	}

	_render(){
		throw new Error('请设置_render()');
	}

	render(){
		return`
		<html>
			<head>
				<title></title>
			</head>
			<body>
				<div>${this._render()}<br/>老公我爱你么么哒～～0000</div>
			</body>
		</html>
		`
	}
}

module.exports = Abstract;