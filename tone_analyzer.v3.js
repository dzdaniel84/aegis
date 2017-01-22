'use strict';

function parseAccess(access){
	return "access";
}

var http = require('http');
var ToneAnalyzerV3 = require('../tone-analyzer/v3.js');

var tone_analyzer = new ToneAnalyzerV3({
  username: '163938c1-7ec0-46af-aa08-2132b2a45912',
  password: 'seUk2wqn27P2',
  version_date: '2016-05-19'
});

var server = http.createServer(function(request, response) {
	console.log(request.url);
	if (request.url != "/favicon.ico"){
		var t = request.url.split("/")[1];
		while (t.includes("+")){
			t = t.replace("+", " ");
		}
		var access = tone_analyzer.tone({ text: t },
	  		function(err, tone) {
	  			if (err) {
	  				console.log(err);
	  			} else {
	  				console.log(JSON.stringify(tone, null, 2));
	  			}
	  		});
		console.log(response);
		response.write("a");
	}
	response.end();
});

console.log("Starting server.");
server.listen(8080);