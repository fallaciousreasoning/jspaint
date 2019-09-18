if ('clipboard' in navigator && 'write' in navigator.clipboard) {
    window.systemCopy = async blob => {
        await navigator.clipboard.write([
            new ClipboardItem(Object.defineProperty({}, blob.type, {value: blob, enumerable: true}))
        ]);
    };

    window.systemPaste = async () => {
        // TODO: Consolidate with other paste logic.
        const items = await navigator.clipboard.read();
        for (let item of items) {
            try {
                for (let type of item.types) {
                    if(type.match(/^image\//)) {
                        const blob = await item.getType(type);
                        paste_image_from_file(blob);
                    }
                }
            } catch(e) {
                console.error('Clipboard API paste error', e);
            }
        }
    };
}
