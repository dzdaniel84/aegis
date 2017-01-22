var serv = "http://162.243.132.250:8080";

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
    		cb(xmlHttp.responseText);
    	}
    }
    xmlHttp.open("GET", serv + "/" + text, true);
    xmlHttp.setRequestHeader("Authorization", "");
    xmlHttp.send(null);
}

function cb(text) {
	alert(text);
}

function useWatson(text){
	console.log("WORKING");
	httpGet(text);
}

chrome.tabs.onUpdated.addListener( function(tabId, changeInfo, tab) {
   chrome.extension.getBackgroundPage().console.log(tab.url);
   if (changeInfo.status == "complete" && tab.url.includes("google.com/search")){
   	recordSearches(tab.url);
   }
});