function recordSearches(url) {
	url = url.split("?q=")[1];
	if (url.includes("#q=")){
		url = url.split("#q=")[1];
	} else {
		url = url.split("&oq=")[0];
	}
	while (url.includes("+")){
		url = url.replace("+", " ");
	}
	useWatson(url);
}

function useWatson(search){

}

chrome.tabs.onUpdated.addListener( function(tabId, changeInfo, tab) {
   chrome.extension.getBackgroundPage().console.log(tab.url);
   if (changeInfo.status == "complete" && tab.url.includes("google.com/search")){
   	recordSearches(tab.url);
   }
});