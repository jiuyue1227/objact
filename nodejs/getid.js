'use strict'

var post = require('./post');
var query = require('./query');


module.exports = function(req, callback){
	let id;
	if (req.method === "GET") {
		id = query(req).id;
	} else {
		post(req).then(function(data){
			id = data.id;
		});
	}
	callback(id);
	
}