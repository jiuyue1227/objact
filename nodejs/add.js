'use strict';

var database = require('./database');
var postModule = require('./post');
var Addpaper = require('./views/addpaper');
var list = require('./list');
module.exports = function(req, res) {
	if (req.method === "GET") {
		res.end(new Addpaper().render());
	} else {
		postModule(req).then(function(data){
			let error = {};
			if (data.title.length > 5) {
				error.title = '不能大于5';
			}

			if (data.body.length < 0) {
				error.body = '不能小于10';
			}

			if (Object.keys(error).length > 0) {
				res.end(new Addpaper(error).render());
			} else {
				database.add(data);
				list(req, res);
			}
		})
	}
	
}