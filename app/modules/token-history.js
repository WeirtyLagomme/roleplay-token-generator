import { download } from "./download-manager.js";

const getHistory = () => new Promise(resolve => {
    const tokens = JSON.parse(localStorage.getItem('token-history')) || [];

    const tokensElements = tokens.map(({ imageURL, filename }) => {
        const img = document.createElement('img');
        img.src = imageURL;
        const name = document.createElement('p');
        name.textContent = filename;
        const container = document.createElement('div');
        container.dataset.filename = filename;
        container.append(img, name);

        container.addEventListener('click', ({ currentTarget }) => {
            download({
                url: currentTarget.firstElementChild.src,
                filename: currentTarget.dataset.filename
            });
        });


        return container;
    });

    document.querySelector('.history-container').append(...tokensElements);

    resolve();
});

const showHistory = () => {
    document.querySelector('section.history').classList.add('show');
}

const closeHistory = () => {
    document.querySelector('section.history').classList.remove('show');
}

const setupBackButtonListener = () => {
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            e.preventDefault();
            closeHistory();
        }
    });

    const backButton = document.querySelector('section .back');
    backButton.addEventListener('click', e => {
        e.preventDefault();
        closeHistory();
    });
}

export const setupHistory = async () => {
    await getHistory();
    
    document.addEventListener('keydown', e => {
        if (e.ctrlKey && e.key === 'h') {
            e.preventDefault();
            showHistory();
        }
    });

    setupBackButtonListener();
}