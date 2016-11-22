// JavaScript Document

var klass = require('./klass');

exports.add = function(k) {
	k.forEach(function(item, index) {
		var _klass = item;
		var t = item.t;
		var s = item.s;
		
		klass.add(t, s);
	});
}