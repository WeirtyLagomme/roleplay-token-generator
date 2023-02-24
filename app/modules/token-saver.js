const nameFile = () => new Promise(resolve => {
    document.querySelector('section').classList.add('show');
    const input = document.querySelector('input');
    input.focus();
    input.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            resolve(input.value);
        }
    })
});

const downloadChanged = (delta) => {
    if (delta.state && delta.state.current === "complete") {
        chrome.downloads.onChanged.removeListener(downloadChanged);
        chrome.runtime.sendMessage({ close: true });
    }
}

const download = async ({ stage }) => {
    const filename = await nameFile();

    const imageURL = stage.toDataURL({
        x: window.innerWidth / 2 - 128,
        y: window.innerHeight / 2 - 128,
        width: 256,
        height: 256
    });

    chrome.downloads.onChanged.addListener(downloadChanged);

    chrome.downloads.download({
        url: imageURL,
        filename: `${filename}.png`
    });
}

const hideContext = ({ transformer, group }) => {
    transformer.nodes([]);
    group.setAttrs({
        clipFunc: (ctx) => {
            ctx.arc(
                window.innerWidth / 2,
                window.innerHeight / 2,
                128,
                0,
                Math.PI * 2,
                false
            );
        },
    });
}

export const setupSaver = canvas => {
    document.addEventListener('keydown', e => {
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            hideContext(canvas);
            download(canvas);
        }
    });
}