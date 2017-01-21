function recordSearches() {
	var url = window.locationhref..split("?q=");
	url = url[1].split("&oq=")[0];
	url = url.replace("+", " ");
	console.log(url);
}

chrome.tabs.onUpdated.addListener(recordSearches);