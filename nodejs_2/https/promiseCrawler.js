// JavaScript Document

var http = require('http');
var Promise = require('bluebird');
var cheerio = require('cheerio');
var baseUrl = 'http://www.imooc.com/learn/';
var videoIds = [348, 259, 197, 134, 75];

function filterChapter(html) {
	var $ = cheerio.load(html);
	var chapters = $('.mod-chapters .chapter');
	var title = $('.course-infos .hd h2').text();
	var number = $($('.course-infos .statics .static-item .meta-value')[0]).text();
	/*
	courseData = {
		title: title,
		number = number,
		videos: [{
			chapterTitle: '',
			videos: [
				title: '',
				id: ''
			]
		}]
	}
	*/
	var courseData = {
		title: title,
		number: number,
		videos: []
	}
	chapters.each(function(item) {
        var chapter = $(this);
		var chapterTitle = chapter.find('strong').text();
		var videos = chapter.find('.video').children('li');
		var chapterData = {
			chapterTitle: chapterTitle,
			videos: []
		}
		videos.each(function(item) {
			var video = $(this);
			var videoTitle = video.text();
			var id = video.attr('data-media-id');
			chapterData.videos.push({
				title: videoTitle,
				id: id
			});
		});
		courseData.videos.push(chapterData);
    });
	return courseData;
}

function printCourseInfo(coursesData) {
	coursesData.forEach(function(courseData) {
		console.log(courseData.number + " 人学过 " + courseData.title);
	});
	coursesData.forEach(function(courseData) {
		console.log("### " + courseData.title);
		courseData.videos.forEach(function(item) {
			var chapterTitle = item.chapterTitle;
			console.log(chapterTitle);
			item.videos.forEach(function(item) {
				console.log('	[' + item.id + '] ' + item.title);
			});
		});
	});
}

function getPageAsync(url) {
	return new Promise(function(resolve, reject) {
		console.log("正在爬取" + url);
		
		http.get(url, function(res) {
			var html = '';
			res.on('data', function(data) {
				html += data;
			});
			res.on('end', function() {
				resolve(html);
			});
		}).on('error', function(e) {
			reject(e);
			console.log('获取课程数据出错！');
		});
	});
}

var fetchCourseArray = [];

videoIds.forEach(function(id) {
	fetchCourseArray.push(getPageAsync(baseUrl + id));
});

Promise.all(fetchCourseArray).then(function(pages) {
	var coursesData = [];
	pages.forEach(function(html) {
		var courses = filterChapter(html);
		coursesData.push(courses);
	});
	coursesData.sort(function(a, b) {
		return a.number < b.number;
	});
	
	printCourseInfo(coursesData);
});
