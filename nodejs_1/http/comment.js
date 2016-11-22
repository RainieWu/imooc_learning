// JavaScript Document

var http = require('http');
var querystring = require('querystring');

var postData = querystring.stringify({
	'content': '大家一起渣油啊！',
	'cid': 348
});

var option = {
	hostname: 'www.imooc.com',
	port: 80,
	path: '/course/document',
	method: 'POST',
	headers: {
		'Accept': 'application/json, text/javascript, */*; q=0.01',
		'Accept-Encoding': 'gzip, deflate',
		'Accept-Language': 'zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3',
		'Cache-Control': 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0',
		'Connection': 'keep-alive',
		'Content-Length': postData.length,
		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		'Cookie': 'imooc_uuid=7b24a907-a020-47db-82f5-b473ed2c5a44; imooc_isnew=2; imooc_isnew_ct=1478250234; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1478250240,1478689213,1478689993; loginstate=1;apsid=U1NWNhNTk1NzRmMjg3Y2NkYTE2OGVjZWYwMTE5MDYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjM0NDQ1MwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0NzkwODY0ODRAcXEuY29tAAAAAAAAAAAAAAAAAAAAAGVlNWU1NTU1NjEyYzQxZmE2ZTFmNDUzYjJlOWFhNDk3yQEjWMkBI1g%3DM2; last_login_username=479086484%40qq.com; PHPSESSID=k07g61b52eca9nl0elgplpgnq2; cvde=582304c783c5f-2; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1478689993',
		'Host': 'www.imooc.com',
		'Origin': 'http://www.imooc.com',
		'Pragma': 'no-cache',
		//'RA-Sid': '3A64559C-20161109-045504-c3fcd7-04ca3a',
		//'RA-Ver': '2.10.4',
		'Referer': 'http://www.imooc.com/video/8837',
		'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64; rv:49.0) Gecko/20100101 Firefox/49.0',
		'X-Requested-With': 'XMLHttpRequest'
	}
}

var req = http.request(option, function(res) {
	console.log('Status: ' + res.statusCode);
	console.log('headers: ' + JSON.stringify(res.headers));
	res.on('data', function(chunk) {
		console.log(Buffer.isBuffer(chunk));
		console.log(typeof chunk);
	});
	res.on('end', function() {
		console.log('OVER');
	});
});

	
req.on('error', function(e) {
	console.log('ERROR: ' + e.message);
});
req.write(postData);
req.end();