const createImage = ({ url, draggable }) => new Promise(resolve => {
    Konva.Image.fromURL(url, (image) => {
        let { height, width } = image.getClientRect();

        const maxSideSize = 400;

        if (height > maxSideSize || width > maxSideSize) {
            const max = Math.max(height, width);
            const scale = maxSideSize / max;
            height = height * scale;
            width = width * scale;
            image.setAttrs({ height, width });
        }

        image.setAttrs({
            x: window.innerWidth / 2 - width / 2,
            y: window.innerHeight / 2 - height / 2,
            draggable
        });

        resolve(image);
    });
});

const createBorderElement = border => {
    const img = document.createElement('img');
    img.setAttribute('src', `assets/borders/${border}.png`);

    const container = document.createElement('div');
    container.classList.add('border-container');
    container.append(img);
    document.querySelector('aside .borders').append(container);

    return { container, img };
}

const setupBordersList = async (group) => {
    const bordersElements = ['grey', 'red', 'white'].map(createBorderElement);

    bordersElements[0].container.classList.add('selected');
    let currentBorder = await createImage({ url: bordersElements[0].img.src });
    currentBorder.listening(false);
    group.add(currentBorder);

    for (const { container, img } of bordersElements) {
        img.addEventListener('click', async () => {
            document.querySelector('.border-container.selected').classList.remove('selected');
            container.classList.add('selected');
            currentBorder.to({ opacity: 0, duration: 0.5 });
            currentBorder.destroy();
            currentBorder = await createImage({ url: img.src });
            currentBorder.listening(false);
            currentBorder.setAttrs({ opacity: 0 });
            group.add(currentBorder);
            currentBorder.to({ opacity: 1, duration: 0.5 });
        });
    }
}

export const setupStage = async (imageURL) => {
    const stage = new Konva.Stage({
        container: 'container',
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const layer = new Konva.Layer();
    const group = new Konva.Group();

    const img = await createImage({ url: imageURL, draggable: true });
    group.add(img);

    await setupBordersList(group);

    const transformer = new Konva.Transformer();
    group.add(transformer);
    transformer.nodes([ img ]);

    layer.add(group);
    stage.add(layer);

    return { stage, group, transformer, img };
}