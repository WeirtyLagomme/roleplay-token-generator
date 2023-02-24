import { setupStage } from "./modules/token-builder.js";
import { setupSaver } from "./modules/token-saver.js";

export const main = async imageURL => {
    const canvas = await setupStage(imageURL);
    setupSaver(canvas);
}

chrome.runtime.onMessage.addListener(main);