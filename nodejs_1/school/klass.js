// JavaScript Document

var student = require('./student');
var teacher = require('./teacher');

function add(t, s) {
	teacher.add(t);
	
	s.forEach(function(item , index) {
		student.add(item);
	});
}

exports.add = add;

//module.exports = add;