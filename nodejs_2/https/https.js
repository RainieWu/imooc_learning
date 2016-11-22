// JavaScript Document

var https = require('https');
var fs = require('fs');

var option = {
	key: fs.readFileSync('ssh_key.pem'),
	cert: fs.readFileSync('ssh_cert.pem')
}

https.createServer(option, function(req, res) {
	res.writeHead(200);
	res.end('Hello Rainie');
}).listen(8090);