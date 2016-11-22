// JavaScript Document

function pet(words) {
	this.words = words;
	this.speak = function() {
		console.log(this.words);
	}
}

function dog(words) {
	pet.call(this, words);
}

var dog = new dog('Wong');

dog.speak();