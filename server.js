function parse(tones){
	var anger = tones.document_tone.tone_categories[0].tones[0].score;
	var fear = tones.document_tone.tone_categories[0].tones[2].score;
	var sadness = tones.document_tone.tone_categories[0].tones[4].score;
	console.log("anger: " + anger + "\nfear: " + fear + "\nsadness: " + sadness);
	var i = (anger + fear + sadness - Math.min(anger, fear, sadness))/2;
	if (i >= 0.28) {
		console.log("\033[91mThis search query contains several red flags.\033[0m");
		return 1;
	}
	console.log("This search query does not contain any red flags.");
	return 0;
}

/**Placeholder function until we can fully return the parsed tone*/
function quickParse(tones){
	negs = ['hate', 'dislike', 'unhappy', 'unhappiness', 'help', 'fuck', 'shit', 'sad', 'bad', 'kill'
	'suicide', 'self-harm', 'selfharm', 'harm', 'hopeless', 'depression', 'depressing', 'depressed'];
	for (var i = 0; i < negs.length; i++) {
		if (tones.includes(negs[i])){
			return "1";
		}
	}
	return "0";
}

var http = require('http');
var ToneAnalyzerV3 = require('../tone-analyzer/v3.js');

var tone_analyzer = new ToneAnalyzerV3({
  username: 'YOUR USERNAME HERE',
  password: 'YOUR PASSWORD HERE',
  version_date: '2016-05-19'
});

var server = http.createServer(function(request, response) {
	if (request.url != "/favicon.ico"){
		var t = request.url.split("/")[1];
		while (t.includes("+")){
			t = t.replace("+", " ");
		}
		console.log("\n\n\nSearch Query: \033[1m" + t + "\033[0m");
		var tone = tone_analyzer.tone({text: t},
	  		function(err, tone) {
	  			if (err) {
	  				console.log(err);
	  			} else {
	  				console.log(parse(tone));
	  			}
	  		}
	  	);
		response.write(quickParse(t));
	}
	response.end();
});

console.log("Starting server.");
server.listen(8080);