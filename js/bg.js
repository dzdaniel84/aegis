var serv = "http://localhost:8080";
var arr = [];

function recordSearches(search) {
	search = search.split("?q=")[1];
	if (search.includes("#q=")){
		search = search.split("#q=")[1];
	} else {
		search = search.split("&oq=")[0];
	}
	useWatson(search);
}

function httpGet(text) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
    	if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
    		var i = xmlHttp.responseText;
    		if (i === "1") {
    			sendMessage();
    		}
    		determine(i);
    	}
    }
    xmlHttp.open("GET", serv + "/" + text, true);
    xmlHttp.setRequestHeader("Authorization", "");
    xmlHttp.send(null);
}

function useWatson(text){
	determine(httpGet(text));
}

function sum(arr){
	return arr.reduce(function(prev, cur) {return prev + cur;});
}

function determine(v){
	if (v != undefined) {
		arr.push(v);
		if (arr.length > 15) {
			if (sum(arr)/arr.length > 0.75) {
				sendMessage();
			}
		}
	}
}

function sendMessage(){
	chrome.tabs.create({ url: "help.html" });
}

chrome.tabs.onUpdated.addListener( function(tabId, changeInfo, tab) {
   chrome.extension.getBackgroundPage().console.log(tab.url);
   if (changeInfo.status == "complete" && tab.url.includes("google.com/search")){
   	recordSearches(tab.url);
   }
});