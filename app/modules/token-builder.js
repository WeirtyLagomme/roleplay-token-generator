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

export const setupStage = async (imageURL) => {
    const stage = new Konva.Stage({
        container: 'container',
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const layer = new Konva.Layer();

    var group = new Konva.Group();

    const img = await createImage({ url: imageURL, draggable: true });
    group.add(img);

    const border = await createImage({ url: 'assets/token-stamp.png' });
    border.listening(false);
    group.add(border);

    const transformer = new Konva.Transformer();
    group.add(transformer);
    transformer.nodes([ img ]);

    layer.add(group);
    stage.add(layer);

    return { stage, group, transformer, img };
}