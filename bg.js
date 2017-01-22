function recordSearches(url) {
	if (url.includes("google.com/search")) {
		url = url.split("?q=");
		url = url[1].split("&oq=")[0];
		url = url.replace("+", " ");
		alert(url);
	}
}

chrome.tabs.onUpdated.addListener( function(tabId, changeInfo, tab) {
   chrome.extension.getBackgroundPage().console.log(tab.url);
   if (changeInfo.status == "complete"){
   	recordSearches(tab.url);
   }
});