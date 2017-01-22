var serv = "localhost:8080";

function recordSearches(search) {
	search = search.split("?q=")[1];
	if (search.includes("#q=")){
		search = search.split("#q=")[1];
	} else {
		search = search.split("&oq=")[0];
	}
	//while (search.includes("+")){search = search.replace("+", " ");}
	useWatson(search);
}

function httpGet(text) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", serv + "?q=" + text, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function useWatson(text){
	alert(httpGet(text));
}

chrome.tabs.onUpdated.addListener( function(tabId, changeInfo, tab) {
   chrome.extension.getBackgroundPage().console.log(tab.url);
   if (changeInfo.status == "complete" && tab.url.includes("google.com/search")){
   	recordSearches(tab.url);
   }
});