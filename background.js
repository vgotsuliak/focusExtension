chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({color: '#a75326'}, function() {
        console.log("Set the color");
});
});
