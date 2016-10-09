'use strict'

var post = require('./post');
var query = require('./query');
var database = require('./database');
var list = require('./list');
var Updata = require('./views/updata');

module.exports = function(req, res){

	if (req.method === 'GET') {
		let id = query(req).id;
		let data = database.list[id];
		let up = new Updata(id, data);
		
		res.end(up.render());
	} else {
		post(req).then(function(data){
			let id = data.id;
			delete data.id;
			database.updata(id, data);
			list(req, res);
		})
	}
}