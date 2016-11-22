// JavaScript Document

window.onload = function() {
	var ball1 = document.getElementById("ball1");
	var ball2 = document.getElementById("ball2");
	var ball3 = document.getElementById("ball3");
	
	/*
	// 传统方法
	function animate(ball, distance, callback) {
		setTimeout(function() {
			var left = ball.offsetLeft;
			if(left == distance) {
				callback && callback();
			}
			else {
				if(left < distance) {
					left ++;
				}
				else {
					left --;
				}
				ball.style.left = left + "px";
				animate(ball, distance, callback);
			}
		}, 13);
	}
	
	animate(ball1, 100, function() {
		animate(ball2, 200, function() {
			animate(ball3, 300, function() {
				animate(ball3, 150, function() {
					animate(ball2, 150, function() {
						animate(ball1, 150, function() {
						});
					});
				});
			});
		});
	});
	*/

	var Promise = window.Promise;

	function primiseAnimate(ball, distance) {
		return new Promise(function(resolve, reject) {
			function _animate() {
				setTimeout(function() {
					var left = ball.offsetLeft;
					if(left == distance) {
						resolve();
					}
					else {
						if(left < distance) {
							left ++;
						}
						else {
							left --;
						}
						ball.style.left = left + "px";
						_animate();
					}
				}, 13);
			}
			_animate();
		});
	}
	
	primiseAnimate(ball1, 100).then(function() {
		return primiseAnimate(ball2, 200);
	}).then(function() {
		return primiseAnimate(ball3, 300);
	}).then(function() {
		return primiseAnimate(ball3, 150);
	}).then(function() {
		return primiseAnimate(ball2, 150);
	}).then(function() {
		return primiseAnimate(ball1, 150);
	});
}