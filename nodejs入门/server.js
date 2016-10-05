'use strict';
var http = require('http');
var url = require('url');
var handleRepos = {};

handleRepos['/add'] = require('./add');
handleRepos['/'] = require('./list');
handleRepos['/del'] = require('./del');
handleRepos['/updata'] = require('./updata');

http.createServer(function(req, res){
	res.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
	let pathname = url.parse(req.url).pathname;
	let hand = handleRepos[pathname];
	if (hand) {
		hand(req, res);
	} else {
		res.writeHead(404);
		res.end();
	}
	

}).listen(8000);