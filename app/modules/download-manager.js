const downloadChanged = (delta) => {
    if (delta.state && delta.state.current === "complete") {
        chrome.downloads.onChanged.removeListener(downloadChanged);
        chrome.runtime.sendMessage({ close: true });
    }
}

export const download = ({ url, filename }) => {
    chrome.downloads.onChanged.addListener(downloadChanged);
    chrome.downloads.download({ url, filename: `${filename}.png` });
}