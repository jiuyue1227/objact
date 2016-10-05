'use strict'

var getid = require('./getid');
var database = require('./database');
var index = require('./list');

module.exports = function(req, res){
	getid(req, id=>{
		console.log(id);
		database.del(id);
		index(req, res);
	})
	
}