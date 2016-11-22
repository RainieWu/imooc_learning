// JavaScript Document

var EventEmitter = require('events').EventEmitter;
var life = new EventEmitter();

life.setMaxListeners(11);

life.on('23333', function(who) {
	console.log('Love ' + who + ' 1 time');
});

life.on('23333', function(who) {
	console.log('Love ' + who + ' 2 times');
});

life.on('23333', function(who) {
	console.log('Love ' + who + ' 3 times');
});

life.on('23333', function(who) {
	console.log('Love ' + who + ' 4 times');
});

life.on('23333', function(who) {
	console.log('Love ' + who + ' 5 times');
});

life.on('23333', function(who) {
	console.log('Love ' + who + ' 6 times');
});

life.on('23333', function(who) {
	console.log('Love ' + who + ' 7 times');
});

life.on('23333', function(who) {
	console.log('Love ' + who + ' 8 times');
});

life.on('23333', function(who) {
	console.log('Love ' + who + ' 9 times');
});

life.on('23333', function(who) {
	console.log('Love ' + who + ' forever');
});

life.on('233333', function(who) {
	console.log('Love ' + who + ' 2333333');
});

life.on('233333', function(who) {
	console.log('Love ' + who + ' 23333333');
});

life.removeAllListeners('233333');

var hasOneListener = life.emit('23333', 'Kavin');
var hasTwoListener = life.emit('233333', 'Kavin');
//var hasThreeListener = life.emit('2333333', 'Kavin');

//console.log(hasOneListener);
//console.log(hasTwoListener);
//console.log(hasThreeListener);

//life.emit('23333', 'Kavin');



console.log(life.listeners('23333').length);
console.log(EventEmitter.listenerCount(life, '233333'));