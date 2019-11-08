import { fileFromHandle } from './nativefs.js';

// Check if we were launched with any file handles. If so, open the
// first one for editing.
if ('launchQueue' in window) {
    window.launchQueue.setConsumer(async launchParams => {
        const handle = launchParams.files && launchParams.files[0];

        // Handle could be undefined if we were launched with no files.
        if (!handle)
            return;

        const file = await fileFromHandle(handle);
        open_from_File(file, error => {
            if (!error)
                return;

            show_error_message("Failed to open file:", error);
        })
    });
}