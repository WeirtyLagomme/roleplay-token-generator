import { download } from "./download-manager.js";

const nameFile = () => new Promise(resolve => {
    document.querySelector('section.filename').classList.add('show');
    const input = document.querySelector('input');
    input.focus();
    input.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            resolve(input.value);
        }
    })
});

const pushTokenHistory = token => {
    const history = JSON.parse(localStorage.getItem('token-history')) || [];
    localStorage.setItem('token-history', JSON.stringify([ token, ...history ]));
}

const save = async ({ stage }) => {
    const filename = await nameFile();

    const imageURL = stage.toDataURL({
        x: window.innerWidth / 2 - 128,
        y: window.innerHeight / 2 - 128,
        width: 256,
        height: 256
    });

    pushTokenHistory({ imageURL, filename });
    download({ url: imageURL, filename });  
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
            save(canvas);
        }
    });
}