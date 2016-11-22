// JavaScript Document

var fs = require('fs');

fs.readFile('logo.png', function(err, originBuffer) {
	console.log(Buffer.isBuffer(originBuffer));
	
	fs.writeFile('logoBuffer.png', originBuffer, function(err) {
		if(err) {
			console.log(err);
		}
	});
	
	//var base64Image = new Buffer(originBuffer.toString('base64'));
	var base64Image = originBuffer.toString('base64');
	console.log(base64Image);
	
	var decodedImage = new Buffer(base64Image, 'base64');
	console.log(Buffer.compare(originBuffer, decodedImage));
	
	fs.writeFile('logoDecoded.png', decodedImage, function(err) {
		if(err) {
			console.log(err);
		}
	});
});