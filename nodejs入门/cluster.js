var cluster = require('cluster');
var http = require('http');
var numcpus = require('os').cpus().length;


if (cluster.isMaster) {
	console.log('主进程');
	for (var i = 0; i < numcpus; i ++) {
		cluster.fork();
	}
} else {
	console.log('子进程')；
	http.createServer(function(req, res){
		res.writeHead(200);
		res.end('is end');
	}).listen('127.0.0.127', 3000);
}
