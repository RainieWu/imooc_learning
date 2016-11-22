// JavaScript Document

var fs = require('fs');
var readStream = fs.createReadStream('test.mp4');
var writeStream = fs.createWriteStream('testStream.mp4');

readStream.on('data', function(chunk) {
	if(writeStream.write(chunk) == false) {
		console.log('still cached');
		readStream.pause();
	}
});

readStream.on('end', function() {
	writeStream.end();
});

writeStream.on('drain', function() {
	console.log('still drain');
	readStream.resume();
});