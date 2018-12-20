const fs = require('fs-extra');

/**
 * Error handling middleware to cleanup any uploads sent during this request.
 * 
 * This should be used after any uploads are potentially invalidated or failed 
 * to process, and ensures temp folders aren't full of orphaned files.
 */
module.exports = function uploadCleanup(err, req, res, next) {
    console.log('HELLO', req.file);
    if (req.file) {
        fs.unlink(req.file.path);
    }
    next(err);
};
