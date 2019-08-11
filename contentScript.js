chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    chrome.storage.sync.get('words', ({words}) => {
        processDom(request.selectors, words);
    });
});

chrome.storage.sync.get('selectors', ({selectors}) => {
    chrome.storage.sync.get('words', ({words}) => {
        processDom(selectors, words);
    });
});

function processDom(selectors, words) {
    selectors.forEach((selector) => {
        let iterator = document.evaluate(selector, document);
        let element = iterator.iterateNext();
        let elementsToHide = [];
        let elementsToShow = [];
        while (element) {
            let count = 0;
            words.forEach((word) => {
                if (element.textContent.indexOf(word) >= 0) {
                    count++;
                }
            });
            if (count > 0) {
                elementsToHide.push(element);
            } else {
                elementsToShow.push(element);
            }
            element = iterator.iterateNext();
        }
        elementsToHide.forEach(element => {
            element.hidden = true;
        });
        elementsToShow.forEach(element => {
            element.hidden = false;
        });
    });
}
