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


document.getElementById('selectors').onchange = function (event) {
    const text = event.target.value;
    const selectors = text.split('\n');
    chrome.storage.sync.set({selectors});
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {selectors});
    });
};

document.getElementById('words').onchange = function (event) {
    const text = event.target.value;
    const words = text.split('\n');
    chrome.storage.sync.set({words});
};

