import { setupStage } from "./modules/token-builder.js";
import { setupSaver } from "./modules/token-saver.js";
import { setupHistory } from "./modules/token-history.js";

const endLoading = () => {
    setTimeout(() => {
        const loader = document.querySelector('.loader');
        loader.classList.add('done');
    }, 1000);
}

export const main = async imageURL => {
    const canvas = await setupStage(imageURL);
    setupSaver(canvas);
    setupHistory();
    endLoading();
}

chrome.runtime.onMessage.addListener(main);