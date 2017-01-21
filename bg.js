chrome.tabs.onUpdated.addListener(function() {
  alert('updated from background');
});