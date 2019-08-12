chrome.storage.sync.get('selectors', ({selectors}) => {
    if (selectors) {
        const selectorsText = selectors.join('\n');
        document.getElementById('selectors').value = selectorsText;
    }
});

chrome.storage.sync.get('words', ({words}) => {
    if (words) {
        const wordsText = words.join('\n');
        document.getElementById('words').value = wordsText;
    }
});

document.getElementById('saveButton').onclick = function (event) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        const selectorsText = document.getElementById('selectors').value;
        const wordsText = document.getElementById('words').value;
        const selectors = selectorsText.split('\n');
        const words = wordsText.split('\n');
        chrome.storage.sync.set({words});
        chrome.storage.sync.set({selectors});
        chrome.tabs.sendMessage(tabs[0].id, {selectors, words});
    });
};

