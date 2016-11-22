// JavaScript Document

var fs = require('fs');

fs.createReadStream('test.mp4').pipe(fs.createWriteStream('testPipe.mp4'));