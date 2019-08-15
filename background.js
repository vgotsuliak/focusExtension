chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    chrome.storage.sync.get('selectors', ({selectors}) => {
        chrome.storage.sync.get('words', ({words}) => {
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {selectors, words});
            });
        });
    });
});
