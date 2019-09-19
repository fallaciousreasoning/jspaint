import { fileFromHandle } from '/src/nativefs.js';

// On load, check if we were launched with any file handles. If so, open the
// first one for editing.
window.addEventListener('load', async () => {
    // Check the file handling API is supported.
    if (!window.launchParams || !window.launchParams.files)
        return;

    const handle = window.launchParams.files[0];
    // Handle could be undefined if we were launched with no files.
    if (!handle)
        return;

    const file = await fileFromHandle(handle);
    open_from_File(file, error => {
        if(!error)
            return;
        
        show_error_message("Failed to open file:", error);
    })
});