chrome.runtime.onInstalled.addListener(async () => {
    chrome.contextMenus.create({
        id: 'token-generator',
        title: 'Generate token from image',
        type: 'normal',
        contexts: ['image']
    });
});

chrome.contextMenus.onClicked.addListener(async function rightClick(item, tab) {
    const app = await chrome.tabs.create({
        url: 'app/index.html',
        index: tab.index + 1
    });

    const updateListener = (id, { status }) => {
        if (status === 'complete') {
            chrome.tabs.sendMessage(id, item.srcUrl);
        }
    };

    chrome.tabs.onUpdated.addListener(updateListener);

    const messageListener = (request) => {
        if (request.close) {
            chrome.tabs.onUpdated.removeListener(updateListener);
            chrome.tabs.remove(app.id);
            chrome.runtime.onMessage.removeListener(messageListener);
        }
    }

    chrome.runtime.onMessage.addListener(messageListener);
});