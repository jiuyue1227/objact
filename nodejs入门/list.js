'use strict';
var Mess = require('./views/index');
var database = require('./database');
module.exports = function(req, res) {
	res.end(new Mess(database.list).render());
}